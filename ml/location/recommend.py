
from nearby import get_nearby_places


CATEGORY_GROUPS = {
    "food": ("catering",),
    "restaurant": ("catering.restaurant",),
    "shopping": ("commercial",),
    "explore": ("tourism",),
    "recreation": ("leisure",),
    "entertainment": ("entertainment",),
    "health": ("healthcare", "commercial.health_and_beauty.pharmacy"),
    "transport": ("public_transport", "parking"),
    "services": ("service",),
    "stay": ("accommodation",),
    "activities": ("sport", "leisure", "entertainment"),
}


def recommend_places(
    lat,
    lon,
    category="all",
    radius_km=5,
    limit=100,
    max_results=20,
    preferred_categories=None,
    max_distance_m=None,
):
    """Return deduplicated, distance-ranked nearby recommendations."""

    # Validate and normalize inputs
    try:
        lat = float(lat)
        lon = float(lon)
        radius_km = float(radius_km)
        limit = int(limit)
        max_results = int(max_results)

        if max_distance_m is not None:
            max_distance_m = float(max_distance_m)

    except (TypeError, ValueError):
        raise ValueError("Coordinates, radius and limits must be valid numbers.")

    category = str(category or "all").strip().lower()

    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        raise ValueError("Invalid latitude or longitude")

    if not (0 < radius_km <= 20):
        raise ValueError("radius_km must be greater than 0 and at most 20")

    if not (1 <= limit <= 100):
        raise ValueError("limit must be between 1 and 100")

    if not (1 <= max_results <= 100):
        raise ValueError("max_results must be between 1 and 100")

    if max_distance_m is not None and max_distance_m < 0:
        raise ValueError("max_distance_m cannot be negative")

    if category != "all" and category not in CATEGORY_GROUPS:
        raise ValueError(
            f"Unknown category '{category}'. "
            f"Choose: {', '.join(['all'] + list(CATEGORY_GROUPS))}"
        )

    # Fetch nearby places
    places = get_nearby_places(
        lat=lat,
        lon=lon,
        radius_km=radius_km,
        limit=limit,
        category=category,
    )

    preferred = {
        str(item).strip().lower()
        for item in (preferred_categories or [])
        if str(item).strip()
    }

    ranked = []
    seen_places = set()

    for place in places:
        name = place.get("name")

        if not isinstance(name, str) or not name.strip():
            continue

        name = name.strip()

        # nearby.py returns lat/lon; also accept latitude/longitude.
        try:
            place_lat = float(
                place.get("latitude", place.get("lat"))
            )
            place_lon = float(
                place.get("longitude", place.get("lon"))
            )
        except (TypeError, ValueError):
            continue

        if not (
            -90 <= place_lat <= 90
            and -180 <= place_lon <= 180
        ):
            continue

        # Deduplicate by stable ID, otherwise by name and coordinates.
        place_id = place.get("place_id")

        if place_id:
            unique_key = ("id", str(place_id))
        else:
            unique_key = (
                name.casefold(),
                round(place_lat, 5),
                round(place_lon, 5),
            )

        if unique_key in seen_places:
            continue

        seen_places.add(unique_key)

        # Validate distance
        try:
            distance_m = float(place["distance_m"])
        except (KeyError, TypeError, ValueError):
            continue

        if not math_is_finite(distance_m) or distance_m < 0:
            continue

        if max_distance_m is not None and distance_m > max_distance_m:
            continue

        distance_km = distance_m / 1000

        # Normalize source categories
        raw_categories = place.get("categories") or [
            place.get("category", "")
        ]

        if isinstance(raw_categories, str):
            raw_categories = [raw_categories]

        raw_categories = [
            str(item).strip().lower()
            for item in raw_categories
            if str(item).strip()
        ]

        # Identify matching category groups
        matched_groups = [
            group
            for group, prefixes in CATEGORY_GROUPS.items()
            if any(
                cat == prefix or cat.startswith(prefix + ".")
                for cat in raw_categories
                for prefix in prefixes
            )
        ]

        # For a specific category, retain only places matching that group.
        if category != "all" and category not in matched_groups:
            continue

        if not matched_groups:
            matched_groups = ["other"]

        # Match user preferences against category names and groups.
        preference_match = any(
            wanted in raw_categories
            or wanted in matched_groups
            or any(
                cat.startswith(wanted + ".")
                for cat in raw_categories
            )
            for wanted in preferred
        )

        # A simple distance-based score, from 0 to 100.
        distance_score = 100 / (1 + distance_km / 10)
        preference_score = 10 if preference_match else 0

        score = round(
            min(100.0, 0.90 * distance_score + preference_score),
            2,
        )

        ranked.append({
            **place,
            "name": name,
            "lat": place_lat,
            "lon": place_lon,
            "latitude": place_lat,
            "longitude": place_lon,
            "distance_m": round(distance_m, 1),
            "distance_km": round(distance_km, 3),
            "category_groups": matched_groups,
            "score": score,
            "recommendation_score": score,
            "preference_score": preference_score,
            "matches_preference": preference_match,
        })

    # Higher score first; nearest place breaks ties.
    ranked.sort(
        key=lambda item: (
            -item["score"],
            item["distance_m"],
            item["name"].casefold(),
        )
    )

    # Balance category variety for "all" searches.
    if category == "all":
        selected = []
        remaining = ranked[:]

        max_per_group = max(
            1,
            (max_results + len(CATEGORY_GROUPS) - 1)
            // len(CATEGORY_GROUPS),
        )

        group_counts = {}

        while remaining and len(selected) < max_results:
            chosen_index = None

            for index, place in enumerate(remaining):
                groups = place["category_groups"]

                if any(
                    group == "other"
                    or group_counts.get(group, 0) < max_per_group
                    for group in groups
                ):
                    chosen_index = index
                    break

            if chosen_index is None:
                break

            place = remaining.pop(chosen_index)
            selected.append(place)

            for group in place["category_groups"]:
                group_counts[group] = group_counts.get(group, 0) + 1

        # Fill remaining slots if category balancing leaves any.
        if len(selected) < max_results:
            selected_keys = {
                (
                    item["name"].casefold(),
                    round(item["lat"], 5),
                    round(item["lon"], 5),
                )
                for item in selected
            }

            for place in remaining:
                key = (
                    place["name"].casefold(),
                    round(place["lat"], 5),
                    round(place["lon"], 5),
                )

                if key not in selected_keys:
                    selected.append(place)
                    selected_keys.add(key)

                if len(selected) >= max_results:
                    break

        ranked = selected

    return ranked[:max_results]


def math_is_finite(value):
    """Check that a numeric value is finite."""
    import math
    return math.isfinite(value)


if __name__ == "__main__":
    # Test location: Muzaffarpur
    lat, lon = 26.111341618930535, 85.39651958045545

    categories = [
        "food",
        "restaurant",
        "shopping",
        "explore",
        "recreation",
        "entertainment",
        "health",
        "transport",
        "services",
        "stay",
        "activities",
        "all",
    ]

    for cat in categories:
        try:
            results = recommend_places(
                lat=lat,
                lon=lon,
                category=cat,
                radius_km=5,
                limit=100,
                max_results=20,
            )

            print(f"\n{'=' * 50}")
            print(f"{cat.upper()} — {len(results)} recommendations")

            for index, place in enumerate(results, start=1):
                distance_m = place["distance_m"]

                if distance_m < 1000:
                    distance_label = f"{distance_m:.0f} m"
                else:
                    distance_label = f"{distance_m / 1000:.2f} km"

                print(
                    f"{index}. {place['name']} | "
                    f"{distance_label} | "
                    f"Score: {place['score']}"
                )

        except (ValueError, RuntimeError) as error:
            print(f"\n{cat.upper()} failed: {error}")
