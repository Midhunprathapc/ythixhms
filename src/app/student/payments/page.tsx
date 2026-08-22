import React from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card } from '@/components/ui/Card';
import { PaymentRow } from '@/components/portal/PaymentRow';
import { paymentsApi } from '@/lib/api/payments';

export default async function PaymentsPage() {
  let invoices = [];
  try {
    const res = await paymentsApi.getStudentPayments();
    invoices = res.docs;
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
  }

  // Map to component props
  const formattedPayments = invoices.map(inv => ({
    id: inv.invoice_number || inv.id,
    description: inv.line_items?.[0]?.description || 'Invoice',
    amount: inv.amount_due,
    date: new Date(inv.due_date).toLocaleDateString(),
    status: inv.status
  }));

  return (
    <StudentLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Payments & Invoices
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your rent payments, deposits, and download invoices.</p>
      </div>

      <Card style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto', 
          alignItems: 'center', 
          padding: '1rem 1.25rem', 
          backgroundColor: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-light)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          fontWeight: 600
        }}>
          <div>Description</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div style={{ paddingRight: '1rem' }}>Actions</div>
        </div>
        
        <div>
          {formattedPayments.length > 0 ? formattedPayments.map(payment => (
            <PaymentRow key={payment.id} {...payment} />
          )) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No payments found.
            </div>
          )}
        </div>
      </Card>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <strong>Note on Cash Payments:</strong> If you are paying your rent via cash at the reception, please allow up to 24 hours for your invoice status to update from "Pending" to "Paid".
      </div>
    </StudentLayout>
  );
}
