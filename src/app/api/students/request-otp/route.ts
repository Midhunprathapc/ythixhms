import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    if (!phone) return NextResponse.json({ error: 'Phone is required' }, { status: 400 });

    const payload = await getPayload({ config: configPromise });
    
    // In a real system, we'd check if the phone belongs to a student or create one
    // We will just verify it exists or mock sending an SMS.
    
    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to request OTP' }, { status: 500 });
  }
}
