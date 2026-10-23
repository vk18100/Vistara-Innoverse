import os
import csv
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEOAPIFY_API_KEY")

LAT = 25.5941
LON = 85.1376
RADIUS = 5000


def get_nearby_places():
    url = "https://api.geoapify.com/v2/places"

    params = {
        "categories": (
            "catering.restaurant,"
            "catering.cafe,"
            "commercial.shopping_mall,"
            "tourism.sights,"
            "entertainment,"
            "leisure.park,"
            "healthcare.hospital,"
            "healthcare.pharmacy,"
            "public_transport,"
            "service"
        ),
        "filter": f"circle:{LON},{LAT},{RADIUS}",
        "bias": f"proximity:{LON},{LAT}",
        "limit": 500,
        "apiKey": API_KEY
    }

    response = requests.get(url, params=params, timeout=60)
    response.raise_for_status()

    return response.json()


def save_to_csv(places):
    output_file = "nearby_places_patna.csv"

    fields = [
        "place_id",
        "name",
        "category",
        "all_categories",
        "latitude",
        "longitude",
        "distance_m",
        "city",
        "state",
        "country",
        "address",
        "formatted_address"
    ]

    with open(output_file, "w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        writer.writeheader()

        for place in places:
            properties = place.get("properties", {})

            categories = properties.get("categories", [])
            category = categories[0] if categories else "unknown"

            writer.writerow({
                "place_id": properties.get("place_id", ""),
                "name": properties.get("name", "Unnamed"),
                "category": category,
                "all_categories": "|".join(categories),
                "latitude": properties.get("lat", ""),
                "longitude": properties.get("lon", ""),
                "distance_m": properties.get("distance", ""),
                "city": properties.get("city", ""),
                "state": properties.get("state", ""),
                "country": properties.get("country", ""),
                "address": properties.get("address_line1", ""),
                "formatted_address": properties.get("formatted", "")
            })

    print()
    print(f"Saved {len(places)} places to:")
    print(output_file)


if __name__ == "__main__":

    print("Getting nearby places...")

    data = get_nearby_places()

    places = data.get("features", [])

    print()
    print("==============================")
    print("NEARBNT NEARBY PLACES")
    print("==============================")
    print()

    print(f"Total places found: {len(places)}")

    for place in places[:20]:

        properties = place.get("properties", {})

        name = properties.get("name", "Unnamed")

        categories = properties.get("categories", [])
        category = categories[0] if categories else "Unknown"

        distance = properties.get("distance")

        print(f"{name} | {category} | {distance} m")

    save_to_csv(places)