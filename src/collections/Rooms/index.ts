import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'room_number',
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'floor',
      type: 'relationship',
      relationTo: 'floors',
      required: true,
    },
    {
      name: 'room_number',
      type: 'text',
      required: true,
    },
    {
      name: 'room_type',
      type: 'select',
      options: ['SINGLE', 'DOUBLE', 'TRIPLE', '4_BED', '6_BED', '8_BED', 'CUSTOM'],
      required: true,
    },
    {
      name: 'bed_count',
      type: 'number',
      required: true,
    },
    {
      name: 'gender_restriction',
      type: 'select',
      options: ['MIXED', 'MALE_ONLY', 'FEMALE_ONLY'],
    },
    {
      name: 'status',
      type: 'select',
      options: ['ACTIVE', 'MAINTENANCE', 'CLOSED'],
      defaultValue: 'ACTIVE',
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' }
      ]
    },
    {
      name: 'description',
      type: 'textarea',
    }
  ]
}
