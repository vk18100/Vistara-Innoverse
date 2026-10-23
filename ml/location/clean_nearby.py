import csv

INPUT_FILE = "nearby_places_patna.csv"
OUTPUT_FILE = "nearby_places_patna_clean.csv"


def get_nearbnt_category(category):
    category = category.lower()

    if category.startswith("catering"):
        return "Food"

    if category.startswith("healthcare"):
        return "Health"

    if category.startswith("commercial"):
        return "Shopping"

    if category.startswith("tourism"):
        return "Explore"

    if category.startswith("leisure"):
        return "Recreation"

    if category.startswith("entertainment"):
        return "Entertainment"

    if category.startswith("public_transport"):
        return "Transport"

    if category.startswith("accommodation"):
        return "Stay"

    if category.startswith("activity"):
        return "Activities"

    if category.startswith("service"):
        return "Services"

    if category.startswith("religion"):
        return "Worship"

    return "Other"


def clean_data():

    rows = []

    with open(INPUT_FILE, "r", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file)

        for row in reader:

            name = row["name"].strip()

            # Remove unnamed places
            if not name or name.lower() == "unnamed":
                continue

            category = row["category"].strip()

            row["nearbnt_category"] = get_nearbnt_category(category)

            rows.append(row)

    fields = [
        "place_id",
        "name",
        "category",
        "nearbnt_category",
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

    with open(
        OUTPUT_FILE,
        "w",
        newline="",
        encoding="utf-8-sig"
    ) as file:

        writer = csv.DictWriter(file, fieldnames=fields)

        writer.writeheader()
        writer.writerows(rows)

    print()
    print("==============================")
    print("NEARBNT CLEANING COMPLETE")
    print("==============================")
    print()
    print(f"Original places : {sum(1 for _ in open(INPUT_FILE, encoding='utf-8-sig')) - 1}")
    print(f"Clean places    : {len(rows)}")
    print(f"Removed         : {(sum(1 for _ in open(INPUT_FILE, encoding='utf-8-sig')) - 1) - len(rows)}")
    print()
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    clean_data()