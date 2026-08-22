import React from 'react';
import { CreditCard, Wrench, Calendar, AlertCircle } from 'lucide-react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { StatCard } from '@/components/portal/StatCard';
import { Card } from '@/components/ui/Card';
import { studentPortalApi } from '@/lib/api/studentPortal';

export default async function StudentDashboardPage() {
  let dashboardData: any = { activeTenancy: null, announcements: [], events: [], maintenanceTicketsCount: 0 };
  
  try {
    const res = await studentPortalApi.getDashboardData();
    dashboardData = res || dashboardData;
  } catch (error) {
    console.error('Failed to fetch student dashboard:', error);
  }

  const { activeTenancy, announcements, maintenanceTicketsCount } = dashboardData;

  const endDate = activeTenancy ? new Date(activeTenancy.end_date).toLocaleDateString() : 'N/A';
  
  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Welcome back
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here is what's happening with your stay today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard 
          title="Current Balance" 
          value="$0.00" 
          subtitle="No payment due at this time"
          icon={<CreditCard size={20} />}
        />
        <StatCard 
          title="Next Rent Due" 
          value="Oct 1, 2026" 
          subtitle="$850.00"
          icon={<Calendar size={20} />}
        />
        <StatCard 
          title="Active Tickets" 
          value={maintenanceTicketsCount.toString()} 
          subtitle="Maintenance"
          icon={<Wrench size={20} />}
        />
        <StatCard 
          title="Contract Ends" 
          value={endDate} 
          subtitle={activeTenancy ? `${activeTenancy.payment_frequency} payments` : 'No active contract'}
          icon={<AlertCircle size={20} />}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Important Announcements */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Announcements</h2>
          {announcements.length > 0 ? announcements.map((notice: any) => (
            <Card key={notice.id} style={{ padding: '1.5rem', borderLeft: `4px solid ${notice.priority === 'HIGH' ? 'var(--color-status-danger)' : 'var(--color-secondary-gold)'}`, marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{notice.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {notice.content}
              </p>
            </Card>
          )) : (
            <p style={{ color: 'var(--text-secondary)' }}>No recent announcements.</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Community Events</h2>
          <Card style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No upcoming events this week.</p>
            </div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
