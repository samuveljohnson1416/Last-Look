# Last Look

*The last look that speaks money.* An agentic Festival Delivery compliance
command center for the **Agentic Cinema** hackathon (Grafana track).

When a film's DCP fails technical QC before a festival deadline, Last Look
translates the failure into business impact ($ at risk, ROI), proposes 3
interventions, waits for human approval, and logs an auditable decision to
Grafana.

## Stack
- **Google ADK** SequentialAgent (Watcher -> Analyst -> Advisor) + gated Executor
- **Gemini on Vertex AI**
- **Grafana Cloud MCP** -- Prometheus metrics, Loki logs, `create_annotation`
- **Next.js** control-room UI, FastAPI backend, Cloud Run

## Run

Backend:

    cd backend && pip install -r requirements.txt
    cp .env.example .env      # fill in GCP + Grafana Cloud MCP creds
    python impact.py          # self-check the decision model
    uvicorn main:app --reload # http://localhost:8000

Frontend (separate terminal):

    cd frontend && npm install
    cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:8000
    npm run dev                        # http://localhost:3000

The control room works against `/analyze` and `/authorize` with **no cloud
creds** -- Vertex AI and Grafana only come in for the live agent chain.

## Layout
- `backend/impact.py` -- deterministic decision model (tested)
- `backend/agents.py` -- ADK chain + Grafana MCP toolset
- `backend/executor.py` -- the only write path (human-gated)
- `backend/main.py` -- /analyze /authorize /metrics
- `frontend/app/page.tsx` -- cinematic control-room UI
- `simulator/seed.py` -- pushes demo metrics/logs to Grafana Cloud
