import React from 'react';
import GlobalBackground from './GlobalBackground';

export default function AppShell({ children, isIncident = false, theme = 'light' }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background-color var(--trans-control), color var(--trans-control)',
      }}
    >
      {/* 1. Global Background (Ambient Grid + Restrained Particle Layer) */}
      <GlobalBackground theme={theme} isIncident={isIncident} />

      {/* 2. Main Interactive Application Content */}
      <div
        className="app-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
