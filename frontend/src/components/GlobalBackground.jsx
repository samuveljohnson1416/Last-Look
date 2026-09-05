import React from 'react';
import ParticleField from './ParticleField';

export default function GlobalBackground({ theme = 'light', isIncident = false }) {
  const gridColumns = Array.from({ length: 11 }); // 12 columns = 11 inner dividers

  return (
    <>
      {/* Filmic Micro-Noise Overlay */}
      <div className="filmic-noise" />

      {/* 12-Column Architectural Hairline Grid System */}
      <div className="editorial-hairline-grid">
        {gridColumns.map((_, i) => (
          <div
            key={i}
            className="col-line"
            style={{ left: `${((i + 1) / 12) * 100}%` }}
          />
        ))}
      </div>

      {/* Ambient Radial Grid Mask */}
      <div className="ambient-grid" />

      {/* Microscopic Cinema Dust Canvas */}
      <ParticleField
        theme={theme}
        color={theme === 'dark' ? '#F5F5F2' : '#27272A'}
        isIncident={isIncident}
      />
    </>
  );
}
