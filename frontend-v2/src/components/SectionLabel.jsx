import React from 'react';

export default function SectionLabel({ children, text }) {
  const content = children || text;
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginBottom: '16px'
    }}>
      <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--border-strong)', display: 'inline-block' }} />
      <span>{content}</span>
    </div>
  );
}
