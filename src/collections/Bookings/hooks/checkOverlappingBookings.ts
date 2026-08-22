import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import { sql } from 'drizzle-orm'

export const checkOverlappingBookings: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const { payload } = req
  const bed = data.bed || originalDoc?.bed
  const startDate = data.start_date || originalDoc?.start_date
  const endDate = data.end_date || originalDoc?.end_date
  const status = data.status || originalDoc?.status

  const activeStates = ['PENDING_PAYMENT_VERIFICATION', 'PENDING_ADMIN_REVIEW', 'APPROVED']
  
  if (!activeStates.includes(status)) {
    return data
  }

  if (bed && startDate && endDate) {
    const lockId = typeof bed === 'object' ? bed.id : bed
    
    // Validate operational status via Domain Service
    const { BookingService } = await import('../../../services/BookingService')
    await BookingService.validateBedStatus(payload, lockId)

    // Acquire a transaction-level advisory lock on the bed
    // This serializes concurrent booking requests for the same bed
    if (req.payload.db.drizzle) {
      const lockId = typeof bed === 'object' ? bed.id : bed
      const str = String(lockId)
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
      }
      try {
        await req.payload.db.drizzle.execute(sql`SELECT pg_advisory_xact_lock(${hash})`)
      } catch (err) {
        payload.logger.warn(`Failed to acquire advisory lock for bed ${lockId}`)
      }
    }


    const overlappingBookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { bed: { equals: bed } },
          { status: { in: activeStates } },
          { start_date: { less_than: endDate } },
          { end_date: { greater_than: startDate } }
        ],
        ...(operation === 'update' && originalDoc?.id
          ? { id: { not_equals: originalDoc.id } }
          : {})
      },
    })

    if (overlappingBookings.totalDocs > 0) {
      throw new APIError('INVARIANT_VIOLATION: This bed is already booked for the selected dates.', 409)
    }
  }

  return data
}
