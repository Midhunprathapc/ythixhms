import type { CollectionConfig } from 'payload'
import { isStaffOfProperty } from '../../access'
import { immutableOnceSigned } from './hooks/immutableOnceSigned'

export const Contracts: CollectionConfig = {
  slug: 'contracts',
  admin: {
    useAsTitle: 'contract_number',
  },
  access: {
    read: isStaffOfProperty,
    create: isStaffOfProperty,
    update: isStaffOfProperty,
    delete: () => false, // PRESERVE_LEGAL_HISTORY
  },
  endpoints: [
    {
      path: '/:id/renew',
      method: 'post',
      handler: async (req) => {
        const { ContractRenewalService } = await import('../../services/ContractRenewalService')
        try {
          const result = await ContractRenewalService.renew(req.payload, req.routeParams?.id as string)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: err.status || 400 })
        }
      }
    }
  ],
  hooks: {
    beforeChange: [
      immutableOnceSigned
    ]
  },
  fields: [
    {
      name: 'contract_number',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tenancy',
      type: 'relationship',
      relationTo: 'tenancies',
      required: true,
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['TENANCY_AGREEMENT', 'RULES_ACKNOWLEDGEMENT', 'INVENTORY_CHECKLIST'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['DRAFT', 'SENT', 'VIEWED', 'SIGNED', 'ACTIVE', 'EXPIRED', 'TERMINATED'],
      defaultValue: 'DRAFT',
      required: true,
    },
    {
      name: 'signature_date',
      type: 'date',
    },
    {
      name: 'version',
      type: 'number',
      defaultValue: 1,
      admin: { readOnly: true },
    },
    {
      name: 'previous_contract',
      type: 'relationship',
      relationTo: 'contracts',
      admin: { readOnly: true },
    },
    {
      name: 'date_issued',
      type: 'date',
    },
    {
      name: 'date_signed',
      type: 'date',
    },
    {
      name: 'document_file',
      type: 'upload',
      relationTo: 'documents',
    }
  ],
}
