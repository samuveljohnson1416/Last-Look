"use client";
import { useEffect, useState } from "react";
import EvidencePanel from "./EvidencePanel";
import AgentTrace from "./AgentTrace";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Demo incident context. In the live demo the simulator seeds these into
// Grafana and the agents read them back; here they drive the UI narrative.
const FILM = "The Last Harvest";
const FESTIVAL = "Berlinale";
const APPROVER = "postprod_supervisor_01";
const FAILURES = [
  { label: "Audio channels", expected: "7.1", actual: "5.1" },
  { label: "Subtitle timing drift", expected: "0 ms", actual: "200 ms" },
  { label: "Resolution", expected: "2048x858", actual: "1920x1080" },
];

type Opt = { id: string; action: string; cost: number; success: number; hours: number; roi: number | null; residual_risk: string };
type Analysis = {
  impact: { swing: number; exposure: number; intervention_cost: number; roi: number };
  options: Opt[];
  whatif: string;
};

const money = (n: number) => "$" + n.toLocaleString();

function useCountdown(hours: number) {
  const [target] = useState(() => Date.now() + hours * 3600_000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return { text: `${hh}:${mm}:${ss}`, warn: s < 48 * 3600 };
}

export default function ControlRoom() {
  const [data, setData] = useState<Analysis | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [audit, setAudit] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const cd = useCountdown(72);

  useEffect(() => {
    fetch(`${API}/analyze`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr(`Can't reach backend at ${API} — start the FastAPI server.`));
  }, []);

  async function approve(option: string) {
    setBusy(option);
    try {
      const r = await fetch(`${API}/authorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option, approved_by: APPROVER, film: FILM, festival: FESTIVAL }),
      });
      const j = await r.json();
      if (j.text) setAudit((a) => [j.text, ...a]);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <div className="brand">
          Last <span>Look</span>
          <small>Festival Delivery Compliance</small>
        </div>
        <div className="context">
          <div><div className="k">Film</div><div className="v">{FILM}</div></div>
          <div><div className="k">Festival</div><div className="v">{FESTIVAL}</div></div>
          <div><div className="k">Budget left</div><div className="v">$500 / $2,000</div></div>
        </div>
        <div>
          <div className="k" style={{ color: "var(--muted)", fontSize: 12 }}>Deadline</div>
          <div className={"countdown" + (cd.warn ? " warn" : "")}>{cd.text}</div>
        </div>
      </div>

      <div className="grid">
        <div className="panel">
          <h3>QC Validation</h3>
          <div className="qc"><span className="dot red" /> FAILED</div>
          {FAILURES.map((f) => (
            <div className="fail" key={f.label}>
              <span>{f.label}</span>
              <span><span className="exp">{f.expected}</span> → <span className="bad">{f.actual}</span></span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>Investigation</h3>
          <div className="diag">
            Root cause: <b>wrong export preset</b> (DCP_5.1_Standard selected instead of DCP_7.1_Premium).<br /><br />
            Historical pattern: <b>3rd audio mismatch in 6 months</b> — flag DCP_5.1_Standard as high-risk.<br /><br />
            Cascade: missing {FESTIVAL} forfeits the paid slot and confirmed buyer meetings; the festival run slips ~6 months, delaying any distribution deal.
          </div>
        </div>

        <div className="panel">
          <h3>Business Impact</h3>
          {data ? (
            <>
              <div className="impact-big">{money(data.impact.exposure)}</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 10 }}>total exposure</div>
              <div className="impact-row"><span>Deadline swing</span><span className="n">{money(data.impact.swing)}</span></div>
              <div className="impact-row"><span>Intervention cost</span><span className="n">{money(data.impact.intervention_cost)}</span></div>
              <div className="impact-row"><span>ROI (Option A)</span><span className="n roi">{data.impact.roi}:1</span></div>
            </>
          ) : (
            <div className="empty">{err || "Loading impact model…"}</div>
          )}
        </div>
      </div>

      {data && (
        <>
          <div className="options">
            {data.options.map((o) => (
              <div className={"opt" + (o.id === "A" ? " reco" : "")} key={o.id}>
                <div className="id">OPTION {o.id}{o.id === "A" ? " · RECOMMENDED" : ""}</div>
                <div className="act">{o.action}</div>
                <div className="stat"><span>Cost</span><b>{o.cost ? money(o.cost) : "$0"}</b></div>
                <div className="stat"><span>Success</span><b>{Math.round(o.success * 100)}%</b></div>
                <div className="stat"><span>Time</span><b>{o.hours}h</b></div>
                <div className="stat"><span>ROI</span><b>{o.roi ? o.roi + ":1" : "—"}</b></div>
                <button
                  className={"btn" + (o.id === "A" ? " primary" : "")}
                  disabled={busy !== null}
                  onClick={() => approve(o.id)}
                >
                  {busy === o.id ? "Recording…" : `Approve ${o.id}`}
                </button>
              </div>
            ))}
          </div>
          <div className="whatif">{data.whatif}</div>
        </>
      )}

      <AgentTrace />

      <EvidencePanel />

      <div className="audit">
        <div className="panel">
          <h3>Audit Log (Grafana annotations)</h3>
          {audit.length === 0 ? (
            <div className="empty">No decision recorded yet. Approve an option — it writes an auditable annotation.</div>
          ) : (
            audit.map((t, i) => <pre key={i}>{t}</pre>)
          )}
        </div>
      </div>
    </div>
  );
}
