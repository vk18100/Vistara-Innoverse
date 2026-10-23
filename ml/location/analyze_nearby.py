import csv
from collections import Counter

INPUT_FILE = "nearby_places_patna_clean.csv"


def analyze_places():

    with open(INPUT_FILE, "r", encoding="utf-8-sig") as file:
        rows = list(csv.DictReader(file))

    print()
    print("==============================")
    print("NEARBNT NEARBY ANALYSIS")
    print("==============================")
    print()

    # Category count
    category_counts = Counter(
        row["nearbnt_category"]
        for row in rows
    )

    print("CATEGORY SUMMARY")
    print("------------------------------")

    for category, count in category_counts.most_common():
        print(f"{category:<20} {count}")

    print()
    print("TOP 20 NEAREST PLACES")
    print("------------------------------")

    # Sort by distance
    valid_rows = []

    for row in rows:
        try:
            row["distance_m"] = float(row["distance_m"])
            valid_rows.append(row)
        except (ValueError, TypeError):
            pass

    valid_rows.sort(key=lambda x: x["distance_m"])

    for i, row in enumerate(valid_rows[:20], start=1):

        distance = row["distance_m"]

        if distance >= 1000:
            distance_text = f"{distance / 1000:.2f} km"
        else:
            distance_text = f"{distance:.0f} m"

        print(
            f"{i:02}. "
            f"{row['name']} | "
            f"{row['nearbnt_category']} | "
            f"{distance_text}"
        )

    print()
    print(f"Total clean places: {len(rows)}")
    print(f"Places with distance: {len(valid_rows)}")


if __name__ == "__main__":
    analyze_places()