import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isStaff } from '../../access'

export const Students: CollectionConfig = {
  slug: 'students',
  admin: {
    useAsTitle: 'phone',
  },
  auth: {
    // Phone/WhatsApp OTP will be built on top of this, disabling password for now or using dummy pass
    disableLocalStrategy: true, 
  },
  access: {
    read: isAdminOrSelf,
    create: isStaff,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: () => false, // Students don't access the CMS Admin panel
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'whatsapp_number',
      type: 'text',
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people', // To be created in Phase 04
      hasMany: false,
    },
  ],
}
