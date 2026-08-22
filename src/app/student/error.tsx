'use client';

import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';

export default function StudentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Student Portal Error:', error);
  }, [error]);

  return (
    <StudentLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Card style={{ maxWidth: '500px', width: '100%', padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid var(--color-status-danger)' }}>
          <AlertCircle size={48} color="var(--color-status-danger)" style={{ margin: '0 auto 1.5rem' }} />
          
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Unable to load dashboard
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            We encountered an error while trying to fetch your portal data. Please try refreshing the page.
          </p>
          
          <Button onClick={() => reset()} fullWidth>
            Try Again
          </Button>
        </Card>
      </div>
    </StudentLayout>
  );
}
