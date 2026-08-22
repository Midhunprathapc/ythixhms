import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/Button';

export default function AvailabilityPage() {
  return (
    <PublicLayout>
      <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '2rem' }}>Check Availability</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Our live availability engine helps you find the perfect room for your desired dates.
        </p>
        
        <Link href="/booking">
          <Button size="lg">Start Booking Wizard</Button>
        </Link>
      </div>
    </PublicLayout>
  );
}
