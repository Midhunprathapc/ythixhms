import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

export const checkStayDuration: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  originalDoc,
}) => {
  const startDate = data.start_date || originalDoc?.start_date
  const endDate = data.end_date || originalDoc?.end_date
  const propertyId = data.property || originalDoc?.property

  if (startDate && endDate && propertyId) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))

    if (days <= 0) {
      throw new APIError('End date must be after start date', 400)
    }

    try {
      const property = await payload.findByID({
        collection: 'properties',
        id: typeof propertyId === 'object' ? propertyId.id : propertyId,
      })

      const minStay = property.minimum_stay
      const maxStay = property.maximum_stay

      if (minStay && days < minStay) {
        throw new APIError(`Does not meet minimum stay of ${minStay} days`, 400)
      }

      if (maxStay && days > maxStay) {
        throw new APIError(`Exceeds maximum stay of ${maxStay} days`, 400)
      }
    } catch (err) {
      // If property fetch fails or property doesn't exist
      throw new APIError('Invalid property selected', 400)
    }
  }

  return data
}
