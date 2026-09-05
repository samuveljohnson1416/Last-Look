import React, { useState } from 'react';
import { UploadCloud, FileCode, Package, Sparkles } from 'lucide-react';

export default function UploadDropzone({ onSelectFile, onSelectSample }) {
  const [selectedPath, setSelectedPath] = useState('manifest'); // 'manifest' | 'full'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Two Distinct Upload Pathways */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div
          onClick={() => setSelectedPath('manifest')}
          className="panel-quiet"
          style={{
            padding: '20px',
            cursor: 'pointer',
            border: selectedPath === 'manifest' ? '1px solid var(--accent)' : '1px solid var(--border-soft)',
            backgroundColor: selectedPath === 'manifest' ? 'var(--bg-raised)' : 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'all var(--trans-hover)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.06em' }}>
              [ RECOMMENDED ]
            </span>
            <FileCode size={18} color="var(--accent)" />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
            MANIFEST OR QC REVIEW
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            Upload CPL, PKL, AssetMap, QC report, or delivery manifest. Recommended for quick review and demo workflows.
          </div>
        </div>

        <div
          onClick={() => setSelectedPath('full')}
          className="panel-quiet"
          style={{
            padding: '20px',
            cursor: 'pointer',
            border: selectedPath === 'full' ? '1px solid var(--accent)' : '1px solid var(--border-soft)',
            backgroundColor: selectedPath === 'full' ? 'var(--bg-raised)' : 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'all var(--trans-hover)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              FULL ARCHIVE
            </span>
            <Package size={18} color="var(--text-soft)" />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
            FULL PACKAGE
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            Upload a complete DCP ZIP or DCP folder export containing full video and audio essence.
          </div>
        </div>
      </div>

      {/* Large Minimal Drop Zone */}
      <div
        className="panel-quiet"
        style={{
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1.5px dashed var(--border)',
          backgroundColor: 'var(--bg-raised)',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
          }}
        >
          <UploadCloud size={24} />
        </div>

        <div>
          <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text)' }}>
            Drop delivery files here
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '460px', lineHeight: 1.45 }}>
            DCP ZIP, package manifest, QC report, subtitle file, audio layout sheet, or festival delivery requirements.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            className="btn-quiet"
            onClick={() => onSelectFile && onSelectFile('THE_LAST_HARVEST_FTR-1_S_EN-FR_51_4K_20260518_CPL.xml')}
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            <span>Browse files</span>
          </button>

          <button
            type="button"
            className="btn-quiet btn-primary-cyan"
            onClick={() => onSelectSample && onSelectSample('CANNES26_THE_LAST_HARVEST_DCI_MANIFEST.zip')}
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            <Sparkles size={14} />
            <span>Load Cannes 2026 sample package</span>
          </button>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginTop: '12px' }}>
          Accepted types: ZIP · XML · JSON · PDF · CSV · SRT · TTML
        </div>
      </div>
    </div>
  );
}
