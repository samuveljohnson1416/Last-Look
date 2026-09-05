import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, FileCode, Check } from 'lucide-react';

export default function ProcessingTimeline({
  progress = 0,
  fileName = 'THE_LAST_HARVEST_FTR-1_S_EN-FR_51_4K_20260518_CPL.xml',
  onComplete = null,
  currentStepIndex = 0
}) {
  const steps = [
    { label: 'Uploading package archive & manifest essence', code: "dcp.ingestStream({ package: 'THE_LAST_HARVEST_DCI_4K.zip' })" },
    { label: 'Parsing CPL, PKL & AssetMap XML trees', code: "dcp.validateXmlSchema({ standard: 'SMPTE ST 429-2', timedText: '428-7' })" },
    { label: 'Checking SHA-1 asset bitstream integrity', code: "dcp.verifyBitstreamHashes({ mxfEssence: 'verified', checksumMatch: true })" },
    { label: 'Detecting frame rate & audio clock profiles', code: "dcp.extractProfile({ detectedFps: '23.976', expectedFps: '24.000', audio: '5.1' })" },
    { label: 'Preparing live delivery validation monitoring', code: "sentinel.registerCase({ festival: 'Cannes 2026', cutoff: '71h 45m' })" },
  ];

  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      borderRadius: '4px',
      overflow: 'hidden',
      background: 'var(--surface)'
    }}>
      {/* Terminal Window Chrome */}
      <div style={{
        padding: '12px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--background-elevated)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginLeft: '6px' }}>
            ingest_pipeline.ts
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} className="pulse-quiet" />
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
            {progress >= 100 ? 'Verified' : 'Processing'}
          </span>
        </div>
      </div>

      {/* Code Stream Output */}
      <div style={{
        padding: '24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        lineHeight: 1.8,
        minHeight: '220px',
        backgroundColor: 'var(--background)'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex || progress >= 100;
          const isCurrent = idx === currentStepIndex && progress < 100;

          if (idx > currentStepIndex && progress < 100) return null;

          return (
            <div
              key={idx}
              className="dev-code-line"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '8px',
                color: isDone ? 'var(--foreground-soft)' : isCurrent ? 'var(--accent)' : 'var(--muted)'
              }}
            >
              <span style={{ color: 'var(--muted-deep)', userSelect: 'none', width: '20px', flexShrink: 0 }}>
                0{idx + 1}
              </span>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isDone ? (
                    <Check size={13} style={{ color: 'var(--success)' }} />
                  ) : (
                    <Loader2 size={13} className="spin" style={{ color: 'var(--accent)' }} />
                  )}
                  <span style={{ fontWeight: 500 }}>{step.label}</span>
                </div>
                <div style={{ color: 'var(--muted-deep)', fontSize: '11px', marginTop: '2px' }}>
                  $ {step.code}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Ingest Footer */}
      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontFamily: 'var(--font-mono)',
        color: 'var(--muted)'
      }}>
        <span>{fileName}</span>
        <span>{Math.min(100, Math.round(progress))}% COMPLETE</span>
      </div>
    </div>
  );
}
