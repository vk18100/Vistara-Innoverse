import json
import pandas as pd
from pathlib import Path

# City to process
CITY = "Varanasi"
STATE = "Uttar Pradesh"
COUNTRY = "India"

# File paths
base_dir = Path(__file__).resolve().parent
input_file = base_dir / "raw" / f"osm_{CITY.lower()}_accommodation.geojson"
output_file = base_dir / f"osm_{CITY.lower()}_accommodation.csv"

# Read GeoJSON
with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)

# Get all features
features = data["features"]

print("Total records:", len(features))

# Extract useful OSM fields
rows = []

for feature in features:
    properties = feature.get("properties", {})
    geometry = feature.get("geometry", {})

    coordinates = geometry.get("coordinates", [None, None])

    row = {
        "osm_id": properties.get("@id"),
        "name": properties.get("name"),
        "tourism": properties.get("tourism"),
        "operator": properties.get("operator"),
        "latitude": coordinates[1],
        "longitude": coordinates[0]
    }

    rows.append(row)

df = pd.DataFrame(rows)

print(df.head())
print(df.columns.tolist())

# Save cleaned data
df.to_csv(output_file, index=False)

print("CSV saved successfully.")
print("File:", output_file)

# Basic data audit
print("\nShape:", df.shape)

print("\nAccommodation types:")
print(df["tourism"].value_counts())

print("\nMissing values:")
print(df.isnull().sum())

print("\nSample data:")
print(df.head(10))

# Normalize accommodation data

df["accommodation_type"] = df["tourism"]

df["city"] = CITY
df["state"] = STATE
df["country"] = COUNTRY

df["source"] = "OpenStreetMap"

print("\nNormalized data:")
print(df[[
    "osm_id",
    "name",
    "accommodation_type",
    "city",
    "state",
    "country",
    "latitude",
    "longitude",
    "source"
]].head())


# Save final cleaned OSM data
df.to_csv(output_file, index=False)

print("CSV saved successfully.")
print("File:", output_file)


# Check duplicate records
print("\nDuplicate OSM IDs:")
print(df["osm_id"].duplicated().sum())

# Check records with missing names
missing_names = df[df["name"].isna()]

print("\nRecords with missing names:")
print(missing_names[[
    "osm_id",
    "accommodation_type",
    "latitude",
    "longitude"
]])


# Create clean accommodation dataset
clean_df = df.dropna(subset=["name"]).copy()

print("\nClean dataset shape:", clean_df.shape)
print("\nAccommodation types:")
print(clean_df["accommodation_type"].value_counts())


# Standardize accommodation types
type_mapping = {
    "hotel": "Hotel",
    "hostel": "Hostel",
    "apartment": "Apartment",
    "guest_house": "Guest House",
    "chalet": "Chalet"
}

clean_df["accommodation_type_clean"] = (
    clean_df["accommodation_type"].map(type_mapping)
)
# Standardize accommodation types
type_mapping = {
    "hotel": "Hotel",
    "hostel": "Hostel",
    "apartment": "Apartment",
    "guest_house": "Guest House",
    "chalet": "Chalet"
}

clean_df["accommodation_type_clean"] = (
    clean_df["accommodation_type"].map(type_mapping)
)

print("\nStandardized accommodation types:")
print(clean_df["accommodation_type_clean"].value_counts())
print("\nStandardized types:")
print(clean_df["accommodation_type_clean"].value_counts())

# Validate coordinates
invalid_latitude = ~clean_df["latitude"].between(-90, 90)
invalid_longitude = ~clean_df["longitude"].between(-180, 180)

print("\nInvalid latitude:", invalid_latitude.sum())
print("Invalid longitude:", invalid_longitude.sum())

# Create final clean OSM dataset
final_osm_df = clean_df[
    [
        "osm_id",
        "name",
        "accommodation_type_clean",
        "city",
        "state",
        "country",
        "latitude",
        "longitude",
        "source"
    ]
].copy()

final_osm_df = final_osm_df.rename(
    columns={"accommodation_type_clean": "accommodation_type"}
)

final_output_file = base_dir / f"osm_{CITY.lower()}_accommodation_clean.csv"

final_osm_df.to_csv(final_output_file, index=False)

print("\nFinal clean dataset saved successfully.")
print("Shape:", final_osm_df.shape)
print("File:", final_output_file)