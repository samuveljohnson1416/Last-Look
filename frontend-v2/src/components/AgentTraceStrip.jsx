import React, { useState } from 'react';
import { ArrowRight, Lock, Check, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function AgentTraceStrip({
  currentStepIndex = 3, // 0: detecting, 1: investigating, 2: assessing, 3: recommending, 4: waiting / authorized
  onOpenTraceDrawer,
  isAuthorized = false,
}) {
  const [showSummaryList, setShowSummaryList] = useState(false);

  const steps = [
    { id: 'detecting', label: 'DETECTING' },
    { id: 'investigating', label: 'INVESTIGATING' },
    { id: 'assessing', label: 'ASSESSING' },
    { id: 'recommending', label: 'RECOMMENDING' },
    { id: 'waiting', label: isAuthorized ? 'AUTHORIZED' : 'WAITING FOR YOU' },
  ];

  const traceSummaries = [
    '✓ Watcher detected an audio timing deviation',
    '✓ Analyst checked QC events and package metadata',
    '✓ Analyst found an incompatible SMPTE export preset',
    '✓ Impact model calculated deadline and financial exposure',
    '✓ Advisor prepared response options',
    isAuthorized
      ? '✓ Executor recorded authorized response'
      : '🔒 Executor is locked until you approve a response',
  ];

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 0',
        borderBottom: '1px solid var(--border-soft)',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Horizontal Agent Step Sequence */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginRight: '6px',
            }}
          >
            Analysis Trace
          </span>

          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex || (isAuthorized && idx === 4);
            const isActive = idx === currentStepIndex && !isAuthorized;

            return (
              <React.Fragment key={step.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    color: isActive
                      ? 'var(--accent)'
                      : isCompleted
                      ? 'var(--text-soft)'
                      : 'var(--text-dim)',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'color var(--trans-control)',
                  }}
                >
                  {isCompleted ? (
                    <Check size={11} color="var(--accent)" />
                  ) : isActive ? (
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                      }}
                    />
                  ) : null}
                  <span>{step.label}</span>
                </div>

                {idx < steps.length - 1 && (
                  <span style={{ color: 'var(--border)', fontSize: '11px' }}>→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Lock Boundary & Open Evidence Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Lock size={12} color={isAuthorized ? 'var(--success)' : 'var(--text-dim)'} />
            <span>{isAuthorized ? 'Execution logged' : 'Executor locked'}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowSummaryList(!showSummaryList)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{showSummaryList ? 'Hide findings' : 'View findings'}</span>
            {showSummaryList ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          <button
            type="button"
            onClick={onOpenTraceDrawer}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 0',
            }}
          >
            <span>Open evidence</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Expandable Operational Findings */}
      {showSummaryList && (
        <div
          className="panel-quiet"
          style={{
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-soft)',
            marginTop: '4px',
          }}
        >
          {traceSummaries.map((line, i) => (
            <div key={i} style={{ color: line.includes('🔒') ? 'var(--text-muted)' : 'var(--text-soft)' }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
