# Last Look

*The last look that speaks money.* An agentic **festival-delivery technical
compliance** command center — built for the Agentic Cinema hackathon
(**Grafana** track).

When a film's DCP (Digital Cinema Package) fails technical QC before a festival
deadline, Last Look translates "audio channel mismatch, subtitle drift" into
business impact ("$16,000 at risk, 15:1 ROI on a rush re-export"), proposes
three interventions, **waits for human approval**, and writes an auditable
decision annotation to Grafana.

## How it works

```
 Simulator ──OTLP──▶ Grafana Cloud (Prometheus metrics + Loki logs)
                              │
                    Grafana Cloud MCP server (grafana/mcp-grafana, 74 tools)
                              │
   Google ADK agent (Gemini) ─┘  queries metrics + logs, diagnoses, recommends
                              │
   FastAPI  /analyze (impact model)  /investigate (agent findings)  /authorize
                              │
   React control room ── human approves ──▶ Executor writes a real Grafana annotation
```

- **Google ADK + Gemini** — the investigator agent reasons over the incident.
- **Grafana Cloud MCP** — the agent queries Prometheus/Loki **through the
  official `grafana/mcp-grafana` MCP server at runtime** (the track
  requirement). The Executor writes a real Grafana annotation via the API.
- **Deterministic impact model** ([backend/impact.py](backend/impact.py)) — the
  money math lives in code (auditable, tested); Gemini narrates it, never
  invents numbers.
- **Human-in-the-loop** — no write tools in the investigation chain; the
  Executor only acts on an explicit approval, and empty authorization returns
  `400` (nothing happens).

## Agents

- **Watcher** — detects spec mismatches from Prometheus gauges.
- **Analyst** — root cause from Loki logs (wrong export preset) + historical
  pattern + festival cascade risk.
- **Advisor** — turns the diagnosis into ROI-ranked options.
- **Executor** — the only write path; human-gated; writes the Grafana annotation.

For a live run the three read-only agents are collapsed into one `investigator`
agent ([backend/agents.py](backend/agents.py)) that does the same job in ~4
Gemini calls instead of ~10 — the free Gemini tier is 20 requests/day/model, so
the lean path is what actually completes. The result is cached
(`last_investigation.json`) and served by `/investigate`.

## Setup

Create a repo-root `.env` (see [backend/.env.example](backend/.env.example)):

```
OTLP_ENDPOINT=...        # Grafana Cloud OTLP gateway
OTLP_INSTANCE_ID=...
OTLP_TOKEN=...
GRAFANA_URL=https://<stack>.grafana.net
GRAFANA_MCP_TOKEN=glsa_...   # Grafana service-account token
GOOGLE_GENAI_USE_VERTEXAI=0
GOOGLE_API_KEY=...           # AI Studio key (free) — https://aistudio.google.com/apikey
GEMINI_MODEL=gemini-flash-latest
```

Prereqs: Python 3.11, Node 18+, Docker (for the Grafana MCP server).

## Run

```bash
# 1. backend
cd backend && pip install -r requirements.txt
python impact.py                       # self-check the decision model
python -m uvicorn main:app --port 8000

# 2. seed the demo incident into Grafana Cloud
cd simulator && pip install -r requirements.txt
python seed.py

# 3. capture a live agent investigation (needs Docker running)
cd backend && python investigate.py    # writes last_investigation.json

# 4. frontend
cd frontend && npm install && npm run dev   # http://localhost:3000
```

## Layout

- `backend/impact.py` — deterministic decision model (tested)
- `backend/agents.py` — ADK agents + Grafana MCP toolset (Docker stdio)
- `backend/investigate.py` — runs the agent, caches findings
- `backend/executor.py` — the only write path (real Grafana annotation)
- `backend/main.py` — `/analyze` `/investigate` `/authorize` `/metrics`
- `simulator/seed.py` — pushes DCP metrics/logs to Grafana Cloud via OTLP
- `frontend/` — Next.js cinematic control room
