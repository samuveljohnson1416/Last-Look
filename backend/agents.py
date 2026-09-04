"""Last Look agent chain (Google ADK).

  SequentialAgent: Watcher -> Analyst -> Advisor   (read-only, no write tools)
  Executor: separate, human-gated (executor.py), the only thing that writes.

The Watcher/Analyst investigate through the official Grafana Cloud MCP server
(grafana/mcp-grafana), launched over stdio via Docker -- that's the Grafana
track's runtime requirement (proven: 74 tools registered against the stack).
"""
import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / ".env")  # always the repo-root .env

from google.adk.agents import LlmAgent, SequentialAgent
from google.adk.tools.mcp_tool.mcp_toolset import McpToolset, StdioConnectionParams
from mcp import StdioServerParameters

MODEL = os.getenv("GEMINI_MODEL", "gemini-flash-latest")

# Docker must be on PATH for the subprocess ADK spawns.
_DOCKER_BIN = r"C:\Program Files\Docker\Docker\resources\bin"
_env = {**os.environ,
        "PATH": os.environ.get("PATH", "") + os.pathsep + _DOCKER_BIN,
        "GRAFANA_URL": os.environ["GRAFANA_URL"],
        "GRAFANA_SERVICE_ACCOUNT_TOKEN": os.environ["GRAFANA_MCP_TOKEN"]}

grafana_mcp = McpToolset(
    connection_params=StdioConnectionParams(
        server_params=StdioServerParameters(
            command="docker",
            args=["run", "-i", "--rm",
                  "-e", "GRAFANA_URL", "-e", "GRAFANA_SERVICE_ACCOUNT_TOKEN",
                  "mcp/grafana", "-t", "stdio"],
            env=_env,
        ),
        timeout=60,
    ),
    # keep the agent focused on the tools it needs (of the 74 available)
    tool_filter=["list_datasources", "list_prometheus_metric_names",
                 "query_prometheus", "query_loki_logs", "query_loki_stats"],
)

watcher = LlmAgent(
    name="watcher", model=MODEL, tools=[grafana_mcp],
    instruction=(
        "You monitor DCP delivery for a film festival submission. Use the Grafana "
        "tools to query Prometheus for these gauges: dcp_audio_channels (spec 7.1), "
        "dcp_subtitle_timing_drift_ms (spec 0), dcp_resolution_width/height (spec "
        "2048x858), dcp_export_progress_pct, festival_deadline_hours_remaining. "
        "Report each spec mismatch as a structured anomaly. Do not suggest fixes."),
)

analyst = LlmAgent(
    name="analyst", model=MODEL, tools=[grafana_mcp],
    instruction=(
        "Given the anomalies, query Loki logs (service_name=dcp-exporter) for the "
        "export preset and QC error codes to find the ROOT CAUSE (e.g. wrong export "
        "preset DCP_5.1_Standard). Count how many AUDIO_CHANNEL_MISMATCH errors "
        "appear to establish the historical pattern. Output: root_cause, "
        "historical_count, and the festival cascade risk (missing the deadline "
        "forfeits the paid slot and slips the festival run ~6 months)."),
)

advisor = LlmAgent(
    name="advisor", model=MODEL,
    instruction=(
        "Turn the diagnosis into business impact using the numbers supplied by the "
        "caller (from impact.assess()). Present options A/B/C with cost, success, "
        "ROI and one what-if. Narrate only the numbers given -- invent none."),
)

pipeline = SequentialAgent(name="lastlook", sub_agents=[watcher, analyst, advisor])

# Single-agent path used for live runs: the 3-agent chain makes ~10 Gemini
# calls, which the free tier reliably 503s / quota-caps; this does the same job
# in ~4 calls (one Prometheus query, one Loki query, one report), so a live
# investigation actually completes. Same tools, same MCP, same reasoning.
investigator = LlmAgent(
    name="investigator", model=MODEL, tools=[grafana_mcp],
    instruction=(
        "You are the Last Look festival-delivery compliance agent. A DCP failed "
        "festival QC before its Berlinale deadline. Investigate with the Grafana "
        "tools, making as FEW calls as possible:\n"
        "1) ONE query_prometheus call for these gauges: dcp_audio_channels, "
        "dcp_subtitle_timing_drift_ms, dcp_resolution_width, dcp_resolution_height, "
        "dcp_export_progress_pct, festival_deadline_hours_remaining.\n"
        "2) ONE query_loki_logs call for {service_name=\"dcp-exporter\"} to read the "
        "export preset and QC error codes.\n"
        "Then write a concise report with these exact sections:\n"
        "DETECTION: each spec mismatch vs required (audio 7.1, subtitle drift 0ms, "
        "resolution 2048x858).\n"
        "ROOT CAUSE: e.g. wrong export preset DCP_5.1_Standard.\n"
        "PATTERN: how many AUDIO_CHANNEL_MISMATCH occurrences you found.\n"
        "CASCADE: missing the Berlinale deadline forfeits the paid slot and slips "
        "the festival run ~6 months, delaying any distribution deal.\n"
        "RECOMMENDATION: re-export with the correct 7.1 spec and rush delivery."),
)
