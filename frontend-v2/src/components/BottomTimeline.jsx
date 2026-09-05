import React from 'react';

export default function BottomTimeline({
  stages = [
    { id: 'normal', label: 'NORMAL', time: '14:20:00' },
    { id: 'anomaly', label: 'ANOMALY', time: '14:22:08' },
    { id: 'detection', label: 'DETECTION', time: '14:22:10' },
    { id: 'investigation', label: 'INVESTIGATION', time: '14:22:15' },
    { id: 'root_cause', label: 'ROOT CAUSE', time: '14:22:24' },
    { id: 'recommendation', label: 'RECOMMENDATION', time: '14:22:31' },
    { id: 'decision', label: 'DECISION', time: '14:23:00' },
    { id: 'execution', label: 'EXECUTION', time: '14:23:12' },
    { id: 'recovery', label: 'RECOVERY', time: '14:23:45' },
  ],
  currentStageIndex = 4,
  onSelectStage,
}) {
  return (
    <div
      style={{
        height: '100px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '0.5px solid var(--border-default)',
        padding: '0 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
        userSelect: 'none',
      }}
    >
      {/* Top Title (10px muted) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Incident Lifecycle
          </span>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Stage {currentStageIndex + 1} / {stages.length}
          </span>
        </div>

        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          Click node to navigate
        </span>
      </div>

      {/* Nodes and Connecting 1px Lines */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background track line (1px) */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '10px',
            right: '10px',
            height: '1px',
            backgroundColor: 'var(--border-default)',
            zIndex: 1,
          }}
        />

        {/* Dynamic completed progress line (1px) */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '10px',
            width: `${(currentStageIndex / (stages.length - 1)) * 98}%`,
            height: '1px',
            backgroundColor: 'var(--accent-cyan)',
            transition: 'width var(--transition-panel)',
            zIndex: 2,
          }}
        />

        {/* 9 Stages: 8px Circles */}
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isActive = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;

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
              }}
              title={`Jump to ${stage.label}`}
            >
              {/* 8px Circle */}
              <div
                className={isActive ? 'pulse-cyan' : ''}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted
                    ? 'var(--success)'
                    : isActive
                    ? 'var(--accent-cyan)'
                    : 'var(--bg-secondary)',
                  border: isPending ? '1px solid var(--border-default)' : 'none',
                  boxShadow: isActive ? '0 0 8px var(--accent-cyan)' : 'none',
                  transition: 'all var(--transition-micro)',
                }}
              />

              {/* Stage Label */}
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: isActive ? 600 : isCompleted ? 500 : 400,
                  color: isActive
                    ? 'var(--accent-cyan)'
                    : isCompleted
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                  marginTop: '6px',
                  letterSpacing: '0.02em',
                }}
              >
                {stage.label}
              </span>

              {/* Timestamp (9px monospace muted) */}
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  marginTop: '1px',
                }}
              >
                {stage.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
