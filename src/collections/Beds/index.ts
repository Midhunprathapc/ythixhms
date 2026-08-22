import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Beds: CollectionConfig = {
  slug: 'beds',
  admin: {
    useAsTitle: 'bed_identifier',
  },
  access: {
    read: () => true, 
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
      required: true,
    },
    {
      name: 'bed_identifier',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: ROOM_NUMBER + BED_SUFFIX (e.g. 201-A)'
      }
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'operational_status',
      type: 'select',
      options: ['AVAILABLE', 'MAINTENANCE', 'BLOCKED', 'OUT_OF_SERVICE'],
      defaultValue: 'AVAILABLE',
      required: true,
    },
    {
      name: 'occupancy_status',
      type: 'select',
      options: ['VACANT', 'RESERVED', 'OCCUPIED'],
      defaultValue: 'VACANT',
      required: true,
    },
    {
      name: 'gender_rule',
      type: 'select',
      options: ['ANY', 'MALE_ONLY', 'FEMALE_ONLY'],
      defaultValue: 'ANY',
    },
    {
      name: 'maintenance_state',
      type: 'select',
      options: ['GOOD', 'NEEDS_REPAIR', 'IN_REPAIR'],
      defaultValue: 'GOOD',
    }
  ]
}
