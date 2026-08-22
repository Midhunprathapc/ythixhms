import type { CollectionAfterChangeHook } from 'payload'

export const auditBookingTransitions: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload, user },
  operation,
}) => {
  if (operation === 'update' && previousDoc && doc.status !== previousDoc.status) {
    const { AuditService } = await import('../../../services/AuditService')
    await AuditService.log(payload, {
      entity_collection: 'bookings',
      entity_id: String(doc.id),
      action: `BOOKING_${doc.status}`,
      actor: user ? String(user.id) : 'SYSTEM',
      before_state: { status: previousDoc.status },
      after_state: { status: doc.status },
      description: `Booking status changed from ${previousDoc.status} to ${doc.status}`
    })
  } else if (operation === 'create') {
    const { AuditService } = await import('../../../services/AuditService')
    await AuditService.log(payload, {
      entity_collection: 'bookings',
      entity_id: String(doc.id),
      action: 'BOOKING_CREATED',
      actor: user ? String(user.id) : 'SYSTEM',
      after_state: { status: doc.status },
      description: `Booking created in ${doc.status} state`
    })
  }

  return doc
}
