import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'
import { preventUpdate, preventDelete } from './hooks/immutableLog'

export const AccessLogs: CollectionConfig = {
  slug: 'access-logs',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: () => false,
    delete: () => false,
  },
  hooks: {
    beforeChange: [preventUpdate],
    beforeDelete: [preventDelete],
  },
  fields: [
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'entry_point',
      type: 'text',
      required: true,
      admin: {
        description: 'Identifier for the door, gate, or scanner.'
      }
    },
    {
      name: 'access_type',
      type: 'select',
      options: ['ENTRY', 'EXIT', 'DENIED'],
      required: true,
    },
    {
      name: 'entity_type',
      type: 'select',
      options: ['PERSON', 'STAFF_PROFILE', 'VISITOR'],
      required: true,
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      admin: { condition: (data) => data.entity_type === 'PERSON' }
    },
    {
      name: 'staff_profile',
      type: 'relationship',
      relationTo: 'staff-profiles',
      admin: { condition: (data) => data.entity_type === 'STAFF_PROFILE' }
    },
    {
      name: 'visitor',
      type: 'relationship',
      relationTo: 'visitors',
      admin: { condition: (data) => data.entity_type === 'VISITOR' }
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
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
    }
  ],
}
