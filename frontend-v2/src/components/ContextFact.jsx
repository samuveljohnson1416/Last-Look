import React from 'react';
import { ChevronRight } from 'lucide-react';

export function ContextFact({
  label,
  value,
  actionLabel = 'Inspect Evidence',
  onClick,
  isCritical = false
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--ease-premium) 160ms, border-color var(--ease-premium) 160ms'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.background = 'var(--surface-hover)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.background = 'var(--surface)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }
      }}
    >
      <div>
        <div style={{
          fontSize: 'var(--text-micro)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          marginBottom: '6px'
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 'var(--text-body)',
          fontWeight: 500,
          color: isCritical ? 'var(--critical)' : 'var(--text)',
          lineHeight: 1.4
        }}>
          {value}
        </div>
      </div>

      {onClick && (
        <div style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--accent)'
        }}>
          <span>{actionLabel}</span>
          <ChevronRight size={13} />
        </div>
      )}
    </div>
  );
}

export default ContextFact;
