import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'
import { checkOverlappingShifts } from './hooks/checkOverlappingShifts'

export const Shifts: CollectionConfig = {
  slug: 'shifts',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    beforeChange: [
      checkOverlappingShifts
    ]
  },
  fields: [
    {
      name: 'staff_profile',
      type: 'relationship',
      relationTo: 'staff-profiles',
      required: true,
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
    },
    {
      name: 'start_time',
      type: 'date',
      required: true,
    },
    {
      name: 'end_time',
      type: 'date',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      defaultValue: 'SCHEDULED',
    }
  ],
}
