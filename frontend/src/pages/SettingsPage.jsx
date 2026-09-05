import React, { useState } from 'react';
import { Settings, Check, Radio, Sun, Moon } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import StatusDot from '../components/StatusDot';

export default function SettingsPage({ onNavigate, theme = 'light', setTheme }) {
  const [activeTab, setActiveTab] = useState('appearance');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <SectionLabel text="SYSTEM CONFIGURATION" />
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.025em',
            color: 'var(--foreground)',
            marginBottom: '8px',
          }}>
            Settings & Specifications
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Manage technical compliance thresholds, decision authority boundaries, and festival projection profiles.
          </p>
        </div>

        <button
          type="button"
          className="btn-pill-primary"
          onClick={handleSave}
          style={{ height: '42px', padding: '0 24px', fontSize: '13px' }}
        >
          {saved ? (
            <>
              <Check size={14} />
              <span>Preferences saved</span>
            </>
          ) : (
            <span>Save preferences</span>
          )}
        </button>
      </div>

      {/* Minimal Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '24px',
      }}>
        {[
          { id: 'appearance', label: 'Appearance & Theme' },
          { id: 'tolerance', label: 'QC & Tolerance Rules' },
          { id: 'authority', label: 'Decision Authority & Escrow' },
          { id: 'festivals', label: 'Festival Profiles' },
          { id: 'integrations', label: 'Connected Observability' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--foreground)' : '2px solid transparent',
              padding: '8px 0 12px',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'color var(--trans-hover)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 0: Appearance & Theme Switcher */}
      {activeTab === 'appearance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '28px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)', marginBottom: '4px' }}>
                Color Theme & Background
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                Select your preferred visual environment. Both modes maintain strict editorial typography and high-contrast hairlines.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {/* Option 1: Editorial Light (White Background) */}
              <div
                onClick={() => setTheme && setTheme('light')}
                style={{
                  padding: '20px',
                  borderRadius: '6px',
                  border: theme === 'light' ? '2px solid var(--foreground)' : '1px solid var(--border)',
                  backgroundColor: '#FFFFFF',
                  color: '#0A0A0A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  boxShadow: theme === 'light' ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                  transition: 'all var(--trans-hover)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sun size={18} color="#D97706" />
                    <span style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                      Editorial Light (White)
                    </span>
                  </div>
                  {theme === 'light' && (
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#0A0A0A', color: '#FFFFFF', fontWeight: 600 }}>
                      ACTIVE
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.4 }}>
                  Pure white background with jet-black typography, crisp hairlines, and minimal monochrome panels.
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '2px' }} />
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#F4F4F6', borderRadius: '2px' }} />
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#0A0A0A', borderRadius: '2px' }} />
                </div>
              </div>

              {/* Option 2: Cinematic Dark (Black Background) */}
              <div
                onClick={() => setTheme && setTheme('dark')}
                style={{
                  padding: '20px',
                  borderRadius: '6px',
                  border: theme === 'dark' ? '2px solid var(--foreground)' : '1px solid var(--border)',
                  backgroundColor: '#070707',
                  color: '#F5F5F5',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.6)' : 'none',
                  transition: 'all var(--trans-hover)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Moon size={18} color="#A7F3D0" />
                    <span style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                      Cinematic Dark (Black)
                    </span>
                  </div>
                  {theme === 'dark' && (
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#F5F5F5', color: '#000000', fontWeight: 600 }}>
                      ACTIVE
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#888888', lineHeight: 1.4 }}>
                  OLED pure black background with luminous metrics, subtle filmic noise, and cinema-grade contrast.
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '2px' }} />
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#151515', borderRadius: '2px' }} />
                  <span style={{ height: '14px', width: '28px', backgroundColor: '#A7F3D0', borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: QC & Tolerance Rules */}
      {activeTab === 'tolerance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              Audio Timing & Clock Drift Thresholds
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Critical Drift Alert Threshold (ms)
                </label>
                <input type="number" defaultValue="20" className="input-quiet font-mono" />
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                  Audio drift above this value triggers immediate critical incident workflow.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Target Loudness Target (LKFS / LUFS)
                </label>
                <input type="text" defaultValue="-24.0 ±0.5 LKFS" className="input-quiet font-mono" />
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                  ITU-R BS.1770-4 / EBU R128 international broadcast & theatrical standard.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Decision Authority & Escrow */}
      {activeTab === 'authority' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              Human Authorization Boundary
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
              DCP Sentinel enforces a strict cryptographic boundary: the AI pipeline (Watcher, Analyst, Advisor) operates in analysis-only mode and has zero write tools. Downstream execution (Executor) requires explicit human sign-off.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Single-Signatory Approval Ceiling
                </label>
                <input type="text" defaultValue="$10,000 USD" className="input-quiet font-mono" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Required Signatory Role
                </label>
                <select className="input-quiet">
                  <option>Post-Production Supervisor / Head of Projection</option>
                  <option>Producer / Executive in Charge</option>
                  <option>Festival Technical Director</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Festival Profiles */}
      {activeTab === 'festivals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'Festival de Cannes', theater: 'Grand Théâtre Lumière (Palais)', server: 'Christie CP4440-RGB + Dolby CP950', standard: 'SMPTE 4K DCI' },
            { name: 'Venice Film Festival', theater: 'Sala Grande (Palazzo del Cinema)', server: 'Barco DP4K + Datasat AP20', standard: 'SMPTE 4K DCI' },
            { name: 'Berlinale', theater: 'Berlinale Palast', server: 'Sony SRX-R515DS', standard: 'SMPTE 2K/4K DCI' },
            { name: 'Sundance Film Festival', theater: 'Eccles Theater', server: 'Christie Solaria CP2230', standard: 'SMPTE 2K DCI' },
          ].map((fest) => (
            <div key={fest.name} style={{ padding: '18px 24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>{fest.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{fest.theater} · {fest.server}</div>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--background-elevated)', color: 'var(--foreground)' }}>
                {fest.standard}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Connected Observability */}
      {activeTab === 'integrations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              Connected Backend Infrastructure
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: 'var(--background-elevated)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusDot status="healthy" size={5} />
                  <span style={{ fontSize: '13px', color: 'var(--foreground)' }}>Grafana Cloud MCP Server Bridge</span>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>CONNECTED</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: 'var(--background-elevated)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusDot status="healthy" size={5} />
                  <span style={{ fontSize: '13px', color: 'var(--foreground)' }}>Google ADK (Gemini 3.5 Flash Pipeline)</span>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>ACTIVE</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', backgroundColor: 'var(--background-elevated)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusDot status="healthy" size={5} />
                  <span style={{ fontSize: '13px', color: 'var(--foreground)' }}>Prometheus & Loki Ingest Gateway</span>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>STREAMING</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
