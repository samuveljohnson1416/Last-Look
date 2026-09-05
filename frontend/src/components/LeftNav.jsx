import React from 'react';
import {
  LayoutDashboard,
  AlertOctagon,
  CalendarDays,
  Settings,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  Lightbulb,
  Zap
} from 'lucide-react';

export default function LeftNav({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  agentStatuses = {
    watcher: 'active',
    analyst: 'active',
    advisor: 'active',
    executor: 'standby',
  },
  incidentCount = 1,
}) {
  const navItems = [
    { id: 'control_room', label: 'Control Room', icon: LayoutDashboard },
    { id: 'incidents', label: 'Incidents & QC', icon: AlertOctagon, badge: incidentCount > 0 ? `${incidentCount}` : null },
    { id: 'calendar', label: 'Festival Calendar', icon: CalendarDays },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? '64px' : '220px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '0.5px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-panel)',
        zIndex: 40,
        height: 'calc(100vh - 56px - 100px)',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Top Nav Items */}
      <div style={{ padding: '14px 0' }}>
        {/* Collapse Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: isCollapsed ? 'center' : 'flex-end',
            padding: '0 14px 10px',
            borderBottom: '0.5px solid var(--border-default)',
            marginBottom: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
            }}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Links (Minimal, no backgrounds, just text and icons) */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: isCollapsed ? '8px 0' : '8px 16px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all var(--transition-micro)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'currentColor'} strokeWidth={1.75} />
                {!isCollapsed && (
                  <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      padding: '1px 5px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 77, 77, 0.2)',
                      color: 'var(--critical)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Agent Fleet Status (4 tiny 4px dots) */}
      <div
        style={{
          padding: isCollapsed ? '12px 6px' : '14px 16px',
          borderTop: '0.5px solid var(--border-default)',
          backgroundColor: 'transparent',
        }}
      >
        {!isCollapsed ? (
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Agent Swarm
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Eye size={12} color="var(--text-muted)" /> Watcher
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: agentStatuses.watcher === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {agentStatuses.watcher}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Search size={12} color="var(--text-muted)" /> Analyst
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: agentStatuses.analyst === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {agentStatuses.analyst}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Lightbulb size={12} color="var(--text-muted)" /> Advisor
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: agentStatuses.advisor === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {agentStatuses.advisor}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Zap size={12} color="var(--text-muted)" /> Executor
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: agentStatuses.executor === 'writing' ? 'var(--accent-amber)' : (agentStatuses.executor === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)'),
                    }}
                  />
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {agentStatuses.executor}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: agentStatuses.watcher === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: agentStatuses.analyst === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: agentStatuses.advisor === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: agentStatuses.executor === 'active' ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
          </div>
        )}
      </div>
    </aside>
  );
}
