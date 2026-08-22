import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { StudentLayout } from '@/components/layouts/StudentLayout';

export default function StudentLoading() {
  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <Skeleton height="2.5rem" width="300px" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height="1rem" width="400px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <Skeleton height="1rem" width="100px" style={{ marginBottom: '1.5rem' }} />
            <Skeleton height="2.5rem" width="150px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height="0.875rem" width="120px" />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <Skeleton height="1.5rem" width="200px" style={{ marginBottom: '1rem' }} />
          <Skeleton height="200px" width="100%" />
        </div>
        <div>
          <Skeleton height="1.5rem" width="150px" style={{ marginBottom: '1rem' }} />
          <Skeleton height="150px" width="100%" />
        </div>
      </div>
    </StudentLayout>
  );
}
