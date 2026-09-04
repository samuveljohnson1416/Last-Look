"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const ORDER: [string, string][] = [
  ["watcher", "Watcher · detection"],
  ["analyst", "Analyst · root cause"],
  ["advisor", "Advisor · recommendation"],
];

// Live output of the ADK chain (Watcher→Analyst→Advisor) that investigated the
// incident through the Grafana Cloud MCP server and reasoned with Gemini.
export default function AgentTrace() {
  const [f, setF] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch(`${API}/investigate`)
      .then((r) => r.json())
      .then((d) => setF(d.findings || {}))
      .catch(() => setF({}));
  }, []);

  if (f === null) return null;
  const has = Object.keys(f).length > 0;

  return (
    <div className="audit">
      <div className="panel">
        <h3>Agent Investigation <span className="tag">via Grafana MCP + Gemini</span></h3>
        {!has ? (
          <div className="empty">
            No agent trace yet — run <code>python investigate.py</code> to generate one from live Grafana data.
          </div>
        ) : (
          <div className="trace">
            {ORDER.filter(([k]) => f[k]).map(([k, label]) => (
              <div key={k} className="agent">
                <div className="agent-h">{label}</div>
                <pre>{f[k]}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
