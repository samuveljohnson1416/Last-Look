"""Seed the DCP QC incident into Grafana Cloud over OTLP so the agents query
REAL metrics/logs at runtime.

Grafana Cloud rejects samples older than a few hours, so "6 months of history"
is represented by a few recent prior-mismatch log lines the Analyst counts --
that's genuine data queried live, which is what the track requires.

Run:  python simulator/seed.py   (needs OTLP_* in the repo-root .env)
"""
import base64
import logging
import os

from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")  # always the repo-root .env

# --- Grafana Cloud OTLP basic auth from instance id + token ----------------
endpoint = os.environ["OTLP_ENDPOINT"].rstrip("/")
instance = os.environ["OTLP_INSTANCE_ID"]
token = os.environ["OTLP_TOKEN"]
auth = base64.b64encode(f"{instance}:{token}".encode()).decode()
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = endpoint
os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {auth}"

from opentelemetry.metrics import Observation
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.sdk.resources import Resource

RES = Resource.create({
    "service.name": "dcp-exporter",
    "film": "The Last Harvest",
    "festival": "Berlinale",
})

# The incident. Expected spec lives in the agent; here we push the ACTUALS.
METRICS = {
    "dcp_audio_channels": 5.1,             # expected 7.1
    "dcp_subtitle_timing_drift_ms": 200.0,  # expected 0
    "dcp_resolution_width": 1920.0,         # expected 2048
    "dcp_resolution_height": 1080.0,        # expected 858
    "dcp_export_progress_pct": 100.0,
    "festival_deadline_hours_remaining": 72.0,
}


def push_metrics() -> None:
    reader = PeriodicExportingMetricReader(
        OTLPMetricExporter(), export_interval_millis=600_000)
    mp = MeterProvider(resource=RES, metric_readers=[reader])
    meter = mp.get_meter("dcp")
    for name, val in METRICS.items():
        meter.create_observable_gauge(
            name, callbacks=[lambda opts, v=val: [Observation(v)]])
    mp.force_flush(timeout_millis=15_000)
    mp.shutdown()


def push_logs() -> None:
    lp = LoggerProvider(resource=RES)
    lp.add_log_record_processor(BatchLogRecordProcessor(OTLPLogExporter()))
    log = logging.getLogger("dcp.export")
    log.setLevel(logging.INFO)
    log.addHandler(LoggingHandler(logger_provider=lp))

    # current incident
    log.info("export complete preset=DCP_5.1_Standard codec=jpeg2000 duration=95m")
    log.error("QC error=AUDIO_CHANNEL_MISMATCH expected=7.1 actual=5.1")
    log.error("QC error=SUBTITLE_DRIFT drift_ms=200")
    log.error("QC error=RESOLUTION_MISMATCH expected=2048x858 actual=1920x1080")
    # prior occurrences -> the "3rd in 6 months" pattern the Analyst counts
    log.error("QC error=AUDIO_CHANNEL_MISMATCH film=Riverbend preset=DCP_5.1_Standard")
    log.error("QC error=AUDIO_CHANNEL_MISMATCH film=NightShift preset=DCP_5.1_Standard")

    lp.force_flush(timeout_millis=15_000)
    lp.shutdown()


if __name__ == "__main__":
    push_metrics()
    push_logs()
    print("seeded incident metrics + QC logs to Grafana Cloud")
