import React from 'react';
import {
  Eye,
  Search,
  Lightbulb,
  Zap,
} from 'lucide-react';

export default function RightPanel({
  financialExposure = 34500,
  isCritical = true,
  countdownTime = '72h 00m',
  deadlineLabel = 'Submit by: Jan 28, 2:00 PM CET',
  activeAgent = 'analyst', // 'watcher' | 'analyst' | 'advisor' | 'executor'
  agentLogs = [],
}) {
  const agentStream = [
    {
      id: 'watcher',
      name: 'Watcher',
      role: 'EYE',
      icon: Eye,
      status: 'Active',
      action: 'Monitoring DCP validation metrics & SMPTE hash streams',
      state: 'active',
    },
    {
      id: 'analyst',
      name: 'Analyst',
      role: 'INVESTIGATING',
      icon: Search,
      status: activeAgent === 'analyst' ? 'Querying Loki' : 'Verified',
      action: 'Querying Loki logs & calculating SMPTE frame drift...',
      state: activeAgent === 'analyst' ? 'active' : 'completed',
    },
    {
      id: 'advisor',
      name: 'Advisor',
      role: 'REASONING',
      icon: Lightbulb,
      status: activeAgent === 'advisor' ? 'Reasoning' : 'Ready',
      action: 'Calculating impact ($34.5K) & formulating playbooks...',
      state: activeAgent === 'advisor' ? 'active' : (activeAgent === 'executor' ? 'completed' : 'pending'),
    },
    {
      id: 'executor',
      name: 'Executor',
      role: 'STANDBY',
      icon: Zap,
      status: activeAgent === 'executor' ? 'Executing' : 'Awaiting Approval',
      action: activeAgent === 'executor' ? 'Writing audit annotation to Grafana MCP...' : 'Awaiting human approval to record audit trail',
      state: activeAgent === 'executor' ? 'writing' : 'pending',
    },
  ];

  return (
    <div
      style={{
        width: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingRight: '2px',
      }}
    >
      {/* 1. TOP: Financial Exposure Card (180px height - Bloomberg Terminal style) */}
      <div
        className="card-command hover-glow"
        style={{
          height: '180px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: isCritical ? '2px solid var(--critical)' : '2px solid var(--success)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
            Financial Exposure
          </span>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
              color: 'var(--success)',
              border: '0.5px solid rgba(0, 230, 118, 0.25)',
            }}
          >
            ROI 34:1
          </span>
        </div>

        <div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: isCritical ? 'var(--critical)' : 'var(--text-primary)',
              letterSpacing: '-0.03em',
              margin: '2px 0 8px',
            }}
            className="tabular-nums font-mono"
          >
            ${financialExposure.toLocaleString()}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              borderTop: '0.5px solid var(--border-default)',
              paddingTop: '6px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Palais screening slot value:</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>$20,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>DCI rush packaging fee:</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>$8,500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Distributor SLA penalty:</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>$6,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE: Deadline Countdown (140px height - Luxury Watch style) */}
      <div
        className="card-command hover-glow"
        style={{
          height: '140px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Premiere Ingest Window
          </span>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '2px',
              letterSpacing: '-0.02em',
            }}
            className="tabular-nums font-mono"
          >
            {countdownTime}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {deadlineLabel}
          </div>
        </div>

        {/* Circular Progress Ring (160px coordinate space, 76px rendered) */}
        <div style={{ position: 'relative', width: '76px', height: '76px' }}>
          <svg width="76" height="76" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="cyanRingGradientKG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1F1F1F"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#cyanRingGradientKG)"
              strokeWidth="2"
              strokeDasharray="251.2"
              strokeDashoffset="65"
              strokeLinecap="round"
              fill="transparent"
              transform="rotate(-90 50 50)"
              style={{
                transition: 'stroke-dashoffset 1s ease',
              }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            74%
          </div>
        </div>
      </div>

      {/* 3. BOTTOM: Agent Activity Stream (380px height - Status Board style) */}
      <div
        className="card-command"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-tertiary)',
          overflow: 'hidden',
          minHeight: '340px',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            borderBottom: '0.5px solid var(--border-default)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>
            Agent Swarm Stream
          </span>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            AUTONOMOUS
          </span>
        </div>

        {/* 4 Agent Cards (80px each, tiny 4px cyan dot left of active agent) */}
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {agentStream.map((agent) => {
            const Icon = agent.icon;
            const isAgentActive = agent.state === 'active' || agent.state === 'writing';

            return (
              <div
                key={agent.id}
                style={{
                  padding: '8px 10px',
                  borderRadius: '4px',
                  backgroundColor: isAgentActive ? 'var(--surface-hover)' : 'transparent',
                  border: isAgentActive ? '0.5px solid var(--border-hover)' : '0.5px solid transparent',
                  transition: 'all var(--transition-micro)',
                  minHeight: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isAgentActive && (
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }} />
                    )}
                    <Icon size={12} color={isAgentActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: isAgentActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {agent.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      backgroundColor: isAgentActive ? 'rgba(0, 212, 255, 0.08)' : 'transparent',
                      color: isAgentActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {agent.status}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: isAgentActive ? 'var(--text-secondary)' : 'var(--text-muted)', lineHeight: '1.3' }}>
                  {agent.action}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time mini stream */}
        <div
          style={{
            margin: '0 10px 10px',
            backgroundColor: '#050505',
            borderRadius: '3px',
            border: '0.5px solid var(--border-default)',
            padding: '6px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--text-muted)',
            maxHeight: '65px',
            overflowY: 'auto',
          }}
        >
          {agentLogs.length > 0 ? (
            agentLogs.slice(-2).map((log, i) => (
              <div key={i} style={{ marginBottom: '2px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>[{log.time}]</span> {log.msg}
              </div>
            ))
          ) : (
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>[14:22:08]</span> Ingest stream nominal. 48kHz audio locked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
