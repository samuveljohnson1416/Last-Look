"""Last Look API. /analyze runs the read-only chain; /authorize is the only
write path (human-gated) and annotates Grafana."""
from dotenv import load_dotenv
load_dotenv()  # read backend/.env before anything touches os.environ

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from impact import Assumptions, assess, options, whatif_B_denied
from executor import annotate

app = FastAPI(title="Last Look")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ponytail: open in dev; lock to the deployed origin for prod
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/metrics")
def metrics():
    # Snapshot the UI polls for the countdown / QC light. Wired to Grafana on Day 2.
    return {"source": "grafana", "note": "stub -- replace with live Prometheus query"}


@app.post("/analyze")
def analyze(a: Assumptions = Assumptions()):
    return {"impact": assess(a), "options": options(a), "whatif": whatif_B_denied(a)}


class Decision(BaseModel):
    option: str            # "A" | "B" | "C"
    approved_by: str
    film: str
    festival: str


@app.post("/authorize")
def authorize(d: Decision):
    if d.option not in {"A", "B", "C"} or not d.approved_by.strip():
        raise HTTPException(400, "invalid authorization")  # empty/invalid => nothing happens
    return annotate(d.model_dump())
