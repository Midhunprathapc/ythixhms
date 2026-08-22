import { beforeAll, afterAll } from '@jest/globals'
import { getPayload } from 'payload'
import config from '@payload-config'

process.env.DATABASE_URI = 'postgres://postgres:postgres@127.0.0.1:5432/hms_test'
process.env.PAYLOAD_SECRET = 'hms-test-secret-123'

beforeAll(async () => {
  // Initialize payload
  const payload = await getPayload({ config })
  
  // Wipe all collections for a fresh test state
  const collections = Object.keys(payload.collections)
  for (const slug of collections) {
    if (slug === 'users') continue // Keep admin user if seeded? Actually, wiping is better.
    await payload.delete({ collection: slug as any, where: {} })
  }
})

afterAll(async () => {
  // Optionally close connections or cleanup
})
