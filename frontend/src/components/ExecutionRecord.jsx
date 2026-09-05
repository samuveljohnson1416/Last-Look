import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, ExternalLink, RotateCcw } from 'lucide-react';
import SectionLabel from './SectionLabel';

export default function ExecutionRecord({
  onNavigate,
  onReset,
  record = {
    action: 'Repackage and rush-deliver the DCP',
    approver: 'Elena Rostova · Head of Post-Production',
    timestamp: 'Jan 26, 2026 · 14:30:12 CET',
    eta: '4 hours (Jan 26 · 18:30 CET)',
    auditStatus: 'Immutable Record Signed',
    grafanaAnnotation: 'UID annot_cannes26_8fa134d1',
  }
}) {
  return (
    <section style={{
      padding: '36px 0',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      <div>
        <SectionLabel text="CONTROLLED RESPONSE" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <CheckCircle2 size={28} style={{ color: 'var(--success)' }} />
          <h2 style={{
            fontSize: '32px',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
          }}>
            Response authorized and recorded.
          </h2>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '640px' }}>
          The human authorization was cryptographically signed and downstream automated playbooks were dispatched. Delivery monitoring continues in recovery mode.
        </p>
      </div>

      {/* Infrastructure Summary Rows */}
      <div style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
      }}>
        {[
          { label: 'Authorized Action', value: record.action, isBold: true },
          { label: 'Approved By', value: record.approver },
          { label: 'Authorized At', value: record.timestamp, isMono: true },
          { label: 'Expected Completion', value: record.eta },
          { label: 'Audit Status', value: record.auditStatus, isSuccess: true },
          { label: 'Grafana Cloud Annotation', value: record.grafanaAnnotation, isMono: true },
        ].map((row, idx) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              padding: '14px 24px',
              alignItems: 'center',
              borderBottom: idx === 5 ? 'none' : '1px solid var(--border-subtle)',
              fontSize: '13px',
            }}
          >
            <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>
              {row.label}
            </span>
            <span style={{
              color: row.isSuccess ? 'var(--success)' : 'var(--foreground)',
              fontFamily: row.isMono ? 'var(--font-mono)' : 'var(--font-sans)',
              fontWeight: row.isBold ? 600 : 400,
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <button
          type="button"
          className="btn-pill-primary"
          onClick={() => onNavigate('audit-trail')}
        >
          <span>View immutable decision record</span>
          <ArrowRight size={15} />
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          {onReset && (
            <button
              type="button"
              className="btn-pill-secondary"
              onClick={onReset}
              style={{ height: '44px', padding: '0 20px', fontSize: '13px' }}
            >
              <RotateCcw size={13} />
              <span>Reset scenario</span>
            </button>
          )}

          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => onNavigate('overview')}
            style={{ height: '44px', padding: '0 20px', fontSize: '13px' }}
          >
            <span>Back to deliveries</span>
          </button>
        </div>
      </div>
    </section>
  );
}
