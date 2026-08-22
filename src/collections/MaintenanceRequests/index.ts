import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const MaintenanceRequests: CollectionConfig = {
  slug: 'maintenance-requests',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: isStaff, // Tenants can see their own in a future access policy update
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
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['REPORTED', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED'],
      defaultValue: 'REPORTED',
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      options: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      defaultValue: 'LOW',
      required: true,
    },
    {
      name: 'reported_by',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'assigned_to',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
    },
    {
      name: 'building',
      type: 'relationship',
      relationTo: 'buildings',
    },
    {
      name: 'floor',
      type: 'relationship',
      relationTo: 'floors',
    },
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
    },
    {
      name: 'bed',
      type: 'relationship',
      relationTo: 'beds',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'resolution_notes',
      type: 'textarea',
    },
    {
      name: 'resolved_at',
      type: 'date',
    }
  ],
}
