# Vistara INNOVERSE — Features

## 1. Feature Objective

Define the features that will be visible or demonstrated in the Vistara competition prototype.

The prototype focuses on one connected journey:

**Stay → Smart Recommendation → Property Verification → Explore**

---

## 2. Core Features

### A. Stay

The Stay section helps users find and review accommodation.

**Features**
- Destination search
- Date selection
- Guest selection
- Budget filtering
- Amenity filtering
- Property result cards
- Property details
- Photos
- Amenities
- Ratings and reviews
- Location information
- Verified property status

---

### B. Smart Recommendation

Vistara uses user requirements to identify suitable properties.

**Input**
- Location
- Budget
- Dates
- Guests
- Amenities
- User preferences

**Output**
- Recommended property
- Rank / relevance score
- Recommendation reasons

**Example**

> **Recommended for you**
>
> ✓ Within your budget  
> ✓ Matches selected amenities  
> ✓ Preferred location  
> ✓ Strong review signals

The recommendation must be understandable. The prototype should show **why** a property was recommended instead of only showing a score.

---

### C. Property Verification

Verification is for the **stay/property** listed by a host.

**Flow**

**Property information + photos → Verification checks → Verification result**

Possible result states:
- Verified
- Needs Review
- Rejected

The prototype can demonstrate the verification workflow and ML/photo-analysis concept.

**Guest identity-upload verification is not part of the prototype.**

---

### D. Explore

Explore extends the stay experience into destination discovery.

**Features**
- Places to visit
- Restaurants
- Experiences
- Local Guidance

Explore remains a single section. There is **no separate Guidance or Guide page** for the competition prototype.

---

## 3. Supporting Features

These features support the main demo but do not become separate major modules.

### UI / Navigation
- Vistara branding
- Home
- Stay
- Explore
- Login / Sign Up
- Responsive layout
- Premium visual design

### Property Page
- Property photos
- Property information
- Amenities
- Reviews
- Location
- Recommendation explanation
- Verification status

### Demo Data
- Sample properties
- Sample users
- Sample reviews
- Sample recommendation results
- Sample Explore content

---

## 4. ML Features

The competition prototype demonstrates two ML-focused areas.

### Recommendation
**User requirements → feature preparation → recommendation/ranking → property + reasons**

### Property / Photo Verification
**Property information + photos → analysis → verification signals → status**

Minimum demonstration API:

```text
POST /ml/recommend
POST /ml/image-verification
GET  /ml/health
```

---

## 5. Feature Priority

### Must Have

- Stay search
- Stay results
- Property details
- Smart recommendation
- “Why this stay?”
- Property verification status
- Explore
- Places
- Restaurants
- Experiences
- Local Guidance
- Smooth end-to-end demo flow

### Supporting

- Filters
- Reviews
- Amenities
- Location
- Sample data
- ML API connection
- Responsive UI

### Future

These are not required for the competition prototype:

- Full payment system
- Full authentication/role system
- Advanced collaborative filtering
- Deep personalization
- Full fraud/risk model
- Advanced review intelligence
- Production-grade photo verification
- Full notification system
- Complete booking backend
- Production deployment infrastructure

---

## 6. Complete User Flow

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

## 7. Feature Design Principles

1. **Keep the journey simple.**
2. **Show intelligence where it adds value.**
3. **Explain recommendations.**
4. **Keep property verification visible.**
5. **Keep Local Guidance inside Explore.**
6. **Prioritize a polished working prototype over unfinished advanced features.**
7. **Keep competition features separate from the main Vistara development project.**

---

## 8. Final Feature Scope

**Vistara helps users find a suitable stay, understand why it is recommended, see the property's verification status, and continue exploring the destination.**
