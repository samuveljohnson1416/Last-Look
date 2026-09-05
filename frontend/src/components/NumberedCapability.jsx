import React, { useState } from 'react';
import SectionLabel from './SectionLabel';

export default function NumberedCapability() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const capabilities = [
    {
      num: '01',
      title: 'Detect delivery risk',
      desc: 'Live QC telemetry and package signals surface timing and compliance anomalies before delivery failure occurs.',
      tag: 'REAL-TIME QC INGEST',
      svg: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
          <rect x="20" y="20" width="160" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <line x1="20" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <path d="M 30 60 Q 60 25 90 60 T 150 60" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="90" cy="60" r="4" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Investigate with evidence',
      desc: 'Autonomous agents correlate package metadata, SMPTE validation standards, and historical lab remediation data.',
      tag: 'ADK AGENT TRACE',
      svg: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
          <circle cx="100" cy="60" r="10" fill="currentColor">
            <animate attributeName="r" values="8;11;8" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="140" cy="60" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="64" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="110" y1="60" x2="136" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="100" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
            <animate attributeName="r" values="18;36" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Calculate the consequence',
      desc: 'Technical errors translate into clear deadline countdowns, financial exposure estimates, and screening slot risk.',
      tag: 'EXPOSURE MODEL',
      svg: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
          <rect x="30" y="70" width="25" height="30" rx="2" fill="currentColor" opacity="0.3" />
          <rect x="65" y="50" width="25" height="50" rx="2" fill="currentColor" opacity="0.4" />
          <rect x="100" y="30" width="25" height="70" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="135" y="15" width="25" height="85" rx="2" fill="currentColor" opacity="0.9" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'Keep people in control',
      desc: 'DCP Sentinel prepares actionable response plays, but a human supervisor must explicitly authorize execution.',
      tag: 'HUMAN-IN-THE-LOOP',
      svg: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
          <path d="M 100 25 L 140 40 L 140 75 Q 140 100 100 110 Q 60 100 60 75 L 60 40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="90" y="55" width="20" height="18" rx="2" fill="currentColor" />
          <path d="M 94 55 L 94 48 Q 94 42 100 42 Q 106 42 106 48 L 106 55" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }
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
        <SectionLabel text="CAPABILITIES" />
        <h2 style={{
          fontSize: 'var(--text-title)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)'
        }}>
          Everything you need to protect the premiere.<br />
          <span style={{ color: 'var(--muted)' }}>Nothing you don't.</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {capabilities.map((cap, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={cap.num}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 180px',
                alignItems: 'center',
                gap: '24px',
                padding: '36px 0',
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background-color 200ms ease',
                cursor: 'default'
              }}
            >
              {/* Mono Index */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: isHovered ? 'var(--foreground)' : 'var(--muted)',
                transition: 'color 200ms ease'
              }}>
                {cap.num}
              </div>

              {/* Title & Description */}
              <div style={{
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    letterSpacing: '-0.015em'
                  }}>
                    {cap.title}
                  </h3>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--muted)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>
                    {cap.tag}
                  </span>
                </div>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                  maxWidth: '680px'
                }}>
                  {cap.desc}
                </p>
              </div>

              {/* SVG Micro Graphic */}
              <div style={{
                width: '140px',
                height: '80px',
                color: isHovered ? 'var(--foreground)' : 'var(--muted-deep)',
                transition: 'color 240ms ease',
                justifySelf: 'end'
              }}>
                {cap.svg}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
