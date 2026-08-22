import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HostelCard } from '@/components/marketing/HostelCard';
import { propertiesApi } from '@/lib/api/properties';

export default async function HostelsPage() {
  let properties: any[] = [];
  try {
    const res = await propertiesApi.getProperties();
    properties = res.docs;
  } catch (error) {
    console.error('Failed to fetch properties:', error);
  }

  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Find Your Perfect Home
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Browse our curated selection of premium student accommodations designed for comfort, security, and academic success.
          </p>
        </div>
      </div>

      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Simple filter bar placeholder */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div style={{ color: 'var(--text-secondary)' }}>Showing {properties.length} properties</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-secondary)' }}>
                <option>All Locations</option>
                <option>North Campus</option>
                <option>Downtown</option>
              </select>
              <select style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-secondary)' }}>
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {properties.map((property: any) => (
              <HostelCard 
                key={property.id} 
                id={property.id}
                slug={property.id} // Backend uses ID currently
                name={property.name}
                location={property.city ? `${property.address}, ${property.city}` : property.address || 'Location Details Pending'}
                imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" // Fallback until media is integrated
                startingPrice={850} // Fallback until pricing logic is tied to beds
                availableBeds={property.public_visibility ? 1 : 0} 
              />
            ))}
            {properties.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                No properties available matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
