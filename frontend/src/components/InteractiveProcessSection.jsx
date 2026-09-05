import React, { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import { Terminal, Shield, CheckCircle2, Lock, Cpu, Play } from 'lucide-react';

export default function InteractiveProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      roman: 'I',
      num: '01',
      title: 'Continuous Ingest & SMPTE Audit',
      subtitle: 'Real-time telemetry listening to package manifests and delivery pipes',
      desc: 'DCP Sentinel ingests CPL XML schemas, MXF track essence headers, and Aspera transfer pipes the millisecond an asset is uploaded. Any deviation from SMPTE 428-1 or 429-2 is immediately flagged.',
      codeLines: [
        '// DCP Sentinel Daemon: Ingest Phase',
        'POST /api/v1/telemetry/ingest-stream',
        'STREAM: s3://cannes-dcp-vault/last_harvest_dci4k_v2.4/',
        'SCANNING: ASSETMAP.xml [SHA-1: 8b29c91... OK]',
        'SCANNING: PKL_b4991.xml [UUID: c01a91e4... OK]',
        'AUDITING: CPL_audio_essence_cannes.xml',
        'WARN: Dolby CP950 audio clock drift detected (+35.2ms)',
        'FLAG: Potential frame mismatch (24.000 fps preset on 23.976 source)',
      ],
      tag: 'STREAM INGESTION'
    },
    {
      roman: 'II',
      num: '02',
      title: 'Autonomous Root-Cause & Exposure Pricing',
      subtitle: 'Multi-agent correlation without human fatigue',
      desc: 'Specialized ADK agents correlate historical lab incidents, playback server tolerances, and festival cutoff rules. The system models the exact financial consequence ($12,000 SLA penalty) before notifying supervisors.',
      codeLines: [
        '// Autonomous Multi-Agent Investigation Loop',
        'AGENT_START: [QC & Standards Auditor]',
        'AGENT_START: [Festival Requirements Validator]',
        'AGENT_START: [Delivery & Financial Impact Engine]',
        'HISTORICAL_MATCH: 3 incidents matching "24.000 vs 23.976 drift"',
        'EXPOSURE_CALCULATION: Gala slot loss ($12,000.00)',
        'DEADLINE_CUTOFF: Cannes Grand Théâtre Lumière: 71h 45m remaining',
        'STATUS: 3 remediation responses prepared with trade-off matrices',
      ],
      tag: 'ADK AGENT CORRELATION'
    },
    {
      roman: 'III',
      num: '03',
      title: 'Controlled Decision & Cryptographic Execution',
      subtitle: 'AI investigates. Human decides. The system records.',
      desc: 'The system will never execute a destructive re-encode or submit unverified master reels autonomously. A human post-production supervisor must explicitly sign off, generating an immutable audit trail.',
      codeLines: [
        '// Human Authorization Gate (ISO/IEC 27001)',
        'GATE_STATUS: [LOCKED] Waiting for explicit human supervisor signature',
        'RECOMMENDED_ACTION: Option 01 (Repackage and rush-deliver)',
        'AUTHORIZATION_RECEIVED: Elena Rostova (Head of Post-Production)',
        'SIGNATURE_HASH: 0x9f4a8b72e1c944a9e338164b19b671a938c5b91f',
        'DISPATCH_ASPERA: 10Gbps re-wrap pipeline #ASP-8842-CA initiated',
        'AUDIT_LOG_APPENDED: Hash sealed to immutable SQLite trail',
        'RESULT: Gala premiere screening preserved safely.',
      ],
      tag: 'HUMAN ESCROW & AUDIT'
    },
  ];

  const current = steps[activeStep];

  return (
    <section style={{
      padding: '48px 0',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      <div>
        <SectionLabel text="OPERATIONAL ARCHITECTURE" />
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          lineHeight: 1.1,
          maxWidth: '850px'
        }}>
          AI investigates. Human decides.<br />
          <span style={{ color: 'var(--muted)' }}>
            The system records the authorized response.
          </span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'stretch'
      }}>
        {/* Left Column: Interactive Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '24px 28px',
                  backgroundColor: isActive ? 'var(--surface-hover)' : 'var(--surface)',
                  border: isActive ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all var(--trans-hover)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: 'var(--foreground)'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: isActive ? 'var(--foreground)' : 'var(--muted)',
                      letterSpacing: '0.05em'
                    }}>
                      PHASE {step.roman}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--foreground-soft)',
                      letterSpacing: '0.06em'
                    }}>
                      {step.tag}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--muted-deep)'
                  }}>
                    {step.num} / 03
                  </span>
                </div>

                <h3 style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--foreground)',
                  marginBottom: '6px'
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '13px',
                  color: 'var(--muted)',
                  lineHeight: 1.5
                }}>
                  {step.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Terminal Telemetry Screen */}
        <div style={{
          backgroundColor: '#050505',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          position: 'relative',
          minHeight: '340px'
        }}>
          {/* Terminal Title Bar */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '14px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} style={{ color: 'var(--foreground-soft)' }} />
                <span style={{ fontSize: '12px', color: 'var(--foreground)', letterSpacing: '0.04em' }}>
                  SENTINEL-DAEMON / {current.tag}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} className="pulse-quiet" />
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>LIVE KERNEL</span>
              </div>
            </div>

            {/* Code Output with Keyframe Reveal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {current.codeLines.map((line, lIdx) => {
                const isWarn = line.includes('WARN:') || line.includes('FLAG:');
                const isAuth = line.includes('AUTHORIZATION_RECEIVED:') || line.includes('RECOMMENDED_ACTION:');
                const isHash = line.includes('SIGNATURE_HASH:');

                return (
                  <div
                    key={`${activeStep}-${lIdx}`}
                    className="dev-code-line"
                    style={{
                      fontSize: '12px',
                      lineHeight: 1.6,
                      animationDelay: `${lIdx * 0.05}s`,
                      color: isWarn ? 'var(--critical)' : isAuth ? 'var(--accent)' : isHash ? 'var(--foreground)' : 'var(--muted)'
                    }}
                  >
                    <span style={{ color: 'var(--text-dim)', marginRight: '10px', userSelect: 'none' }}>
                      {String(lIdx + 1).padStart(2, '0')}
                    </span>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Descriptive Caption */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '12px',
            color: 'var(--foreground-soft)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.5
          }}>
            {current.desc}
          </div>
        </div>
      </div>
    </section>
  );
}
