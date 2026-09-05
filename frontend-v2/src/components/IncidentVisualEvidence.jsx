import React, { useState } from 'react';

export default function IncidentVisualEvidence({
  isCritical = true,
  rootCauseText = "Wrong export preset selected",
  subtext = "3rd audio mismatch in 6 months",
  _activeStage = "investigation",
}) {
  const [activeVisualTab, setActiveVisualTab] = useState('waveform'); // 'waveform' | 'drift'
  const [selectedChannel, setSelectedChannel] = useState('all'); // 'all' | 'C' | 'LFE'

  const channels = [
    { id: 'L', name: 'Ch 1 - Left Master', status: 'normal', peak: '-6.2 dB', phase: '0°' },
    { id: 'R', name: 'Ch 2 - Right Master', status: 'normal', peak: '-6.1 dB', phase: '0°' },
    { id: 'C', name: 'Ch 3 - Center Dialog', status: isCritical ? 'critical' : 'normal', peak: isCritical ? '-0.1 dB (Clipping)' : '-8.4 dB', phase: isCritical ? '180° Inverted' : '0°' },
    { id: 'LFE', name: 'Ch 4 - Subwoofer (LFE)', status: isCritical ? 'warning' : 'normal', peak: '-12.0 dB', phase: isCritical ? '90° Offset' : '0°' },
  ];

  return (
    <div
      style={{
        height: '500px',
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: '12px',
        marginBottom: '16px',
      }}
    >
      {/* LEFT (60%): Visual Evidence (Scientific Instrument Aesthetic) */}
      <div
        className="card-command"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-tertiary)',
          border: isCritical ? '0.5px solid rgba(255, 77, 77, 0.35)' : '0.5px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '10px 16px',
            borderBottom: '0.5px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Visual Evidence — Waveform Telemetry
            </span>
            <span
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                padding: '1px 5px',
                borderRadius: '3px',
                backgroundColor: isCritical ? 'rgba(255, 77, 77, 0.12)' : 'rgba(0, 230, 118, 0.12)',
                color: isCritical ? 'var(--critical)' : 'var(--success)',
                fontWeight: 500,
              }}
            >
              {isCritical ? 'PHASE DRIFT' : 'ALIGNED'}
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '2px' }}>
            <button
              type="button"
              onClick={() => setActiveVisualTab('waveform')}
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeVisualTab === 'waveform' ? 'var(--surface-active)' : 'transparent',
                color: activeVisualTab === 'waveform' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: activeVisualTab === 'waveform' ? 500 : 400,
              }}
            >
              5.1 Waveform
            </button>
            <button
              type="button"
              onClick={() => setActiveVisualTab('drift')}
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeVisualTab === 'drift' ? 'var(--surface-active)' : 'transparent',
                color: activeVisualTab === 'drift' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: activeVisualTab === 'drift' ? 500 : 400,
              }}
            >
              Subtitle / PTS Drift
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {activeVisualTab === 'waveform' ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Channel Selector Pills */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                {channels.map((ch) => {
                  const isChActive = selectedChannel === ch.id || selectedChannel === 'all';
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChannel(selectedChannel === ch.id ? 'all' : ch.id)}
                      style={{
                        flex: 1,
                        padding: '5px 8px',
                        borderRadius: '4px',
                        backgroundColor: ch.status === 'critical' ? 'rgba(255, 77, 77, 0.05)' : 'var(--surface-default)',
                        border: `0.5px solid ${selectedChannel === ch.id ? 'var(--accent-cyan)' : ch.status === 'critical' ? 'rgba(255, 77, 77, 0.4)' : 'var(--border-default)'}`,
                        fontSize: '11px',
                        cursor: 'pointer',
                        opacity: isChActive ? 1 : 0.5,
                        transition: 'all var(--transition-micro)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '9px' }}>
                        <span>{ch.id}</span>
                        <span className="font-mono">{ch.phase}</span>
                      </div>
                      <div style={{ fontWeight: 500, color: ch.status === 'critical' ? 'var(--critical)' : 'var(--text-primary)', marginTop: '2px', fontSize: '11px' }}>
                        {ch.peak}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scientific Instrument SVG Waveform */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#050505',
                  border: '0.5px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>TC 01:14:20:00</span>
                  <span>TC 01:14:22:08 (ANOMALY INGEST)</span>
                  <span>TC 01:14:25:00</span>
                </div>

                <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none" style={{ display: 'block' }}>
                  {/* Thin Grid lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#121212" strokeDasharray="2 4" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#1c1c1c" strokeWidth="0.75" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#121212" strokeDasharray="2 4" strokeWidth="0.5" />

                  {/* Marker line */}
                  <line x1="280" y1="0" x2="280" y2="200" stroke={isCritical ? "var(--critical)" : "var(--accent-cyan)"} strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <circle cx="280" cy="100" r="3" fill={isCritical ? "var(--critical)" : "var(--accent-cyan)"} />

                  {/* Master Reference (Cyan, 1.5px thin elegant curve) */}
                  <path
                    d="M 0 100 Q 30 65, 60 100 T 120 100 T 180 100 T 240 100 T 280 100 T 320 80 T 360 120 T 420 85 T 500 100"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="1.5"
                    opacity="0.85"
                  />

                  {/* Center Dialog Track (Phase inverted during incident, red curve) */}
                  {isCritical ? (
                    <path
                      d="M 0 100 Q 30 65, 60 100 T 120 100 T 180 100 T 240 100 T 280 100 Q 300 170, 320 25 T 360 175 T 400 20 T 450 170 T 500 100"
                      fill="none"
                      stroke="#FF4D4D"
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                  ) : (
                    <path
                      d="M 0 100 Q 30 70, 60 100 T 120 100 T 180 100 T 240 100 T 280 100 T 320 90 T 360 110 T 420 95 T 500 100"
                      fill="none"
                      stroke="#00E676"
                      strokeWidth="1.25"
                      opacity="0.85"
                    />
                  )}
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)' }}>
                      <span style={{ width: '6px', height: '1.5px', backgroundColor: 'var(--accent-cyan)' }} />
                      Ch 1-2 Master Ref (24.000 fps)
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isCritical ? 'var(--critical)' : 'var(--success)' }}>
                      <span style={{ width: '6px', height: '1.5px', backgroundColor: isCritical ? 'var(--critical)' : 'var(--success)' }} />
                      Ch 3 Center Ingest {isCritical ? '(180° Inverted)' : '(Synced)'}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    48,000 Hz / 24-bit
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ backgroundColor: 'var(--surface-default)', padding: '12px', borderRadius: '4px', border: '0.5px solid var(--border-default)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500 }}>SMPTE 428-7 Subtitle Stream Delta</span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--critical)' }}>Offset: +124.5 ms</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Subtitle cues drift 1 frame every 41.6 seconds due to 24.000 vs 23.976 fps pulldown mismatch. Dialogue appears 3 frames ahead of audio.
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#050505', borderRadius: '4px', border: '0.5px solid var(--border-default)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Reel 1: 0.0ms</span>
                  <span>Reel 2: +41.7ms</span>
                  <span>Reel 3: +83.4ms</span>
                  <span style={{ color: 'var(--critical)' }}>Reel 4: +124.5ms (FAIL)</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'var(--surface-default)', borderRadius: '2px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--accent-cyan)' }} />
                  <div style={{ width: '35%', backgroundColor: 'var(--accent-amber)' }} />
                  <div style={{ width: '25%', backgroundColor: 'var(--critical)' }} />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              paddingTop: '10px',
              borderTop: '0.5px solid var(--border-default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>Dolby IMS3000 (DCP-SENTINEL-NODE-01)</span>
            <span>SHA-256: 8f2a9e...4b821</span>
          </div>
        </div>
      </div>

      {/* RIGHT (40%): Root Cause Diagnosis (Lab Report Aesthetic) */}
      <div
        className="card-command"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-tertiary)',
          border: '0.5px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '10px 16px',
            borderBottom: '0.5px solid var(--border-default)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Root Cause Diagnosis
          </span>
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)',
              fontWeight: 500,
            }}
          >
            CONFIDENCE 99.2%
          </span>
        </div>

        {/* Diagnosis Body */}
        <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '4px',
                lineHeight: '1.35',
                letterSpacing: '-0.02em',
              }}
            >
              {rootCauseText}
            </div>

            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '14px',
              }}
            >
              {subtext} (Post Facility Alpha — London Soho)
            </div>

            {/* Discrepancy Matrix */}
            <div
              style={{
                backgroundColor: 'var(--surface-default)',
                borderRadius: '4px',
                border: '0.5px solid var(--border-default)',
                padding: '10px 12px',
                marginBottom: '10px',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Package Discrepancy Matrix
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CPL Target Frame Rate:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>24.000 fps (DCI)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>MXF Essence Packaging:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--critical)' }}>23.976 fps (NTSC)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Audio Channel Map:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>SMPTE Ch 3 Inverted</span>
                </div>
              </div>
            </div>

            {/* Loki Log */}
            <div
              style={{
                backgroundColor: '#030303',
                border: '0.5px solid var(--border-default)',
                borderRadius: '4px',
                padding: '8px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                lineHeight: '1.45',
                color: 'var(--text-secondary)',
                maxHeight: '160px',
                overflowY: 'auto',
              }}
            >
              <div style={{ color: 'var(--text-muted)', marginBottom: '3px' }}>// Loki: &#123;app="dcp-validator"&#125; |= "phase_err"</div>
              <div><span style={{ color: 'var(--accent-cyan)' }}>14:22:08.192</span> [WARN] drift_ms=124.5 threshold=20.0</div>
              <div><span style={{ color: 'var(--critical)' }}>14:22:08.204</span> [ERR] cpl_verify: hash_mismatch mxf="AUDIO_CPL_9a8f2"</div>
              <div><span style={{ color: 'var(--text-muted)' }}>14:22:08.411</span> [INFO] gemini_analyst: root_cause in 184ms</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: 'var(--text-muted)',
              borderTop: '0.5px solid var(--border-default)',
              paddingTop: '8px',
            }}
          >
            <span>Agent: Analyst (Gemini 3.5 Flash)</span>
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Grafana MCP Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
