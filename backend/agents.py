"""Last Look agent chain (Google ADK).

  SequentialAgent: Watcher -> Analyst -> Advisor   (read-only, no write tools)
  Executor: separate, human-gated, the ONLY thing that writes to Grafana.

Grafana Cloud MCP is attached as a toolset so the agents query real
Prometheus/Loki data at runtime (the Grafana-track requirement). Wire the
endpoint + token via .env -- see .env.example.
"""
import os
from dotenv import load_dotenv
load_dotenv()

from google.adk.agents import LlmAgent, SequentialAgent
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset, StreamableHTTPServerParams

MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

# --- Grafana Cloud MCP (metrics/logs/annotations) --------------------------
grafana_mcp = McpToolset(
    connection_params=StreamableHTTPServerParams(
        url=os.environ["GRAFANA_MCP_URL"],
        headers={"Authorization": "Bearer " + os.environ["GRAFANA_MCP_TOKEN"]},
    )
)

watcher = LlmAgent(
    name="watcher", model=MODEL, tools=[grafana_mcp],
    instruction=(
        "You monitor DCP delivery. Query Prometheus for dcp_audio_channels, "
        "dcp_subtitle_timing_drift_ms, dcp_resolution, dcp_export_progress_pct, "
        "festival_deadline_hours_remaining. Report any spec mismatch as a "
        "structured anomaly. Do not recommend fixes."),
)

analyst = LlmAgent(
    name="analyst", model=MODEL, tools=[grafana_mcp],
    instruction=(
        "Given the anomaly, query Loki for the export logs and QC error codes to "
        "find the ROOT CAUSE (e.g. wrong export preset). Count how often this "
        "error appears in the last 6 months. Look up festival cascade risk from "
        "the festival graph tool. Output: root_cause, historical_count, cascade."),
)

advisor = LlmAgent(
    name="advisor", model=MODEL,
    instruction=(
        "Turn the diagnosis into business impact using the numbers the caller "
        "provides from impact.assess(). Present 3 options (A re-export, B "
        "extension, C submit as-is) with cost/success/ROI and one what-if. "
        "Do NOT invent numbers -- narrate the ones given."),
)

pipeline = SequentialAgent(name="lastlook", sub_agents=[watcher, analyst, advisor])
