"""Executor: the only component with a write tool. Called by /authorize after
explicit human approval; writes a REAL Grafana annotation (auditable trail)."""
import json
import os
import time
import urllib.error
import urllib.request


def annotate(d: dict) -> dict:
    url = os.environ["GRAFANA_URL"].rstrip("/")
    tok = os.environ["GRAFANA_MCP_TOKEN"]
    text = (f"Option {d['option']} approved | Film: {d['film']} | "
            f"Festival: {d['festival']} | Approved by: {d['approved_by']}")
    body = json.dumps({
        "text": text,
        "tags": ["lastlook", "dcp", "decision", f"festival:{d['festival']}"],
        "time": int(time.time() * 1000),
    }).encode()
    req = urllib.request.Request(
        url + "/api/annotations", data=body, method="POST",
        headers={"Authorization": "Bearer " + tok, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            res = json.load(r)
        return {"annotated": True, "id": res.get("id"), "text": text}
    except urllib.error.HTTPError as e:
        return {"annotated": False, "error": f"{e.code}: {e.read().decode()[:200]}", "text": text}


if __name__ == "__main__":  # self-check: write a real annotation, then read it back
    from dotenv import load_dotenv
    load_dotenv()
    demo = {"option": "A", "film": "The Last Harvest",
            "festival": "Berlinale", "approved_by": "selfcheck"}
    out = annotate(demo)
    print("annotate ->", out)
    assert out["annotated"], out
    # read it back to prove it landed
    u = os.environ["GRAFANA_URL"].rstrip("/"); t = os.environ["GRAFANA_MCP_TOKEN"]
    rq = urllib.request.Request(u + "/api/annotations?tags=lastlook&limit=1",
                                headers={"Authorization": "Bearer " + t})
    with urllib.request.urlopen(rq, timeout=15) as r:
        got = json.load(r)
    print("readback ->", got[0]["text"] if got else "(none)")
    assert got and got[0].get("id") == out["id"]
    print("OK: real Grafana annotation created and verified")
