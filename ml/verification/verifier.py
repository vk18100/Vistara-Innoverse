import pandas as pd
from pathlib import Path


DATA_PATH = (
    Path(__file__).resolve().parent
    / "properties_with_verification.csv"
)

df = pd.read_csv(DATA_PATH)


def calculate_verification_score(property):
    score = 0

    # Smoke Alarm
    if property["smoke_alarm"] == 1:
        score += 0.30

    # Carbon Monoxide Alarm
    if property["carbon_monoxide_alarm"] == 1:
        score += 0.30

    # Property Verification
    if property["verified"] == 1:
        score += 0.40

    return score


def get_verification_status(score):
    if score >= 0.8:
        return "Verified"
    elif score >= 0.5:
        return "Needs Review"
    else:
        return "Rejected"


def generate_verification_reasons(property):
    reasons = []

    if property["verified"] == 1:
        reasons.append("Property information verified")
    else:
        reasons.append("Property verification not completed")

    if property["smoke_alarm"] == 1:
        reasons.append("Smoke alarm available")
    else:
        reasons.append("Smoke alarm not confirmed")

    if property["carbon_monoxide_alarm"] == 1:
        reasons.append("Carbon monoxide alarm available")
    else:
        reasons.append("Carbon monoxide alarm not confirmed")

    return reasons