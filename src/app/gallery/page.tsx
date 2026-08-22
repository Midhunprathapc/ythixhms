import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function GalleryPage() {
  return (
    <PublicLayout>
      <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem' }}>Residence Gallery</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>Take a look inside our premium accommodations.</p>
        
        <div style={{ padding: '4rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Gallery integration pending real media from backend.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
