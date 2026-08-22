import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function FAQPage() {
  return (
    <PublicLayout>
      <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '2rem' }}>Frequently Asked Questions</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>How do I book a room?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>You can book a room directly through our website by navigating to the Accommodations page and selecting a property.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Are bills included in the rent?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Yes, all our standard contracts include enterprise Wi-Fi, electricity, and water in the monthly rent.</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
