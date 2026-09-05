"""Run the investigator agent and cache its findings.

A live run: ADK spawns the Grafana MCP server, the agent queries real
Prometheus/Loki data and reasons with Gemini. The result is cached to
`last_investigation.json`; the API serves that cache (fast + reliable, and it
means the deployed app doesn't need the heavy ADK/MCP stack just to serve).

Heavy imports (adk, genai, agents) are done lazily inside the run functions so
`get_cached` -- all the web app needs -- stays a plain file read.

Populate the cache:  python investigate.py
"""
import json
from pathlib import Path

CACHE = Path(__file__).resolve().parent / "last_investigation.json"
APP = "lastlook"
TRIGGER = (
    "A DCP has failed festival QC before the deadline. Investigate the live "
    "Grafana metrics and logs, then report: the spec mismatches, the root cause, "
    "the historical pattern, the festival cascade risk, and recommended options.")


def get_cached() -> dict | None:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    return None


async def _run_once(user: str) -> dict:
    from google.adk.runners import InMemoryRunner
    from google.genai import types
    from agents import investigator

    runner = InMemoryRunner(agent=investigator, app_name=APP)
    session = await runner.session_service.create_session(app_name=APP, user_id=user)
    msg = types.Content(role="user", parts=[types.Part(text=TRIGGER)])
    outputs: dict[str, str] = {}
    async for ev in runner.run_async(user_id=user, session_id=session.id, new_message=msg):
        if ev.content and ev.content.parts:
            txt = "".join(p.text or "" for p in ev.content.parts).strip()
            if txt:
                outputs[ev.author] = txt
    return outputs


async def run_investigation(user: str = "postprod_supervisor_01", attempts: int = 2) -> dict:
    import asyncio
    import aiohttp
    from google.genai import errors as genai_errors
    # Retry ONLY on 503/network -- never on 429 (free tier is 20 calls/day/model).
    transient = (genai_errors.ServerError, aiohttp.ClientError, OSError, asyncio.TimeoutError)

    last: Exception | None = None
    for i in range(attempts):
        try:
            out = await _run_once(user)
            if out:
                CACHE.write_text(json.dumps(out, indent=2), encoding="utf-8")
                return out
        except transient as e:
            last = e
            await asyncio.sleep(2 * (i + 1))
    raise last if last else RuntimeError("no output")


if __name__ == "__main__":
    import asyncio
    out = asyncio.run(run_investigation())
    print(json.dumps(out, indent=2))
    print(f"\ncached -> {CACHE}")
