# Vistara INNOVERSE — Work Division

## 1. Purpose

Define the ownership between the two team members for the INNOVERSE competition prototype.

This workstream is separate from the main Vistara project.

---

## 2. Team Structure

### Data Science / ML — You

Primary responsibility:

```text
Intelligence
Data
Recommendation
Property Verification ML
ML API
ML explanation
```

### Full Stack — Friend

Primary responsibility:

```text
UI
Application flow
Prototype interaction
Search
Property screens
Explore
ML integration
```

---

## 3. Detailed Division

| Area | Data Science / ML | Full Stack |
|---|---|---|
| Home & Search | Define recommendation/search inputs and data requirements. | Build home, navbar, destination search and filters. |
| Stay Results | Define ranking/recommendation logic and sample outputs. | Build result cards, sorting/filtering and result layout. |
| Smart Recommendation | Build demo recommendation logic, output structure and reasons. | Integrate and display recommendations in the UI. |
| Property Details | Define ML-relevant property fields. | Build photos, amenities, reviews, location and details. |
| Property Verification | Define photo/property analysis concept and demo result. | Build verification workflow, status and verified-property display. |
| Explore | Define data requirements for destination intelligence. | Build places, restaurants, experiences and local guidance. |
| ML API | Prepare FastAPI endpoints and request/response contracts. | Connect the application to the ML endpoints. |
| Demo Data | Prepare sample users, properties, reviews and ML examples. | Use the shared demo data throughout the prototype. |
| Presentation | Explain ML, intelligence and ML architecture. | Explain UI, system flow and user experience. |

---

## 4. Your Data Science / ML Work

### Recommendation

Build the competition recommendation demo.

```text
User requirements
      ↓
Feature preparation
      ↓
Recommendation / ranking
      ↓
Property ID + score/rank + reasons
```

Inputs may include:

```text
location
budget
dates
guests
amenities
preferences
```

Example output:

```text
Property: VST102
Rank: 1

Why recommended:
- Within budget
- Matches selected amenities
- Preferred location
- Strong review signals
```

---

### Property Verification

Focus only on **stay/property verification**.

```text
Property information + photos
             ↓
Image / property analysis
             ↓
Verification signals
             ↓
Verified / Needs Review / Rejected
```

Possible ML signals:

- Image quality
- Similar / duplicate images
- Suspicious image indicators
- Property-information checks
- Other permitted verification signals

Guest identity-upload verification is not part of this competition work.

---

### ML API

Minimum prototype endpoints:

```text
POST /ml/recommend
POST /ml/image-verification
GET  /ml/health
```

You provide the agreed request/response structure.

---

## 5. Full Stack Work

The Full Stack side builds the visible prototype:

```text
Home
  ↓
Stay Search
  ↓
Stay Results
  ↓
Property Details
  ↓
Explore
```

The UI must visibly show:

```text
AI Recommended Stay
Why this stay?
✓ Verified Property
```

### Explore

Explore remains one section:

```text
Explore
├── Places
├── Restaurants
├── Experiences
└── Local Guidance
```

No separate Guidance or Guide page is required for the competition prototype.

---

## 6. Shared Responsibilities

Both team members work together on:

### Product Design
- Colors
- Typography
- Navbar
- Cards
- Images
- Spacing
- Overall premium visual style

### ML ↔ Application Integration
- Request format
- Response format
- Property IDs
- Recommendation fields
- Verification states

### Demo
- End-to-end flow
- Testing
- Bug fixing
- Demo data
- Presentation practice

---

## 7. Ownership Boundary

The simplest rule is:

> **Full Stack builds what the user sees and interacts with.**
>
> **Data Science / ML builds what makes Vistara intelligent.**

### Full Stack owns

```text
UI
Search
Property pages
Explore
Navigation
Application flow
Integration
```

### Data Science / ML owns

```text
Data
Features
Recommendation
Ranking logic
Property verification intelligence
ML API
ML explanation
```

---

## 8. Demo Flow

The entire competition demo should follow one story:

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

---

## 9. Collaboration Handoff

The handoff between the two sides is:

```text
User request
     ↓
Full Stack
     ↓
ML API
     ↓
Data Science / ML
     ↓
Recommendation / Verification result
     ↓
Full Stack
     ↓
UI
```

### Example

Full Stack sends:

```text
location = Patna
budget = 2000
guests = 2
amenities = AC, Wi-Fi
```

ML returns:

```text
property_id = VST102
rank = 1
score = 0.92
reasons = [
  "Within budget",
  "Matches selected amenities",
  "Preferred location"
]
```

Full Stack displays:

```text
Recommended for you

VST102

Why this stay?
✓ Within budget
✓ AC + Wi-Fi
✓ Preferred location
```

---

## 10. What We Should Not Mix

Do not mix:

```text
Main Vistara project
```

with:

```text
Vistara-INNOVERSE competition project
```

The two repositories remain separate.

The competition prototype can later be reviewed for selective reuse in the main Vistara project.

---

## 11. Scope Rule

Do not add major features outside the locked competition scope.

### Locked scope

```text
Stay
+
Smart Recommendation
+
Property Verification
+
Explore
```

The goal is a **complete, understandable and polished prototype**, not the complete production Vistara platform.

---

## 12. Final Responsibility Summary

```text
YOU
→ Data Science / ML
→ Recommendation
→ Property Verification ML
→ ML API
→ ML explanation
→ ML presentation

FRIEND
→ Full Stack
→ UI
→ Search
→ Property screens
→ Explore
→ Application integration
→ UI presentation

BOTH
→ Product design
→ Demo flow
→ Integration testing
→ Final presentation
```

---

## 13. Final Principle

**One product. Two owners. One clear handoff.**

```text
FULL STACK
What the user interacts with
        ↓
       API
        ↓
DATA SCIENCE / ML
What makes the product intelligent
        ↓
       API
        ↓
FULL STACK
What the user sees
```
