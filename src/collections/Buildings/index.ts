import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Buildings: CollectionConfig = {
  slug: 'buildings',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
