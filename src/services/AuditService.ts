import { Payload } from 'payload'

export class AuditService {
  /**
   * Automatically generate an append-only audit event.
   */
  static async log(
    payload: Payload,
    args: {
      entity_collection: string
      entity_id: string
      action: string
      actor?: string
      before_state?: any
      after_state?: any
      description?: string
    }
  ) {
    try {
      await payload.create({
        collection: 'system_audit_logs',
        data: {
          entity_collection: args.entity_collection,
          entity_id: args.entity_id,
          action: args.action,
          actor: args.actor || 'SYSTEM',
          before_state: args.before_state,
          after_state: args.after_state,
          description: args.description,
        }
      })
    } catch (err) {
      payload.logger.error(`Failed to generate automatic audit log: ${err}`)
    }
  }
}
