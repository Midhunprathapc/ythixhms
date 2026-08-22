import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELLED'],
      defaultValue: 'TODO',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['CLEANING', 'MAINTENANCE_ROUTINE', 'INSPECTION', 'ADMINISTRATIVE', 'OTHER'],
      required: true,
    },
    {
      name: 'due_date',
      type: 'date',
    },
    {
      name: 'assigned_to',
      type: 'relationship',
      relationTo: 'staff-profiles',
    },
    {
      name: 'shift',
      type: 'relationship',
      relationTo: 'shifts',
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
    }
  ],
}
