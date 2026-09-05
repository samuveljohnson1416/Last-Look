import React from 'react';

export default function IncidentTimeline({
  stages = [
    { id: 'normal', label: 'NORMAL', time: '14:20' },
    { id: 'anomaly', label: 'ANOMALY', time: '14:22' },
    { id: 'detected', label: 'DETECTED', time: '14:22' },
    { id: 'investigated', label: 'INVESTIGATED', time: '14:22' },
    { id: 'impacted', label: 'IMPACTED', time: '14:22' },
    { id: 'decision', label: 'DECISION', time: '14:23' },
    { id: 'executed', label: 'EXECUTED', time: '14:23' },
  ],
  currentStageIndex = 5, // 'decision'
  onSelectStage,
}) {
  return (
    <footer
      style={{
        height: '80px',
        backgroundColor: 'var(--ink)',
        borderTop: '1px solid var(--line-soft)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        position: 'sticky',
        bottom: 0,
        zIndex: 30,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background thin track line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '20px',
            right: '20px',
            height: '1px',
            backgroundColor: 'var(--line-soft)',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        />

        {/* Progress line up to active stage */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '20px',
            width: `${(currentStageIndex / (stages.length - 1)) * 95}%`,
            height: '1px',
            backgroundColor: 'var(--cyan)',
            transform: 'translateY(-50%)',
            transition: 'width var(--trans-panel)',
            zIndex: 2,
          }}
        />

        {/* Nodes */}
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isActive = idx === currentStageIndex;
          const isFuture = idx > currentStageIndex;

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage && onSelectStage(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 3,
                cursor: 'pointer',
                padding: '4px 8px',
                position: 'relative',
              }}
              title={`Stage: ${stage.label}`}
            >
              {/* Small Node Circle (6px) */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isActive
                    ? 'var(--cyan)'
                    : isCompleted
                    ? 'var(--white-soft)'
                    : 'var(--ink)',
                  border: isFuture ? '1px solid var(--gray-dim)' : 'none',
                  boxShadow: isActive ? '0 0 6px var(--cyan)' : 'none',
                  transition: 'all var(--trans-control)',
                }}
              />

              {/* Stage Label */}
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? 'var(--cyan)'
                    : isCompleted
                    ? 'var(--white-soft)'
                    : 'var(--gray-dim)',
                  marginTop: '8px',
                }}
              >
                {stage.label}
              </span>

              {/* Only show timestamp on active and latest completed stage to avoid clutter */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--cyan)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stage.time} CET
                </span>
              )}
            </div>
          );
        })}
      </div>
    </footer>
  );
}
