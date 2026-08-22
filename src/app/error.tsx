'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import { AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real application, log the error to an error reporting service like Sentry
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <AlertOctagon size={64} color="var(--color-status-danger)" style={{ marginBottom: '2rem' }} />
      
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2.5rem',
        color: 'var(--text-primary)',
        marginBottom: '1rem'
      }}>
        Something went wrong!
      </h1>
      
      <p style={{
        maxWidth: '500px',
        color: 'var(--text-secondary)',
        marginBottom: '2.5rem',
        lineHeight: 1.6
      }}>
        We apologize for the inconvenience. An unexpected error has occurred. Our technical team has been notified.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
        <Button onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </div>
    </div>
  );
}
