import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

export const checkOverlappingShifts: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  const staffProfile = data.staff_profile || originalDoc?.staff_profile
  const startTime = data.start_time || originalDoc?.start_time
  const endTime = data.end_time || originalDoc?.end_time

  if (staffProfile && startTime && endTime) {
    const overlappingShifts = await payload.find({
      collection: 'shifts',
      where: {
        and: [
          { staff_profile: { equals: staffProfile } },
          { start_time: { less_than: endTime } },
          { end_time: { greater_than: startTime } }
        ],
        ...(operation === 'update' && originalDoc?.id
          ? { id: { not_equals: originalDoc.id } }
          : {})
      },
    })

    if (overlappingShifts.totalDocs > 0) {
      throw new APIError('INVARIANT_VIOLATION: Staff member already has an overlapping shift.', 409)
    }
  }

  return data
}
