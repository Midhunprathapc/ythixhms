import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

export const immutableOnceSigned: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation === 'update' && originalDoc) {
    const immutableStates = ['SIGNED', 'ACTIVE', 'EXPIRED', 'TERMINATED']
    if (immutableStates.includes(originalDoc.status)) {
      // Allow only specific forward state transitions (e.g. SIGNED -> ACTIVE)
      const allowedTransitions: Record<string, string[]> = {
        'SIGNED': ['ACTIVE', 'EXPIRED', 'TERMINATED'],
        'ACTIVE': ['EXPIRED', 'TERMINATED'],
        'EXPIRED': [],
        'TERMINATED': [],
      }

      const isStatusChangeOnly = Object.keys(data).every(key => key === 'status' || data[key] === originalDoc[key] || data[key] === undefined)
      
      if (data.status !== originalDoc.status && allowedTransitions[originalDoc.status]?.includes(data.status)) {
        if (!isStatusChangeOnly) {
          throw new APIError('INVARIANT_VIOLATION: Cannot modify contract fields once signed. Only status progression is allowed.', 403)
        }
        return data
      }
      
      throw new APIError(`INVARIANT_VIOLATION: Contract is immutable in state ${originalDoc.status}.`, 403)
    }
  }
  return data
}
