import type { CollectionConfig } from 'payload'
import { isStaff } from '../../access'

export const StaffProfiles: CollectionConfig = {
  slug: 'staff-profiles',
  admin: {
    useAsTitle: 'employee_id',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
    },
    {
      name: 'employee_id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'job_title',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      type: 'text',
    },
    {
      name: 'hire_date',
      type: 'date',
    },
    {
      name: 'properties_assigned',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
    }
  ],
}
