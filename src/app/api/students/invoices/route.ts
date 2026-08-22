import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise });

    // In a real implementation we would identify the student from auth token.
    // Here we just fetch the most recent invoices as a fallback.
    const invoices = await payload.find({
      collection: 'invoices',
      limit: 10,
      sort: '-due_date',
    });

    // If no real invoices exist yet, return a safe structure to prevent crashes,
    // or return the real invoices mapping to frontend expectations.
    
    return NextResponse.json({ docs: invoices.docs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
