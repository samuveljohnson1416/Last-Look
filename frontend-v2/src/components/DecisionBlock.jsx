import React from 'react';
import { ChevronRight, ChevronDown, Lock, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function DecisionBlock({
  option = {
    id: 1,
    indexStr: '01',
    rank: 'RECOMMENDED',
    action: 'Repackage and rush-deliver',
    intent: 'Fastest path to protect the Cannes screening window.',
    cost: '$8,500',
    time: '4 hours',
    residualRisk: 'Lowest residual risk',
    confidence: '94%',
    expectedBenefit: 'Guaranteed Palais Grand Lumière Gala slot preservation with clean 24.000 fps audio clock alignment.',
    whatCouldGoWrong: 'Requires immediate supervisor authorization; delay beyond 60 minutes reduces buffer margin to 2 hours.',
    evidenceBasis: 'Audio clock drift (+35.2 ms) detected in Center channel; resolved previously via standard 4h re-wrap.',
    executorAction: 'Dispatch Aspera 10Gbps re-wrap order #ASP-8842-CA and log Grafana Cloud audit annotation.',
  },
  isSelected = false,
  onSelect = () => {},
  onOpenApproval = () => {},
  isExecuting = false,
  isExecuted = false,
  isApproved = false,
}) {
  const isRecommended = option.rank === 'RECOMMENDED';

  return (
    <div
      onClick={() => !isExecuted && onSelect(option.id)}
      style={{
        border: isSelected
          ? '1px solid var(--foreground)'
          : isRecommended
          ? '1px solid var(--border-strong)'
          : '1px solid var(--border-subtle)',
        borderRadius: '4px',
        backgroundColor: isSelected ? 'var(--surface-selected)' : 'var(--surface)',
        padding: '24px 28px',
        cursor: isExecuted ? 'default' : 'pointer',
        transition: 'all 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: isExecuted && !isApproved ? 0.35 : 1,
        marginBottom: '12px',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isExecuted) e.currentTarget.style.borderColor = 'var(--border)';
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isExecuted) {
          e.currentTarget.style.borderColor = isRecommended ? 'var(--border-strong)' : 'var(--border-subtle)';
        }
      }}
    >
      {/* Top Meta & Action Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: isSelected ? 'var(--foreground)' : 'var(--muted)' }}>
              {option.indexStr || '01'}
            </span>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: isRecommended ? 'var(--accent)' : 'var(--muted)',
            }}>
              {option.rank}
            </span>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--foreground)',
            letterSpacing: '-0.015em',
            marginBottom: '6px',
          }}>
            {option.action}
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
            {option.intent}
          </p>
        </div>

        {/* Metrics Pill Grid */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--foreground-soft)',
          padding: '8px 14px',
          backgroundColor: 'var(--background-elevated)',
          borderRadius: '4px',
          border: '1px solid var(--border-subtle)',
        }}>
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px' }}>COST</span>
            <span style={{ fontWeight: 600, color: option.cost === '$0' ? 'var(--foreground)' : 'var(--foreground)' }}>
              {option.cost}
            </span>
          </div>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-subtle)' }} />
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px' }}>TIME</span>
            <span>{option.time}</span>
          </div>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-subtle)' }} />
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px' }}>RISK</span>
            <span style={{ color: isRecommended ? 'var(--success)' : 'var(--muted)' }}>
              {option.residualRisk}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Content when Selected */}
      {isSelected && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Expected Benefit
              </span>
              <p style={{ color: 'var(--foreground-soft)', marginTop: '4px', lineHeight: 1.5 }}>
                {option.expectedBenefit}
              </p>
            </div>

            <div>
              <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Residual Risk & Vulnerability
              </span>
              <p style={{ color: 'var(--foreground-soft)', marginTop: '4px', lineHeight: 1.5 }}>
                {option.whatCouldGoWrong}
              </p>
            </div>

            <div>
              <span style={{ color: 'var(--muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Automated Executor Dispatch Plan
              </span>
              <p style={{ color: 'var(--foreground-soft)', marginTop: '4px', lineHeight: 1.5 }}>
                {option.executorAction}
              </p>
            </div>
          </div>

          {/* Confirmation & Authorization Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
              <Lock size={13} style={{ color: 'var(--muted)' }} />
              <span>Executor locked · requires explicit human authorization</span>
            </div>

            <div>
              {isApproved ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--success)' }}>
                  <CheckCircle2 size={16} />
                  <span>Authorized by Post-Production Supervisor · Execution logged</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-pill-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenApproval(option.id);
                  }}
                  disabled={isExecuting}
                  style={{ height: '42px', padding: '0 24px', fontSize: '13px' }}
                >
                  <span>{isExecuting ? 'Recording authorization...' : 'Review and approve response'}</span>
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
