import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronRight, UserCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function AuditRecord({
  record = {
    id: 'REC-2026-0904-8821',
    timestamp: '2026-09-04 14:48:12 UTC',
    authorizedBy: 'Antony Jenish (Post Production Supervisor)',
    decision: 'Repackage and Rush-Deliver (Option 1)',
    cost: '$8,500 USD',
    hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    caseTitle: 'The Quiet Hour (TIFF 2026)',
    status: 'Recorded & Executed',
    playbooks: ['SMPTE Resync (24.000 fps master audio restamp)', 'Aspera High-Priority Pipe', 'Festival Tech Portal Manifest Hash Update'],
    rejectedAlternatives: ['Request Extension (Medium Risk)', 'Submit Current Package (High Risk)']
  }
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '12px'
    }}>
      {/* Top Summary Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
          transition: 'background var(--ease-premium) 160ms'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '6px',
            background: 'rgba(142, 214, 163, 0.08)',
            border: '1px solid rgba(142, 214, 163, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)'
          }}>
            <ShieldCheck size={16} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--text)' }}>
                {record.decision}
              </span>
              <span style={{
                fontSize: 'var(--text-micro)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {record.id}
              </span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{record.caseTitle}</span>
              <span>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UserCheck size={11} />
                {record.authorizedBy}
              </span>
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Authorized Cost</div>
            <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 500 }}>
              {record.cost}
            </div>
          </div>

          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--success)',
            background: 'rgba(142, 214, 163, 0.06)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(142, 214, 163, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <CheckCircle2 size={12} />
            {record.status}
          </div>

          <div style={{ color: 'var(--text-dim)' }}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded Cryptographic Detail */}
      {isExpanded && (
        <div style={{
          padding: '20px',
          borderTop: '1px solid var(--border)',
          background: 'rgba(0, 0, 0, 0.2)',
          fontSize: 'var(--text-xs)',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', fontSize: 'var(--text-micro)', letterSpacing: '0.05em' }}>
                Timestamp & Identity
              </div>
              <div style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{record.timestamp}</div>
              <div style={{ color: 'var(--text-soft)' }}>Authorized by: {record.authorizedBy}</div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', fontSize: 'var(--text-micro)', letterSpacing: '0.05em' }}>
                Immutable Audit Hash
              </div>
              <div style={{
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                wordBreak: 'break-all',
                background: 'var(--bg)',
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid var(--border-soft)'
              }}>
                {record.hash}
              </div>
            </div>
          </div>

          {/* Executed Playbooks */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', fontSize: 'var(--text-micro)', letterSpacing: '0.05em' }}>
              Executed Automated Playbooks
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {record.playbooks && record.playbooks.map((p, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-soft)' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>0{idx + 1}.</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rejected Alternatives */}
          {record.rejectedAlternatives && (
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', fontSize: 'var(--text-micro)', letterSpacing: '0.05em' }}>
                Rejected Alternatives (Audit Trail Preserved)
              </div>
              <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                {record.rejectedAlternatives.join(' · ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
