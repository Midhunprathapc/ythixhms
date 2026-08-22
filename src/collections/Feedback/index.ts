import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff, // Staff can read feedback, possibly restrict to admins/managers only
    create: () => true, // Anyone can submit feedback, but they need to be authenticated if not anonymous. In an API-first approach, public access with strict input validation is possible.
    update: isStaff, // Maybe only admins can update/archive
    delete: isStaff, // Immutable? Usually feedback shouldn't be deleted easily
  },
  fields: [
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comments',
      type: 'textarea',
    },
    {
      name: 'is_anonymous',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: (data) => !data.is_anonymous,
      }
    },
    {
      name: 'target_type',
      type: 'select',
      options: ['PROPERTY', 'STAFF_MEMBER', 'MAINTENANCE_RESOLUTION'],
      required: true,
    },
    {
      name: 'target_property',
      type: 'relationship',
      relationTo: 'properties',
      admin: {
        condition: (data) => data.target_type === 'PROPERTY',
      }
    },
    {
      name: 'target_staff',
      type: 'relationship',
      relationTo: 'staff-profiles',
      admin: {
        condition: (data) => data.target_type === 'STAFF_MEMBER',
      }
    },
    {
      name: 'target_maintenance',
      type: 'relationship',
      relationTo: 'maintenance-requests',
      admin: {
        condition: (data) => data.target_type === 'MAINTENANCE_RESOLUTION',
      }
    },
    {
      name: 'status',
      type: 'select',
      options: ['NEW', 'REVIEWED', 'ACTIONED', 'ARCHIVED'],
      defaultValue: 'NEW',
    },
    {
      name: 'resolution_notes',
      type: 'textarea',
      admin: {
        condition: (data) => data.status === 'REVIEWED' || data.status === 'ACTIONED',
      }
    }
  ],
}
