import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ContextFacts({
  rootCause = '24.000 fps export preset used for a 23.976 fps package',
  evidence = 'Three matching QC incidents found in recent delivery history',
  confidence = '99.2%',
  onOpenEvidenceTab,
}) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        padding: '20px 0',
        borderBottom: '1px solid var(--border-soft)',
      }}
    >
      {/* Fact 1: Root Cause */}
      <div
        onClick={() => onOpenEvidenceTab && onOpenEvidenceTab('evidence')}
        className="panel-quiet"
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '14px 16px',
          transition: 'all var(--trans-control)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Root Cause
          </span>
          <ChevronRight size={13} color="var(--text-dim)" />
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text)',
            lineHeight: 1.45,
          }}
        >
          {rootCause}
        </div>
      </div>

      {/* Fact 2: Evidence */}
      <div
        onClick={() => onOpenEvidenceTab && onOpenEvidenceTab('telemetry')}
        className="panel-quiet"
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '14px 16px',
          transition: 'all var(--trans-control)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Evidence
          </span>
          <ChevronRight size={13} color="var(--text-dim)" />
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text)',
            lineHeight: 1.45,
          }}
        >
          {evidence}
        </div>
      </div>

      {/* Fact 3: Confidence */}
      <div
        onClick={() => onOpenEvidenceTab && onOpenEvidenceTab('trace')}
        className="panel-quiet"
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '14px 16px',
          transition: 'all var(--trans-control)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Confidence
          </span>
          <ChevronRight size={13} color="var(--text-dim)" />
        </div>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.4,
          }}
        >
          {confidence}
        </div>
      </div>
    </section>
  );
}
