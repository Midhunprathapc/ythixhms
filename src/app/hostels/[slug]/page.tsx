import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { propertiesApi, Property } from '@/lib/api/properties';

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let property: Property | null = null;
  try {
    property = await propertiesApi.getPropertyById(slug);
  } catch (error) {
    console.error('Failed to fetch property details:', error);
  }

  if (!property) {
    notFound();
  }

  const propertyName = property.name;
  const locationStr = property.city ? `${property.address}, ${property.city}` : property.address || 'Location Details Pending';

  return (
    <PublicLayout>
      {/* Breadcrumbs */}
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <Link href="/" style={{ hover: { color: 'var(--color-primary-navy)' } } as any}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/hostels" style={{ hover: { color: 'var(--color-primary-navy)' } } as any}>Accommodations</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{propertyName}</span>
        </div>
      </div>

      {/* Hero Image Gallery (simplified) */}
      <div style={{ height: '60vh', minHeight: '400px', position: 'relative' }}>
        <Image 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000"
          alt={propertyName}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
        {/* Main Content */}
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {propertyName}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              <MapPin size={20} />
              <span>{locationStr}</span>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '1rem' }}>About this residence</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1rem' }}>
              {/* If we had richText rendering, we'd use it here. For now, fallback to string if available or generic text */}
              Experience the pinnacle of student living at {propertyName}. Designed specifically for modern international students, this premium residence offers an unparalleled blend of comfort, community, and convenience.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>House Rules</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                'Quiet hours from 10 PM to 7 AM',
                'No smoking inside the building',
                'Guests allowed until midnight',
                'No pets permitted',
                'Recycling is mandatory',
                'Respect common areas'
              ].map((rule, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={20} color="var(--color-status-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Sticky Booking Card */}
        <div>
          <div style={{ position: 'sticky', top: '100px' }}>
            <Card shadow="lg" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Starting from</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                    {property.currency === 'USD' ? '$' : '€'}850
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>/ month</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  <span>Available Beds</span>
                  {(property as any).public_visibility ? (
                    <span style={{ fontWeight: 600, color: 'var(--color-status-success)' }}>Available to book</span>
                  ) : (
                    <span style={{ fontWeight: 600, color: 'var(--color-status-danger)' }}>Unavailable</span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Contract Length</span>
                  <span>44 or 51 weeks</span>
                </div>
              </div>

              {(property as any).public_visibility && (
                <Link href={`/booking?property=${slug}`} style={{ display: 'block' }}>
                  <Button variant="secondary" size="lg" fullWidth>Select a Bed</Button>
                </Link>
              )}
              
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginTop: '1rem' }}>
                No payment required to check availability.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <FeatureGrid
        title="Residence Amenities"
        features={property.amenities && property.amenities.length > 0 
          ? property.amenities.map(a => ({ icon: 'wifi', title: a.name, description: 'Provided amenity' }))
          : [
              { icon: 'wifi', title: 'Enterprise Wi-Fi', description: 'Gigabit fiber internet available.' },
              { icon: 'shield', title: '24/7 Security', description: 'Biometric access control and CCTV.' },
              { icon: 'gym', title: 'Fitness Center', description: 'Fully equipped modern gym.' },
            ]
        }
      />
    </PublicLayout>
  );
}
