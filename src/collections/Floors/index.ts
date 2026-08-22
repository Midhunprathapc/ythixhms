import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Floors: CollectionConfig = {
  slug: 'floors',
  admin: {
    useAsTitle: 'name_or_number',
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'building',
      type: 'relationship',
      relationTo: 'buildings',
      required: true,
    },
    {
      name: 'name_or_number',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'gender_policy',
      type: 'select',
      options: ['MIXED', 'MALE_ONLY', 'FEMALE_ONLY'],
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' }
      ]
    },
    {
      name: 'status',
      type: 'select',
      options: ['ACTIVE', 'MAINTENANCE', 'CLOSED'],
      defaultValue: 'ACTIVE',
    }
  ]
}
