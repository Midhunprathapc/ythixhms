import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const NotificationLogs: CollectionConfig = {
  slug: 'notification-logs',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff, // Expand to self later
    create: isStaff, // Will also be created by system hooks
    update: () => false, // Immutable audit log
    delete: () => false, // Immutable audit log
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: ['PAYMENT_REMINDER', 'BOOKING_CONFIRMATION', 'MAINTENANCE_UPDATE', 'GENERAL_ALERT', 'CONTRACT_SIGNATURE_REQUEST'],
      required: true,
    },
    {
      name: 'channel',
      type: 'select',
      options: ['EMAIL', 'SMS', 'IN_APP', 'PUSH'],
      required: true,
    },
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        condition: (data) => data.channel === 'EMAIL',
      }
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['PENDING', 'SENT', 'FAILED', 'DELIVERED', 'READ'],
      defaultValue: 'PENDING',
      required: true,
    },
    {
      name: 'sent_at',
      type: 'date',
    },
    {
      name: 'error_message',
      type: 'text',
      admin: {
        condition: (data) => data.status === 'FAILED',
      }
    },
    {
      name: 'related_entity_type',
      type: 'select',
      options: ['BOOKING', 'TENANCY', 'INVOICE', 'MAINTENANCE_REQUEST', 'CONTRACT'],
    },
    {
      name: 'related_booking',
      type: 'relationship',
      relationTo: 'bookings',
      admin: { condition: (data) => data.related_entity_type === 'BOOKING' }
    },
    {
      name: 'related_tenancy',
      type: 'relationship',
      relationTo: 'tenancies',
      admin: { condition: (data) => data.related_entity_type === 'TENANCY' }
    },
    {
      name: 'related_invoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: { condition: (data) => data.related_entity_type === 'INVOICE' }
    },
    {
      name: 'related_maintenance_request',
      type: 'relationship',
      relationTo: 'maintenance-requests',
      admin: { condition: (data) => data.related_entity_type === 'MAINTENANCE_REQUEST' }
    },
    {
      name: 'related_contract',
      type: 'relationship',
      relationTo: 'contracts',
      admin: { condition: (data) => data.related_entity_type === 'CONTRACT' }
    },
  ],
}
