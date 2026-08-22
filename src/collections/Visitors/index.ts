import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Visitors: CollectionConfig = {
  slug: 'visitors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'identification_number',
      type: 'text',
    },
    {
      name: 'host',
      type: 'relationship',
      relationTo: 'people',
      required: true,
      admin: {
        description: 'The resident hosting this visitor.'
      }
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
    },
    {
      name: 'purpose',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: ['EXPECTED', 'CHECKED_IN', 'CHECKED_OUT', 'DENIED'],
      defaultValue: 'EXPECTED',
      required: true,
    },
    {
      name: 'check_in',
      type: 'date',
    },
    {
      name: 'check_out',
      type: 'date',
    }
  ],
}
