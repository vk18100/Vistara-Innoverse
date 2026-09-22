# Vistara INNOVERSE — Architecture

## 1. Purpose

Define the technical architecture for the INNOVERSE competition prototype.

This architecture is intentionally lightweight. It supports the demo without trying to reproduce the full production architecture of the main Vistara project.

---

## 2. Architecture Goal

The prototype connects four visible parts:

```text
Stay
  ↓
Smart Recommendation
  ↓
Property Verification
  ↓
Explore
```

The Full Stack application provides the user experience.

The ML service provides the intelligent/demo capabilities.

---

## 3. High-Level Architecture

```text
                    USER
                      │
                      ▼
              ┌────────────────┐
              │ Vistara Web UI │
              │   Prototype    │
              └───────┬────────┘
                      │
                      ▼
              ┌────────────────┐
              │ Application /  │
              │ Demo Backend   │
              └───┬────────┬───┘
                  │        │
          ┌───────┘        └──────────────┐
          ▼                               ▼
 ┌──────────────────┐             ┌──────────────────┐
 │  Demo / Property │             │   ML Service     │
 │      Data        │             │     FastAPI      │
 └──────────────────┘             └───────┬──────────┘
                                          │
                         ┌────────────────┼───────────────┐
                         ▼                ▼               ▼
                  Recommendation   Verification     Other ML
```

For the competition, the application can be implemented as a simple web application with a lightweight API layer. A separate ML service is preferred so the Data Science and Full Stack work remains clearly separated.

---

## 4. Main Components

### 4.1 Frontend / Prototype

Location:

```text
prototype/frontend/
```

Responsibilities:

- Home
- Stay Search
- Stay Results
- Property Details
- Smart Recommendation display
- “Why this stay?” section
- Verification status
- Explore
- Places
- Restaurants
- Experiences
- Local Guidance

The frontend should focus on a smooth clickable demo.

---

### 4.2 Application Layer

The application layer connects the UI to data and ML.

Responsibilities:

- Receive user search information
- Apply basic filters
- Retrieve demo property data
- Send recommendation requests to ML
- Receive ML outputs
- Send verification requests when required
- Return results to the frontend
- Keep the application usable if ML is unavailable

For the prototype, this does not need to become a large microservice architecture.

---

### 4.3 ML Service

Location:

```text
ml/
```

The ML layer contains:

```text
ml/
├── recommendation/
└── verification/
```

Responsibilities:

- Recommendation
- Property/photo verification concept
- Recommendation explanations
- Demo ML API

Preferred service boundary:

```text
FastAPI
```

Minimum endpoints:

```text
POST /ml/recommend
POST /ml/image-verification
GET  /ml/health
```

---

### 4.4 Demo Data

Location:

```text
demo-data/
```

Possible data:

```text
properties
users
reviews
explore-content
recommendation examples
verification examples
```

Use only safe sample/demo data.

---

## 5. Recommendation Architecture

### Input

The application sends structured user requirements:

```text
location
budget
dates
guests
amenities
preferences
```

### Processing

```text
User Input
    ↓
Validate input
    ↓
Apply hard constraints
    ↓
Prepare features
    ↓
Score candidate properties
    ↓
Rank properties
    ↓
Generate reasons
```

### Output

```text
{
  property_id,
  score,
  rank,
  reasons
}
```

Example:

```text
Property: VST102
Rank: 1
Score: 0.92

Reasons:
- Within budget
- Matches selected amenities
- Preferred location
- Strong review signals
```

The score is a relevance score for the prototype. It should not be presented as a probability unless the model is later trained, calibrated and evaluated for that interpretation.

---

## 6. Property Verification Architecture

Verification is for the **stay/property**.

It is not guest identity verification.

### Flow

```text
Host / property data
        +
Property photos
        ↓
Verification Service / ML
        ↓
Image and property checks
        ↓
Verification signals
        ↓
Decision layer
        ↓
Verified / Needs Review / Rejected
        ↓
Property page
```

### Prototype checks may include

- Image quality
- Duplicate/similar image detection
- Suspicious image signals
- Required property information checks
- Other permitted verification signals

For uncertain cases:

```text
ML / checks
     ↓
Needs Review
     ↓
Admin / human review
```

This keeps ML from becoming the final authority.

---

## 7. Explore Architecture

Explore remains one main section.

