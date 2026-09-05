import React from 'react';
import { ArrowRight, Film, ShieldAlert, Sparkles, Play } from 'lucide-react';
import SectionLabel from './SectionLabel';
import MetricStrip from './MetricStrip';

export default function EditorialHero({
  onNavigate,
  activeCaseCount = 3,
  criticalCaseCount = 1,
  exposureTotal = 12000
}) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '40px',
      paddingBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '36px'
    }}>
      {/* Top Tag */}
      <div>
        <SectionLabel text="FESTIVAL DELIVERY INTELLIGENCE" />

        {/* Large Editorial Headline */}
        <h1 style={{
          fontSize: 'var(--text-display)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          color: 'var(--foreground)',
          maxWidth: '1100px',
          marginBottom: '28px'
        }}>
          Every screening opportunity deserves a{' '}
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>
            safe delivery.
          </span>
        </h1>

        {/* Subtitle & Actions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'end'
        }}>
          <p style={{
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '560px'
          }}>
            DCP Sentinel detects delivery risk, investigates technical failures, and brings the final decision to the people responsible before a festival deadline is lost.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-pill-primary"
              onClick={() => onNavigate('create-case')}
            >
              <span>Create delivery case</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn-pill-secondary"
              onClick={() => onNavigate('control-room')}
            >
              <Play size={15} style={{ color: 'var(--critical)' }} />
              <span>Open control room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Metric Strip Ticker */}
      <MetricStrip
        metrics={[
          { value: `0${activeCaseCount}`, label: 'active deliveries', context: 'CANNES · VENICE · BERLIN' },
          { value: `0${criticalCaseCount}`, label: 'decision required', context: 'CRITICAL AUDIT HOLD', isCritical: true },
          { value: `$${exposureTotal.toLocaleString()}`, label: 'exposure identified', context: 'RECOVERABLE' },
          { value: '99.2%', label: 'diagnosis confidence', context: 'CORRELATED' },
          { value: '71h 45m', label: 'until delivery cutoff', context: 'GALA SLOT LOCK' },
        ]}
      />
    </section>
  );
}
