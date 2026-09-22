# Vistara INNOVERSE — Solution Research

## Research status
This document turns the earlier problem, user and market research into a practical solution design. Technical choices are recommendations/inferences; competitor internals are not assumed.

## 1. Solution Objective
Create one connected journey:
**Find a suitable stay → understand why it is recommended → see property verification → explore the destination.**

## 2. Problem-to-Solution Mapping
| Problem | Proposed solution | Basis |
|---|---|---|
| Too many similar stays | Smart recommendation + ranking | Two-stage recommendation research; documented marketplace ranking patterns |
| Property credibility uncertainty | Property verification workflow | Airbnb documents listing-location verification |
| Reviews are hard to scan | Review intelligence | Extract aspects/sentiment for concise summaries |
| Opaque AI decisions | Explainable recommendations | Booking.com AI research shows interest in AI but limited full trust in autonomous decision-making |
| Accommodation and destination planning feel separate | Explore linked to stay | Google Places API supports nearby place search by type/location |

## 3. Recommended Architecture
User → Application → Recommendation → Verification status → Explore.

For the competition prototype, use a lightweight application + small ML/demo service rather than a production-scale microservice system.

## 4. Recommendation Options
| Approach | Use | Decision |
|---|---|---|
| Rule/weighted scoring | Works with little data and is explainable | **Competition MVP** |
| Content-based | Uses property/user attributes | Next step |
| Collaborative filtering | Learns from user-property interactions | Future |
| Hybrid | Combines content, behavior and context | Long-term direction |

## 5. Competition Recommendation Flow
**Search → Filter → Score → Rank → Explain → Display**

Example inputs: Patna, budget ≤ ₹2,000, 2 guests, AC + Wi-Fi, preferred area.

Output:
- property_id
- score/rank
- reasons

## 6. Property Verification
1. Host submits property information and required photos.
2. Automated checks generate verification signals.
3. Business rules/ML produce **Verified / Needs Review / Rejected**.
4. Admin handles uncertain cases.
5. Status is displayed on the property page.

Verification is for the **stay/property**, not guest identity.

## 7. Explore
Explore remains one section:
**Places + Restaurants + Experiences + Local Guidance**

Use destination context and, where appropriate, a place/map provider for nearby results.

## 8. Explainability
- Show important match factors.
- Keep explanations short.
- Let users adjust constraints.
- Treat AI as decision support, not autonomous decision-making.

## 9. MVP vs Future
**MVP:** weighted/content-based recommendation, explanations, basic property/photo verification workflow, location-aware Explore, sample data.

**Future:** hybrid recommendation, deeper personalization, stronger image verification, review intelligence, risk models, monitoring and continuous learning.

## 10. Technical Decisions
- Recommendation score is a relevance score, not automatically a probability.
- Hard constraints are applied before softer ranking preferences.
- Verification status is a workflow state; ML is one input.
- Do not use raw payment credentials or unnecessary sensitive identity data as ML features.
- Keep a non-ML fallback when the ML service is unavailable.

## 11. Final Solution Statement
**A connected, mobile-friendly travel experience that uses transparent recommendations to help users choose a suitable stay, a property-verification workflow to strengthen trust, and Explore to continue the journey into destination discovery.**

## 12. References
- Google Research — Deep Neural Networks for YouTube Recommendations (2016)
- Google Research — Wide & Deep Learning for Recommender Systems (2016)
- Booking.com — Global AI Sentiment Report (2025)
- Airbnb — How search results work
- Airbnb — How listing locations are verified
- Airbnb — Review moderation
- Google Maps Platform — Places API (New)
