import React from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';

export default function RequestsPage() {
  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          General Requests
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Submit and track general requests to the management team.</p>
      </div>
      
      <Card style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No active requests.</p>
      </Card>
    </StudentLayout>
  );
}
