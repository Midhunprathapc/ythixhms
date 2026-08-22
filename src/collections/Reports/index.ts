import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Reports: CollectionConfig = {
  slug: 'reports',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isStaff,
    create: isStaff, // Staff can request report generation
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., "Q3 Financial Summary" or "Monthly Occupancy - Aug 2026"'
      }
    },
    {
      name: 'type',
      type: 'select',
      options: ['OCCUPANCY', 'FINANCIAL', 'MAINTENANCE_SUMMARY', 'INCIDENT_LOG', 'STAFF_PERFORMANCE', 'CUSTOM'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
      defaultValue: 'PENDING',
      required: true,
    },
    {
      name: 'generated_by',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      admin: {
        description: 'Optional: Filter report to a specific property.'
      }
    },
    {
      name: 'parameters',
      type: 'json',
      admin: {
        description: 'JSON object storing the exact filters/dates used to generate this report.'
      }
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'documents', // Leverage existing Documents collection for secure storage
      admin: {
        condition: (data) => data.status === 'COMPLETED',
      }
    },
    {
      name: 'error_message',
      type: 'text',
      admin: {
        condition: (data) => data.status === 'FAILED',
      }
    }
  ],
}
