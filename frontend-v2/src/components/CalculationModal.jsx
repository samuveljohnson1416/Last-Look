import React, { useEffect } from 'react';
import { X, DollarSign, Calculator } from 'lucide-react';

export default function CalculationModal({
  isOpen = false,
  onClose,
  totalExposure = 12000,
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
        backgroundColor: 'rgba(5, 5, 5, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '500px',
          maxWidth: '100%',
          backgroundColor: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={16} color="var(--accent)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
              Delivery Impact Calculation
            </span>
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

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Estimated Financial Exposure If Unresolved
            </div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--critical)', marginTop: '2px' }} className="tabular-nums font-mono">
              ${totalExposure.toLocaleString()}
            </div>
          </div>

          {/* Breakdown Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border-soft)',
              borderRadius: '5px',
              backgroundColor: 'var(--surface)',
              fontSize: '13px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ color: 'var(--text-soft)' }}>Potential screening-slot exposure:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>$20,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ color: 'var(--text-soft)' }}>Rush DCP repackaging cost:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>$8,500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ color: 'var(--text-soft)' }}>Distributor SLA penalty:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>$6,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ color: 'var(--text-soft)' }}>Hours remaining:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--warning)' }}>71h 45m</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'rgba(159, 232, 227, 0.05)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Estimated recoverable value:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)' }}>$12,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px' }}>
              <span style={{ color: 'var(--text-soft)' }}>Analysis confidence:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--success)' }}>99.2%</span>
            </div>
          </div>

          {/* Footnote */}
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            Based on package condition, festival delivery profile, deadline, and configured delivery assumptions.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-soft)',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: 'var(--bg)',
          }}
        >
          <button
            type="button"
            className="btn-quiet"
            onClick={onClose}
            style={{ fontSize: '13px', padding: '6px 16px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
