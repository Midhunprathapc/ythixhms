import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Receipts: CollectionConfig = {
  slug: 'receipts',
  admin: {
    useAsTitle: 'receipt_number',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: () => false, // Immutable once created
    delete: () => false,
  },
  fields: [
    {
      name: 'receipt_number',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'payment',
      type: 'relationship',
      relationTo: 'payments',
      required: true,
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'date_issued',
      type: 'date',
      required: true,
    }
  ]
}
