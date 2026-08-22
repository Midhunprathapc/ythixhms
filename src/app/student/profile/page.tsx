'use client';

import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+44 20 7123 4567',
    emergencyContact: 'John Doe (+44 77 1234 5678)'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    setTimeout(() => setIsEditing(false), 500);
  };

  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          My Profile
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal information and preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <User size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formData.firstName} {formData.lastName}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Student ID: HMS-2026-849</span>
              </div>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>

          <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <Input 
              label="First Name" 
              value={formData.firstName} 
              onChange={e => setFormData({...formData, firstName: e.target.value})}
              disabled={!isEditing}
            />
            <Input 
              label="Last Name" 
              value={formData.lastName} 
              onChange={e => setFormData({...formData, lastName: e.target.value})}
              disabled={!isEditing}
            />
            <Input 
              label="Email Address" 
              type="email"
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
            />
            <Input 
              label="Phone Number" 
              type="tel"
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})}
              disabled={!isEditing}
            />
            <div style={{ gridColumn: '1 / -1' }}>
              <Input 
                label="Emergency Contact (Name & Phone)" 
                value={formData.emergencyContact} 
                onChange={e => setFormData({...formData, emergencyContact: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Shield size={20} color="var(--color-primary-navy)" />
              <h3 style={{ fontWeight: 600 }}>Security</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Your account is secured via OTP authentication sent to your registered phone number.
            </p>
            <Button variant="outline" fullWidth onClick={() => {
              document.cookie = 'hms-student-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
              window.location.href = '/student/login';
            }}>
              Sign Out
            </Button>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
