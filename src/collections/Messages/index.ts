import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'subject',
  },
  access: {
    read: isStaff, // Expand to self later
    create: isStaff, // Expand to self later
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sender',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'status',
      type: 'select',
      options: ['UNREAD', 'READ', 'ARCHIVED'],
      defaultValue: 'UNREAD',
    },
    {
      name: 'thread_id',
      type: 'text',
      admin: {
        description: 'Identifier to group related messages into a thread',
      }
    }
  ],
}
