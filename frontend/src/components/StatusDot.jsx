import React from 'react';

export default function StatusDot({ status = 'healthy', pulse = false, size = 6 }) {
  const colorMap = {
    critical: 'var(--critical)',
    warning: 'var(--warning)',
    success: 'var(--success)',
    healthy: 'var(--success)',
    info: 'var(--accent)',
    idle: 'var(--text-dim)',
  };

  const bg = colorMap[status] || 'var(--text-muted)';

  return (
    <span
      className={pulse ? 'pulse-quiet' : ''}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'inline-block',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
