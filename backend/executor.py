"""Executor: the only component with a write tool. Called by /authorize after
explicit human approval; writes an auditable annotation to Grafana."""
import datetime as dt


def annotate(d: dict) -> dict:
    text = (
        "[" + dt.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S") + "Z] "
        "Option " + d["option"] + " approved\n"
        "* Film: " + d["film"] + "\n"
        "* Festival: " + d["festival"] + "\n"
        "* Approved by: " + d["approved_by"])
    # TODO Day 3: call grafana_mcp create_annotation(text). Stubbed for now:
    return {"annotated": True, "text": text}
