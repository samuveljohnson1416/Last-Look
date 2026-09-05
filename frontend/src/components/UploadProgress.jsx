import React from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadProgress({
  progress = 0,
  stage = 'uploading', // 'idle' | 'uploading' | 'validating' | 'complete' | 'error'
  fileName = '',
  fileSize = '',
  statusMessage = '',
  error = null,
  steps = [
    { id: 'upload', label: 'File Transfer', desc: 'Secure chunked ingest' },
    { id: 'hash', label: 'Hash Verification', desc: 'SHA-256 integrity check' },
    { id: 'xml', label: 'Manifest Parse', desc: 'CPL & PKL schema validation' },
    { id: 'profile', label: 'Profile Generation', desc: 'SMPTE compliance check' },
  ],
  currentStepIndex = 0
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '24px',
      marginTop: '20px'
    }}>
      {/* File Info & Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>
            {fileName || 'DCP Package Ingest'}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {fileSize ? `${fileSize} · ` : ''}{statusMessage || (stage === 'complete' ? 'Ingest & verification complete' : 'Ingesting package payload...')}
          </div>
        </div>
        <div style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          color: stage === 'error' ? 'var(--critical)' : stage === 'complete' ? 'var(--success)' : 'var(--accent)'
        }}>
          {stage === 'complete' ? '100%' : `${Math.round(progress)}%`}
        </div>
      </div>

      {/* Progress Track */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          height: '100%',
          background: stage === 'error' ? 'var(--critical)' : stage === 'complete' ? 'var(--success)' : 'var(--accent)',
          transition: 'width 240ms cubic-bezier(0.22, 1, 0.36, 1)'
        }} />
      </div>

      {/* Verification Steps List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-soft)'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex || stage === 'complete';
          const isCurrent = idx === currentStepIndex && stage !== 'complete' && stage !== 'error';
          const isFailed = idx === currentStepIndex && stage === 'error';

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '6px',
                background: isCurrent ? 'rgba(159, 232, 227, 0.04)' : 'transparent',
                border: isCurrent ? '1px solid rgba(159, 232, 227, 0.2)' : '1px solid transparent'
              }}
            >
              {isDone ? (
                <CheckCircle size={15} style={{ color: 'var(--success)', flexShrink: 0 }} />
              ) : isCurrent ? (
                <Loader2 size={15} className="spin" style={{ color: 'var(--accent)', flexShrink: 0 }} />
              ) : isFailed ? (
                <AlertCircle size={15} style={{ color: 'var(--critical)', flexShrink: 0 }} />
              ) : (
                <div style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: '1px solid var(--text-dim)',
                  flexShrink: 0
                }} />
              )}
              <div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: isDone ? 'var(--text)' : isCurrent ? 'var(--accent)' : 'var(--text-muted)'
                }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 'var(--text-micro)', color: 'var(--text-dim)' }}>
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          borderRadius: '6px',
          background: 'rgba(255, 107, 103, 0.08)',
          border: '1px solid rgba(255, 107, 103, 0.25)',
          color: 'var(--critical)',
          fontSize: 'var(--text-xs)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
