import React from 'react';
import { Calendar, Clock, Film, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import StatusDot from '../components/StatusDot';

export default function CalendarPage({ onNavigate }) {
  const deliveries = [
    {
      id: 'case-cannes-2026',
      title: 'The Last Harvest',
      festival: 'Festival de Cannes 2026',
      venue: 'Grand Théâtre Lumière (Palais des Festivals)',
      deadline: 'Jan 28, 2026 · 14:00 CET',
      timeRemaining: '71h 45m remaining',
      readiness: 'Package Ingested · Drift Detected',
      risk: 'Critical Risk · Exposure $12,000',
      status: 'critical',
      decisionState: 'Human Decision Required',
      route: 'control-room',
    },
    {
      id: 'case-venice-2026',
      title: 'Neon Horizon',
      festival: 'Venice International Film Festival 2026',
      venue: 'Sala Grande (Palazzo del Cinema)',
      deadline: 'Feb 12, 2026 · 18:00 CET',
      timeRemaining: '18 days remaining',
      readiness: 'DCI 4K Scope · Verified Compliant',
      risk: 'Zero Risk · Exposure $0',
      status: 'healthy',
      decisionState: 'Monitoring Active',
      route: 'package-review',
    },
    {
      id: 'case-berlin-2026',
      title: 'Echoes of Dust',
      festival: 'Berlin International Film Festival (Berlinale) 2026',
      venue: 'Berlinale Palast',
      deadline: 'Feb 20, 2026 · 12:00 CET',
      timeRemaining: '26 days remaining',
      readiness: 'Flat 1.85 · Subtitles Sync Checked',
      risk: 'Low Risk · Exposure $0',
      status: 'healthy',
      decisionState: 'In Review',
      route: 'package-review',
    },
    {
      id: 'case-sxsw-2026',
      title: 'Mirage',
      festival: 'SXSW Film Festival 2026',
      venue: 'Paramount Theatre (Austin, TX)',
      deadline: 'Mar 10, 2026 · 16:00 CST',
      timeRemaining: '44 days remaining',
      readiness: 'SMPTE 5.1 Discrete · Verified Compliant',
      risk: 'Zero Risk · Exposure $0',
      status: 'healthy',
      decisionState: 'Scheduled for Ingest',
      route: 'package-review',
    },
    {
      id: 'case-tiff-2026',
      title: 'Sovereign Skies',
      festival: 'Toronto International Film Festival (TIFF) 2026',
      venue: 'Princess of Wales Theatre',
      deadline: 'Sep 08, 2026 · 10:00 EDT',
      timeRemaining: '186 days remaining',
      readiness: 'Master in Color Grading',
      risk: 'Pre-Delivery Planning',
      status: 'idle',
      decisionState: 'Package Pending',
      route: 'create-case',
    },
  ];

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <SectionLabel text="FESTIVAL DEADLINE SCHEDULE" />
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.025em',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            Festival Delivery Schedule
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Chronological delivery schedule mapped against international festival projection cutoffs.
          </p>
        </div>

        <button
          type="button"
          className="btn-pill-primary"
          onClick={() => onNavigate('create-case')}
          style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
        >
          <span>New delivery case</span>
        </button>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {deliveries.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.route)}
            style={{
              padding: '22px 28px',
              backgroundColor: 'var(--surface)',
              border: item.status === 'critical' ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
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
              e.currentTarget.style.borderColor = item.status === 'critical' ? 'var(--border-strong)' : 'var(--border-subtle)';
            }}
          >
            {/* Film & Festival Column */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '600px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--background-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.status === 'critical' ? 'var(--critical)' : 'var(--foreground-soft)',
                  marginTop: '2px',
                }}
              >
                <Film size={18} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '17px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: item.status === 'critical' ? 'var(--critical-subtle)' : 'var(--surface-hover)',
                      color: item.status === 'critical' ? 'var(--critical)' : 'var(--muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: item.status === 'critical' ? '1px solid rgba(255, 98, 92, 0.25)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <StatusDot status={item.status} size={4} />
                    {item.decisionState}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--foreground-soft)', marginTop: '4px' }}>
                  <strong>{item.festival}</strong> · {item.venue}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                  {item.readiness} · {item.risk}
                </div>
              </div>
            </div>

            {/* Deadline Cutoff & Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  <Clock size={13} style={{ color: item.status === 'critical' ? 'var(--warning)' : 'var(--muted)' }} />
                  <span>{item.timeRemaining}</span>
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginTop: '2px' }}>
                  Cutoff: {item.deadline}
                </div>
              </div>

              <button
                type="button"
                className={item.status === 'critical' ? 'btn-pill-primary' : 'btn-pill-secondary'}
                style={{ height: '38px', padding: '0 18px', fontSize: '12px' }}
              >
                <span>{item.status === 'critical' ? 'Open Decision Room' : 'View Package'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
