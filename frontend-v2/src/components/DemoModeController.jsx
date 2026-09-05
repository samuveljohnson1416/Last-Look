import React from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, FastForward, Activity } from 'lucide-react';

export default function DemoModeController({
  isDemoMode = true,
  onToggleDemo = () => {},
  onResetScenario = () => {},
  onTriggerIncident = () => {},
  currentStage = 'normal', // 'normal' | 'anomaly' | 'investigating' | 'ready' | 'authorized' | 'recovered'
  onAdvanceStep = null
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isDemoMode ? 'var(--accent)' : 'var(--text-dim)',
          boxShadow: isDemoMode ? '0 0 8px var(--accent)' : 'none'
        }} />
        <div>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text)' }}>
            Presentation Demo Controller
          </div>
          <div style={{ fontSize: 'var(--text-micro)', color: 'var(--text-muted)' }}>
            Simulated high-stakes festival delivery environment
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Trigger / Escalate Incident */}
        <button
          onClick={onTriggerIncident}
          style={{
            background: 'rgba(255, 107, 103, 0.08)',
            border: '1px solid rgba(255, 107, 103, 0.3)',
            color: 'var(--critical)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 160ms var(--ease-premium)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 107, 103, 0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 107, 103, 0.08)'}
        >
          <AlertTriangle size={13} />
          <span>Inject QC Incident</span>
        </button>

        {/* Step Forward */}
        {onAdvanceStep && (
          <button
            onClick={onAdvanceStep}
            style={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border)',
              color: 'var(--text-soft)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FastForward size={13} />
            <span>Step Forward</span>
          </button>
        )}

        {/* Reset */}
        <button
          onClick={onResetScenario}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-soft)',
            color: 'var(--text-muted)',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: 'var(--text-xs)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Reset scenario to pristine monitoring state"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
