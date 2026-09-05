import React from 'react';
import { Check, Clock, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

export default function LifecycleRail({
  currentStage = 'incident', // 'create' | 'upload' | 'profile' | 'monitoring' | 'incident' | 'investigating' | 'recommending' | 'authorized' | 'recovery'
  stages = [
    { id: 'create', label: 'Case Created' },
    { id: 'upload', label: 'Package Ingest' },
    { id: 'profile', label: 'SMPTE Review' },
    { id: 'monitoring', label: 'QC Telemetry' },
    { id: 'incident', label: 'Anomaly Detected' },
    { id: 'investigating', label: 'Agent Correlation' },
    { id: 'recommending', label: 'Decision Prepared' },
    { id: 'authorized', label: 'Human Authorization' },
    { id: 'recovery', label: 'Recovery Verified' },
  ],
  compact = false
}) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: compact ? '12px 16px' : '16px 20px',
      width: '100%',
      overflowX: 'auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '680px',
        position: 'relative'
      }}>
        {stages.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;

          let dotColor = 'var(--text-dim)';
          let dotBorder = '1px solid var(--border)';
          let textColor = 'var(--text-muted)';

          if (isDone) {
            dotColor = 'var(--text)';
            dotBorder = '1px solid var(--border)';
            textColor = 'var(--text-soft)';
          } else if (isCurrent) {
            dotColor = stage.id === 'incident' ? 'var(--critical)' : 'var(--accent)';
            dotBorder = stage.id === 'incident' ? '1px solid rgba(255, 107, 103, 0.4)' : '1px solid rgba(159, 232, 227, 0.4)';
            textColor = stage.id === 'incident' ? 'var(--critical)' : 'var(--accent)';
          }

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 1
              }}>
                <div style={{
                  width: isCurrent ? 20 : 14,
                  height: isCurrent ? 20 : 14,
                  borderRadius: '50%',
                  background: isCurrent ? (stage.id === 'incident' ? 'rgba(255, 107, 103, 0.2)' : 'rgba(159, 232, 227, 0.2)') : (isDone ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg)'),
                  border: dotBorder,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms ease'
                }}>
                  {isDone ? (
                    <Check size={8} style={{ color: 'var(--text-soft)' }} />
                  ) : isCurrent ? (
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: stage.id === 'incident' ? 'var(--critical)' : 'var(--accent)'
                    }} />
                  ) : (
                    <div style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--text-dim)'
                    }} />
                  )}
                </div>

                <div style={{
                  fontSize: 'var(--text-micro)',
                  fontWeight: isCurrent ? 600 : 400,
                  color: textColor,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em'
                }}>
                  {stage.label}
                </div>
              </div>

              {/* Connecting Line between steps */}
              {idx < stages.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: idx < currentIndex ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  margin: '0 8px',
                  marginBottom: '16px'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
