# Project input — a real DCP delivery

This is what a post-production / mastering team actually hands to a festival
delivery coordinator. Last Look ingests **this**, not hand-typed numbers.

## `The_Last_Harvest_DCP/` — the Digital Cinema Package
Standard DCP structure (SMPTE ST 429):

| File | What it is |
|------|-----------|
| `ASSETMAP.xml` | Maps every asset UUID to its file (read first on ingest). |
| `PKL.xml` | Packing List — every asset with size + SHA-1 hash. |
| `CPL_TheLastHarvest.xml` | Composition Playlist — title, reels, picture/sound/subtitle assets, edit rate, screen aspect. |
| `*.mxf` | The picture / audio / subtitle essence (referenced by the XMLs; not included here — real ones are tens of GB). |
| `QC_REPORT.json` | The mastering house's QC report shipped with the DCP (as EasyDCP / CineAsset / Colorfront produce). Carries the **measured** specs from the MXF essence. |

## `DELIVERY_SPEC_Berlinale.json` — the festival's required spec
What the package is validated **against** (published by the festival).

## The fault in this sample
The master was exported with the wrong preset (`DCP_5.1_Standard`), so:

| Spec | Delivered | Required |
|------|-----------|----------|
| Audio | **5.1** | 7.1 |
| Resolution | **1920×1080** | 2048×858 |
| Subtitle drift | **200 ms** | 0 ms |

`backend/dcp_ingest.py` parses this package → QC **FAIL** with 4 mismatches →
those become the metrics pushed to Grafana and investigated by the agent.
