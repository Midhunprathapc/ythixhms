import type { CollectionConfig, FieldAccess } from 'payload'
import { isStaff, isAdminOrSelf } from '../../access'

const canReadSensitive: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) return false
  if (user.roles?.includes('admin') || user.roles?.includes('manager')) return true
  return false 
}

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'full_name',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'full_name', type: 'text', required: true },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'passport_number',
      type: 'text',
      unique: true,
      access: { read: canReadSensitive },
    },
    { name: 'passport_expiry', type: 'date' },
    { name: 'nationality', type: 'text' },
    { name: 'date_of_birth', type: 'date' },
    {
      name: 'gender',
      type: 'select',
      options: ['MALE', 'FEMALE', 'OTHER'],
    },
    { name: 'phone', type: 'text' },
    { name: 'whatsapp_number', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'emergency_contact',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'relation', type: 'text' },
      ],
      access: { read: canReadSensitive },
    },
    {
      name: 'parent_guardian',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
    { name: 'address', type: 'textarea' },
    { name: 'university', type: 'text' },
    { name: 'course', type: 'text' },
    { name: 'student_id', type: 'text' },
    { name: 'visa_residence_information', type: 'textarea', access: { read: canReadSensitive } },
    { name: 'preferred_language', type: 'text', defaultValue: 'ENGLISH' },
    { name: 'notes', type: 'textarea' },
    {
      name: 'lifecycle_state',
      type: 'select',
      options: ['APPLICANT', 'STUDENT', 'TENANT', 'FORMER_TENANT'],
      defaultValue: 'APPLICANT',
    }
  ],
}
