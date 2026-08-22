import type { CollectionConfig } from 'payload'
import { preventUpdate, preventDelete } from './hooks/immutableLog'
import { isStaff } from '../../access'

export const IntegrationLogs: CollectionConfig = {
  slug: 'integration-logs',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaff, // Only staff/admins should see external sync logs
    create: () => true, // Hook/system driven creation
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
      name: 'provider',
      type: 'select',
      options: ['STRIPE', 'RAZORPAY', 'SALTO_KS', 'XERO', 'OTHER'],
      required: true,
    },
    {
      name: 'endpoint',
      type: 'text',
      required: true,
      admin: {
        description: 'The URL or specific API endpoint that was called.'
      }
    },
    {
      name: 'direction',
      type: 'select',
      options: ['INBOUND', 'OUTBOUND'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['SUCCESS', 'FAILURE', 'PENDING_RETRY'],
      required: true,
    },
    {
      name: 'request_payload',
      type: 'json',
      admin: {
        description: 'The payload sent to the external service (ensure sensitive data is masked before logging).'
      }
    },
    {
      name: 'response_payload',
      type: 'json',
      admin: {
        description: 'The exact response received from the external service.'
      }
    },
    {
      name: 'related_entity_type',
      type: 'select',
      options: ['PAYMENT', 'INVOICE', 'ACCESS_LOG', 'PERSON', 'PROPERTY'],
    },
    {
      name: 'related_entity_id',
      type: 'text',
      admin: {
        description: 'The ID of the local document this integration event relates to.'
      }
    }
  ],
}
