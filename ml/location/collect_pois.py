import requests
import pandas as pd
import os
import time

# ============================================================
# NEARBNT - NEARBY INTELLIGENCE POI COLLECTOR
# ============================================================

# Test location: Patna
LAT = 25.5941
LON = 85.1376

# Start small.
# Later we can increase this to 5000 or 10000.
RADIUS = 2000

# Overpass server
OVERPASS_URL = "https://overpass.private.coffee/api/interpreter"

# Output file
OUTPUT_PATH = (
    r"C:\Users\INFINIX\Vistara-Innoverse"
    r"\ml\data\places\patna_all_pois.csv"
)


# ============================================================
# OVERPASS QUERY
# ============================================================

QUERY = f"""
[out:json][timeout:120];

(
    /* ================= FOOD ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="restaurant"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="cafe"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="fast_food"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="bakery"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="food_court"];


    /* ================= TOURISM ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["tourism"="attraction"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["tourism"="museum"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["tourism"="gallery"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["tourism"="zoo"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["tourism"="viewpoint"];


    /* ================= SHOPPING ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["shop"];


    /* ================= HEALTH ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="hospital"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="clinic"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="doctors"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="dentist"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="pharmacy"];


    /* ================= TRANSPORT ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["highway"="bus_stop"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["railway"="station"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["railway"="halt"];


    /* ================= ESSENTIAL ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="bank"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="atm"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="post_office"];


    /* ================= ENTERTAINMENT ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="cinema"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="theatre"];


    /* ================= RECREATION ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["leisure"="park"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["leisure"="garden"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["leisure"="playground"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["leisure"="sports_centre"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["leisure"="fitness_centre"];


    /* ================= TRAVEL ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="fuel"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="parking"];

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="charging_station"];


    /* ================= WORSHIP ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["amenity"="place_of_worship"];


    /* ================= HISTORIC ================= */

    nwr(around:{RADIUS},{LAT},{LON})
        ["historic"];

);

out center tags;
"""


# ============================================================
# CATEGORY MAPPING
# ============================================================

def get_category(tags):

    amenity = tags.get("amenity", "")
    tourism = tags.get("tourism", "")
    leisure = tags.get("leisure", "")
    shop = tags.get("shop", "")
    highway = tags.get("highway", "")
    railway = tags.get("railway")
    historic = tags.get("historic", "")

    # Food
    if amenity in [
        "restaurant",
        "cafe",
        "fast_food",
        "bakery",
        "food_court"
    ]:
        return "Food"

    # Tourism
    if tourism in [
        "attraction",
        "museum",
        "gallery",
        "zoo",
        "viewpoint"
    ]:
        return "Tourism"

    # Shopping
    if shop:
        return "Shopping"

    # Health
    if amenity in [
        "hospital",
        "clinic",
        "doctors",
        "dentist",
        "pharmacy"
    ]:
        return "Health"

    # Transport
    if highway == "bus_stop":
        return "Transport"

    if railway in [
        "station",
        "halt"
    ]:
        return "Transport"

    # Essential
    if amenity in [
        "bank",
        "atm",
        "post_office"
    ]:
        return "Essential"

    # Entertainment
    if amenity in [
        "cinema",
        "theatre"
    ]:
        return "Entertainment"

    # Recreation
    if leisure in [
        "park",
        "garden",
        "playground",
        "sports_centre",
        "fitness_centre"
    ]:
        return "Recreation"

    # Travel
    if amenity in [
        "fuel",
        "parking",
        "charging_station"
    ]:
        return "Travel"

    # Worship
    if amenity == "place_of_worship":
        return "Worship"

    # Historic
    if historic:
        return "Historic"

    return "Other"


# ============================================================
# REQUEST FUNCTION
# ============================================================

