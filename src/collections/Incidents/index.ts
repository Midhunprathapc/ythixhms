import type { CollectionConfig } from 'payload'
import { isStaffOfProperty } from '../../access'

export const Incidents: CollectionConfig = {
  slug: 'incidents',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaffOfProperty,
    create: isStaffOfProperty,
    update: isStaffOfProperty,
    delete: isStaffOfProperty,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'type',
      type: 'select',
      options: ['RULE_VIOLATION', 'DAMAGE', 'BEHAVIORAL', 'EMERGENCY', 'OTHER'],
      required: true,
    },
    {
      name: 'severity',
      type: 'select',
      options: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['OPEN', 'INVESTIGATING', 'ACTION_TAKEN', 'RESOLVED', 'CLOSED'],
      defaultValue: 'OPEN',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
    },
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
      admin: {
        description: 'Optional: Specific room where the incident occurred.',
      }
    },
    {
      name: 'involved_persons',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      admin: {
        description: 'Residents or staff involved in the incident.',
      }
    },
    {
      name: 'reported_by',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'resolution_notes',
      type: 'textarea',
    },
    {
      name: 'disciplinary_action_taken',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
}
