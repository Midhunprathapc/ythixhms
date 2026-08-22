import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const EventRSVPs: CollectionConfig = {
  slug: 'event-rsvps',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['ATTENDING', 'MAYBE', 'DECLINED'],
      defaultValue: 'ATTENDING',
      required: true,
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    }
  ],
}
