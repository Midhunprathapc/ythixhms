import type { CollectionConfig, Access } from 'payload'
import { isStaff } from '../../access'

// This determines who can see the actual document file
const canReadSecureDocument: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true

  // If user is a student, they can only see documents linked to their own person ID
  if (user.roles?.includes('student') || user.roles?.length === 0) {
    if (user.person) {
      return {
        person: {
          equals: typeof user.person === 'object' ? user.person.id : user.person,
        },
      }
    }
    return false // Students without a linked person ID can see nothing
  }

  // If user is staff, check if they manage properties.
  // We don't have property on documents directly, but we do have person.
  // Ideally, staff can see docs for persons who have bookings/tenancies in their property.
  // Since Payload doesn't natively support querying that deeply without a complex custom query, 
  // for this iteration we assume admin role is required for global docs, 
  // OR we can allow staff to read all documents if they have access to the person.
  // For now, we will allow staff to read docs (as they are internal).
  const staffRoles = ['manager', 'reception', 'accountant', 'warden']
  if (user.roles?.some((role: string) => staffRoles.includes(role))) {
    return true // Expand to property-person relation in the future
  }

  return false
}

export const Documents: CollectionConfig = {
  slug: 'documents',
  upload: {
    staticDir: 'documents',
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  access: {
    read: canReadSecureDocument, 
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
    },
    {
      name: 'document_type',
      type: 'select',
      options: ['PASSPORT_COPY', 'VISA_COPY', 'STUDENT_ID_COPY', 'MEDICAL_CERTIFICATE', 'CONTRACT_PDF', 'OTHER'],
      required: true,
    },
    {
      name: 'expiry_date',
      type: 'date',
    },
    {
      name: 'notes',
      type: 'textarea',
    }
  ],
}
