import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Your privacy is critically important to us.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          We only collect information necessary to process your booking, manage your tenancy, and ensure the safety of our residents.
        </p>
      </div>
    </PublicLayout>
  );
}
