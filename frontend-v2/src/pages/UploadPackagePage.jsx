import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight, FileCode, Package, Sparkles } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ProcessingTimeline from '../components/ProcessingTimeline';

export default function UploadPackagePage({ onNavigate, caseData }) {
  const [selectedPath, setSelectedPath] = useState('manifest'); // 'full' | 'manifest'
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'complete'
  const [progressStep, setProgressStep] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const progressLabels = [
    'Uploading package bundle',
    'Reading CPL, PKL & AssetMap structure',
    'Checking SHA-1 bitstream integrity',
    'Detecting frame rate & audio channel profile',
    'Preparing delivery monitoring link',
  ];

  const handleStartUpload = (filename) => {
    setUploadedFileName(filename);
    setUploadState('uploading');
    setProgressStep(0);
  };

  useEffect(() => {
    if (uploadState !== 'uploading') return;

    const interval = setInterval(() => {
      setProgressStep((prev) => {
        if (prev >= progressLabels.length - 1) {
          clearInterval(interval);
          setUploadState('complete');
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [uploadState]);

  return (
    <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '24px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel text="PACKAGE INTAKE" />
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.025em',
          color: 'var(--foreground)',
          marginBottom: '8px',
        }}>
          Add the package we need to protect.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Upload a DCP package, manifest bundle, or QC report. We will identify the delivery profile and prepare live validation.
        </p>
      </div>

      {uploadState === 'idle' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Two Distinct Upload Pathways */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div
              onClick={() => setSelectedPath('manifest')}
              style={{
                padding: '24px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: selectedPath === 'manifest' ? '1px solid var(--foreground)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedPath === 'manifest' ? 'var(--surface-selected)' : 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 200ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.06em' }}>
                  [ RECOMMENDED ]
                </span>
                <FileCode size={18} style={{ color: 'var(--foreground)' }} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                MANIFEST REVIEW
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                Upload CPL, PKL, AssetMap XMLs or vendor QC report. Recommended for rapid inspection & festival verification.
              </div>
            </div>

            <div
              onClick={() => setSelectedPath('full')}
              style={{
                padding: '24px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: selectedPath === 'full' ? '1px solid var(--foreground)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedPath === 'full' ? 'var(--surface-selected)' : 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 200ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                  FULL ARCHIVE
                </span>
                <Package size={18} style={{ color: 'var(--muted)' }} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                FULL DCP PACKAGE
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                Upload complete DCP folder or ZIP archive containing video/audio MXF track essence files.
              </div>
            </div>
          </div>

          {/* Large Clean Bordered Dropzone */}
          <div
            style={{
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px dashed var(--border)',
              borderRadius: '4px',
              backgroundColor: 'var(--surface)',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--background-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--foreground)',
              }}
            >
              <UploadCloud size={22} />
            </div>

            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                Drop delivery files here
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                {selectedPath === 'manifest'
                  ? 'DCP ZIP · CPL · PKL · AssetMap · QC report · subtitle file'
                  : 'Complete DCP directory or compressed ZIP archive with MXF track files'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                className="btn-pill-secondary"
                onClick={() => handleStartUpload('THE_LAST_HARVEST_FTR-1_S_EN-FR_51_4K_20260518_CPL.xml')}
                style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
              >
                <span>Browse files</span>
              </button>

              <button
                type="button"
                className="btn-pill-primary"
                onClick={() => handleStartUpload('CANNES26_THE_LAST_HARVEST_DCI_MANIFEST.zip')}
                style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
              >
                <Sparkles size={14} />
                <span>Load Cannes sample package</span>
              </button>
            </div>

            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted-deep)', marginTop: '12px' }}>
              No technical setup required. DCP Sentinel reads the relevant package signals automatically.
            </div>
          </div>
        </div>
      )}

      {/* Terminal Processing State */}
      {uploadState === 'uploading' && (
        <ProcessingTimeline
          progress={((progressStep + 1) / progressLabels.length) * 100}
          fileName={uploadedFileName}
          currentStepIndex={progressStep}
        />
      )}

      {/* Complete State */}
      {uploadState === 'complete' && (
        <div style={{
          padding: '36px',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                Package ingestion & metadata extraction complete
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                Detected SMPTE CPL with 5.1 audio track and French timed-text subtitle container.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              className="btn-pill-primary"
              onClick={() => onNavigate('package-review')}
              style={{ height: '44px', padding: '0 24px', fontSize: '13px' }}
            >
              <span>Review package profile</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
