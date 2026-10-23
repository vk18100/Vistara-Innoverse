import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEOAPIFY_API_KEY")

GEOAPIFY_URL = "https://api.geoapify.com/v2/places"


def get_nearby_places(
    lat,
    lon,
    radius_km=5,
    limit=100,
    category="all"
):

    radius_m = radius_km * 1000

    categories = {
        "all": (
            "catering,"
            "commercial,"
            "tourism,"
            "leisure,"
            "entertainment,"
            "healthcare,"
            "public_transport,"
            "service,"
            "accommodation,"
            "activity"
        ),

        "food": "catering",

        "shopping": "commercial",

        "explore": "tourism",

        "recreation": "leisure",

        "entertainment": "entertainment",

        "health": "healthcare",

        "transport": "public_transport",

        "services": "service",

        "stay": "accommodation",

        "activities": "activity"
    }

    selected_category = categories.get(
        category.lower(),
        categories["all"]
    )

    params = {
        "categories": selected_category,
        "filter": f"circle:{lon},{lat},{radius_m}",
        "bias": f"proximity:{lon},{lat}",
        "limit": limit,
        "apiKey": API_KEY
    }

    response = requests.get(
        GEOAPIFY_URL,
        params=params,
        timeout=60
    )

    response.raise_for_status()

    data = response.json()

    results = []

    for place in data.get("features", []):

        properties = place.get("properties", {})

        name = properties.get("name")

        if not name:
            continue

        raw_category = properties.get(
            "categories",
            ["unknown"]
        )

        if isinstance(raw_category, list):
            raw_category = raw_category[0]
        else:
            raw_category = str(raw_category)

        results.append({
            "place_id": properties.get(
                "place_id"
            ),

            "name": name,

            "category": raw_category,

            "latitude": properties.get(
                "lat"
            ),

            "longitude": properties.get(
                "lon"
            ),

            "distance_m": properties.get(
                "distance"
            ),

            "address": properties.get(
                "formatted"
            ),

            "city": properties.get(
                "city"
            ),

            "state": properties.get(
                "state"
            )
        })

    return results


if __name__ == "__main__":

    # Test location: Patna
    lat = 25.6010069
    lon = 85.1260295

    places = get_nearby_places(
        lat,
        lon,
        radius_km=5,
        limit=20
    )

    print()
    print("==============================")
    print("NEARBNT DYNAMIC NEARBY ENGINE")
    print("==============================")
    print()

    print(
        f"Location: {lat}, {lon}"
    )

    print(
        f"Places found: {len(places)}"
    )

    print()

    for place in places:

        distance = place["distance_m"]

        if distance is not None:
            distance = f"{distance:.0f} m"
        else:
            distance = "N/A"

        print(
            f"{place['name']} | "
            f"{place['category']} | "
            f"{distance}"
        )