import pandas as pd
from pathlib import Path


DATA_PATH = (
    Path(__file__).resolve().parent.parent
    / "verification"
    / "properties_with_verification.csv"
)

df = pd.read_csv(DATA_PATH)


def filter_properties(user):
    user["check_in"] = pd.to_datetime(user["check_in"])
    user["check_out"] = pd.to_datetime(user["check_out"])

    filtered_df = df[
        (df["city"] == user["city"]) &
        (df["max_guests"] >= user["guests"]) &
        (df["available"] == 1) &
        (pd.to_datetime(df["available_from"]) <= user["check_in"]) &
        (pd.to_datetime(df["available_to"]) >= user["check_out"])
    ].copy()

    return filtered_df


def apply_property_filters(filtered_df, user):
    filtered_df = filtered_df[
        (filtered_df["property_type"] == user["property_type"]) &
        (filtered_df["bedrooms"] >= user["bedrooms"]) &
        (filtered_df["bathrooms"] >= user["bathrooms"]) &
        (filtered_df["kitchen"] >= user["kitchen"]) &
        (filtered_df["wifi"] >= user["wifi"]) &
        (filtered_df["parking"] >= user["parking"]) &
        (filtered_df["ac"] >= user["ac"]) &
        (filtered_df["balcony"] >= user["balcony"]) &
        (filtered_df["self_check_in"] >= user["self_check_in"])
    ].copy()

    return filtered_df


def calculate_score(property, user):
    # Location Score
    if user["city"] == property["city"]:
        location_score = 0.20
    else:
        location_score = 0

    # Budget Score
    price_difference = abs(
        user["budget"] - property["price_per_night"]
    )

    budget_match = 1 - (
        price_difference / user["budget"]
    )

    budget_score = max(0, budget_match) * 0.20

    # Bedroom Score
    if property["bedrooms"] >= user["bedrooms"]:
        bedroom_score = 0.12
    else:
        bedroom_score = 0

    # Bathroom Score
    if property["bathrooms"] >= user["bathrooms"]:
        bathroom_score = 0.08
    else:
        bathroom_score = 0

    # Amenities Score
    amenities_score = 0

    if user["kitchen"] == 1 and property["kitchen"] == 1:
        amenities_score += 0.0375

    if user["wifi"] == 1 and property["wifi"] == 1:
        amenities_score += 0.025

    if user["parking"] == 1 and property["parking"] == 1:
        amenities_score += 0.075

    if user["ac"] == 1 and property["ac"] == 1:
        amenities_score += 0.0125

    # Rating Score
    rating_score = (property["rating"] / 5) * 0.07

    # Review Score
    max_reviews = df["review_count"].max()
    review_score = (
        property["review_count"] / max_reviews
    ) * 0.03

    # Availability Score
    if property["available"] == 1:
        availability_score = 0.05
    else:
        availability_score = 0

    # Verification Score
    if property["verified"] == 1:
        verified_score = 0.05
    else:
        verified_score = 0

    # Preference Score
    preferences = [
        "balcony",
        "terrace",
        "workspace",
        "pool",
        "washing_machine"
    ]

    matched_preferences = 0
    selected_preferences = 0

    for feature in preferences:
        if user[feature] == 1:
            selected_preferences += 1

            if property[feature] == 1:
                matched_preferences += 1

    preference_score = (
        matched_preferences / selected_preferences * 0.05
        if selected_preferences > 0
        else 0
    )

    # Final Score
    final_score = (
        location_score
        + budget_score
        + bedroom_score
        + bathroom_score
        + amenities_score
        + rating_score
        + review_score
        + availability_score
        + verified_score
        + preference_score
    )

    return final_score


def rank_properties(filtered_df, user):
    filtered_df["final_score"] = filtered_df.apply(
        lambda property: calculate_score(property, user),
        axis=1
    )

    recommendations = filtered_df.sort_values(
        "final_score",
        ascending=False
    )

    return recommendations

def generate_reasons(property, user):
    reasons = []

    if property["city"] == user["city"]:
        reasons.append("Preferred location")

    if property["price_per_night"] <= user["budget"]:
        reasons.append("Within your budget")
    else:
        reasons.append("Above your budget")

    if property["bedrooms"] >= user["bedrooms"]:
        reasons.append("Bedroom requirement matched")

    if property["bathrooms"] >= user["bathrooms"]:
        reasons.append("Bathroom requirement matched")

    if property["kitchen"] == 1 and user["kitchen"] == 1:
        reasons.append("Kitchen available")

    if property["wifi"] == 1 and user["wifi"] == 1:
        reasons.append("Wi-Fi available")

    if property["parking"] == 1 and user["parking"] == 1:
        reasons.append("Free parking available")

    if property["ac"] == 1 and user["ac"] == 1:
        reasons.append("Air conditioning available")

    if property["rating"] >= 4.5:
        reasons.append("Highly rated")

    if property["review_count"] >= 50:
        reasons.append("Many guest reviews")

    if property["verified"] == 1:
        reasons.append("Verified property")

    return reasons