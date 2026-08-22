'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { MaintenanceTicket } from '@/components/portal/MaintenanceTicket';
import { maintenanceApi } from '@/lib/api/maintenance';

export default function MaintenancePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [description, setDescription] = useState('');

  const loadTickets = () => {
    maintenanceApi.getTickets().then(res => {
      setTickets(res.docs);
    }).catch(console.error);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await maintenanceApi.createTicket({ title, description, priority });
      setIsFormOpen(false);
      setTitle('');
      setDescription('');
      setPriority('LOW');
      loadTickets(); // Refresh list
    } catch (error) {
      console.error('Failed to submit ticket', error);
      alert('Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedTickets = tickets.map(ticket => ({
    id: ticket.id,
    title: ticket.title,
    status: ticket.status,
    date: new Date(ticket.createdAt || Date.now()).toLocaleDateString(),
    priority: ticket.priority
  }));

  return (
    <StudentLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Maintenance
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and submit maintenance requests for your room.</p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Plus size={18} />
          New Request
        </Button>
      </div>

      {isFormOpen && (
        <Card style={{ marginBottom: '2rem', border: '1px solid var(--color-primary-navy)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Submit a Request</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
            <Input 
              label="Issue Title" 
              placeholder="e.g. Broken lightbulb" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
            <Select 
              label="Priority" 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { label: 'Low - Not urgent', value: 'LOW' },
                { label: 'Medium - Needs attention soon', value: 'MEDIUM' },
                { label: 'High - Urgent / Safety concern', value: 'HIGH' }
              ]} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Description</label>
              <textarea 
                rows={4} 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue in detail..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  fontFamily: 'var(--font-ui)', 
                  fontSize: '1rem', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-strong)', 
                  borderRadius: 'var(--radius-md)' 
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Photo (Optional)</label>
              <input type="file" accept="image/*" style={{ fontSize: '0.875rem' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Uploading a photo helps our team resolve the issue faster.</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Your Tickets</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {formattedTickets.length > 0 ? formattedTickets.map(ticket => (
            <MaintenanceTicket key={ticket.id} {...ticket} />
          )) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              No maintenance requests found.
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
