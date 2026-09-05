"""Real DCP QC metrics, read live from Grafana Cloud Prometheus.

Queries the seeded gauges through the Grafana datasource proxy and compares
them to the festival spec. No mocks -- if Grafana has no data, values are null
and qc is 'unknown'.
"""
import json
import os
import urllib.parse
import urllib.request

SPEC = {
    "dcp_audio_channels": 7.1,
    "dcp_subtitle_timing_drift_ms": 0.0,
    "dcp_resolution_width": 2048.0,
    "dcp_resolution_height": 858.0,
}
EXTRA = ["dcp_export_progress_pct", "festival_deadline_hours_remaining"]
PROM_UID = "grafanacloud-prom"


def _query(url: str, tok: str, name: str):
    q = urllib.parse.quote(name)
    req = urllib.request.Request(
        f"{url}/api/datasources/proxy/uid/{PROM_UID}/api/v1/query?query={q}",
        headers={"Authorization": "Bearer " + tok})
    with urllib.request.urlopen(req, timeout=10) as r:
        res = json.load(r).get("data", {}).get("result", [])
    return float(res[0]["value"][1]) if res else None


def read() -> dict:
    url = os.environ["GRAFANA_URL"].rstrip("/")
    tok = os.environ["GRAFANA_MCP_TOKEN"]
    vals: dict[str, float | None] = {}
    for n in list(SPEC) + EXTRA:
        try:
            vals[n] = _query(url, tok, n)
        except Exception:
            vals[n] = None

    mismatches = [n for n, want in SPEC.items()
                  if vals.get(n) is not None and vals[n] != want]
    have_data = any(v is not None for v in vals.values())
    qc = "unknown" if not have_data else ("fail" if mismatches else "pass")

    return {
        "source": "grafana-cloud-prometheus",
        "metrics": vals,
        "spec": SPEC,
        "mismatches": mismatches,
        "qc": qc,
    }


if __name__ == "__main__":
    from pathlib import Path
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
    print(json.dumps(read(), indent=2))
