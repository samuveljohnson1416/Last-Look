// Visual QC evidence — pure SVG, no data deps. Makes the failure legible:
// which audio channels are missing, and how far subtitles drifted.

const EXPECTED_71 = ["L", "R", "C", "LFE", "Ls", "Rs", "Lrs", "Rrs"];
const ACTUAL_51 = new Set(["L", "R", "C", "LFE", "Ls", "Rs"]);

function Channels() {
  const w = 340, cell = 36, gap = 6, x0 = 8;
  return (
    <svg viewBox={`0 0 ${w} 120`} width="100%" role="img" aria-label="Audio channel comparison">
      <text x={x0} y={16} fill="var(--muted)" fontSize="11">EXPECTED 7.1</text>
      {EXPECTED_71.map((ch, i) => (
        <g key={"e" + ch}>
          <rect x={x0 + i * (cell + gap)} y={24} width={cell} height={26} rx={4}
            fill="var(--panel-2)" stroke="var(--green)" />
          <text x={x0 + i * (cell + gap) + cell / 2} y={41} fill="var(--ink)"
            fontSize="11" textAnchor="middle">{ch}</text>
        </g>
      ))}
      <text x={x0} y={74} fill="var(--muted)" fontSize="11">ACTUAL 5.1</text>
      {EXPECTED_71.map((ch, i) => {
        const present = ACTUAL_51.has(ch);
        return (
          <g key={"a" + ch}>
            <rect x={x0 + i * (cell + gap)} y={82} width={cell} height={26} rx={4}
              fill={present ? "var(--panel-2)" : "rgba(239,68,68,0.12)"}
              stroke={present ? "var(--green)" : "var(--red)"}
              strokeDasharray={present ? "0" : "4 3"} />
            <text x={x0 + i * (cell + gap) + cell / 2} y={99}
              fill={present ? "var(--ink)" : "var(--red)"} fontSize="11" textAnchor="middle">
              {present ? ch : "—"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Drift() {
  const w = 340, y = 60, x0 = 12, x1 = 300, drift = 34; // 34px ~ 200ms visual
  return (
    <svg viewBox={`0 0 ${w} 120`} width="100%" role="img" aria-label="Subtitle timing drift">
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="var(--line)" strokeWidth={2} />
      {/* expected cue */}
      <line x1={160} y1={y - 18} x2={160} y2={y + 18} stroke="var(--green)" strokeWidth={2} />
      <text x={160} y={y - 24} fill="var(--green)" fontSize="10" textAnchor="middle">expected</text>
      {/* actual cue, drifted */}
      <line x1={160 + drift} y1={y - 18} x2={160 + drift} y2={y + 18} stroke="var(--red)" strokeWidth={2} />
      <text x={160 + drift} y={y + 34} fill="var(--red)" fontSize="10" textAnchor="middle">actual</text>
      {/* drift arrow */}
      <line x1={160} y1={y + 24} x2={160 + drift} y2={y + 24} stroke="var(--red)" strokeWidth={1.5}
        markerEnd="url(#arw)" />
      <text x={160 + drift / 2} y={y + 20} fill="var(--red)" fontSize="10" textAnchor="middle">+200ms</text>
      <defs>
        <marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--red)" />
        </marker>
      </defs>
    </svg>
  );
}

export default function EvidencePanel() {
  return (
    <div className="audit">
      <div className="panel">
        <h3>Visual Evidence</h3>
        <div className="evidence">
          <div><div className="ev-cap">Audio channels — 2 missing (Lrs, Rrs)</div><Channels /></div>
          <div><div className="ev-cap">Subtitle timing drift</div><Drift /></div>
        </div>
      </div>
    </div>
  );
}
