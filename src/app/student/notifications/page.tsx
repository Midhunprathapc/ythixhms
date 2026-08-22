import React from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';

export default function NotificationsPage() {
  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Notifications
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>All recent alerts and announcements.</p>
      </div>
      
      <Card style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>You have no new notifications.</p>
      </Card>
    </StudentLayout>
  );
}
