import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Clock, AlertTriangle, DollarSign } from 'lucide-react';

/**
 * AnimatedNumber: Counter animates on update (200ms ease-out) with no jitter, tabular numbers.
 */
function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValRef = useRef(value);

  useEffect(() => {
    let startTimestamp = null;
    const startVal = typeof prevValRef.current === 'number' ? prevValRef.current : 0;
    const endVal = typeof value === 'number' ? value : 0;
    const duration = 200; // 200ms ease-out

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        prevValRef.current = endVal;
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value]);

  const formatted = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : displayValue;

  return (
    <span className="tabular-nums font-mono">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function MetricCards({
  healthPercent = 99.4,
  audioDriftMs = 0.0,
  slaBufferHours = '72h 00m',
  exposureAmount = 0,
  isCritical = false,
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '16px',
      }}
    >
      {/* Card 1: DCP Integrity */}
      <div
        className="card-command hover-glow"
        style={{
          height: '100px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: isCritical ? '2px solid var(--critical)' : '2px solid var(--accent-cyan)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            DCP Integrity
          </span>
          <ShieldCheck size={13} color={isCritical ? 'var(--critical)' : 'var(--text-muted)'} />
        </div>

        <div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: isCritical ? 'var(--critical)' : 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            <AnimatedCounter value={healthPercent} suffix="%" decimals={1} />
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span style={{ color: isCritical ? 'var(--critical)' : 'var(--success)', fontWeight: 500 }}>
            {isCritical ? 'Phase Error' : 'SMPTE Valid'}
          </span>
          <span>• Ch C+LFE check</span>
        </div>
      </div>

      {/* Card 2: Audio Clock Sync Variance */}
      <div
        className="card-command hover-glow"
        style={{
          height: '100px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: Math.abs(audioDriftMs) > 20 ? '2px solid var(--critical)' : '0.5px solid var(--border-default)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Audio Clock Drift
          </span>
          <Clock size={13} color={Math.abs(audioDriftMs) > 20 ? 'var(--critical)' : 'var(--text-muted)'} />
        </div>

        <div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: Math.abs(audioDriftMs) > 20 ? 'var(--critical)' : 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            <AnimatedCounter
              value={audioDriftMs}
              prefix={audioDriftMs > 0 ? '+' : ''}
              suffix=" ms"
              decimals={1}
            />
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span style={{ color: Math.abs(audioDriftMs) > 20 ? 'var(--critical)' : 'var(--text-muted)' }}>
            Threshold ±20ms
          </span>
          <span>• 48kHz Clock</span>
        </div>
      </div>

      {/* Card 3: Festival Delivery Buffer */}
      <div
        className="card-command hover-glow"
        style={{
          height: '100px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Delivery SLA Margin
          </span>
          <AlertTriangle size={13} color="var(--accent-amber)" />
        </div>

        <div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
            className="tabular-nums font-mono"
          >
            {slaBufferHours}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--accent-amber)', fontWeight: 500 }}>Palais Lumière</span>
          <span>• Curtain Jan 28, 2 PM</span>
        </div>
      </div>

      {/* Card 4: Live Exposure at Risk */}
      <div
        className="card-command hover-glow"
        style={{
          height: '100px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: exposureAmount > 0 ? '2px solid var(--critical)' : '0.5px solid var(--border-default)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Exposure at Risk
          </span>
          <DollarSign size={13} color={exposureAmount > 0 ? 'var(--critical)' : 'var(--text-muted)'} />
        </div>

        <div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: exposureAmount > 0 ? 'var(--critical)' : 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            <AnimatedCounter value={exposureAmount} prefix="$" decimals={0} />
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span style={{ color: exposureAmount > 0 ? 'var(--critical)' : 'var(--success)', fontWeight: 500 }}>
            {exposureAmount > 0 ? 'Active Liability' : 'Nominal'}
          </span>
          <span>• Cannes Gala Slot</span>
        </div>
      </div>
    </div>
  );
}