def fetch_overpass():

    headers = {
        "User-Agent": (
            "NearBNT-MVP/1.0 "
            "(location-data-collection)"
        )
    }

    max_attempts = 3

    for attempt in range(1, max_attempts + 1):

        print(
            f"Request attempt {attempt}/{max_attempts}..."
        )

        try:

            response = requests.post(
                OVERPASS_URL,
                data={
                    "data": QUERY
                },
                headers=headers,
                timeout=180
            )

            response.raise_for_status()

            return response.json()

        except requests.exceptions.RequestException as e:

            print()
            print("Request failed:")
            print(e)

            if attempt < max_attempts:

                wait_time = attempt * 10

                print(
                    f"Retrying in {wait_time} seconds..."
                )

                time.sleep(wait_time)

            else:

                print()
                print(
                    "Overpass request failed after "
                    "all attempts."
                )

                return None


# ============================================================
# MAIN
# ============================================================

def main():

    print()
    print("==========================================")
    print("     NEARBNT NEARBY INTELLIGENCE")
    print("==========================================")
    print()

    print("Location : Patna")
    print(f"Latitude : {LAT}")
    print(f"Longitude: {LON}")
    print(f"Radius   : {RADIUS / 1000} km")

    print()
    print(
        "Collecting nearby useful places "
        "from OpenStreetMap..."
    )

    print()

    data = fetch_overpass()

    if data is None:
        return

    elements = data.get(
        "elements",
        []
    )

    print()
    print(
        f"Raw OSM elements received: "
        f"{len(elements)}"
    )

    rows = []

    # ========================================================
    # PROCESS OSM ELEMENTS
    # ========================================================

    for element in elements:

        tags = element.get(
            "tags",
            {}
        )

        name = tags.get(
            "name"
        )

        # Ignore unnamed objects
        if not name:
            continue

        # Node
        if element["type"] == "node":

            latitude = element.get(
                "lat"
            )

            longitude = element.get(
                "lon"
            )

        # Way / Relation
        else:

            center = element.get(
                "center",
                {}
            )

            latitude = center.get(
                "lat"
            )

            longitude = center.get(
                "lon"
            )

        if latitude is None:
            continue

        if longitude is None:
            continue

        category = get_category(
            tags
        )

        rows.append({

            "osm_id":
                element["id"],

            "osm_type":
                element["type"],

            "name":
                str(name).strip(),

            "category":
                category,

            "latitude":
                latitude,

            "longitude":
                longitude,

            "amenity":
                tags.get(
                    "amenity",
                    ""
                ),

            "tourism":
                tags.get(
                    "tourism",
                    ""
                ),

            "leisure":
                tags.get(
                    "leisure",
                    ""
                ),

            "shop":
                tags.get(
                    "shop",
                    ""
                ),

            "highway":
                tags.get(
                    "highway",
                    ""
                ),

            "railway":
                tags.get(
                    "railway",
                    ""
                ),

            "historic":
                tags.get(
                    "historic",
                    ""
                )
        })

    # ========================================================
    # CHECK DATA
    # ========================================================

    if not rows:

        print()
        print(
            "No named POIs were found."
        )

        return

    df = pd.DataFrame(
        rows
    )

    # ========================================================
    # CLEAN DATA
    # ========================================================

    df["name"] = (
        df["name"]
        .astype(str)
        .str.strip()
    )

    df = df[
        df["name"] != ""
    ]

    # Remove duplicates
    df = df.drop_duplicates(
        subset=[
            "name",
            "latitude",
            "longitude"
        ]
    )

    # Sort
    df = df.sort_values(
        by=[
            "category",
            "name"
        ]
    )

    # ========================================================
    # SAVE
    # ========================================================

    os.makedirs(
        os.path.dirname(
            OUTPUT_PATH
        ),
        exist_ok=True
    )

    df.to_csv(
        OUTPUT_PATH,
        index=False,
        encoding="utf-8-sig"
    )

    # ========================================================
    # RESULT
    # ========================================================

    print()
    print("==========================================")
    print("          COLLECTION COMPLETE")
    print("==========================================")
    print()

    print(
        f"Total unique POIs: {len(df)}"
    )

    print()
    print("CATEGORY BREAKDOWN")
    print("------------------------------------------")

    print(
        df[
            "category"
        ].value_counts().to_string()
    )

    print()
    print("Saved to:")
    print(OUTPUT_PATH)

    print()
    print("==========================================")
    print("             NEARBNT READY")
    print("==========================================")
    print()


if __name__ == "__main__":
    main()