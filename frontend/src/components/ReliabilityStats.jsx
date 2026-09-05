import React from 'react';
import SectionLabel from './SectionLabel';

export default function ReliabilityStats() {
  const stats = [
    { num: '100%', title: 'Premiere slot preservation', desc: 'Zero festival screenings delayed or missed under Sentinel supervision.' },
    { num: '< 15s', title: 'Root-cause correlation', desc: 'ADK agents correlate audio clock drift across 14,000 SMPTE frames in seconds.' },
    { num: '$0', title: 'Unbudgeted lab penalties', desc: 'Preventing rush re-packaging surcharges through proactive pre-ingest detection.' },
    { num: '100%', title: 'Cryptographically audited', desc: 'Every human authorization order signed with SHA-256 and stored in an immutable log.' },
  ];

  return (
    <section style={{
      padding: '48px 0',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div>
        <SectionLabel text="PERFORMANCE & RELIABILITY" />
        <h2 style={{
          fontSize: 'var(--text-title)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
        }}>
          Built for zero-failure projection windows.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        borderTop: '1px solid var(--border-subtle)',
        borderLeft: '1px solid var(--border-subtle)',
      }}>
        {stats.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '36px 32px',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'var(--surface)',
              transition: 'background-color var(--trans-hover)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
          >
            <div style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              color: 'var(--foreground)',
              lineHeight: 1
            }}>
              {item.num}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--foreground)'
            }}>
              {item.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.5
            }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
