import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Assets: CollectionConfig = {
  slug: 'assets',
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
      name: 'type',
      type: 'select',
      options: ['APPLIANCE', 'FURNITURE', 'IT_EQUIPMENT', 'VEHICLE', 'OTHER'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['IN_USE', 'IN_STORAGE', 'MAINTENANCE', 'RETIRED'],
      defaultValue: 'IN_USE',
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
        description: 'Optional: Pinpoint the exact room the asset is located in.'
      }
    },
    {
      name: 'serial_number',
      type: 'text',
    },
    {
      name: 'purchase_date',
      type: 'date',
    },
    {
      name: 'warranty_expiry',
      type: 'date',
    },
    {
      name: 'value',
      type: 'number',
      admin: {
        description: 'Purchase value or current depreciated value.'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
    }
  ],
}
