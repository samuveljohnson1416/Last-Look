"""Demo simulator: pushes the incident + 6 months of history into Grafana Cloud
so the agents have REAL data to query at runtime.

  - Prometheus remote_write:  dcp_audio_channels=5.1 (expect 7.1),
    dcp_subtitle_timing_drift_ms=200, dcp_resolution mismatch, export progress.
  - Loki push: export logs (preset "DCP_5.1_Standard"), QC error
    AUDIO_CHANNEL_MISMATCH, plus 3 seeded historical mismatches.

Fill in the two push URLs + tokens from your Grafana Cloud stack (Day 2).
"""
# TODO Day 2: implement remote_write (protobuf/snappy) + Loki /loki/api/v1/push.
if __name__ == "__main__":
    print("seed.py -- wire Grafana Cloud push endpoints on Day 2")
