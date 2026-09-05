import React from 'react';
import { Clock, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';

export default function ImpactBlock({
  exposureAmount = 12000,
  countdownText = '71h 45m until delivery cutoff',
  riskExplanation = 'The package risks technical rejection, rush repackaging costs, and a distributor delivery penalty.',
  onOpenCalculation,
  isCritical = true,
  isRecovered = false,
}) {
  if (isRecovered || exposureAmount === 0) {
    return null;
  }

  return (
    <section style={{
      padding: '36px 0',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {/* Dominant Impact Figure */}
        <div>
          <div style={{
            fontSize: 'var(--text-micro)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--critical)',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--critical)' }} />
            <span>FINANCIAL & OPERATIONAL CONSEQUENCE</span>
          </div>

          <div style={{
            fontSize: 'clamp(48px, 8vw, 84px)',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--foreground)',
          }} className="tabular-nums">
            ${exposureAmount.toLocaleString()}
          </div>

          <div style={{
            fontSize: '18px',
            color: 'var(--muted)',
            marginTop: '8px',
            fontFamily: 'var(--font-display)',
          }}>
            exposure if unresolved
          </div>
        </div>

        {/* Cutoff Countdown & Calculation Trigger */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '20px 24px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          maxWidth: '380px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--warning)',
            fontWeight: 500,
          }}>
            <Clock size={16} />
            <span>{countdownText}</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
            {riskExplanation}
          </p>

          {onOpenCalculation && (
            <button
              type="button"
              onClick={onOpenCalculation}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--foreground)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '4px',
                textDecoration: 'underline',
              }}
            >
              <span>View financial model breakdown</span>
              <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
