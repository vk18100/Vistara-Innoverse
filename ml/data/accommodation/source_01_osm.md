# Source 01 — OpenStreetMap

## Purpose
Collect real accommodation and location data for the Vistara prototype.

## Initial Area
Patna, Bihar, India

## Accommodation Categories
- Hotel
- Hostel
- Guest House
- Resort
- Motel
- Apartment / serviced accommodation
- Other mapped accommodation

## Useful Fields
- Name
- Accommodation type
- Address
- City
- Area
- Latitude
- Longitude
- Website
- Phone
- Stars / rating tag where available
- Rooms / beds where available

## Collection Method
Use the OpenStreetMap Overpass API for read-only geographic data extraction.

## Important Limitation
OSM does not reliably provide all Vistara fields such as:
- Price
- Availability
- Guest reviews
- Cleaning fee
- Service fee
- Hotel hourly prices

These fields should not be invented and will need separate permitted sources or Vistara/provider data.

## Licensing
OSM data is licensed under ODbL 1.0.
Required attribution must be maintained when distributed/used publicly.

## Data Quality
- Keep the original source.
- Remove duplicates.
- Normalize accommodation types.
- Validate coordinates.
- Record missing fields.
- Do not present incomplete OSM records as complete property listings.