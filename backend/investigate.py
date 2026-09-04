"""Run the Watcher -> Analyst -> Advisor chain and collect each agent's findings.

Each run: ADK spawns the Grafana MCP server (Docker stdio), the agents query
real Prometheus/Loki data and reason with Gemini. Returns per-agent text.

The free Gemini tier throws transient 503s / connection drops under a burst of
tool-use calls, and one failed call aborts the whole SequentialAgent run -- so
we retry with backoff, and cache the last good result so the app always has a
real investigation to serve (populate via `python investigate.py`).
"""
import asyncio
import json
from pathlib import Path

import aiohttp
from google.adk.runners import InMemoryRunner
from google.genai import types
from google.genai import errors as genai_errors

from agents import investigator

APP = "lastlook"
CACHE = Path(__file__).resolve().parent / "last_investigation.json"
TRIGGER = (
    "A DCP has failed festival QC before the deadline. Investigate the live "
    "Grafana metrics and logs, then report: the spec mismatches, the root cause, "
    "the historical pattern, the festival cascade risk, and recommended options.")

# Retry ONLY on 503/network (ServerError is 5xx) -- never on 429, because the
# free tier is 20 calls/day/model and retrying a quota error just burns the day.
_TRANSIENT = (genai_errors.ServerError, aiohttp.ClientError, OSError, asyncio.TimeoutError)


async def _run_once(user: str) -> dict:
    runner = InMemoryRunner(agent=investigator, app_name=APP)
    session = await runner.session_service.create_session(app_name=APP, user_id=user)
    msg = types.Content(role="user", parts=[types.Part(text=TRIGGER)])
    outputs: dict[str, str] = {}
    async for ev in runner.run_async(user_id=user, session_id=session.id, new_message=msg):
        if ev.content and ev.content.parts:
            txt = "".join(p.text or "" for p in ev.content.parts).strip()
            if txt:
                outputs[ev.author] = txt  # last text per agent
    return outputs


async def run_investigation(user: str = "postprod_supervisor_01", attempts: int = 2) -> dict:
    last: Exception | None = None
    for i in range(attempts):
        try:
            out = await _run_once(user)
            if out:
                CACHE.write_text(json.dumps(out, indent=2), encoding="utf-8")
                return out
        except _TRANSIENT as e:
            last = e
            await asyncio.sleep(2 * (i + 1))
    raise last if last else RuntimeError("no output")


def get_cached() -> dict | None:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    return None


if __name__ == "__main__":
    out = asyncio.run(run_investigation())
    print(json.dumps(out, indent=2))
    print(f"\ncached -> {CACHE}")
