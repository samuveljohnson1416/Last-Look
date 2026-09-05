import React, { useState } from 'react';
import { Check, AlertTriangle, Edit3, ChevronRight, ChevronDown, ShieldCheck, FileCode } from 'lucide-react';

export default function PackageProfileTable({
  packageData = {},
  isEditable = false,
  onSave = null,
  compact = false
}) {
  const [profile, setProfile] = useState({
    title: packageData.title || 'THE_QUIET_HOUR_FTR_S_EN-XX_US-NR_51_2K_20260904_SMPTE_OV',
    schema_type: packageData.schema_type || 'SMPTE DCP (ST 429-2)',
    resolution: packageData.resolution || '2K Flat (1998x1080)',
    frame_rate: packageData.frame_rate || '24.000 fps',
    aspect_ratio: packageData.aspect_ratio || '1.85:1 (Flat)',
    audio_format: packageData.audio_format || '5.1 Uncompressed 24-bit 48kHz (Linear PCM)',
    encryption_status: packageData.encryption_status || 'Unencrypted / Open Key Delivery',
    picture_bitrate: packageData.picture_bitrate || '242 Mbps (Peak J2K)',
    subtitles: packageData.subtitles || 'SMPTE 428-7 XML Timed Text (Embedded)',
    cpl_id: packageData.cpl_id || 'urn:uuid:8b34f21a-4d29-4e78-b193-47a82910c492',
    pkl_id: packageData.pkl_id || 'urn:uuid:9f110c7e-0012-4ba2-9a09-64d89a771031',
    hash_algorithm: packageData.hash_algorithm || 'SHA-1 (Legacy SMPTE Hash Verified)',
    asset_count: packageData.asset_count || '6 Assets (Video, 6ch Audio, XML Subtitles, PKL, CPL, Assetmap)',
    package_size: packageData.package_size || '142.8 GB',
    ...packageData
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const handleStartEdit = (key, val) => {
    if (!isEditable) return;
    setEditingField(key);
    setEditValue(val);
  };

  const handleSaveEdit = (key) => {
    const updated = { ...profile, [key]: editValue };
    setProfile(updated);
    setEditingField(null);
    if (onSave) onSave(updated);
  };

  const rows = [
    { key: 'schema_type', label: 'DCP Schema', value: profile.schema_type, status: 'pass', note: 'Standard Compliant' },
    { key: 'resolution', label: 'Resolution & Container', value: profile.resolution, status: 'pass', note: 'Matches 2K Slot' },
    { key: 'frame_rate', label: 'Frame Rate', value: profile.frame_rate, status: 'pass', note: 'Exact 24.000 fps' },
    { key: 'audio_format', label: 'Audio Channels & Clock', value: profile.audio_format, status: profile.audio_drift ? 'warn' : 'pass', note: profile.audio_drift ? '48kHz Clock Anomaly Flagged' : 'Aligned' },
    { key: 'encryption_status', label: 'Encryption / KDM', value: profile.encryption_status, status: 'pass', note: 'No KDM Required' },
    { key: 'picture_bitrate', label: 'J2K Bitrate', value: profile.picture_bitrate, status: 'pass', note: 'Within 250 Mbps Cap' },
    { key: 'subtitles', label: 'Subtitles & Timed Text', value: profile.subtitles, status: 'pass', note: 'XML ST 428-7' },
    { key: 'package_size', label: 'Payload Footprint', value: profile.package_size, status: 'pass', note: '6 MXF & Metadata Assets' },
  ];

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.015)'
      }}>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            DCP Package Manifest & Inspection
          </div>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            {profile.title}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--success)',
            background: 'rgba(142, 214, 163, 0.08)',
            border: '1px solid rgba(142, 214, 163, 0.2)',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck size={13} />
            Verified Manifest
          </span>
        </div>
      </div>

      {/* Rows */}
      <div style={{ padding: '4px 0' }}>
        {rows.map((row, idx) => (
          <div
            key={row.key}
            style={{
              display: 'grid',
              gridTemplateColumns: compact ? '160px 1fr' : '200px 1fr 180px',
              padding: '12px 20px',
              alignItems: 'center',
              borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--border-soft)',
              fontSize: 'var(--text-sm)'
            }}
          >
            {/* Label */}
            <div style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
              {row.label}
            </div>

            {/* Value / Inline Edit */}
            <div style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {editingField === row.key ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--accent)',
                      color: 'var(--text)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-mono)',
                      width: '80%'
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(row.key)}
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--bg)',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: 'var(--text-xs)'
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span>{row.value}</span>
                  {isEditable && (
                    <button
                      onClick={() => handleStartEdit(row.key, row.value)}
                      title="Edit detected field"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        borderRadius: '3px'
                      }}
                    >
                      <Edit3 size={12} />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Note / Validation tag */}
            {!compact && (
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: 'var(--text-micro)',
                  color: row.status === 'warn' ? 'var(--warning)' : 'var(--text-muted)',
                  background: row.status === 'warn' ? 'rgba(228, 184, 102, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  border: row.status === 'warn' ? '1px solid rgba(228, 184, 102, 0.2)' : '1px solid var(--border-soft)'
                }}>
                  {row.note}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Technical Evidence Disclosure */}
      <div style={{
        padding: '12px 20px',
        background: 'rgba(255, 255, 255, 0.01)',
        borderTop: '1px solid var(--border)',
        fontSize: 'var(--text-xs)'
      }}>
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-soft)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            fontSize: 'var(--text-xs)'
          }}
        >
          {showTechnicalDetails ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span>{showTechnicalDetails ? 'Hide technical asset UUIDs and hashes' : 'Show technical asset UUIDs and SHA hashes'}</span>
        </button>

        {showTechnicalDetails && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            background: 'var(--bg)',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            <div><strong>CPL UUID:</strong> {profile.cpl_id}</div>
            <div><strong>PKL UUID:</strong> {profile.pkl_id}</div>
            <div><strong>Integrity Check:</strong> {profile.hash_algorithm}</div>
            <div><strong>Assets:</strong> {profile.asset_count}</div>
          </div>
        )}
      </div>
    </div>
  );
}
