import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { BookingWizard } from '@/components/booking/BookingWizard';

export default function BookingPage() {
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Book Your Residence
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
            Complete the steps below to secure your premium accommodation.
          </p>
        </div>
        
        <BookingWizard />
      </div>
    </PublicLayout>
  );
}
