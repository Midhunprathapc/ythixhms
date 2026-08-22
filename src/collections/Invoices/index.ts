import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  admin: {
    useAsTitle: 'invoice_number',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: () => false, // Immutability
  },
  fields: [
    {
      name: 'invoice_number',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'amount_due',
      type: 'number',
      required: true,
    },
    {
      name: 'amount_paid',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true }
    },
    {
      name: 'amount_outstanding',
      type: 'number',
      admin: { readOnly: true }
    },
    {
      name: 'amount_overpaid',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true }
    },
    {
      name: 'due_date',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED'],
      defaultValue: 'DRAFT',
    },
    {
      name: 'line_items',
      type: 'array',
      fields: [
        { name: 'description', type: 'text' },
        { name: 'amount', type: 'number' },
      ]
    },
    {
      name: 'related_payments',
      type: 'relationship',
      relationTo: 'payments',
      hasMany: true,
    }
  ]
}
