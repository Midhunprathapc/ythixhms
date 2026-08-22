import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'
import { preventUpdate, preventDelete } from './hooks/immutableLog'

export const SystemAuditLogs: CollectionConfig = {
  slug: 'system-audit-logs',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff, // Expand to more specific roles if needed
    create: () => true, // Hook driven creation
    update: () => false, // Immutable audit log
    delete: () => false, // Immutable audit log
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'The user who performed the action. If null, it might be a system process.'
      }
    },
    {
      name: 'action',
      type: 'select',
      options: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'OTHER'],
      required: true,
    },
    {
      name: 'collection_slug',
      type: 'text',
      required: true,
    },
    {
      name: 'document_id',
      type: 'text',
    },
    {
      name: 'changes',
      type: 'json',
      admin: {
        description: 'Diff or snapshot of what changed.'
      }
    },
    {
      name: 'ip_address',
      type: 'text',
    }
  ],
}
