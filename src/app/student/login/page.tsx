import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OTPLoginForm } from '@/components/auth/OTPLoginForm';

export default function StudentLoginPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left side - Login Form */}
      <div style={{ 
        flex: '1 1 50%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '3rem',
        position: 'relative'
      }}>
        {/* Minimal Header */}
        <div style={{ position: 'absolute', top: '2rem', left: '3rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
            HMS
          </Link>
        </div>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <OTPLoginForm />
        </div>
      </div>

      {/* Right side - Cinematic Image (Hidden on mobile) */}
      <div style={{ 
        flex: '1 1 50%', 
        position: 'relative', 
        display: 'none', 
      }}>
        {/* We'll use a wrapper div with a CSS class via a style tag for the media query hack here since it's a small standalone page */}
        <style dangerouslySetInnerHTML={{__html: `
          .hero-image-wrapper {
            display: none;
            flex: 1 1 50%;
            position: relative;
          }
          @media (min-width: 768px) {
            .hero-image-wrapper {
              display: block;
            }
          }
        `}} />
      </div>
      
      <div className="hero-image-wrapper">
        <Image 
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Student Accommodation"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 50%)'
        }} />
      </div>
    </div>
  );
}
