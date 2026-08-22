import type { CollectionConfig } from 'payload'
import { isStaffOfProperty, isAdminOrSelf } from '../../access'
import { checkOverlappingBookings } from './hooks/checkOverlappingBookings'
import { checkStayDuration } from './hooks/checkStayDuration'
import { validateStateMachine } from './hooks/validateStateMachine'
import { generateTenancyOnApproval } from './hooks/generateTenancyOnApproval'
import { auditBookingTransitions } from './hooks/auditBookingTransitions'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isStaffOfProperty,
    create: isStaffOfProperty,
    update: isStaffOfProperty,
    delete: isStaffOfProperty,
  },
  hooks: {
    beforeChange: [
      validateStateMachine,
      checkStayDuration,
      checkOverlappingBookings
    ],
    afterChange: [
      generateTenancyOnApproval,
      auditBookingTransitions
    ]
  },
  fields: [
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      required: true,
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
      name: 'floor',
      type: 'relationship',
      relationTo: 'floors',
    },
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
    },
    {
      name: 'bed',
      type: 'relationship',
      relationTo: 'beds',
      required: true,
    },
    {
      name: 'start_date',
      type: 'date',
      required: true,
    },
    {
      name: 'end_date',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['DRAFT', 'PENDING_PAYMENT_VERIFICATION', 'PENDING_ADMIN_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED', 'EXPIRED', 'COMPLETED'],
      defaultValue: 'DRAFT',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'deposit',
      type: 'number',
    },
    {
      name: 'payment_frequency',
      type: 'select',
      options: ['WEEKLY', 'MONTHLY', 'TERMLY', 'YEARLY', 'UPFRONT'],
    },
    {
      name: 'discount',
      type: 'number',
    },
    {
      name: 'notes',
      type: 'textarea',
    }
  ],
}
