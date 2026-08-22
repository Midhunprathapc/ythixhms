import React from 'react';
import { Card } from '@/components/ui/Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  return (
    <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{title}</h3>
        {icon && <div style={{ color: 'var(--color-primary-navy)' }}>{icon}</div>}
      </div>
      
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  );
};
