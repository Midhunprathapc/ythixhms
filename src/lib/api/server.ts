import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

/**
 * Server-side API utility for fetching data locally using Payload CMS Local API.
 * This should ONLY be used in Next.js Server Components.
 */

export const getServerPayload = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  return payload;
};

// You can add helper functions here for common queries
// e.g.
// export const getHostels = async () => {
//   const payload = await getServerPayload();
//   return payload.find({ collection: 'properties' });
// };
