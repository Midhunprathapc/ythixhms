import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function GlobalLoading() {
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Skeleton Hero Area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
            <Skeleton height="3rem" width="60%" style={{ marginBottom: '1.5rem' }} />
            <Skeleton height="1.5rem" width="40%" />
          </div>

          {/* Skeleton Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                <Skeleton height="200px" width="100%" borderRadius="0" />
                <div style={{ padding: '1.5rem' }}>
                  <Skeleton height="1.5rem" width="80%" style={{ marginBottom: '1rem' }} />
                  <Skeleton height="1rem" width="100%" style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height="1rem" width="60%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
