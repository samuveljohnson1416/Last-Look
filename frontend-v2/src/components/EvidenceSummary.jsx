import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EvidenceSummary({
  rootCause = '24.000 fps export preset used for a 23.976 fps package',
  evidence = 'Three matching QC incidents found in delivery history',
  confidence = '99.2%',
  onOpenEvidenceTab = () => {},
}) {
  const items = [
    {
      label: 'ROOT CAUSE',
      value: rootCause,
      tab: 'evidence',
      action: 'Inspect Root Cause',
    },
    {
      label: 'EVIDENCE',
      value: evidence,
      tab: 'telemetry',
      action: 'Inspect Waveform & Telemetry',
    },
    {
      label: 'CONFIDENCE',
      value: confidence,
      tab: 'trace',
      action: 'Inspect Agent Trace',
      isMono: true,
    },
  ];

  return (
    <section style={{
      padding: '28px 0',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => onOpenEvidenceTab(item.tab)}
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'border-color var(--trans-hover), background-color var(--trans-hover)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.backgroundColor = 'var(--surface)';
            }}
          >
            <div>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>
                {item.label}
              </div>

              <div style={{
                fontSize: item.isMono ? '28px' : '15px',
                fontWeight: item.isMono ? 600 : 500,
                fontFamily: item.isMono ? 'var(--font-mono)' : 'var(--font-sans)',
                color: 'var(--foreground)',
                lineHeight: 1.45,
              }}>
                {item.value}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--foreground-soft)',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <span>{item.action}</span>
              <ArrowRight size={13} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
