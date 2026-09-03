"""Deterministic decision model for Last Look.

Gemini writes the *narrative*; the money math lives here so it's auditable and
testable. One consistent expected-value model (no double-counting).
"""
from dataclasses import dataclass, asdict


@dataclass
class Assumptions:
    deal_value: float = 50_000      # distribution deal value if it lands
    p_deal_ontime: float = 0.40     # P(deal | make the deadline)
    p_deal_missed: float = 0.10     # P(deal | miss the deadline)
    rush_fee: float = 1_000         # cost of re-export + rush courier
    fee_at_risk: float = 1_000      # sunk submission fee lost on rejection


def assess(a: Assumptions) -> dict:
    ev_ontime = a.deal_value * a.p_deal_ontime
    ev_missed = a.deal_value * a.p_deal_missed
    swing = ev_ontime - ev_missed            # value the deadline actually moves
    exposure = swing + a.fee_at_risk         # total at risk from the QC failure
    roi = swing / a.rush_fee if a.rush_fee else float("inf")
    return {
        "ev_ontime": ev_ontime,
        "ev_missed": ev_missed,
        "swing": swing,
        "exposure": exposure,
        "intervention_cost": a.rush_fee,
        "roi": round(roi, 1),
        "assumptions": asdict(a),
    }


def options(a: Assumptions) -> list[dict]:
    m = assess(a)
    return [
        {"id": "A", "action": "Re-export with correct spec + rush delivery",
         "cost": a.rush_fee, "success": 0.95, "hours": 4,
         "roi": m["roi"], "residual_risk": "low"},
        {"id": "B", "action": "Request a deadline extension from the festival",
         "cost": 0, "success": 0.34, "hours": 24,
         "roi": None, "residual_risk": "high — extension usually denied"},
        {"id": "C", "action": "Submit the current DCP and hope QC passes",
         "cost": 0, "success": 0.12, "hours": 0,
         "roi": None, "residual_risk": "critical — near-certain rejection"},
    ]


def whatif_B_denied(a: Assumptions) -> str:
    p_deny = 1 - 0.34
    return (f"If you pick B and the festival denies (~{p_deny:.0%}), you're left "
            f"~12h to re-export — rush fee roughly doubles to "
            f"${a.rush_fee * 2:,.0f}.")


if __name__ == "__main__":  # runnable self-check
    m = assess(Assumptions())
    assert m["ev_ontime"] == 20_000
    assert m["ev_missed"] == 5_000
    assert m["swing"] == 15_000
    assert m["exposure"] == 16_000
    assert m["roi"] == 15.0
    opts = options(Assumptions())
    assert [o["id"] for o in opts] == ["A", "B", "C"]
    assert opts[0]["success"] < 1.0  # no fake "100%"
    print("impact OK:", m)
    print(whatif_B_denied(Assumptions()))
