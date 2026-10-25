
from fastapi.testclient import TestClient
from api import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_home_endpoint():
    response = client.get("/")
    assert response.status_code == 200


def test_nearby_endpoint():
    response = client.get(
        "/nearby",
        params={
            "lat": 26.111341618930535,
            "lon": 85.39651958045545,
            "radius": 5,
            "limit": 10,
            "category": "food",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "places" in data
    assert data["count"] == len(data["places"])


def test_recommend_endpoint():
    response = client.get(
        "/recommend",
        params={
            "lat": 26.111341618930535,
            "lon": 85.39651958045545,
            "radius": 5,
            "category": "food",
            "limit": 10,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "recommendations" in data


def test_invalid_category():
    response = client.get(
        "/nearby",
        params={
            "lat": 26.111341618930535,
            "lon": 85.39651958045545,
            "category": "invalid_category",
        },
    )
    assert response.status_code == 400


def test_invalid_coordinates():
    response = client.get(
        "/nearby",
        params={"lat": 100, "lon": 85.39},
    )
    assert response.status_code == 422
