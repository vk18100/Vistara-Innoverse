
import pytest
from unittest.mock import patch

from nearby import get_nearby_places, places_cache


LAT = 26.111341618930535
LON = 85.39651958045545


def test_invalid_latitude():
    with pytest.raises(ValueError):
        get_nearby_places(
            lat=100,
            lon=LON,
            category="food",
        )


def test_invalid_longitude():
    with pytest.raises(ValueError):
        get_nearby_places(
            lat=LAT,
            lon=200,
            category="food",
        )


def test_invalid_category():
    with pytest.raises(ValueError):
        get_nearby_places(
            lat=LAT,
            lon=LON,
            category="invalid_category",
        )


def test_cache_hit():
    places_cache.clear()

    mock_places = [
        {
            "name": "Test Cafe",
            "lat": LAT,
            "lon": LON,
            "distance_m": 100,
            "distance_km": 0.1,
            "categories": ["catering.cafe"],
            "address": "Test address",
            "place_id": "test-123",
            "source": "Geoapify",
        }
    ]

    with patch(
        "nearby.fetch_places",
        return_value=mock_places,
    ) as mock_fetch:

        first = get_nearby_places(
            LAT, LON, radius_km=5, category="food"
        )

        second = get_nearby_places(
            LAT, LON, radius_km=5, category="food"
        )

        assert first == second
        assert mock_fetch.call_count == 1


def test_results_sorted_by_distance():
    places_cache.clear()

    mock_places = [
        {
            "name": "Far Cafe",
            "lat": LAT,
            "lon": LON,
            "distance_m": 900,
            "categories": ["catering.cafe"],
            "place_id": "far-1",
        },
        {
            "name": "Near Cafe",
            "lat": LAT,
            "lon": LON,
            "distance_m": 100,
            "categories": ["catering.cafe"],
            "place_id": "near-1",
        },
    ]

    with patch(
        "nearby.fetch_places",
        return_value=mock_places,
    ):
        results = get_nearby_places(
            LAT, LON, radius_km=5, category="food"
        )

    assert results[0]["name"] == "Near Cafe"
    assert results[1]["name"] == "Far Cafe"
