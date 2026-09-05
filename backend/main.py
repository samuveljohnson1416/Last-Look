"""Last Look API. /analyze runs the read-only chain; /authorize is the only
write path (human-gated) and annotates Grafana."""
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / ".env")  # always the repo-root .env

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from impact import Assumptions, assess, options, whatif_B_denied
from executor import annotate
from investigate import get_cached
from dcp_ingest import ingest as ingest_dcp
from live_metrics import read as read_metrics

app = FastAPI(title="Last Look")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ponytail: open in dev; lock to the deployed origin for prod
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/metrics")
def metrics():
    # Real DCP QC metrics read live from Grafana Cloud Prometheus.
    try:
        return read_metrics()
    except Exception as e:  # keep health check alive if Grafana is unreachable
        return {"source": "grafana", "qc": "unknown", "metrics": {}, "error": str(e)[:200]}


@app.get("/ingest")
def ingest():
    # Parse the delivered DCP package (delivered specs vs festival requirement).
    return ingest_dcp()


@app.post("/analyze")
def analyze(a: Assumptions = Assumptions()):
    return {"impact": assess(a), "options": options(a), "whatif": whatif_B_denied(a)}


@app.get("/investigate")
def investigate():
    # the live Watcher->Analyst->Advisor result (via Grafana MCP + Gemini),
    # cached by `python investigate.py`; served fast and reliably here.
    c = get_cached()
    return {"findings": c or {}, "cached": c is not None}


class Decision(BaseModel):
    # accepts either the {option A/B/C, approved_by} shape or the frontend's
    # {option_id 1/2/3, approver} shape
    option: str | None = None
    option_id: int | None = None
    approved_by: str | None = None
    approver: str | None = None
    film: str | None = None
    festival: str | None = None


@app.post("/authorize")
def authorize(d: Decision):
    opt = d.option or {1: "A", 2: "B", 3: "C"}.get(d.option_id or 0)
    who = (d.approved_by or d.approver or "").strip()
    if opt not in {"A", "B", "C"} or not who:
        raise HTTPException(400, "invalid authorization")  # empty/invalid => nothing happens
    pkg = ingest_dcp()  # real film/festival from the delivered package
    return annotate({"option": opt, "approved_by": who,
                     "film": d.film or pkg["film"], "festival": d.festival or pkg["festival"]})
