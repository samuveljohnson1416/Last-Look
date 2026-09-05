import React from 'react';
import { ArrowUpRight, Clock3 } from 'lucide-react';

export default function ImpactStatement({
  exposureAmount = 12000,
  countdownText = '71h 45m until delivery cutoff',
  riskExplanation = 'The current package risks the Palais screening slot and may trigger a rush repackage plus distributor SLA penalty.',
  onOpenCalculation,
  isCritical = true,
  isRecovered = false,
}) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '28px 0',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      {/* Dominant Consequence Figure */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: isRecovered ? 'var(--success)' : isCritical ? 'var(--critical)' : 'var(--white)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
          className="tabular-nums font-mono"
        >
          {isRecovered ? '$0' : `$${exposureAmount.toLocaleString()}`}
        </span>

        <span
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'var(--gray)',
            letterSpacing: '-0.01em',
          }}
        >
          {isRecovered ? 'exposure cleared' : 'exposure if unresolved'}
        </span>
      </div>

      {/* Deadline Cutoff */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--white-soft)' }}>
        <Clock3 size={15} color="var(--warning)" />
        <span
          style={{
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
          }}
        >
          {countdownText}
        </span>
      </div>

      {/* Concise Consequence Sentence + Trigger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            color: 'var(--white-soft)',
            lineHeight: 1.5,
            maxWidth: '820px',
          }}
        >
          {isRecovered ? 'Audio phase inversion corrected. DCI package verified SMPTE compliant. Palais screening slot protected.' : riskExplanation}
        </p>

        {!isRecovered && (
          <button
            type="button"
            onClick={onOpenCalculation}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--cyan)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 0',
            }}
          >
            <span>View calculation</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
