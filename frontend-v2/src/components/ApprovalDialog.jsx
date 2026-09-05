import React, { useEffect } from 'react';
import { ShieldCheck, X, AlertTriangle, Lock } from 'lucide-react';

export default function ApprovalDialog({
  isOpen = false,
  onClose,
  onConfirm,
  selectedOption = {
    action: 'Repackage and rush-deliver the DCP',
    cost: '$8,500',
    result: 'Protect the Cannes screening window',
  },
  isSubmitting = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--modal-backdrop)',
        backdropFilter: 'blur(8px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '520px',
          maxWidth: '100%',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          boxShadow: 'var(--card-shadow)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={18} color="var(--accent)" />
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>
              Authorize controlled response?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              You are authorizing:
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginTop: '2px' }}>
              {selectedOption.action}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              padding: '14px',
              borderRadius: '5px',
              backgroundColor: 'var(--background-elevated)',
              border: '1px solid var(--border-soft)',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Expected cost:
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)', marginTop: '2px' }} className="font-mono tabular-nums">
                {selectedOption.cost}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Expected outcome:
              </div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginTop: '2px' }}>
                {selectedOption.result}
              </div>
            </div>
          </div>

          {/* Audit Trail Disclaimer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
            }}
          >
            <Lock size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              This decision will be recorded with your identity (<strong style={{ color: 'var(--text)' }}>Elena Rostova · Head of Post-Production</strong>), approval time, root-cause evidence, impact estimate, chosen option, and alternatives that were not selected. DCP Sentinel will not make further changes without additional authorization.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-soft)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            backgroundColor: 'var(--background-elevated)',
          }}
        >
          <button
            type="button"
            className="btn-quiet"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-quiet btn-primary-cyan"
            onClick={onConfirm}
            disabled={isSubmitting}
            style={{ fontSize: '13px', padding: '8px 20px' }}
          >
            {isSubmitting ? 'Recording authorization...' : 'Authorize response'}
          </button>
        </div>
      </div>
    </div>
  );
}
