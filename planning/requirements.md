# Vistara INNOVERSE — Requirements

## 1. Purpose

Define what the Vistara competition prototype must support from a user, technical and demo perspective.

The requirements are intentionally limited to the competition prototype and are separate from the full Vistara 90-day project.

---

## 2. Product Goal

Vistara should help a traveler:

**Find a suitable stay → understand why it is recommended → see the property's verification status → explore the destination.**

---

## 3. Functional Requirements

### FR-01 — Home

The system shall provide a clear landing page for Vistara.

The Home page should allow the user to start a stay search and reach Explore.

---

### FR-02 — Stay Search

The system shall allow users to enter or select:

- Destination
- Dates
- Number of guests
- Budget
- Amenities / preferences

The search interface should be simple and easy to use.

---

### FR-03 — Stay Results

The system shall display matching property results.

Each result should be able to show:

- Property name
- Property image
- Price
- Rating
- Key amenities
- Location
- Verification status
- Recommendation information when applicable

---

### FR-04 — Smart Recommendation

The system shall generate a recommendation using relevant user inputs.

Minimum inputs:

```text
location
budget
dates
guests
amenities
preferences
```

Minimum output:

```text
property_id
score / rank
reasons
```

The recommendation should explain the main reasons for the match.

---

### FR-05 — Recommendation Explanation

The system shall provide a visible explanation such as:

```text
Why this stay?

✓ Within your budget
✓ Matches selected amenities
✓ Preferred location
✓ Strong review signals
```

The explanation should be understandable without technical knowledge.

---

### FR-06 — Property Details

The system shall provide a property-details view containing relevant stay information.

Minimum content:

- Photos
- Property information
- Amenities
- Reviews / ratings
- Location
- Price
- Recommendation explanation
- Verification status

---

### FR-07 — Property Verification

The system shall support a stay/property verification workflow.

Basic flow:

```text
Property information + photos
          ↓
Verification checks
          ↓
Verification result
```

Possible states:

```text
Verified
Needs Review
Rejected
```

The competition prototype may demonstrate this workflow using a simplified implementation.

---

### FR-08 — Explore

The system shall provide destination exploration connected to the user's selected destination or stay.

Explore shall contain:

```text
Places
Restaurants
Experiences
Local Guidance
```

Local Guidance shall remain inside Explore.

There shall be no separate Guidance / Guide page in the competition prototype.

---

### FR-09 — ML Service

The prototype shall provide a simple ML service boundary.

Minimum endpoints:

```text
POST /ml/recommend
POST /ml/image-verification
GET  /ml/health
```

The exact internal model can remain lightweight for the competition prototype.

---

### FR-10 — Demo Data

The prototype shall use safe sample/demo data for:

- Properties
- Users
- Reviews
- Recommendation examples
- Explore content

Real private user data shall not be required.

---

## 4. Data Science / ML Requirements

### ML-01 — Recommendation

The recommendation component should support a simple, explainable approach suitable for limited demo data.

A weighted or content-based approach is acceptable for the prototype.

---

### ML-02 — Hard Constraints

Hard constraints such as availability and budget should be respected before applying softer preference-based ranking.

---

### ML-03 — Explainability

The recommendation component shall return human-readable reasons.

The score should be treated as a relevance score unless the model has been properly trained, calibrated and evaluated as a probability.

---

### ML-04 — Property Verification

The verification component shall focus on the property/stay.

It may use:

- Property information
- Property photos
- Image quality signals
- Similarity / duplicate-image signals
- Other permitted verification signals

---

### ML-05 — ML Failure Handling

If the ML service is unavailable, the application should still be able to show a basic/default property order or normal results.

ML should not become a single point of failure for the demo.

---

## 5. Full Stack Requirements

### FS-01 — UI

The prototype shall provide a consistent, responsive interface for:

```text
Home
Stay Search
Stay Results
Property Details
Explore
```

---

### FS-02 — Navigation

The user should be able to move through the main demo without broken links or dead-end screens.

---

### FS-03 — ML Integration

The Full Stack application shall consume the agreed ML outputs and display them in the appropriate UI components.

---

### FS-04 — Verification Display

The property page shall clearly display the verification state.

Example:

```text
✓ Verified Property
```

---

### FS-05 — Explore Integration

Explore shall use the selected destination/stay context where appropriate instead of feeling like a completely separate application.

---

## 6. Non-Functional Requirements

### NFR-01 — Usability

The main demo flow should be understandable without technical explanation.

---

### NFR-02 — Responsiveness

The interface should work correctly on common laptop and mobile-sized screens.

---

### NFR-03 — Performance

Search and demo interactions should feel responsive enough for a live presentation.

Heavy processing should not block the user interface unnecessarily.

---

### NFR-04 — Reliability

The demo should continue to work if a non-critical ML component fails.

---

### NFR-05 — Maintainability

The prototype should keep the ML and Full Stack responsibilities separated so the two team members can develop independently.

---

### NFR-06 — Security

The repository shall not contain:

- Passwords
- API keys
- Payment credentials
- Private credentials
- Unnecessary personal data

Use environment variables and `.env.example` for configuration.

---

## 7. Demo Requirements

The complete demo should support this flow:

```text
Home
  ↓
Search destination / stay
  ↓
Stay Results
  ↓
Smart Recommendation
  ↓
Why this stay?
  ↓
Property Details
  ↓
Verified Property
  ↓
Explore
  ↓
Places / Restaurants / Experiences / Local Guidance
```

A judge should be able to understand the core idea from this flow.

---

## 8. Competition Scope Boundaries

### Included

- Stay search
- Stay results
- Property details
- Smart recommendation
- Recommendation explanation
- Property verification workflow
- Explore
- Places
- Restaurants
- Experiences
- Local Guidance
- Basic ML demo
- Demo data
- Presentation support

### Not Required for the Competition Prototype

- Full payment implementation
- Production authentication and role system
- Complete booking backend
- Advanced collaborative filtering
- Production-scale personalization
- Full fraud/risk platform
- Advanced review intelligence
- Production-grade photo verification
- Complete notifications system
- Large microservice infrastructure
- Production monitoring / continuous learning

These may belong to the main Vistara development roadmap.

---

## 9. Acceptance Criteria

The prototype is considered ready when:

1. A user can start from Home and complete the main demo journey.
2. Stay search and results work.
3. At least one smart recommendation is visible.
4. The recommendation includes understandable reasons.
5. A property shows a verification state.
6. Explore contains Places, Restaurants, Experiences and Local Guidance.
7. The ML and Full Stack responsibilities are clearly separated.
8. The demo does not depend on private data or exposed secrets.
9. The application has a basic fallback if the ML service is unavailable.
10. Both team members can explain the parts they built.

---

## 10. Final Requirement Summary

```text
USER
  ↓
HOME
  ↓
STAY SEARCH
  ↓
STAY RESULTS
  ↓
SMART RECOMMENDATION
  ↓
WHY THIS STAY?
  ↓
PROPERTY DETAILS
  ↓
PROPERTY VERIFICATION
  ↓
EXPLORE
  ├── Places
  ├── Restaurants
  ├── Experiences
  └── Local Guidance
```

**Core requirement: Vistara must make the travel decision easier, more understandable and more connected — without trying to build the complete production platform for the competition.**
