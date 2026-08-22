import React from 'react';
import { Home, Key, MapPin } from 'lucide-react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';

export default function MyRoomPage() {
  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          My Room
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>View your accommodation details and connect with roommates.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '200px', position: 'relative', backgroundColor: 'var(--bg-tertiary)' }}>
              <Image 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
                alt="Room"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>The Grand Plaza Residence</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <MapPin size={16} />
                    Central Downtown District
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Room / Bed</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>101-A</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Room Type</span>
                  <span style={{ fontWeight: 500 }}>2-Bed Shared (En-suite)</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Wi-Fi Network</span>
                  <span style={{ fontWeight: 500 }}>HMS_Premium_5G</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Contract Start</span>
                  <span style={{ fontWeight: 500 }}>Sep 1, 2026</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Contract End</span>
                  <span style={{ fontWeight: 500 }}>Aug 31, 2027</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Your Roommate</h3>
          <Card style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', margin: '0 auto 1rem', overflow: 'hidden', position: 'relative' }}>
              <Image 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Roommate"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h4 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Michael Chen</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Bed 101-B • Computer Science</p>
            <div style={{ fontSize: '0.875rem', padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary-navy)', borderRadius: 'var(--radius-md)' }}>
              Moved in on Sep 1
            </div>
          </Card>

          <Card style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-secondary-gold)', borderRadius: '50%' }}>
                <Key size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 600 }}>Digital Keycard</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active for Main Entrance & Room 101</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
