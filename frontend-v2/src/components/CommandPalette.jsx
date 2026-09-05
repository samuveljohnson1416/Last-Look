import React, { useState, useEffect } from 'react';
import { Search, Command, Play, RotateCcw, AlertTriangle, Zap, X } from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  onRunAction,
}) {
  const [query, setQuery] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'start_demo', label: 'Start Hackathon Auto-Play Demo (2:00)', category: 'Demo', icon: Play },
    { id: 'reset_demo', label: 'Reset Demo to Normal State', category: 'Demo', icon: RotateCcw },
    { id: 'inspect_waveform', label: 'Inspect 5.1 Surround Audio Waveform Drift', category: 'Diagnostics', icon: AlertTriangle },
    { id: 'inspect_root_cause', label: 'View Root Cause Loki Query Logs', category: 'Diagnostics', icon: Search },
    { id: 'authorize_play1', label: 'Authorize Play 1: Re-export DCP via Aspera Satellite ($1,000)', category: 'Remediation', icon: Zap },
    { id: 'authorize_play2', label: 'Authorize Play 2: Live Dolby CP950 Audio Matrix Remap ($250)', category: 'Remediation', icon: Zap },
    { id: 'toggle_mode', label: 'Toggle Demo / Normal Operational Mode', category: 'System', icon: Command },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px',
      }}
      onClick={onClose}
    >
      <div
        className="card-command"
        style={{
          width: '560px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 212, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <Search size={18} color="var(--accent-cyan)" />
          <input
            type="text"
            placeholder="Type a command or search action..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontFamily: 'var(--font-display)',
            }}
          />
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

        {/* Action List */}
        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length > 0 ? (
            filtered.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    onRunAction(action.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-micro)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                    e.currentTarget.style.color = 'var(--accent-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} />
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{action.label}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {action.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No commands matching "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--border-default)',
            backgroundColor: 'var(--surface-default)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span>Use ↑ ↓ to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
