import type { CollectionBeforeChangeHook, CollectionBeforeDeleteHook } from 'payload'
import { APIError } from 'payload'

export const preventUpdate: CollectionBeforeChangeHook = async ({ operation, data }) => {
  if (operation === 'update') {
    throw new APIError('INVARIANT_VIOLATION: System Audit Logs are immutable and cannot be modified.', 403)
  }
  return data
}

export const preventDelete: CollectionBeforeDeleteHook = async () => {
  throw new APIError('INVARIANT_VIOLATION: System Audit Logs cannot be deleted.', 403)
}
