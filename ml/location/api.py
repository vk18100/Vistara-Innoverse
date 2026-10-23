from fastapi import FastAPI, Query
from nearby import get_nearby_places

app = FastAPI(
    title="NearBNT Nearby Intelligence API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "NearBNT Nearby Intelligence API is running"
    }


@app.get("/nearby")
def nearby(
    lat: float = Query(...),
    lon: float = Query(...),
    radius: float = Query(5, gt=0, le=20),
    limit: int = Query(50, gt=1, le=100),
    category: str = Query("all")
):

    places = get_nearby_places(
        lat=lat,
        lon=lon,
        radius_km=radius,
        limit=limit,
        category=category
    )

    return {
        "success": True,
        "location": {
            "latitude": lat,
            "longitude": lon
        },
        "radius_km": radius,
        "category": category,
        "count": len(places),
        "places": places
    }