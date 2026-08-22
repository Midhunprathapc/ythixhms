import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function AboutPage() {
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            About HMS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.8 }}>
            We are redefining the student accommodation experience. Born from the belief that where you live shapes how you learn, HMS provides premium, secure, and community-driven living spaces for students worldwide.
          </p>
        </div>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Mission</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '3rem' }}>
          To create environments where academic excellence and personal growth thrive together. We take care of the details—from enterprise-grade WiFi to state-of-the-art security—so you can focus on what matters most.
        </p>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Why Choose Us?</h2>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '1rem' }}><strong>Premium Quality:</strong> From the mattress to the study desk, every element is chosen for comfort and durability.</li>
          <li style={{ marginBottom: '1rem' }}><strong>Absolute Security:</strong> 24/7 staffing, CCTV, and secure key fob access ensure peace of mind.</li>
          <li style={{ marginBottom: '1rem' }}><strong>All-Inclusive:</strong> One transparent price covers rent, utilities, and high-speed internet.</li>
          <li style={{ marginBottom: '1rem' }}><strong>Global Community:</strong> Connect with ambitious students from all corners of the globe.</li>
        </ul>
      </div>
    </PublicLayout>
  );
}
