import React from 'react';
import { ArrowRight, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';

export default function DecisionRail({
  selectedOptionId = 1,
  onSelectOption,
  onOpenApproval,
  isExecuting = false,
  isExecuted = false,
  authorizedOptionId = 1,
}) {
  const options = [
    {
      id: 1,
      rank: 'RECOMMENDED',
      action: 'Repackage and rush-deliver',
      intent: 'Fastest path to protect the Cannes screening window.',
      cost: '$8,500',
      time: '4 hours',
      residualRisk: 'Low',
      confidence: '94%',
      expectedOutcome: 'Delivery-ready package before cutoff',
      expectedBenefit: 'Guaranteed Palais Grand Lumière Gala slot preservation with clean 24.000 fps audio clock alignment.',
      whatCouldGoWrong: 'Requires immediate supervisor authorization; delay beyond 60 minutes reduces buffer margin to 2 hours.',
      evidenceBasis: 'Audio clock drift (+35.2 ms) detected in Center channel; resolved previously via standard 4h re-wrap.',
      executorAction: 'Dispatch Aspera 10Gbps re-wrap order #ASP-8842-CA and log Grafana Cloud audit annotation.',
    },
    {
      id: 2,
      rank: 'BALANCED',
      action: 'Request a delivery extension',
      intent: 'Avoids immediate rush cost, but depends on festival approval.',
      cost: '$0',
      time: 'Up to 24 hours',
      residualRisk: 'Medium',
      confidence: '61%',
      expectedOutcome: 'Possible additional delivery time',
      expectedBenefit: 'Avoids $8,500 rush fee if technical committee approves a 12-hour ingest delay window.',
      whatCouldGoWrong: 'Festival committee may reassign prime Palais screening slot to the backup gala title.',
      evidenceBasis: 'Cannes regulations permit emergency petitions up to 48 hours prior to opening night.',
      executorAction: 'Generate official Cannes ingest petition draft and record non-rush status in audit log.',
    },
    {
      id: 3,
      rank: 'MINIMAL',
      action: 'Submit the current package',
      intent: 'No immediate cost, but the package may fail festival technical QC.',
      cost: '$0',
      time: 'Immediate',
      residualRisk: 'High',
      confidence: '18%',
      expectedOutcome: 'Uncertain',
      expectedBenefit: 'Zero immediate cost; attempts playback using projectionist manual CP950 matrix override.',
      whatCouldGoWrong: 'Severe audio phase cancellation in Center channel; high probability of rejection at theater ingest.',
      evidenceBasis: 'SMPTE 428-7 automated conformance check failed phase alignment rule.',
      executorAction: 'Flag package as non-standard in festival registry and record supervisor disclaimer.',
    },
  ];

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        padding: '24px 0',
        borderBottom: '1px solid var(--border-soft)',
      }}
    >
      {/* Title & Subtitle */}
      <div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}
        >
          Choose a response
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
          }}
        >
          The analysis is complete. DCP Sentinel will not make changes or record a delivery response unless you explicitly approve one.
        </p>
      </div>

      {/* Ranked Decision Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isApproved = isExecuted && authorizedOptionId === opt.id;
          const isRecommended = opt.rank === 'RECOMMENDED';

          return (
            <div
              key={opt.id}
              onClick={() => !isExecuted && onSelectOption && onSelectOption(opt.id)}
              style={{
                borderRadius: '6px',
                backgroundColor: isSelected ? 'var(--bg-raised)' : 'var(--surface)',
                border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-soft)',
                padding: isSelected ? '18px 22px' : '14px 22px',
                cursor: isExecuted ? 'default' : 'pointer',
                transition: 'all var(--trans-control)',
                opacity: isExecuted && !isApproved ? 0.45 : 1,
              }}
            >
              {/* Top Row: Rank Badge + Action Title + Key Metrics */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      backgroundColor: isRecommended ? 'var(--cyan-subtle)' : 'transparent',
                      color: isRecommended ? 'var(--accent)' : 'var(--text-muted)',
                      border: isRecommended ? '1px solid rgba(159, 232, 227, 0.25)' : '1px solid var(--border)',
                    }}
                  >
                    [ {opt.rank} ]
                  </span>

                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {opt.action}
                  </span>
                </div>

                {/* Condensed Metrics Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-soft)',
                  }}
                >
                  <span style={{ fontWeight: 600, color: opt.cost === '$0' ? 'var(--text)' : 'var(--accent)' }}>
                    Cost: {opt.cost}
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>·</span>
                  <span>Time: {opt.time}</span>
                  <span style={{ color: 'var(--text-dim)' }}>·</span>
                  <span style={{ color: opt.residualRisk === 'Low' ? 'var(--success)' : opt.residualRisk === 'Medium' ? 'var(--warning)' : 'var(--critical)' }}>
                    Residual risk: {opt.residualRisk}
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>·</span>
                  <span>Confidence: {opt.confidence}</span>
                </div>
              </div>

              {/* Sub-intent */}
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                {opt.intent}
              </div>

              {/* Expanded Details when Selected */}
              {isSelected && (
                <div
                  style={{
                    marginTop: '14px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-soft)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Expected Benefit & Outcome
                      </span>
                      <p style={{ color: 'var(--text-soft)', marginTop: '4px', lineHeight: 1.45 }}>
                        {opt.expectedBenefit}
                      </p>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Residual Vulnerability / Risk
                      </span>
                      <p style={{ color: 'var(--text-soft)', marginTop: '4px', lineHeight: 1.45 }}>
                        {opt.whatCouldGoWrong}
                      </p>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Supporting Evidence
                      </span>
                      <p style={{ color: 'var(--text-soft)', marginTop: '4px', lineHeight: 1.45 }}>
                        {opt.evidenceBasis}
                      </p>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Action Dispatched on Approval
                      </span>
                      <p style={{ color: 'var(--text-soft)', marginTop: '4px', lineHeight: 1.45 }}>
                        {opt.executorAction}
                      </p>
                    </div>
                  </div>

                  {/* Confirmation / Execution Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border-soft)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <Lock size={12} color="var(--text-dim)" />
                      <span>Executor locked · awaiting explicit human authorization</span>
                    </div>

                    <div>
                      {isApproved ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            color: 'var(--success)',
                            fontWeight: 500,
                          }}
                        >
                          <CheckCircle2 size={16} />
                          <span>Authorized by Post-Production Supervisor · Execution logged</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn-quiet btn-primary-cyan"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenApproval) onOpenApproval(opt.id);
                          }}
                          disabled={isExecuting}
                          style={{ padding: '8px 18px', fontSize: '13px' }}
                        >
                          {isExecuting ? 'Recording response...' : 'Review and approve response'}
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
