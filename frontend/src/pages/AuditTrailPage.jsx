import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

export default function AuditTrailPage({ onNavigate }) {
  const [expandedRecordId, setExpandedRecordId] = useState('rec-01');

  const records = [
    {
      id: 'rec-01',
      responseAuthorized: 'Repackage and rush-deliver the DCP',
      film: 'The Last Harvest',
      festival: 'Cannes 2026 · Grand Théâtre Lumière',
      approvedBy: 'Elena Rostova · Head of Post-Production (Signatory #8841)',
      time: 'Jan 26, 2026 · 14:30:12 CET',
      costAuthorized: '$8,500 USD',
      evidence: [
        'Audio clock phase drift: +35.2 ms measured against SMPTE container frame index',
        'SMPTE 24.000 fps export preset applied to 23.976 fps master package',
        'Model priced exposure at $12,000 based on Cannes Gala SLA penalties',
      ],
      alternativesRejected: [
        'Request delivery extension (Avoids rush cost, but risks Grand Lumière slot reassignment)',
        'Submit current package (No cost, but high likelihood of audio phase cancellation)',
      ],
      execution: [
        'Aspera 10Gbps satellite rush order #ASP-8842-CA dispatched to Cannes Ingest Server',
        'Grafana Cloud audit annotation created: UID annot_cannes26_8fa134d1',
        'Remediation timeline updated: New package ETA Jan 27 · 18:00 CET',
      ],
      rawPayload: {
        event: 'human_authorization_granted',
        decision_id: 'DEC-2026-CANNES-01',
        approver_identity: 'elena.rostova@premierepost.com',
        timestamp_utc: '2026-01-26T13:30:12.842Z',
        approved_action: 'repackage_rush',
        authorized_budget_usd: 8500,
        grafana_annotation_uid: 'annot_cannes26_8fa134d1',
        signature_sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      },
    },
    {
      id: 'rec-02',
      responseAuthorized: 'Certify DCI 4K Scope Compliance',
      film: 'Neon Horizon',
      festival: 'Venice 2026 · Sala Grande',
      approvedBy: 'Marco Bellini · Technical Director',
      time: 'Jan 24, 2026 · 11:15:00 CET',
      costAuthorized: '$0 USD',
      evidence: [
        'All 6 discrete PCM audio tracks verified at -24.0 LKFS (EBU R128 standard)',
        'DCI-P3 color gamut boundary audit passed without out-of-gamut clipping',
      ],
      alternativesRejected: ['None (Full pass on initial automated QC inspection)'],
      execution: [
        'Venice Biennale digital delivery certificate #VBN-2026-7721 issued',
        'Grafana Cloud audit annotation logged',
      ],
      rawPayload: {
        event: 'package_certified_nominal',
        decision_id: 'DEC-2026-VENICE-04',
        approver_identity: 'marco.bellini@labiennale.org',
        timestamp_utc: '2026-01-24T10:15:00.000Z',
        signature_sha256: '3f7b2c9182a47e659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f11c29',
      },
    },
  ];

  return (
    <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel text="IMMUTABLE DECISION LOG & AUDIT TRAIL" />
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          marginBottom: '8px',
        }}>
          Decision Records
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Auditable history of human authorizations, evidence snapshots, rejected options, and downstream execution orders.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {records.map((rec) => {
          const isExpanded = expandedRecordId === rec.id;

          return (
            <div
              key={rec.id}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'var(--surface)',
              }}
            >
              {/* Record Summary Bar */}
              <div
                style={{
                  padding: '22px 28px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  backgroundColor: 'var(--background-elevated)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      AUTHORIZATION GRANTED · {rec.id.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginTop: '4px' }}>
                    {rec.responseAuthorized}
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                    <strong>{rec.film}</strong> · {rec.festival}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--foreground-soft)' }}>
                    {rec.time}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    By: {rec.approvedBy}
                  </div>
                </div>
              </div>

              {/* Core Audit Details */}
              <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Evidence & Root Cause Basis
                  </div>
                  <ul style={{ marginTop: '6px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: 'var(--foreground-soft)' }}>
                    {rec.evidence.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Alternatives Explicitly Rejected By Human
                  </div>
                  <ul style={{ marginTop: '6px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: 'var(--muted-deep)' }}>
                    {rec.alternativesRejected.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--foreground)', textTransform: 'uppercase' }}>
                    Downstream Actions Dispatched
                  </div>
                  <ul style={{ marginTop: '6px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: 'var(--foreground-soft)' }}>
                    {rec.execution.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Cryptographic Record Disclosure */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    <span>{isExpanded ? 'Hide cryptographic signature payload' : 'View cryptographic signature payload'}</span>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>

                  {isExpanded && (
                    <pre
                      style={{
                        marginTop: '12px',
                        padding: '16px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--background-elevated)',
                        border: '1px solid var(--border-subtle)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        overflowX: 'auto',
                        lineHeight: 1.5,
                      }}
                    >
                      {JSON.stringify(rec.rawPayload, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
