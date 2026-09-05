import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Edit2, Film, Check } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import StatusDot from '../components/StatusDot';

export default function PackageReviewPage({ onNavigate, caseData, onUpdateCase }) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    destination: caseData?.destination || 'Cannes 2026',
    deadline: caseData?.deadline ? 'Jan 28 · 2:00 PM CET' : 'Jan 28 · 2:00 PM CET',
    dcpStandard: caseData?.dcpStandard || 'SMPTE',
    detectedFps: '23.976 fps',
    expectedFps: '24.000 fps',
    audioLayout: '5.1 Discrete',
    subtitles: 'Present (French SMPTE-TT XML)',
    integrity: 'Verified (SHA-1 checksum match)',
  });

  const handleFieldChange = (field, val) => {
    setProfile((prev) => ({ ...prev, [field]: val }));
  };

  const handleStartMonitoring = () => {
    if (onUpdateCase) onUpdateCase(profile);
    onNavigate('control-room');
  };

  const rows = [
    { label: 'Festival destination', value: profile.destination, status: 'Verified', isSuccess: true },
    { label: 'Delivery cutoff', value: profile.deadline, status: 'Verified', isSuccess: true },
    { label: 'Package standard', value: profile.dcpStandard, status: 'Verified', isSuccess: true },
    { label: 'Detected frame rate', value: profile.detectedFps, key: 'detectedFps', isEditable: true, status: 'Review required', isWarn: true },
    { label: 'Expected frame rate', value: profile.expectedFps, status: 'Cannes Target' },
    { label: 'Audio layout', value: profile.audioLayout, key: 'audioLayout', isEditable: true, status: 'Verified', isSuccess: true },
    { label: 'Subtitle package', value: profile.subtitles, status: 'Present', isSuccess: true },
    { label: 'Package integrity', value: profile.integrity, status: 'Verified', isSuccess: true },
  ];

  return (
    <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel text="DELIVERY PROFILE" />
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          marginBottom: '8px',
        }}>
          Review what we found.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Confirm the package and delivery details before live monitoring begins.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Editorial Review Panel */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--surface)',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--background-elevated)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Film size={16} style={{ color: 'var(--foreground)' }} />
              <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                {caseData?.filmTitle || 'The Last Harvest'} · Extracted Metadata
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--foreground)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {isEditing ? <Check size={13} /> : <Edit2 size={12} />}
              <span>{isEditing ? 'Done editing' : 'Correct values'}</span>
            </button>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, idx) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr 140px',
                  padding: '14px 24px',
                  alignItems: 'center',
                  borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '14px',
                  backgroundColor: row.isWarn ? 'rgba(233, 182, 109, 0.03)' : 'transparent',
                }}
              >
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>
                  {row.label}
                </span>

                <div style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  {isEditing && row.isEditable ? (
                    <input
                      type="text"
                      className="input-quiet"
                      value={profile[row.key]}
                      onChange={(e) => handleFieldChange(row.key, e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '12px', maxWidth: '180px' }}
                    />
                  ) : (
                    <span>{row.value}</span>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: row.isWarn ? 'var(--warning)' : row.isSuccess ? 'var(--success)' : 'var(--muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    {row.isSuccess && <StatusDot status="success" size={4} />}
                    {row.isWarn && <StatusDot status="warning" size={4} />}
                    <span>{row.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Technical Details */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--surface)',
        }}>
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--muted)',
              fontSize: '13px',
            }}
          >
            <span>View technical package details</span>
            {showTechnicalDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showTechnicalDetails && (
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--background-elevated)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted)',
              lineHeight: 1.6,
            }}>
              <div>CPL_ID: urn:uuid:8fa134d1-cannes-2026-smpte-4k</div>
              <div>PKL_HASH: e9b49f6920f261908bc1c83a15dc2118fae498c0</div>
              <div>VIDEO_BITRATE: 248.5 Mbps (JPEG 2000 DCI Specification)</div>
              <div>COLOR_SPACE: DCI-P3 / White Point x=0.314 y=0.351 / Gamma 2.6</div>
              <div>PROJECTOR_PROFILE: Christie CP4440-RGB · Sound: Dolby CP950 Processor</div>
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => onNavigate('upload')}
            style={{ height: '44px', padding: '0 20px', fontSize: '13px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to upload</span>
          </button>

          <button
            type="button"
            className="btn-pill-primary"
            onClick={handleStartMonitoring}
            style={{ height: '44px', padding: '0 28px', fontSize: '14px' }}
          >
            <span>Start delivery monitoring</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
