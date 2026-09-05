import React from 'react';
import { Lock, ArrowRight, Check } from 'lucide-react';
import SectionLabel from './SectionLabel';

export default function AgentTrace({
  currentStepIndex = 3, // 0: Detected, 1: Investigated, 2: Assessed, 3: Recommended, 4: Authorized
  onOpenTraceDrawer = () => {},
  isAuthorized = false,
  statements = null,
}) {
  const steps = [
    { label: 'Detected', role: 'Watcher' },
    { label: 'Investigated', role: 'Analyst' },
    { label: 'Assessed', role: 'Impact Model' },
    { label: 'Recommended', role: 'Advisor' },
    { label: isAuthorized ? 'Authorized' : 'Awaiting authorization', role: 'Executor', isLocked: !isAuthorized },
  ];

  const activeStatements = (statements && statements.length) ? statements : [
    'Watcher detected frame rate and audio clock phase deviations in the Cannes DCP ingest stream.',
    'Analyst correlated SMPTE 428-7 conformance reports, bitstream hashes, and recent lab history.',
    'Impact Model calculated $12,000 exposure across SLA penalty clauses and rush lab slot costs.',
    'Advisor prepared 3 ranked response playbooks with transparent residual risk profiles.',
    'Executor verified human cryptographic authorization and dispatched automated remediation order.',
  ];

  return (
    <section style={{
      padding: '32px 0',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <SectionLabel text="AGENT ANALYSIS SEQUENCE" />
          <div style={{ fontSize: '14px', color: 'var(--foreground-soft)', marginTop: '-8px' }}>
            {activeStatements[currentStepIndex] || activeStatements[3]}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenTraceDrawer}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--foreground)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          <span>Open analysis trace</span>
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Horizontal Operational Trace Flow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '16px 20px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        overflowX: 'auto',
      }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex || (idx === 4 && isAuthorized);
          const isCurrent = idx === currentStepIndex && !(idx === 4 && isAuthorized);

          return (
            <React.Fragment key={step.label}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 1,
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDone ? 'var(--foreground)' : isCurrent ? 'var(--accent)' : 'transparent',
                  border: isDone ? '1px solid var(--foreground)' : isCurrent ? '1px solid var(--accent)' : '1px solid var(--muted-deep)',
                  color: isDone ? 'var(--background)' : isCurrent ? 'var(--background)' : 'var(--muted)',
                  fontSize: '10px',
                }}>
                  {isDone ? (
                    <Check size={11} strokeWidth={3} />
                  ) : step.isLocked ? (
                    <Lock size={9} style={{ color: 'var(--muted)' }} />
                  ) : isCurrent ? (
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--background)' }} />
                  ) : (
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--muted-deep)' }} />
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isCurrent ? 600 : 400,
                    color: isDone ? 'var(--foreground)' : isCurrent ? 'var(--foreground)' : 'var(--muted)',
                  }}>
                    {step.label}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--muted-deep)', fontFamily: 'var(--font-mono)' }}>
                    {step.role}
                  </span>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: idx < currentStepIndex ? 'var(--foreground)' : 'var(--border-subtle)',
                  margin: '0 12px',
                  minWidth: '24px',
                  transition: 'background-color 300ms ease',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
