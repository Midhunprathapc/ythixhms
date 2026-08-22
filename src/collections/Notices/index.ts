import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Everyone needs to see notices
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
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['ANNOUNCEMENT', 'RULE_UPDATE', 'MAINTENANCE_ALERT', 'EVENT'],
      defaultValue: 'ANNOUNCEMENT',
      required: true,
    },
    {
      name: 'target_audience',
      type: 'select',
      options: ['ALL_PROPERTIES', 'SPECIFIC_PROPERTY', 'SPECIFIC_BUILDING'],
      defaultValue: 'ALL_PROPERTIES',
      required: true,
    },
    {
      name: 'target_properties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
      admin: {
        condition: (data) => data.target_audience === 'SPECIFIC_PROPERTY' || data.target_audience === 'SPECIFIC_BUILDING',
      }
    },
    {
      name: 'target_buildings',
      type: 'relationship',
      relationTo: 'buildings',
      hasMany: true,
      admin: {
        condition: (data) => data.target_audience === 'SPECIFIC_BUILDING',
      }
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'published_at',
      type: 'date',
      required: true,
    },
    {
      name: 'expiry_date',
      type: 'date',
    }
  ],
}
