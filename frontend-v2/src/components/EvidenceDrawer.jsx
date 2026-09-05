import React, { useEffect } from 'react';
import { X, Activity, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function EvidenceDrawer({
  isOpen = false,
  onClose,
  initialTab = 'evidence', // 'evidence' | 'telemetry' | 'logs' | 'trace'
  activeTab,
  setActiveTab,
}) {
  const currentTab = activeTab || initialTab;

  // Handle ESC key
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--modal-backdrop)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '540px',
          maxWidth: '100vw',
          height: '100vh',
          backgroundColor: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--card-shadow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
              }}
            >
              Investigation Evidence & Telemetry
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
              padding: '4px',
              display: 'flex',
            }}
            title="Close Drawer (ESC)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-soft)',
            padding: '0 24px',
            gap: '20px',
          }}
        >
          {[
            { id: 'evidence', label: 'Evidence', icon: ShieldAlert },
            { id: 'telemetry', label: 'Telemetry', icon: Activity },
            { id: 'logs', label: 'Logs', icon: Terminal },
            { id: 'trace', label: 'Trace', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab && setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isTabActive ? '2px solid var(--accent)' : '2px solid transparent',
                  padding: '12px 0',
                  color: isTabActive ? 'var(--text)' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: isTabActive ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all var(--trans-control)',
                }}
              >
                <Icon size={14} color={isTabActive ? 'var(--accent)' : 'currentColor'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Body */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* TAB 1: EVIDENCE */}
          {currentTab === 'evidence' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                  Why DCP Sentinel reached this conclusion
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  Automated correlation between SMPTE CPL XML manifest essence metadata, Dolby CP950 audio frame counters, and Cannes Grand Théâtre Lumière projection requirements.
                </p>
              </div>

              {/* Exact Evidence Rows */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Expected frame rate:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 500 }}>24.000 fps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Detected package rate:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--critical)', fontWeight: 600 }}>23.976 fps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Audio clock drift:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--critical)', fontWeight: 600 }}>+35.2 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtitle timing drift:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--warning)', fontWeight: 500 }}>+180 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Failed QC rule:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--warning)', fontWeight: 500 }}>Phase alignment</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Likely root cause:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>Incorrect export preset</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Related previous incidents:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>3</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--surface)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Confidence:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)', fontWeight: 600 }}>99.2%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TELEMETRY (Clean Waveform Visual) */}
          {currentTab === 'telemetry' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                  Audio Clock Drift & Phase Cancellation Telemetry
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Reference timing clock (cyan) vs detected audio phase drift on Center dialogue track (red).
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>TC 01:14:20:00</span>
                  <span style={{ color: 'var(--critical)', fontWeight: 600 }}>ANOMALY: +35.2 ms DRIFT</span>
                  <span>TC 01:14:25:00</span>
                </div>

                <svg width="100%" height="160" viewBox="0 0 450 160" preserveAspectRatio="none">
                  {/* Baseline Grid */}
                  <line x1="0" y1="40" x2="450" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="450" y2="80" stroke="rgba(255,255,255,0.12)" />
                  <line x1="0" y1="120" x2="450" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                  {/* Marker at Anomaly */}
                  <line x1="240" y1="0" x2="240" y2="160" stroke="var(--critical)" strokeDasharray="2 2" strokeWidth="1" />

                  {/* Cyan Reference Master Track (24.000 fps) */}
                  <path
                    d="M 0 80 Q 30 50, 60 80 T 120 80 T 180 80 T 240 80 T 300 65 T 360 95 T 420 70 T 450 80"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />

                  {/* Red Center Channel Inverted Track */}
                  <path
                    d="M 0 80 Q 30 50, 60 80 T 120 80 T 180 80 T 240 80 Q 260 135, 280 25 T 320 135 T 360 25 T 420 130 T 450 80"
                    fill="none"
                    stroke="var(--critical)"
                    strokeWidth="1.5"
                  />
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', paddingTop: '4px' }}>
                  <span style={{ color: 'var(--accent)' }}>— Reference Baseline (24.000 fps)</span>
                  <span style={{ color: 'var(--critical)' }}>— Center Channel Ingest (+35.2 ms Drift)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGS */}
          {currentTab === 'logs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                  Extracted QC Event Logs
                </h3>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Event query: phase_alignment AND frame_rate_mismatch
                </span>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--background-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  lineHeight: '1.6',
                  color: 'var(--text-soft)',
                }}
              >
                <div style={{ color: 'var(--text-muted)' }}>14:22:08.110 [INGEST] cpl_uuid="e8f492a-33b" title="THE_LAST_HARVEST_FTR-1"</div>
                <div style={{ color: 'var(--warning)' }}>14:22:08.192 [WARN] audio_drift_ms=35.2 threshold=20.0 frame_count=10421</div>
                <div style={{ color: 'var(--critical)', fontWeight: 600 }}>14:22:08.204 [ERR] phase_alignment_failed ch=3 inverted=true target_sync=24.000</div>
                <div style={{ color: 'var(--accent)' }}>14:22:08.411 [INFO] analyst_agent: root_cause_identified duration=184ms</div>
                <div style={{ color: 'var(--text)' }}>14:22:08.520 [AUDIT] impact_model_computed exposure=12000 usd deadline_buffer=71h45m</div>
              </div>
            </div>
          )}

          {/* TAB 4: TRACE */}
          {currentTab === 'trace' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                  Analysis Handoff Trace
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Sequence of tools queried and operational findings across the ADK pipeline.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { agent: 'Watcher', task: 'Queried delivery stream telemetry metrics', tool: 'dolby_ims_metrics', time: '14:22:08.192', duration: '12ms' },
                  { agent: 'Analyst', task: 'Correlated CPL metadata & QC error logs', tool: 'qc_log_query', time: '14:22:08.411', duration: '184ms' },
                  { agent: 'Advisor', task: 'Synthesized 3 response options with financial trade-offs', tool: 'cannes_sla_calculator', time: '14:22:08.520', duration: '310ms' },
                  { agent: 'Executor', task: 'Locked · awaiting explicit human authorization', tool: 'grafana_create_annotation', time: '14:22:08.830', duration: 'STANDBY' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '5px',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border-soft)',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{item.agent}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.duration}</span>
                    </div>
                    <div style={{ color: 'var(--text)', marginBottom: '4px' }}>{item.task}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                      <span>Tool: {item.tool}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
