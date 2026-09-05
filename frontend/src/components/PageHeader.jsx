import React from 'react';

export default function PageHeader({
  contextLabel,
  title,
  subtitle,
  actions,
}) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border-soft)',
        marginBottom: '28px',
      }}
    >
      {contextLabel && (
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          {contextLabel}
        </span>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-soft)',
                marginTop: '6px',
                maxWidth: '720px',
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
