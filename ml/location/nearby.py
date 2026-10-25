
import math
import os

import requests
from cachetools import TTLCache
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEOAPIFY_API_KEY")
API_URL = "https://api.geoapify.com/v2/places"

# In-memory cache: maximum 500 searches, 10-minute expiry
places_cache = TTLCache(maxsize=500, ttl=600)

CATEGORY_MAP = {
    "food": ["catering"],
    "restaurant": ["catering.restaurant"],
    "shopping": ["commercial"],
    "explore": ["tourism"],
    "recreation": ["leisure"],
    "entertainment": ["entertainment"],
    "health": [
        "healthcare",
        "commercial.health_and_beauty.pharmacy",
    ],
    "transport": ["public_transport", "parking"],
    "services": ["service"],
    "stay": ["accommodation"],
    "activities": ["sport", "leisure", "entertainment"],
}

ALL_CATEGORIES = [
    "catering",
    "commercial",
    "tourism",
    "leisure",
    "entertainment",
    "healthcare",
    "public_transport",
    "parking",
    "service",
    "accommodation",
    "sport",
]


def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate straight-line distance in meters."""
    earth_radius = 6_371_000

    lat1, lon1, lat2, lon2 = map(
        math.radians, [lat1, lon1, lat2, lon2]
    )

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )

    a = max(0.0, min(1.0, a))

    return earth_radius * 2 * math.atan2(
        math.sqrt(a), math.sqrt(1 - a)
    )


def fetch_places(lat, lon, radius_km, category, limit=100):
    """Fetch places for one Geoapify category."""
    if not API_KEY:
        raise RuntimeError(
            "GEOAPIFY_API_KEY missing. Check your environment configuration."
        )

    radius_m = int(radius_km * 1000)

    params = {
        "categories": category,
        "filter": f"circle:{lon},{lat},{radius_m}",
        "bias": f"proximity:{lon},{lat}",
        "limit": min(max(int(limit), 1), 500),
        "apiKey": API_KEY,
    }

    try:
        response = requests.get(API_URL, params=params, timeout=20)
        response.raise_for_status()
        data = response.json()

    except requests.RequestException as error:
        status = getattr(
            getattr(error, "response", None), "status_code", None
        )
        detail = f"HTTP {status}" if status else type(error).__name__
        raise RuntimeError(
            f"Geoapify request failed: {detail}"
        ) from None

    if not isinstance(data, dict):
        raise RuntimeError("Invalid response received from Geoapify.")

    places = []

    for feature in data.get("features", []):
        properties = feature.get("properties", {}) or {}
        geometry = feature.get("geometry", {}) or {}
        coordinates = geometry.get("coordinates", [])

        name = properties.get("name")
        if not isinstance(name, str) or not name.strip():
            continue

        place_lon = properties.get("lon")
        place_lat = properties.get("lat")

        if (
            place_lon is None or place_lat is None
        ) and isinstance(coordinates, (list, tuple)) and len(coordinates) >= 2:
            place_lon, place_lat = coordinates[:2]

        try:
            place_lon = float(place_lon)
            place_lat = float(place_lat)
        except (TypeError, ValueError):
            continue

        if not (
            math.isfinite(place_lat)
            and math.isfinite(place_lon)
            and -90 <= place_lat <= 90
            and -180 <= place_lon <= 180
        ):
            continue

        distance_m = properties.get("distance")

        try:
            if distance_m is None:
                distance_m = haversine_distance(
                    lat, lon, place_lat, place_lon
                )
            else:
                distance_m = float(distance_m)
        except (TypeError, ValueError):
            continue

        if not math.isfinite(distance_m) or distance_m < 0:
            continue

        if distance_m > radius_m:
            continue

        categories = properties.get("categories", [])
        if isinstance(categories, str):
            categories = [categories]
        if not isinstance(categories, list):
            categories = []

        places.append({
            "name": name.strip(),
            "lat": place_lat,
            "lon": place_lon,
            "distance_m": round(distance_m, 1),
            "distance_km": round(distance_m / 1000, 3),
            "categories": categories,
            "address": properties.get("formatted", ""),
            "place_id": properties.get("place_id"),
            "source": "Geoapify",
        })

    return places


def get_nearby_places(
    lat,
    lon,
    radius_km=5,
    category="all",
    limit=100,
):
    """Return nearby places using a 10-minute in-memory cache."""
    try:
        lat = float(lat)
        lon = float(lon)
        radius_km = float(radius_km)
        limit = int(limit)
    except (TypeError, ValueError):
        raise ValueError(
            "Latitude, longitude, radius and limit must be numbers."
        ) from None

    if not all(map(math.isfinite, [lat, lon, radius_km])):
        raise ValueError("Inputs must be finite numbers.")
    if not -90 <= lat <= 90:
        raise ValueError("Latitude must be between -90 and 90.")
    if not -180 <= lon <= 180:
        raise ValueError("Longitude must be between -180 and 180.")
    if radius_km <= 0 or radius_km > 50:
        raise ValueError("radius_km must be greater than 0 and at most 50.")
    if limit < 1:
        raise ValueError("limit must be at least 1.")

    category = str(category or "all").strip().lower()

    if category == "all":
        categories_to_search = ALL_CATEGORIES
    elif category in CATEGORY_MAP:
        categories_to_search = CATEGORY_MAP[category]
    else:
        raise ValueError(
            f"Unknown category '{category}'. "
            f"Choose: {', '.join(['all'] + list(CATEGORY_MAP))}"
        )

    cache_key = (
        round(lat, 5),
        round(lon, 5),
        radius_km,
        category,
        limit,
    )

    if cache_key in places_cache:
        print("CACHE HIT")
        return [
            {**place, "categories": list(place["categories"])}
            for place in places_cache[cache_key]
        ]

    print("CACHE MISS")
    unique_places = {}
    successful_fetches = 0

    for api_category in categories_to_search:
        try:
            results = fetch_places(
                lat=lat,
                lon=lon,
                radius_km=radius_km,
                category=api_category,
                limit=limit,
            )
            successful_fetches += 1
        except RuntimeError as error:
            print(f"Warning: category '{api_category}' failed: {error}")
            continue

        for place in results:
            place_id = place.get("place_id")

            if place_id:
                key = ("id", str(place_id))
            else:
                key = (
                    place["name"].strip().casefold(),
                    round(place["lat"], 6),
                    round(place["lon"], 6),
                )

            if key not in unique_places:
                unique_places[key] = place
            else:
                existing = unique_places[key]
                existing["categories"] = sorted(
                    set(existing["categories"]) | set(place["categories"])
                )
                existing["distance_m"] = min(
                    existing["distance_m"], place["distance_m"]
                )
                existing["distance_km"] = round(
                    existing["distance_m"] / 1000, 3
                )

    sorted_places = sorted(
        unique_places.values(),
        key=lambda place: place["distance_m"],
    )[:limit]

    if successful_fetches > 0:
        places_cache[cache_key] = [
            {**place, "categories": list(place["categories"])}
            for place in sorted_places
        ]

    if successful_fetches == 0:
        raise RuntimeError(
            "All Geoapify category requests failed. "
            "Check your API key, connectivity and category configuration."
        )

    return sorted_places


if __name__ == "__main__":
    lat, lon = 26.111341618930535, 85.39651958045545

    for category in ["food", "shopping", "explore", "stay", "activities"]:
        print(f"\nCategory: {category}")
        try:
            places = get_nearby_places(
                lat=lat,
                lon=lon,
                radius_km=5,
                limit=20,
                category=category,
            )
            print(f"Places found: {len(places)}")
            for place in places:
                print(
                    f"{place['name']} | "
                    f"{place['distance_m']:.0f} m | "
                    f"{', '.join(place['categories'])}"
                )
        except (ValueError, RuntimeError) as error:
            print(f"Search failed: {error}")
