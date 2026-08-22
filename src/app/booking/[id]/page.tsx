import React from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { bookingsApi } from '@/lib/api/bookings';

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let booking = null;
  try {
    booking = await bookingsApi.getBooking(id);
  } catch (error) {
    console.error('Failed to fetch booking confirmation:', error);
  }

  if (!booking) {
    return (
      <PublicLayout>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card shadow="lg" style={{ maxWidth: '600px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <AlertCircle size={64} color="var(--color-status-danger)" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Booking Not Found
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              We couldn't locate booking ID <strong>{id}</strong>.
            </p>
            <Link href="/" style={{ width: '100%' }}>
              <Button size="lg" fullWidth>Return to Home</Button>
            </Link>
          </Card>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card shadow="lg" style={{ maxWidth: '600px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <CheckCircle size={64} color="var(--color-status-success)" />
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Booking Requested!
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Thank you for choosing HMS. Your booking request has been received and is currently <strong style={{ color: 'var(--color-status-warning)' }}>{booking.doc?.status?.replace(/_/g, ' ') || 'PENDING'}</strong>.
          </p>

          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Booking ID
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)', letterSpacing: '2px' }}>
              {id}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/student" style={{ width: '100%' }}>
              <Button size="lg" fullWidth>Go to Student Portal</Button>
            </Link>
            <Link href="/" style={{ width: '100%' }}>
              <Button variant="ghost" size="lg" fullWidth>Return to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
}