```text
Explore
├── Places
├── Restaurants
├── Experiences
└── Local Guidance
```

The selected destination/stay should provide context where appropriate.

Example:

```text
User selects a stay in Patna
        ↓
Explore Patna
        ↓
Nearby places
Restaurants
Experiences
Local Guidance
```

A map/place provider can be added later if needed for the prototype.

---

## 8. Application ↔ ML Communication

The communication should use a fixed contract.

### Recommendation

```text
Frontend
   ↓
Application
   ↓
POST /ml/recommend
   ↓
ML Service
   ↓
Response
   ↓
Application
   ↓
Frontend
```

### Verification

```text
Property data / photos
        ↓
Application
        ↓
POST /ml/image-verification
        ↓
ML Service
        ↓
Verification result
        ↓
Application
        ↓
Property page
```

---

## 9. Failure Handling

ML should not be a single point of failure.

If:

```text
ML service unavailable
```

the application should still be able to:

- Show normal property results
- Use a basic/default ranking
- Display property information
- Continue to Explore

Example:

```text
ML available
    ↓
Smart ranking

ML unavailable
    ↓
Default / rule-based ranking
```

The user should not see a broken page simply because the ML service is unavailable.

---

## 10. Security and Data Boundaries

The prototype should follow these rules:

- Do not commit passwords or API keys.
- Keep secrets in environment variables.
- Use `.env.example` as the template.
- Do not use real private user data for demo examples.
- Do not use raw payment credentials as ML features.
- Do not include unnecessary identity data in ML inputs.
- Keep property images under the appropriate application/data boundary.

---

## 11. Repository Architecture

```text
Vistara-INNOVERSE/
│
├── research/
├── planning/
│
├── prototype/
│   └── frontend/
│
├── ml/
│   ├── recommendation/
│   └── verification/
│
├── demo-data/
├── presentation/
├── documentation/
├── demo/
│
├── README.md
├── .gitignore
└── .env.example
```

The competition repository is separate from the main Vistara repository.

---

## 12. Ownership

### Data Science / ML

Owns:

```text
ml/
├── recommendation/
└── verification/
```

Also owns:

- ML logic
- Features
- Sample ML data
- ML output format
- FastAPI ML service
- Recommendation explanations
- ML architecture explanation

### Full Stack

Owns:

```text
prototype/frontend/
```

Also owns:

- UI
- Navigation
- Search
- Property screens
- Explore
- UI integration
- Application flow

### Shared

Both work together on:

- API contract
- Demo data structure
- Integration
- Product design
- Testing
- Presentation
- Demo flow

---

## 13. Prototype Technology Direction

A practical prototype can use:

```text
Frontend
→ React / Next.js

Application layer
→ lightweight API / backend

ML
→ Python + FastAPI

Data
→ JSON / lightweight database for demo

Version control
→ Git + GitHub
```

The exact framework can be selected by the Full Stack implementation, as long as the architecture and ML boundary remain clear.

---

## 14. What We Are Not Building Now

The competition architecture does not require:

- Large microservice infrastructure
- Production payment architecture
- Complete authentication/role system
- Full booking backend
- Production-scale database architecture
- Advanced recommendation infrastructure
- Large distributed ML pipelines
- Production monitoring
- Continuous model training

These belong to the main Vistara project and future development.

---

## 15. Final Architecture Flow

```text
                         VISTARA
                            │
                            ▼
                    ┌──────────────┐
                    │  Web Prototype│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Application  │
                    └───┬──────┬───┘
                        │      │
              ┌─────────┘      └─────────┐
              ▼                          ▼
       Property / Demo Data        ML FastAPI Service
                                      │
                         ┌────────────┼────────────┐
                         ▼            ▼            ▼
                  Recommendation  Verification  Health
                         │            │
                         └──────┬─────┘
                                ▼
                           Application
                                │
                 ┌──────────────┼──────────────┐
                 ▼              ▼              ▼
               Stay          Verified        Explore
                              Property
```

---

## 16. Final Architecture Decision

For the INNOVERSE prototype:

**Frontend → Lightweight Application Layer → ML FastAPI Service → Demo Data**

with:

**Stay + Smart Recommendation + Property Verification + Explore**

as the complete product flow.

The architecture is intentionally simple enough to finish, explain and demonstrate while keeping the ML and Full Stack responsibilities independent.
