import { Payload, APIError } from 'payload'

export class PaymentService {
  /**
   * Process a payment idempotently.
   * If a transaction_reference already exists, it returns the existing payment to prevent double counting.
   */
  static async processPayment(payload: Payload, data: any) {
    if (!data.transaction_reference) {
      throw new APIError('transaction_reference is strictly required for idempotent payment processing.', 400)
    }

    // Check if the payment was already processed
    const existing = await payload.find({
      collection: 'payments',
      where: {
        transaction_reference: { equals: data.transaction_reference }
      }
    })

    if (existing.totalDocs > 0) {
      payload.logger.warn(`Idempotent return: Payment with reference ${data.transaction_reference} already processed.`)
      return existing.docs[0]
    }

    try {
      // Create the payment
      const payment = await payload.create({
        collection: 'payments',
        data
      })
      return payment
    } catch (err: any) {
      // Fallback for race condition: if it was inserted precisely between the find and create
      if (err.message?.includes('duplicate key value') || err.message?.includes('unique constraint')) {
        const raceExisting = await payload.find({
          collection: 'payments',
          where: {
            transaction_reference: { equals: data.transaction_reference }
          }
        })
        if (raceExisting.totalDocs > 0) {
          payload.logger.warn(`Idempotent race condition resolved for reference ${data.transaction_reference}.`)
          return raceExisting.docs[0]
        }
      }
      throw err
    }
  }
}
