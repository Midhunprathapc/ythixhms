import { Payload, APIError } from 'payload'

export class BookingService {
  /**
   * Validates that the bed is physically available (not in maintenance, blocked, or out of service).
   */
  static async validateBedStatus(payload: Payload, bedId: string | number) {
    const bed = await payload.findByID({
      collection: 'beds',
      id: bedId,
    })

    if (!bed) {
      throw new APIError('Bed not found', 404)
    }

    if (bed.operational_status !== 'AVAILABLE') {
      throw new APIError(`INVARIANT_VIOLATION: Cannot book a bed in ${bed.operational_status} state. Bed must be AVAILABLE.`, 400)
    }
    
    // We do NOT block based on occupancy_status here, because a bed can be OCCUPIED right now,
    // but the booking might be for next year. Temporal overlap is handled by checkOverlappingBookings.
  }
}
