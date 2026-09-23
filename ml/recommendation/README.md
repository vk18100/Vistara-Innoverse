# Vistara Smart Recommendation System

## Overview

Vistara recommends stays by first filtering properties based on the user's search requirements and selected filters, then ranking the remaining properties using a weighted recommendation score.

## Recommendation Flow

```text
User Search
    ↓
Basic Filtering
    ↓
Selected Filters
    ↓
Recommendation Score
    ↓
Rank Properties
    ↓
Top Recommendations
    ↓
"Why this stay?"
User Inputs

The current recommendation system uses:

City
Budget
Guests
Bedrooms
Bathrooms
Property type
Kitchen
Wi-Fi
Parking
AC
Balcony
Terrace
Workspace
Pool
Washing machine
Self check-in
Free cancellation
Pets
Check-in date
Check-out date
1. Basic Filtering

The first filter checks:

City
Maximum guests
Property availability
Check-in date
Check-out date

This reduces the dataset to properties that satisfy the user's basic search.

2. Selected Property Filters

The system then applies the user's selected filters:

Property type
Bedrooms
Bathrooms
Kitchen
Wi-Fi
Parking
AC
Balcony
Self check-in

Only properties matching the selected filters continue to the ranking stage.

3. Recommendation Score

Each remaining property receives a score between 0 and 1.

The score can be displayed as a percentage.

Example:

0.95 = 95/100 match

The current score is calculated using weighted factors.

Score Weights
Factor	Weight
Location	20%
Budget	20%
Bedrooms	12%
Bathrooms	8%
Amenities	15%
Rating	7%
Reviews	3%
Availability	5%
Verification	5%
Personal Preference	5%
Total	100%
Budget Matching

Budget is treated as a ranking factor rather than a strict filter.

A property closer to the user's budget receives a higher budget score.

Properties above the user's budget can still appear as alternatives, but receive a lower budget contribution.

Example:

User budget: ₹5000
Property price: ₹4600
→ Higher budget match

User budget: ₹5000
Property price: ₹5200
→ Lower budget match
Bedrooms and Bathrooms

The system checks whether the property provides at least the number of bedrooms and bathrooms requested by the user.

Example:

User requires: 4 bedrooms
Property has: 4 bedrooms
→ Requirement matched
Amenities Score

The current 15% amenity score is divided into:

Amenity	Weight
Kitchen	3.75%
Wi-Fi	2.5%
Parking	7.5%
AC	1.25%
Total	15%

The score is added when a requested amenity is available in the property.

Rating and Reviews
Rating

Property rating contributes up to 7% of the final score.

The rating is normalized using the property's rating out of 5.

Reviews

Review count contributes up to 3% of the final score.

A higher review count produces a stronger review signal in the current MVP.

Availability

Availability contributes 5% to the recommendation score.

Date availability is also checked during the filtering stage.

The system compares the user's:

check_in
check_out

with the property's:

available_from
available_to
Verification

Property verification contributes 5% to the recommendation score.

The recommendation system uses the property's verification result:

Verified
Needs Review
Rejected

The verification result is also displayed separately with the recommendation.

Personal Preferences

The current personal preference features are:

Balcony
Terrace
Workspace
Pool
Washing machine

The score depends on how many of the user's selected preferences are available in the property.

Final Score

The final recommendation score is calculated by adding all individual score components:

Location
+ Budget
+ Bedrooms
+ Bathrooms
+ Amenities
+ Rating
+ Reviews
+ Availability
+ Verification
+ Personal Preference
= Final Score
Ranking

After calculating the final score, properties are sorted from highest to lowest.

Example:

VST061 → 96.81
VST001 → 95.55
VST041 → 95.45

The highest-scoring properties are shown first.

Explainable Recommendation

Vistara provides reasons for the recommended property instead of showing only a numerical score.

Example:

Match Score: 95/100

Why this stay?

✓ Preferred location
✓ Bedroom requirement matched
✓ Bathroom requirement matched
✓ Kitchen available
✓ Wi-Fi available
✓ Free parking available
✓ Air conditioning available
✓ Highly rated
✓ Many guest reviews
✓ Verified property

This makes the recommendation easier for the user to understand.

Current INNOVERSE MVP

The current recommendation system is a rule-based weighted recommendation system.

It is designed for the INNOVERSE prototype and is:

Simple
Explainable
Fast
Easy to demonstrate
Easy to integrate with the frontend
Current Output

The recommendation system produces:

property_id
property_name
city
property_type
max_guests
bedrooms
beds
bathrooms
price_per_night
price_3hr
price_6hr
price_9hr
rating
review_count
verified
self_check_in
kitchen
wifi
parking
ac
balcony
final_score
verification_score
verification_status
Future Improvements

The recommendation system can later be improved with:

User behavior and booking history
Personalized recommendations
Collaborative filtering
Hybrid recommendation models
Review sentiment analysis
Better price/value modeling
Photo-based property verification
Machine-learning ranking models