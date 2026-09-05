import React from 'react';
import { ArrowRight, Film, Clock, Plus, ShieldCheck, AlertTriangle } from 'lucide-react';
import EditorialHero from '../components/EditorialHero';
import NumberedCapability from '../components/NumberedCapability';
import InteractiveProcessSection from '../components/InteractiveProcessSection';
import FestivalNetworkStatus from '../components/FestivalNetworkStatus';
import ReliabilityStats from '../components/ReliabilityStats';
import SectionLabel from '../components/SectionLabel';
import StatusDot from '../components/StatusDot';

export default function OverviewPage({ onNavigate }) {
  const activeCases = [
    {
      id: 'cannes-2026-last-harvest',
      title: 'THE LAST HARVEST',
      version: 'Theatrical Premiere Master v2.4 (DCI 4K)',
      festival: 'Cannes 2026',
      venue: 'Grand Théâtre Lumière (Palais)',
      cutoff: 'Jan 28 · 71h 45m remaining',
      status: 'critical',
      statusLabel: 'Critical — QC incident requires a decision',
      exposure: '$12,000 exposure if unresolved',
      actionLabel: 'Open control room',
      actionRoute: 'control-room',
    },
    {
      id: 'venice-2026-neon-horizon',
      title: 'NEON HORIZON',
      version: 'DCI Scope 2.39 · 5.1 Printmaster',
      festival: 'Venice 2026',
      venue: 'Sala Grande (Palazzo del Cinema)',
      cutoff: 'Feb 12 · 18d remaining',
      status: 'healthy',
      statusLabel: 'Delivery-ready — All QC checks passed',
      exposure: '$0 exposure',
      actionLabel: 'View package profile',
      actionRoute: 'package-review',
    },
    {
      id: 'berlin-2026-echoes-dust',
      title: 'ECHOES OF DUST',
      version: 'SMPTE DCI Flat 1.85 · Atmos',
      festival: 'Berlinale 2026',
      venue: 'Berlinale Palast',
      cutoff: 'Feb 20 · 26d remaining',
      status: 'healthy',
      statusLabel: 'Delivery-ready — Timed text verified',
      exposure: '$0 exposure',
      actionLabel: 'View package profile',
      actionRoute: 'package-review',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      {/* 1. Large Editorial Hero + Ticker */}
      <EditorialHero
        onNavigate={onNavigate}
        activeCaseCount={3}
        criticalCaseCount={1}
        exposureTotal={12000}
      />

      {/* 2. Current Delivery Cases Section */}
      <section style={{
        padding: '36px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <SectionLabel text="ACTIVE DELIVERY PIPELINE" />
            <h2 style={{
              fontSize: '26px',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              marginTop: '-8px',
            }}>
              Active festival delivery cases.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-pill-secondary"
              onClick={() => onNavigate('calendar')}
              style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
            >
              View festival calendar
            </button>

            <button
              type="button"
              className="btn-pill-primary"
              onClick={() => onNavigate('create-case')}
              style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
            >
              <Plus size={15} />
              <span>New delivery case</span>
            </button>
          </div>
        </div>

        {/* Scannable High-Contrast Cases Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeCases.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.actionRoute)}
              style={{
                padding: '24px 28px',
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
              {/* Left Column: Film & Destination */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '640px' }}>
                <div style={{
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
                }}>
                  <Film size={18} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                      {item.title}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: item.status === 'critical' ? 'var(--critical-subtle)' : 'var(--accent-subtle)',
                      color: item.status === 'critical' ? 'var(--critical)' : 'var(--accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: item.status === 'critical' ? '1px solid rgba(255, 98, 92, 0.25)' : '1px solid rgba(167, 243, 208, 0.25)',
                    }}>
                      <StatusDot status={item.status} size={5} />
                      {item.statusLabel}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                    <strong>{item.festival}</strong> · {item.venue} · {item.cutoff}
                  </div>
                </div>
              </div>

              {/* Right Column: Exposure & Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: item.status === 'critical' ? 'var(--critical)' : 'var(--foreground-soft)',
                  }}>
                    {item.exposure}
                  </div>
                </div>

                <button
                  type="button"
                  className={item.status === 'critical' ? 'btn-pill-primary' : 'btn-pill-secondary'}
                  style={{ height: '40px', padding: '0 20px', fontSize: '13px' }}
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Numbered Capabilities Section */}
      <NumberedCapability />

      {/* 4. Interactive 3-Phase Operational Architecture */}
      <InteractiveProcessSection />

      {/* 5. Live Connected Festival Ingest Hubs */}
      <FestivalNetworkStatus />

      {/* 6. Reliability & Performance Metrics */}
      <ReliabilityStats />

      {/* 7. Editorial Section Footer */}
      <footer style={{
        marginTop: '32px',
        padding: '36px 0',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '12px',
        color: 'var(--muted)',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>DCP SENTINEL™</span>
          <span>·</span>
          <span>FILM FESTIVAL DELIVERY INTELLIGENCE</span>
        </div>
        <div>
          AUTONOMOUS INVESTIGATION · CONTROLLED HUMAN DECISION · IMMUTABLE AUDIT
        </div>
      </footer>
    </div>
  );
}
