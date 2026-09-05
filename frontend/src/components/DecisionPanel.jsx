import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Server, CheckCircle2 } from 'lucide-react';

export default function DecisionPanel({
  selectedOptionId = 1,
  onSelectOption,
  onAuthorize,
  isExecuting = false,
  isExecuted = false,
}) {
  const options = [
    {
      id: 1,
      title: 'Re-export DCP, rush delivery',
      description: 'Re-render SMPTE CPL with 24.000 fps cadence in Soho and beam via Aspera 10Gbps satellite link.',
      cost: '$1,000',
      success: '100%',
      time: '4 hours',
      icon: Server,
    },
    {
      id: 2,
      title: 'Live Dolby CP950 Audio Matrix Remap',
      description: 'Apply phase invert matrix filter on Dolby CP950 cinema processor via API without re-uploading package.',
      cost: '$250',
      success: '92%',
      time: '15 mins',
      icon: Zap,
    },
    {
      id: 3,
      title: 'Failover to Backup ProRes 422HQ Stream',
      description: 'Bypass primary DCI server and route secondary backup server directly through 12G-SDI stage matrix.',
      cost: '$0',
      success: '85%',
      time: 'Instant (<10s)',
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '16px',
        minHeight: '280px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            Recommended Actions
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Advisor-formulated mitigation playbooks awaiting executive sign-off
          </p>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Human Gate: <span style={{ color: 'var(--accent-cyan)' }}>ACTIVE</span>
        </div>
      </div>

      {/* 3 Option Cards (260px each) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              className={`card-command hover-glow ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectOption && onSelectOption(opt.id)}
              style={{
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative',
                minHeight: '195px',
                borderWidth: isSelected ? '1px' : '0.5px',
                borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-default)',
              }}
            >
              {/* Checkmark Badge for Selected Card (tiny 16px) */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#030303',
                  }}
                >
                  <Check size={11} strokeWidth={2.5} />
                </div>
              )}

              <div>
                {/* Title & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', paddingRight: '20px' }}>
                  <Icon size={14} color={isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {opt.title}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    marginBottom: '10px',
                  }}
                >
                  {opt.description}
                </p>

                {/* Metrics Row: Cost, Success, Time */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--surface-default)',
                    border: '0.5px solid var(--border-default)',
                    marginBottom: '12px',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cost</div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--accent-cyan)',
                      }}
                      className="tabular-nums font-mono"
                    >
                      {opt.cost}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Success</div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--success)',
                        marginTop: '2px',
                      }}
                      className="tabular-nums font-mono"
                    >
                      {opt.success}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time</div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--accent-amber)',
                        marginTop: '2px',
                      }}
                      className="tabular-nums font-mono"
                    >
                      {opt.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button (36px, 80% opacity cyan) */}
              <button
                type="button"
                className={`btn-command ${isSelected ? 'btn-cyan' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectOption) onSelectOption(opt.id);
                  if (onAuthorize) onAuthorize(opt.id);
                }}
                disabled={isExecuting || isExecuted}
                style={{
                  width: '100%',
                  height: '36px',
                  fontSize: '13px',
                }}
              >
                {isExecuted && isSelected ? (
                  <>
                    <CheckCircle2 size={14} /> Approved & Executed
                  </>
                ) : isExecuting && isSelected ? (
                  <>
                    <span className="pulse-cyan" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#030303' }} />
                    Dispatching...
                  </>
                ) : (
                  <>
                    Approve
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
