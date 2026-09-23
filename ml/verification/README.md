# Vistara Property Verification System

## Overview

Vistara uses a property verification system to evaluate whether a listed property meets basic trust and safety requirements.

The current MVP uses predefined verification signals and a weighted scoring approach to generate a verification score and status.

---

## Verification Flow

Property Data  
↓  
Verification Signals  
↓  
Verification Score  
↓  
Verification Status  
↓  
Verification Result

---

## Verification Signals

The current verification system uses:

- Property information verification
- Smoke alarm availability
- Carbon monoxide alarm availability

---

## Verification Score

Each verification signal contributes to the final verification score.

| Verification Signal | Weight |
|---|---:|
| Property Information Verified | 0.40 |
| Smoke Alarm | 0.30 |
| Carbon Monoxide Alarm | 0.30 |

### Score Calculation

```text
Verification Score =
Property Verification
+ Smoke Alarm Score
+ Carbon Monoxide Alarm Score

The final score ranges from 0 to 1.

Verification Status

The score is converted into a verification status.

Score	Status
>= 0.80	Verified
>= 0.50 and < 0.80	Needs Review
< 0.50	Rejected
Verification Reasons

The system also generates human-readable reasons for the verification result.

Examples:

Property information verified
Property information not verified
Smoke alarm available
Smoke alarm not confirmed
Carbon monoxide alarm available
Carbon monoxide alarm not confirmed

These reasons are used to explain the verification result to the user.

Current MVP

The current MVP is a rule-based verification system.

It uses predefined property attributes rather than a trained machine learning model.

The current system provides:

Verification score
Verification status
Verification reasons
Property-level verification result
Current Output

For each property, the system produces:

property_id
property_name
verification_score
verification_status
verification_reasons

Example:

Property: VST001

Verification Score: 0.90

Status: Verified

Reasons:
✓ Property information verified
✓ Smoke alarm available
✓ Carbon monoxide alarm available
Current Dataset

The verification system works with the Vistara demo property dataset.

The dataset contains property information and verification-related fields such as:

property_id
property_name
verified
smoke_alarm
carbon_monoxide_alarm

The dataset is synthetic/demo data created for the INNOVERSE prototype.

Future Improvements

Future versions can include:

Property photo verification
Image-based property checks
Duplicate property detection
Metadata consistency checks
Document verification
Fraud/risk detection
Human review for uncertain cases
Machine learning-based verification
Important Scope

This verification system is for property/stay verification.

It does not perform guest identity verification or require guests to upload identity documents to the Vistara website.

Project Role

The verification module is part of Vistara's Smart Trust & Verification capability.

It works alongside:

Smart Recommendation
Stay Search
Explore

The goal is to help users understand whether a property has passed the available verification checks before booking.