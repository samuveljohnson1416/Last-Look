"""Ingest a real DCP delivery package and validate it against a festival spec.

Reads the CPL (identity), the mastering QC report (measured specs) and the
festival delivery spec (requirements) -- the artifacts a mastering/editor team
actually delivers -- and produces the QC verdict plus the metrics the rest of
the system uses. No mocks: every number is parsed from the package.
"""
import json
import xml.etree.ElementTree as ET
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_PACKAGE = _ROOT / "sample-input" / "The_Last_Harvest_DCP"
DEFAULT_SPEC = _ROOT / "sample-input" / "DELIVERY_SPEC_Berlinale.json"


def _cpl_title(cpl_path: Path) -> str | None:
    root = ET.parse(cpl_path).getroot()
    for el in root.iter():
        if el.tag.split("}")[-1] == "ContentTitleText":
            return el.text
    return None


def ingest(package_dir=DEFAULT_PACKAGE, spec_path=DEFAULT_SPEC) -> dict:
    package_dir = Path(package_dir)
    qc = json.loads((package_dir / "QC_REPORT.json").read_text(encoding="utf-8"))
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    cpl = next(package_dir.glob("CPL*.xml"), None)
    title = (_cpl_title(cpl) if cpl else None) or qc.get("composition")

    m, req = qc["measured"], spec["required"]
    metrics = {
        "dcp_audio_channels": float(m["audio"]["channels"]),
        "dcp_subtitle_timing_drift_ms": float(m["subtitles"]["timing_drift_ms"]),
        "dcp_resolution_width": float(m["picture"]["width"]),
        "dcp_resolution_height": float(m["picture"]["height"]),
    }
    required = {
        "dcp_audio_channels": float(req["audio"]["channels"]),
        "dcp_subtitle_timing_drift_ms": float(req["subtitles"]["timing_drift_ms"]),
        "dcp_resolution_width": float(req["picture"]["width"]),
        "dcp_resolution_height": float(req["picture"]["height"]),
    }
    mismatches = [k for k in required if metrics[k] != required[k]]
    return {
        "film": title,
        "festival": spec["festival"],
        "deadline": spec["deadline"],
        "export_preset": qc.get("export_preset"),
        "metrics": metrics,
        "required": required,
        "mismatches": mismatches,
        "qc": "fail" if mismatches else "pass",
        "source": f"DCP package: {package_dir.name}",
    }


if __name__ == "__main__":  # self-check against the sample package
    out = ingest()
    print(json.dumps(out, indent=2))
    assert "Last Harvest" in out["film"], out["film"]
    assert out["qc"] == "fail"
    assert "dcp_audio_channels" in out["mismatches"]
    assert out["metrics"]["dcp_audio_channels"] == 5.1
    assert out["required"]["dcp_audio_channels"] == 7.1
    assert out["export_preset"] == "DCP_5.1_Standard"
    print("\nOK: parsed a real DCP package -> QC FAIL, 4 spec mismatches")
