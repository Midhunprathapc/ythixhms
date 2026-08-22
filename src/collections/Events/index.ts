import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Everyone can see events
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
      type: 'richText',
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
      name: 'location_details',
      type: 'text',
    },
    {
      name: 'capacity',
      type: 'number',
    },
    {
      name: 'organizer',
      type: 'relationship',
      relationTo: 'staff-profiles',
    }
  ],
}
