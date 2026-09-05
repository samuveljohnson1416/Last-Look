import React from 'react';
import { ChevronRight, Clock, AlertTriangle, ShieldCheck, Film } from 'lucide-react';
import StatusDot from './StatusDot';

export default function DeliveryCaseList({
  cases = [],
  onSelectCase = null,
  activeCaseId = null
}) {
  if (!cases || cases.length === 0) {
    return (
      <div style={{
        padding: '32px',
        textAlign: 'center',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        color: 'var(--text-muted)'
      }}>
        No active festival delivery cases found.
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {cases.map((c) => {
        const isSelected = activeCaseId === c.id;
        const isCritical = c.status === 'Critical' || c.status === 'Action Required' || c.status === 'Incident Active';

        return (
          <div
            key={c.id}
            onClick={() => onSelectCase && onSelectCase(c)}
            style={{
              background: isSelected ? 'var(--surface-selected)' : 'var(--surface)',
              border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '8px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: onSelectCase ? 'pointer' : 'default',
              transition: 'background var(--ease-premium) 180ms, border-color var(--ease-premium) 180ms'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.background = 'var(--surface)';
            }}
          >
            {/* Left: Film & Festival Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '6px',
                background: isCritical ? 'rgba(255, 107, 103, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: isCritical ? '1px solid rgba(255, 107, 103, 0.2)' : '1px solid var(--border-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isCritical ? 'var(--critical)' : 'var(--text-muted)'
              }}>
                <Film size={18} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--text)' }}>
                    {c.title}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-micro)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {c.id}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '3px' }}>
                  {c.festival} · {c.section} · Screening {c.screeningDate || 'Sept 10, 2026'}
                </div>
              </div>
            </div>

            {/* Right: Status, Deadline, and Action Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {/* Deadline countdown */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                  <Clock size={12} />
                  <span>Cutoff</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', color: isCritical ? 'var(--critical)' : 'var(--text)' }}>
                  {c.hoursRemaining || c.cutoff || '71h 45m'}
                </div>
              </div>

              {/* Status Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: isCritical ? 'rgba(255, 107, 103, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: isCritical ? '1px solid rgba(255, 107, 103, 0.25)' : '1px solid var(--border)'
              }}>
                <StatusDot status={isCritical ? 'critical' : c.status === 'In Review' ? 'warning' : 'healthy'} />
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: isCritical ? 'var(--critical)' : c.status === 'In Review' ? 'var(--warning)' : 'var(--text-soft)'
                }}>
                  {c.status}
                </span>
              </div>

              {onSelectCase && (
                <ChevronRight size={16} style={{ color: 'var(--text-dim)' }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
