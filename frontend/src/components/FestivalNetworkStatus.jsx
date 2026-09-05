import React from 'react';
import SectionLabel from './SectionLabel';
import StatusDot from './StatusDot';
import { Server, Wifi, Activity } from 'lucide-react';

export default function FestivalNetworkStatus() {
  const nodes = [
    {
      festival: 'Festival de Cannes',
      venue: 'Palais des Festivals (Grand Théâtre Lumière)',
      spec: 'DCI 4K · SMPTE 2067-2 · Dolby Atmos',
      pipe: 'Aspera 10Gbps Point-to-Point',
      latency: '14ms',
      status: 'active',
      statusText: 'Pipeline Ingesting',
    },
    {
      festival: 'Venice International Film Festival',
      venue: 'Palazzo del Cinema (Sala Grande)',
      spec: 'DCI 4K Scope 2.39 · 5.1 Discrete',
      pipe: 'Signiant Media Shuttle Secure 5Gbps',
      latency: '22ms',
      status: 'healthy',
      statusText: 'Hot Standby',
    },
    {
      festival: 'Berlin International Film Festival',
      venue: 'Berlinale Palast',
      spec: 'SMPTE 429-2 Flat 1.85 · Multi-Subtitles',
      pipe: 'Fiber Direct Connect 10Gbps',
      latency: '18ms',
      status: 'healthy',
      statusText: 'Hot Standby',
    },
    {
      festival: 'SXSW Film & TV Festival',
      venue: 'Paramount Theatre (Austin, TX)',
      spec: 'SMPTE DCI Discrete · 7.1 Surround',
      pipe: 'AWS S3 Direct Ingest S3-Accelerate',
      latency: '46ms',
      status: 'healthy',
      statusText: 'Hot Standby',
    },
  ];

  return (
    <section style={{
      padding: '48px 0',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <SectionLabel text="GLOBAL INGEST NETWORK" />
          <h2 style={{
            fontSize: 'var(--text-title)',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.025em',
            color: 'var(--foreground)',
          }}>
            Connected Festival Ingest Nodes
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
          <Activity size={13} style={{ color: 'var(--accent)' }} />
          <span>4 FESTIVAL HUBS CONNECTED · DCI SPEC 1.3 COMPLIANT</span>
        </div>
      </div>

      <div style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)'
      }}>
        {nodes.map((node, i) => (
          <div
            key={node.festival}
            style={{
              padding: '20px 24px',
              borderBottom: i < nodes.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              alignItems: 'center',
              transition: 'background-color var(--trans-hover)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                {node.festival}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                {node.venue}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--foreground-soft)' }}>
                {node.spec}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                {node.pipe}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                  RTT: {node.latency}
                </span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: node.status === 'active' ? 'var(--critical-subtle)' : 'rgba(255, 255, 255, 0.05)',
                color: node.status === 'active' ? 'var(--critical)' : 'var(--foreground-soft)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)'
              }}>
                <StatusDot status={node.status} size={5} />
                {node.statusText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
