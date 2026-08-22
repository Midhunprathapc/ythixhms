import type { CollectionConfig } from 'payload'
import { isStaffOfProperty } from '../../access'

export const Tenancies: CollectionConfig = {
  slug: 'tenancies',
  admin: {
    useAsTitle: 'id', // Tenancies might not have a great title, we can just use ID or customize it
  },
  access: {
    read: isStaffOfProperty,
    create: isStaffOfProperty,
    update: isStaffOfProperty,
    delete: isStaffOfProperty,
  },
  endpoints: [
    {
      path: '/:id/check-in',
      method: 'post',
      handler: async (req) => {
        const { CheckInService } = await import('../../services/CheckInService')
        try {
          const result = await CheckInService.execute(req.payload, req.routeParams?.id as string)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: err.status || 400 })
        }
      }
    },
    {
      path: '/:id/check-out',
      method: 'post',
      handler: async (req) => {
        const { CheckOutService } = await import('../../services/CheckOutService')
        try {
          const result = await CheckOutService.execute(req.payload, req.routeParams?.id as string)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: err.status || 400 })
        }
      }
    },
    {
      path: '/:id/room-transfer',
      method: 'post',
      handler: async (req) => {
        const { RoomTransferService } = await import('../../services/RoomTransferService')
        try {
          const body = req.json ? await req.json() : {}
          const result = await RoomTransferService.execute(req.payload, {
            tenancyId: req.routeParams?.id as string,
            targetBedId: body.targetBedId,
            reason: body.reason
          })
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: err.status || 400 })
        }
      }
    }
  ],
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
      name: 'payment_frequency',
      type: 'select',
      options: ['WEEKLY', 'MONTHLY', 'TERMLY', 'YEARLY', 'UPFRONT'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['UPCOMING', 'ACTIVE', 'COMPLETED', 'TERMINATED', 'CANCELLED'],
      defaultValue: 'UPCOMING',
      required: true,
    },
    // We will add relations to booking and contract later in their phases
  ]
}
