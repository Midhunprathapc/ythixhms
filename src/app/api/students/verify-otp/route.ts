import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();
    if (!phone || !code) return NextResponse.json({ error: 'Phone and code are required' }, { status: 400 });

    if (code !== '123456') {
      return NextResponse.json({ error: 'Invalid OTP code' }, { status: 400 });
    }

    // Generate a secure JWT or session token. For HMS demo, we just issue a dummy token.
    const token = Buffer.from(JSON.stringify({ phone, role: 'student' })).toString('base64');
    
    const response = NextResponse.json({ 
      success: true, 
      token, // Return token for client to store
      message: 'Verified successfully' 
    });
    
    // Optional: Set HttpOnly cookie for SSR support
    response.cookies.set('hms-student-token', token, {
      path: '/',
      httpOnly: false, // Let client access it so it works with the existing flow
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
