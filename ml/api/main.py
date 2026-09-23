from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ml.recommendation.recommender import (
    filter_properties,
    apply_property_filters,
    rank_properties,
    generate_reasons
)

from ml.verification.verifier import (
    df as verification_df,
    calculate_verification_score,
    get_verification_status,
    generate_verification_reasons
)

class RecommendationRequest(BaseModel):
    city: str
    budget: float
    guests: int
    bedrooms: int
    bathrooms: int
    property_type: str
    kitchen: int
    wifi: int
    parking: int
    ac: int
    balcony: int
    terrace: int
    workspace: int
    pool: int
    washing_machine: int
    self_check_in: int
    check_in: str
    check_out: str

class VerificationRequest(BaseModel):
    property_id: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Vistara ML API is running"}


@app.get("/ml/health")
def health():
    return {"status": "ok"}


@app.post("/ml/recommend")
def recommend(request: RecommendationRequest):
    user = request.model_dump()

    filtered_df = filter_properties(user)
    filtered_df = apply_property_filters(filtered_df, user)
    recommendations = rank_properties(filtered_df, user)

    if recommendations.empty:
        return {"message": "No matching properties found"}

    top_property = recommendations.iloc[0]

    reasons = generate_reasons(top_property, user)

    return {
        "property_id": top_property["property_id"],
        "property_name": top_property["property_name"],
        "score": round(float(top_property["final_score"]) * 100, 2),
        "rank": 1,
        "reasons": reasons
    }

@app.post("/ml/verify")
def verify(request: VerificationRequest):
    property_data = verification_df[
        verification_df["property_id"] == request.property_id
    ]

    if property_data.empty:
        return {"message": "Property not found"}

    property = property_data.iloc[0]

    score = calculate_verification_score(property)
    status = get_verification_status(score)
    reasons = generate_verification_reasons(property)

    return {
        "property_id": property["property_id"],
        "property_name": property["property_name"],
        "verification_score": round(float(score), 2),
        "verification_status": status,
        "reasons": reasons
    }