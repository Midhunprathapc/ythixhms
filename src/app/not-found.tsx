import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
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
      <Compass size={64} color="var(--color-secondary-gold)" style={{ marginBottom: '2rem' }} />
      
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '4rem',
        color: 'var(--text-primary)',
        marginBottom: '1rem',
        lineHeight: 1
      }}>
        404
      </h1>
      
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        marginBottom: '2rem'
      }}>
        Lost your way?
      </h2>
      
      <p style={{
        maxWidth: '500px',
        color: 'var(--text-secondary)',
        marginBottom: '3rem',
        lineHeight: 1.6
      }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/">
          <Button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={18} />
            Back to Home
          </Button>
        </Link>
        <Link href="/student">
          <Button variant="outline">
            Go to Student Portal
          </Button>
        </Link>
      </div>
    </div>
  );
}
