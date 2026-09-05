import React from 'react';
import { Film, Radio, Sparkles, Settings2, Play, Pause, RotateCcw, Sun, Moon } from 'lucide-react';
import StatusDot from './StatusDot';

export default function TopBar({
  currentRoute = 'control-room',
  onNavigate,
  isDemoMode,
  setIsDemoMode,
  demoState = { timeRemaining: 120 },
  isPaused,
  togglePause,
  resetDemo,
  connected = true,
  isCritical = true,
  theme = 'light',
  toggleTheme,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'control-room', label: 'Control Room' },
    { id: 'create-case', label: 'New Case' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'calendar', label: 'Deliveries' },
    { id: 'audit-trail', label: 'Audit Log' },
  ];

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'var(--topbar-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color var(--trans-control), border-color var(--trans-control)',
      }}
    >
      {/* Left: Brand & Navigation Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            DCP Sentinel
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--muted)',
              marginTop: '1px',
            }}
          >
            TM
          </span>
        </button>

        {/* Minimal Nav items with underline hover */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  position: 'relative',
                  padding: '6px 0',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--foreground)' : 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'color var(--trans-hover)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--foreground)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--foreground)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Center: System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <StatusDot status={isCritical ? 'critical' : 'success'} pulse={isCritical} size={6} />
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: isCritical ? 'var(--critical)' : 'var(--muted)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {isCritical ? 'QC Incident Active' : 'All Systems Nominal'}
        </span>
      </div>

      {/* Right: Controls & Demo Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Connection Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: connected ? 'var(--success)' : 'var(--muted-deep)',
            letterSpacing: '0.05em',
          }}
        >
          <Radio size={11} />
          <span>{connected ? 'LIVE' : 'OFFLINE'}</span>
        </div>

        {/* Demo Mode Button Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: isDemoMode ? 'var(--surface-hover)' : 'transparent',
            border: isDemoMode ? '1px solid var(--border)' : '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            style={{
              background: 'none',
              border: 'none',
              color: isDemoMode ? 'var(--foreground)' : 'var(--muted)',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Sparkles size={11} style={{ color: isDemoMode ? 'var(--accent)' : 'var(--muted)' }} />
            <span>DEMO</span>
          </button>

          {isDemoMode && (
            <>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--foreground-soft)',
                  marginLeft: '2px',
                }}
                className="tabular-nums"
              >
                {formatTime(demoState.timeRemaining)}
              </span>

              <button
                type="button"
                onClick={togglePause}
                title={isPaused ? 'Resume' : 'Pause'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                {isPaused ? <Play size={10} /> : <Pause size={10} />}
              </button>

              <button
                type="button"
                onClick={resetDemo}
                title="Restart scenario"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                <RotateCcw size={10} />
              </button>
            </>
          )}
        </div>

        {/* Theme Switcher Button (White / Black switch) */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Editorial White (Light Mode)' : 'Switch to Cinematic Black (Dark Mode)'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all var(--trans-hover)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
            e.currentTarget.style.borderColor = 'var(--border-strong)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--surface)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          {theme === 'dark' ? (
            <Sun size={12} style={{ color: 'var(--warning)' }} />
          ) : (
            <Moon size={12} style={{ color: 'var(--foreground)' }} />
          )}
          <span>{theme === 'dark' ? 'DARK' : 'WHITE'}</span>
        </button>

        {/* Settings Pill */}
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          style={{
            background: 'none',
            border: 'none',
            color: currentRoute === 'settings' ? 'var(--foreground)' : 'var(--muted)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color var(--trans-hover)',
          }}
          title="Festival Delivery Settings"
        >
          <Settings2 size={16} />
        </button>
      </div>
    </header>
  );
}
