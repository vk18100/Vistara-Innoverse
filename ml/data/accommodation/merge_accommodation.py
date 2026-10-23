import pandas as pd
from pathlib import Path

base_dir = Path(__file__).resolve().parent
processed_dir = base_dir / "processed"

files = [
    base_dir / "osm_patna_accommodation_clean.csv",
    base_dir / "osm_delhi_accommodation_clean.csv",
    base_dir / "osm_mumbai_accommodation_clean.csv",
    base_dir / "osm_bengaluru_accommodation_clean.csv",
    base_dir / "osm_jaipur_accommodation_clean.csv",
    base_dir / "osm_varanasi_accommodation_clean.csv"
]

print("Files to merge:", len(files))

# Read all city datasets
dataframes = []

for file in files:
    df = pd.read_csv(file)
    dataframes.append(df)

# Merge all datasets
master_df = pd.concat(dataframes, ignore_index=True)

print("Master dataset shape:", master_df.shape)

# Check cities
print("\nCities:")
print(master_df["city"].value_counts())

# Check duplicate OSM IDs
print("\nDuplicate OSM IDs:", master_df["osm_id"].duplicated().sum())

# Save master accommodation dataset
output_file = processed_dir / "osm_india_accommodation.csv"

master_df.to_csv(output_file, index=False)

print("\nMaster dataset saved successfully.")
print("File:", output_file)

# Master dataset audit
print("\nShape:", master_df.shape)

print("\nCities:")
print(master_df["city"].value_counts())

print("\nAccommodation types:")
print(master_df["accommodation_type"].value_counts())

print("\nMissing values:")
print(master_df.isnull().sum())

print("\nMaster columns:")
print(master_df.columns.tolist())

print("\nData types:")
print(master_df.dtypes)