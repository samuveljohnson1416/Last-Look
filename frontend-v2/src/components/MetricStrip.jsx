import React from 'react';

export default function MetricStrip({
  metrics = [
    { value: '03', label: 'active deliveries', sub: 'Cannes · Venice · Berlin' },
    { value: '01', label: 'decision required', sub: 'Palais Lumière Gala cutoff', isCritical: true },
    { value: '$12,000', label: 'risk identified', sub: 'Calculated SLA exposure' },
    { value: '99.2%', label: 'diagnosis confidence', sub: 'SMPTE CPL / Dolby CP950' },
  ]
}) {
  return (
    <div style={{
      width: '100%',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--subtle-card-bg)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}>
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: '28px 24px',
              borderRight: idx < metrics.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              position: 'relative',
              transition: 'background-color var(--trans-hover)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
            }}>
              <span style={{
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                color: m.isCritical ? 'var(--critical)' : 'var(--foreground)',
                lineHeight: 1,
              }}>
                {m.value}
              </span>
              <span style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--muted)',
              }}>
                / {m.label}
              </span>
            </div>
            {m.sub && (
              <span style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: m.isCritical ? 'var(--critical)' : 'var(--text-dim)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {m.sub}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
