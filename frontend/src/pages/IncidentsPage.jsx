import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import StatusDot from '../components/StatusDot';

export default function IncidentsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('decision');

  const incidents = [
    {
      id: 'INC-2026-01',
      film: 'The Last Harvest',
      festival: 'Cannes 2026 · Grand Théâtre Lumière',
      category: 'Audio Clock Drift',
      summary: '35.2 ms phase deviation detected between Center dialogue track and SMPTE container clock.',
      exposure: '$12,000',
      timeRemaining: '71h 45m',
      status: 'critical',
      tabCategory: 'decision',
      requiresAction: true,
    },
    {
      id: 'INC-2026-02',
      film: 'Neon Horizon',
      festival: 'Venice 2026 · Sala Grande',
      category: 'Color Space Gamut Check',
      summary: 'DCI-P3 gamut clamp verified. Zero clipping on primary skin tones.',
      exposure: '$0',
      timeRemaining: '18d remaining',
      status: 'healthy',
      tabCategory: 'resolved',
      requiresAction: false,
    },
    {
      id: 'INC-2026-03',
      film: 'Echoes of Dust',
      festival: 'Berlinale 2026 · Berlinale Palast',
      category: 'Subtitle XML Schema',
      summary: 'SMPTE-TT timing validation passed. 1,420 lines verified against dialogue track.',
      exposure: '$0',
      timeRemaining: '26d remaining',
      status: 'healthy',
      tabCategory: 'resolved',
      requiresAction: false,
    },
    {
      id: 'INC-2026-04',
      film: 'Mirage',
      festival: 'SXSW 2026 · Paramount Theatre',
      category: 'Loudness Target Verification',
      summary: 'Integrated audio level measured at -23.9 LKFS (Target -24.0 ±0.5 LKFS). Compliant.',
      exposure: '$0',
      timeRemaining: '44d remaining',
      status: 'healthy',
      tabCategory: 'resolved',
      requiresAction: false,
    },
  ];

  const filteredIncidents = incidents.filter((inc) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'decision') return inc.tabCategory === 'decision';
    if (activeTab === 'investigating') return inc.tabCategory === 'investigating';
    if (activeTab === 'resolved') return inc.tabCategory === 'resolved';
    return true;
  });

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel text="QC INCIDENT REGISTRY" />
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          marginBottom: '8px',
        }}>
          Incidents and QC Telemetry
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Prioritized feed of technical delivery anomalies, financial exposure pricing, and required decisions.
        </p>
      </div>

      {/* Minimal Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '20px',
      }}>
        {[
          { id: 'decision', label: 'Needs decision (1)' },
          { id: 'investigating', label: 'Investigating (0)' },
          { id: 'resolved', label: 'Resolved (3)' },
          { id: 'all', label: 'All deliveries (4)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--foreground)' : '2px solid transparent',
              padding: '8px 0 12px',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'color var(--trans-hover)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Incidents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => onNavigate(inc.requiresAction ? 'control-room' : 'audit-trail')}
            style={{
              padding: '22px 28px',
              backgroundColor: 'var(--surface)',
              border: inc.status === 'critical' ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.borderColor = inc.status === 'critical' ? 'var(--border-strong)' : 'var(--border-subtle)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '640px' }}>
              <div style={{ marginTop: '4px' }}>
                <StatusDot status={inc.status} pulse={inc.status === 'critical'} size={7} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                    {inc.film}
                  </span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {inc.id}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    · {inc.festival}
                  </span>
                </div>

                <div style={{ fontSize: '14px', color: 'var(--foreground-soft)', marginTop: '4px' }}>
                  <strong style={{ color: inc.status === 'critical' ? 'var(--critical)' : 'var(--foreground)' }}>
                    {inc.category}:
                  </strong>{' '}
                  {inc.summary}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: inc.exposure !== '$0' ? 'var(--critical)' : 'var(--foreground-soft)',
                }}>
                  {inc.exposure !== '$0' ? `${inc.exposure} exposure` : 'No exposure'}
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginTop: '2px' }}>
                  {inc.timeRemaining}
                </div>
              </div>

              <button
                type="button"
                className={inc.requiresAction ? 'btn-pill-primary' : 'btn-pill-secondary'}
                style={{ height: '38px', padding: '0 18px', fontSize: '12px' }}
              >
                <span>{inc.requiresAction ? 'Open Decision Room' : 'View Record'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
