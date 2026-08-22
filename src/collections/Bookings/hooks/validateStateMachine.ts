import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

export const validateStateMachine: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation === 'create') {
    // Booking should start in DRAFT or PENDING_PAYMENT_VERIFICATION
    if (data.status && data.status !== 'DRAFT' && data.status !== 'PENDING_PAYMENT_VERIFICATION') {
      throw new APIError('INVARIANT_VIOLATION: New bookings must start in DRAFT or PENDING_PAYMENT_VERIFICATION state.', 400)
    }
    return data
  }

  if (operation === 'update' && originalDoc) {
    const currentStatus = originalDoc.status
    const nextStatus = data.status

    if (!nextStatus || currentStatus === nextStatus) {
      return data
    }

    const validTransitions: Record<string, string[]> = {
      'DRAFT': ['PENDING_PAYMENT_VERIFICATION', 'CANCELLED', 'EXPIRED'],
      'PENDING_PAYMENT_VERIFICATION': ['PENDING_ADMIN_REVIEW', 'REJECTED', 'CANCELLED', 'EXPIRED'],
      'PENDING_ADMIN_REVIEW': ['APPROVED', 'REJECTED', 'CANCELLED', 'EXPIRED'],
      'APPROVED': ['COMPLETED', 'CANCELLED'],
      'REJECTED': [], // Terminal
      'CANCELLED': [], // Terminal
      'EXPIRED': [], // Terminal
      'COMPLETED': [], // Terminal
    }

    const allowed = validTransitions[currentStatus] || []

    if (!allowed.includes(nextStatus)) {
      throw new APIError(`INVARIANT_VIOLATION: Invalid booking state transition from ${currentStatus} to ${nextStatus}.`, 400)
    }
  }

  return data
}
