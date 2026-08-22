import React from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.8 }}>
            Have a question about booking a room, or just want to know more about the HMS experience? Our team is here to help.
          </p>
        </div>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contact Us</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email</strong>
              <a href="mailto:hello@hms-premium.com" style={{ color: 'var(--color-primary-navy)', textDecoration: 'underline' }}>hello@hms-premium.com</a>
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Phone / WhatsApp</strong>
              <a href="tel:+442071234567" style={{ color: 'var(--text-secondary)' }}>+44 20 7123 4567</a>
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Headquarters</strong>
              <p style={{ color: 'var(--text-secondary)' }}>123 University Road,<br/>London, UK<br/>WC1E 6BT</p>
            </div>
          </div>
        </div>
        
        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Input label="Full Name" placeholder="Jane Doe" required />
            <Input label="Email Address" type="email" placeholder="jane@example.com" required />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Message</label>
              <textarea 
                rows={5} 
                required
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
            <Button type="submit" size="lg">Send Message</Button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
