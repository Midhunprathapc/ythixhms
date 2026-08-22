import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';

export default function FacilitiesPage() {
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            World-Class Facilities
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.8 }}>
            Explore the premium amenities available across all our properties, designed to support both your academic journey and your wellbeing.
          </p>
        </div>
      </div>
      
      <FeatureGrid
        title="Everything You Need"
        subtitle="Included in your rent at no extra cost."
        features={[
          { icon: 'wifi', title: 'Enterprise Wi-Fi', description: 'Gigabit fiber internet available in all rooms and common areas.' },
          { icon: 'shield', title: '24/7 Security', description: 'Biometric access control, CCTV, and on-site security personnel.' },
          { icon: 'gym', title: 'Fitness Center', description: 'Fully equipped modern gym available to all residents.' },
          { icon: 'study', title: 'Quiet Study Zones', description: 'Dedicated soundproofed study rooms and collaboration spaces.' },
          { icon: 'cafe', title: 'In-house Cafe', description: 'Premium coffee and healthy meals available daily.' },
          { icon: 'community', title: 'Social Events', description: 'Weekly curated events to help you build your international network.' },
        ]}
      />
    </PublicLayout>
  );
}
