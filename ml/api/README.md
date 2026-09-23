# Vistara ML API

## Overview

The Vistara ML API connects the Full Stack application with the Data Science / ML modules.

## Endpoints

### 1. Health Check

```text
GET /ml/health

Response:

{
  "status": "ok"
}
2. Recommendation
POST /ml/recommend

Request:

{
  "city": "Delhi",
  "budget": 5000,
  "guests": 2,
  "bedrooms": 4,
  "bathrooms": 1,
  "property_type": "Entire Home",
  "kitchen": 1,
  "wifi": 1,
  "parking": 1,
  "ac": 1,
  "balcony": 1,
  "terrace": 0,
  "workspace": 1,
  "pool": 0,
  "washing_machine": 1,
  "self_check_in": 1,
  "check_in": "2026-11-01",
  "check_out": "2026-11-03"
}

Response:

{
  "property_id": "VST061",
  "property_name": "Urban Comfort House 061",
  "score": 96.81,
  "rank": 1,
  "reasons": [
    "Preferred location",
    "Bedroom requirement matched",
    "Wi-Fi available",
    "Free parking available",
    "Verified property"
  ]
}
3. Property Verification
POST /ml/verify

Request:

{
  "property_id": "VST008"
}

Response:

{
  "property_id": "VST008",
  "property_name": "Heritage Home Home 008",
  "verification_score": 0.6,
  "verification_status": "Needs Review",
  "reasons": [
    "Property verification not completed",
    "Smoke alarm available",
    "Carbon monoxide alarm available"
  ]
}
Ownership

Data Science / ML:

Recommendation logic
Verification logic
FastAPI ML service
ML response structure

Full Stack:

Sends requests to the ML API
Displays recommendation and verification results in the UI
Integration Flow
Full Stack Frontend
        ↓
Application / Backend
        ↓
FastAPI ML API
        ↓
Recommendation / Verification
        ↓
JSON Response
        ↓
Frontend UI
Current MVP

The recommendation system uses rule-based weighted scoring.

The property verification system uses rule-based verification signals.

Both are prototype components for the INNOVERSE demo.