import type { CollectionAfterChangeHook } from 'payload'

export const generateTenancyOnApproval: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req: { payload },
  operation,
}) => {
  if (operation === 'update' && doc.status === 'APPROVED' && previousDoc.status !== 'APPROVED') {
    try {
      // Check if a tenancy already exists for this booking to be safe
      const existingTenancies = await payload.find({
        collection: 'tenancies',
        where: {
          person: { equals: typeof doc.person === 'object' ? doc.person.id : doc.person },
          property: { equals: typeof doc.property === 'object' ? doc.property.id : doc.property },
          bed: { equals: typeof doc.bed === 'object' ? doc.bed.id : doc.bed },
          start_date: { equals: doc.start_date },
          end_date: { equals: doc.end_date },
        }
      })

      if (existingTenancies.totalDocs === 0) {
        // Generate the physical tenancy
        await payload.create({
          collection: 'tenancies',
          data: {
            person: typeof doc.person === 'object' ? doc.person.id : doc.person,
            property: typeof doc.property === 'object' ? doc.property.id : doc.property,
            bed: typeof doc.bed === 'object' ? doc.bed.id : doc.bed,
            start_date: doc.start_date,
            end_date: doc.end_date,
            payment_frequency: doc.payment_frequency || 'MONTHLY', // Default to monthly if missing
            status: 'UPCOMING',
          }
        })
      }
    } catch (err) {
      payload.logger.error(`Failed to generate tenancy for booking ${doc.id}: ${err}`)
    }
  }

  return doc
}
