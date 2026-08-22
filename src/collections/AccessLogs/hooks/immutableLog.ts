import type { CollectionBeforeChangeHook, CollectionBeforeDeleteHook } from 'payload'
import { APIError } from 'payload'

export const preventUpdate: CollectionBeforeChangeHook = async ({ operation, data }) => {
  if (operation === 'update') {
    throw new APIError('INVARIANT_VIOLATION: Access Logs are immutable and cannot be modified.', 403)
  }
  return data
}

export const preventDelete: CollectionBeforeDeleteHook = async () => {
  throw new APIError('INVARIANT_VIOLATION: Access Logs cannot be deleted.', 403)
}
