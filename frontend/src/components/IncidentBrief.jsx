import React from 'react';

export default function IncidentBrief({
  incidentId = '01',
  headline = 'DCP delivery may miss the Cannes screening window.',
  supportingText = 'QC found a 35.2 ms audio clock drift caused by an incompatible SMPTE export preset.',
  statusLabel = 'CRITICAL · HUMAN DECISION REQUIRED',
  isCritical = true,
  isRecovered = false,
}) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--line-soft)',
      }}
      aria-live="polite"
    >
      {/* Top Label & Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            color: 'var(--gray)',
            textTransform: 'uppercase',
          }}
        >
          Festival Delivery Incident / {incidentId}
        </span>

        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: isRecovered ? 'var(--success)' : isCritical ? 'var(--critical)' : 'var(--gray)',
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Main Consequence Headline */}
      <h1
        style={{
          fontSize: '34px',
          fontWeight: 600,
          color: 'var(--white)',
          letterSpacing: '-0.03em',
          lineHeight: 1.25,
          maxWidth: '1080px',
        }}
      >
        {headline}
      </h1>

      {/* Supporting Explanation */}
      <p
        style={{
          fontSize: '15px',
          color: 'var(--white-soft)',
          lineHeight: 1.5,
          maxWidth: '840px',
        }}
      >
        {supportingText}
      </p>
    </section>
  );
}
