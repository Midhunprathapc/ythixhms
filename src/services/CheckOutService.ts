import { Payload, APIError } from 'payload'

export class CheckOutService {
  /**
   * Executes a formal checkout domain operation.
   * Updates Tenancy to COMPLETED and Bed occupancy_status to VACANT transactionally.
   */
  static async execute(payload: Payload, tenancyId: string | number) {
    const tenancy = await payload.findByID({
      collection: 'tenancies',
      id: tenancyId,
    })

    if (!tenancy) {
      throw new APIError('Tenancy not found', 404)
    }

    if (tenancy.status !== 'ACTIVE') {
      throw new APIError(`INVARIANT_VIOLATION: Can only check-out an ACTIVE tenancy. Current status is ${tenancy.status}.`, 400)
    }

    const bedId = typeof tenancy.bed === 'object' ? tenancy.bed.id : tenancy.bed

    if (!bedId) {
      throw new APIError('Tenancy has no assigned bed', 400)
    }

    // Update tenancy to COMPLETED
    await payload.update({
      collection: 'tenancies',
      id: tenancyId,
      data: {
        status: 'COMPLETED'
      }
    })

    // Update bed to VACANT
    await payload.update({
      collection: 'beds',
      id: bedId,
      data: {
        occupancy_status: 'VACANT'
      }
    })

    return await payload.findByID({
      collection: 'tenancies',
      id: tenancyId,
    })
  }
}
