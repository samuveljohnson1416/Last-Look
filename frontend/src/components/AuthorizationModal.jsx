import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Lock, X } from 'lucide-react';

export default function AuthorizationModal({
  isOpen,
  onClose,
  option,
  onConfirm,
  isSubmitting = false,
}) {
  const [signature, setSignature] = useState('PROJECTION_HEAD_CANNES_2026');

  if (!isOpen || !option) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="card-command"
        style={{
          width: '520px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9), 0 0 30px var(--accent-cyan-glow)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <Lock size={15} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Human-in-the-Loop Authorization
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Architectural Gate: Executor agent write-lock release
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Selected Action Card */}
          <div
            style={{
              backgroundColor: 'var(--surface-default)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '14px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Action Payload to Authorize
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {option.title}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {option.description}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-default)',
                fontSize: '12px',
              }}
            >
              <span>Authorized Spend: <strong style={{ color: 'var(--accent-cyan)' }}>{option.cost}</strong></span>
              <span>Projected SLA: <strong style={{ color: 'var(--warning)' }}>{option.time}</strong></span>
              <span>Success Probability: <strong style={{ color: 'var(--success)' }}>{option.success}</strong></span>
            </div>
          </div>

          {/* Target Integration Details */}
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Write Target:</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>Grafana Cloud MCP (create_annotation)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>OTel Trace Propagation:</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>dcp.sentinel.remediation_v2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Operator Credential:</span>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textAlign: 'right',
                }}
              />
            </div>
          </div>

          {/* Warning banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 184, 0, 0.08)',
              border: '1px solid rgba(255, 184, 0, 0.25)',
              fontSize: '11px',
              color: 'var(--warning)',
            }}
          >
            <AlertTriangle size={15} style={{ flexShrink: 0 }} />
            <span>
              Once authorized, the Executor agent will record an indelible audit entry in Grafana Cloud and dispatch execution telemetry.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-default)',
            backgroundColor: 'var(--bg-tertiary)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            type="button"
            className="btn-command"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ height: '38px', fontSize: '13px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-command btn-cyan"
            onClick={() => onConfirm(option)}
            disabled={isSubmitting}
            style={{ height: '38px', fontSize: '13px', minWidth: '160px' }}
          >
            {isSubmitting ? (
              <>
                <span className="pulse-cyan" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#050505' }} />
                Signing & Writing...
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                Sign & Authorize
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
