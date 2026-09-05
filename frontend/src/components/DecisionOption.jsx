import React from 'react';
import { ShieldCheck, ChevronDown, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export default function DecisionOption({
  option = {
    id: 'play-1',
    badge: 'RECOMMENDED',
    title: 'Repackage and rush-deliver',
    summary: 'Fastest path to protect the screening window.',
    cost: '$8,500',
    time: '4 hours',
    risk: 'Lowest residual risk',
    confidence: '99.2%',
    benefit: 'Guarantees delivery before festival lock. Re-renders master DCP with corrected 24fps SMPTE timing.',
    residualRiskDesc: 'Requires expedited lab slot. No festival schedule modification needed.',
    whatCouldGoWrong: 'Lab render timeout (fallback to secondary Aspera node ready).',
    executorAction: 'Executor will trigger automated lab repackage playbook and notify festival coordinator with updated hash.'
  },
  isSelected = false,
  onSelect = () => {},
  onReview = () => {}
}) {
  const isRecommended = option.badge === 'RECOMMENDED';

  return (
    <div
      style={{
        background: isSelected ? 'var(--surface-selected)' : 'var(--surface)',
        border: isSelected
          ? '1px solid var(--accent)'
          : isRecommended
            ? '1px solid rgba(159, 232, 227, 0.25)'
            : '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 200ms var(--ease-premium)'
      }}
    >
      {/* Top Header Section */}
      <div
        onClick={() => onSelect(option.id)}
        style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isSelected ? 'rgba(159, 232, 227, 0.03)' : 'transparent'
        }}
      >
        <div style={{ flex: 1, paddingRight: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: 'var(--text-micro)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isRecommended ? 'var(--accent)' : 'var(--text-muted)',
              background: isRecommended ? 'var(--accent-subtle)' : 'var(--surface-hover)',
              padding: '2px 6px',
              borderRadius: '3px'
            }}>
              {option.badge}
            </span>
          </div>

          <div style={{
            fontSize: 'var(--text-body)',
            fontWeight: 500,
            color: 'var(--text)',
            marginBottom: '4px'
          }}>
            {option.title}
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {option.summary}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '10px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-soft)'
          }}>
            <span>{option.cost}</span>
            <span>·</span>
            <span>{option.time}</span>
            <span>·</span>
            <span style={{ color: isRecommended ? 'var(--success)' : 'var(--text-muted)' }}>{option.risk}</span>
          </div>
        </div>

        <div style={{ paddingTop: '4px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(option.id);
            }}
            style={{
              background: isSelected ? 'var(--foreground)' : 'var(--surface-hover)',
              border: isSelected ? '1px solid var(--foreground)' : '1px solid var(--border)',
              color: isSelected ? 'var(--background)' : 'var(--foreground)',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 160ms var(--ease-premium)'
            }}
          >
            <span>{isSelected ? 'Selected' : 'Review response'}</span>
            {isSelected ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Details when selected */}
      {isSelected && (
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--background-elevated)',
          fontSize: 'var(--text-xs)',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', fontSize: 'var(--text-micro)' }}>
                Expected Benefit
              </div>
              <div style={{ color: 'var(--text)' }}>{option.benefit}</div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', fontSize: 'var(--text-micro)' }}>
                Residual Risk & Mitigation
              </div>
              <div style={{ color: 'var(--text)' }}>{option.residualRiskDesc}</div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg)',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid var(--border-soft)',
            marginBottom: '16px'
          }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', fontSize: 'var(--text-micro)' }}>
              Executor Action Plan (Locked until authorization)
            </div>
            <div style={{ color: 'var(--text-soft)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>{option.executorAction}</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button
              onClick={() => onReview(option)}
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 12px rgba(159, 232, 227, 0.2)'
              }}
            >
              <span>Review and approve response</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
