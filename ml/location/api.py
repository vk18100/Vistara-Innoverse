
from fastapi import FastAPI, Query, HTTPException
from nearby import get_nearby_places
from recommend import recommend_places

app = FastAPI(
    title="NearBNT Nearby Intelligence API",
    description="Nearby place discovery and personalized recommendations.",
    version="1.3.0",
)

VALID_CATEGORIES = {
    "all", "food", "restaurant", "shopping", "explore",
    "recreation", "entertainment", "health", "transport",
    "services", "stay", "activities",
}


@app.get("/")
def home():
    return {
        "success": True,
        "message": "NearBNT Nearby Intelligence API is running",
        "version": app.version,
        "endpoints": ["/nearby", "/recommend", "/health", "/docs"],
    }


@app.get("/health")
def health_check():
    return {
        "success": True,
        "status": "healthy",
        "service": "NearBNT Nearby Intelligence API",
    }


def validate_category(category: str) -> str:
    category = category.strip().lower()

    if category not in VALID_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Unsupported category",
                "provided": category,
                "allowed": sorted(VALID_CATEGORIES),
            },
        )

    return category


def format_distances(places):
    for place in places:
        distance_m = place.get("distance_m")

        if distance_m is not None:
            distance_m = float(distance_m)
            place["distance_m"] = round(distance_m, 1)
            place["distance_km"] = round(distance_m / 1000, 3)

    return places


@app.get("/nearby")
def nearby(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    radius: float = Query(5, gt=0, le=20),
    limit: int = Query(50, ge=1, le=100),
    category: str = Query("all"),
):
    category = validate_category(category)

    try:
        places = get_nearby_places(
            lat=lat,
            lon=lon,
            radius_km=radius,
            limit=limit,
            category=category,
        )

        return {
            "success": True,
            "location": {"latitude": lat, "longitude": lon},
            "radius_km": radius,
            "category": category,
            "count": len(places),
            "places": format_distances(places),
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Nearby places provider failed: {error}",
        )


@app.get("/recommend")
def recommend(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    radius: float = Query(5, gt=0, le=20),
    category: str = Query("all"),
    limit: int = Query(20, ge=1, le=100),
    preferred_categories: str = Query(""),
    max_distance_m: int | None = Query(None, ge=100, le=20000),
):
    category = validate_category(category)

    preferences = [
        item.strip().lower()
        for item in preferred_categories.split(",")
        if item.strip()
    ]

    try:
        places = recommend_places(
            lat=lat,
            lon=lon,
            category=category,
            radius_km=radius,
            limit=100,
            max_results=limit,
            preferred_categories=preferences,
            max_distance_m=max_distance_m,
        )

        return {
            "success": True,
            "location": {"latitude": lat, "longitude": lon},
            "radius_km": radius,
            "category": category,
            "count": len(places),
            "recommendations": format_distances(places),
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except RuntimeError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Recommendation provider failed: {error}",
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api:app", host="0.0.0.0", port=8001, reload=True)
