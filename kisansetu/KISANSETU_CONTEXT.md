# KisanSetu --- SIH 2026 Problem Statement 26033

## AI Coding Agent Context / Project Specification

> **Purpose:** This document is the source-of-truth context for AI
> coding agents working on the KisanSetu project. Read this before
> implementing, modifying, or refactoring code.

------------------------------------------------------------------------

# 1. Problem Statement

### Smart India Hackathon 2026

-   **Problem Statement ID:** 26033
-   **Title:** Multiple intermediaries reduce farmers earnings and
    increase consumer prices.
-   **Organization:** Ministry of Consumer Affairs, Food & Public
    Distribution
-   **Department:** Department of Consumer Affairs (DoCA)
-   **Category:** Software
-   **Theme:** Agriculture, FoodTech & Rural Development

### Official Expected Solution

The problem statement expects a digital marketplace that:

1.  Connects farmers/FPOs directly with consumers and bulk buyers.
2.  Provides logistics support.
3.  Uses AI for demand forecasting.
4.  Uses AI for route optimization.

KisanSetu must directly address all four areas.

------------------------------------------------------------------------

# 2. Product Vision

## KisanSetu

**KisanSetu is an AI-powered farm-to-market platform connecting
farmers/FPOs directly with consumers and bulk buyers while providing
transparent price intelligence, demand forecasting, smart matching, and
optimized logistics.**

The system should reduce dependence on unnecessary intermediaries and
improve the share of the final sale value reaching farmers while also
helping buyers obtain produce at more transparent prices.

### Traditional flow

``` text
Farmer
  ↓
Local Agent
  ↓
Wholesaler
  ↓
Distributor
  ↓
Retailer
  ↓
Consumer
```

### KisanSetu target flow

``` text
Farmer / FPO
      ↓
  KisanSetu
      ↓
Consumer / Bulk Buyer
      ↓
AI-optimized Logistics
```

KisanSetu does not claim that every physical intermediary can always be
eliminated. The goal is to make the supply chain more direct,
transparent, competitive, and efficient.

------------------------------------------------------------------------

# 3. Core Product Principles

1.  **Farmer-first:** The farmer should clearly understand prices,
    offers, costs, and expected earnings.
2.  **Demand-driven:** Buyer demand should influence marketplace
    recommendations and farmer decisions.
3.  **Transparency:** Show price, logistics cost, platform cost, and
    estimated farmer net earnings.
4.  **AI must solve real problems:** AI should be used for demand
    forecasting, route optimization, smart matching, and optionally
    price intelligence/assistant functionality.
5.  **Simple farmer UX:** Interfaces should be usable by people with
    limited technical literacy.
6.  **Role separation:** Farmer, FPO, Buyer, Transporter, and Admin have
    different permissions.
7.  **Modular architecture:** Avoid tightly coupling marketplace,
    logistics, and AI services.
8.  **Demo reliability:** SIH prototype flows must work with seeded/demo
    data even if external integrations are unavailable.
9.  **No fake AI:** Do not label a hard-coded rule or random number as
    AI. Use a real baseline model/optimization algorithm or clearly
    label simulated/demo behavior.
10. **Build incrementally:** Never rewrite the entire project for a
    small feature.

------------------------------------------------------------------------

# 4. Primary User Roles

## Farmer

Can:

-   Register/login.
-   Create and manage produce listings.
-   Upload crop/product information and photos.
-   View current/fair price estimates.
-   View buyer offers.
-   Accept/reject offers.
-   View orders.
-   Track deliveries.
-   View earnings.
-   View demand forecasts.
-   Use the AI assistant.
-   View notifications.

## FPO

An FPO can represent/aggregate multiple farmers.

Can:

-   Maintain FPO profile.
-   Manage member farmers.
-   Create/manage aggregated produce listings.
-   Respond to buyer requirements.
-   View orders and analytics.

## Buyer

Examples:

-   Retail stores
-   Restaurants
-   Hotels
-   Supermarkets
-   Food processors
-   Institutional buyers
-   Bulk purchasers

Can:

-   Search available produce.
-   Filter listings.
-   Post requirements.
-   Make offers.
-   Accept offers.
-   Manage orders.
-   Track deliveries.
-   View suppliers.

## Transporter

Can:

-   Register vehicles.
-   Define vehicle capacity.
-   Define cost/km.
-   Set availability.
-   View assigned shipments.
-   View optimized routes.
-   Update delivery status.

## Admin

Can:

-   View system statistics.
-   Manage users.
-   Manage listings/orders.
-   Verify farmers/FPOs/buyers/transporters.
-   View marketplace analytics.
-   View logistics analytics.
-   View AI analytics.
-   Manage/demo seed data.

------------------------------------------------------------------------

# 5. Major Product Modules

The system should contain these modules:

``` text
1. Authentication & Authorization
2. Farmer/FPO Management
3. Buyer Management
4. Produce Marketplace
5. Buyer Requirements
6. Offers & Negotiation
7. Orders
8. Logistics
9. Transporters & Vehicles
10. Route Optimization
11. Demand Forecasting
12. Price Intelligence
13. Smart Farmer-Buyer Matching
14. Notifications
15. Payments (initially mock)
16. Reviews & Trust
17. AI Farmer Assistant
18. Admin Analytics
```

------------------------------------------------------------------------

# 6. High-Level Architecture

``` text
                         KISANSETU
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       Next.js Web       Node.js API      Python AI
       Frontend          Backend          Services
             │               │                │
             │               ▼                │
             │          PostgreSQL ◄──────────┘
             │
             ├── Farmer UI
             ├── Buyer UI
             ├── Transporter UI
             └── Admin UI
```

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   TanStack Query
-   Zod

## Backend

-   Node.js
-   Express
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   JWT/session authentication
-   Zod validation

## AI Service

-   Python
-   FastAPI
-   Scikit-learn / XGBoost or suitable forecasting model
-   OR-Tools or suitable route optimization library

## Maps

Use Google Maps, Mapbox, or OpenStreetMap-based services. Keep the map
integration behind a service abstraction so providers can be swapped.

------------------------------------------------------------------------

# 7. Service Boundaries

The Node.js API is the main application backend.

The Python service should handle computational AI/optimization tasks.

``` text
Next.js
   │
   │ REST API
   ▼
Node.js API
   │
   ├── PostgreSQL
   │
   └── Python AI Service
           ├── Demand Forecast
           ├── Price Prediction
           ├── Smart Matching
           └── Route Optimization
```

## Important rule

**Python AI services must not directly modify PostgreSQL.**

AI services calculate predictions/optimization results and return them
to the Node API. The Node API decides what gets persisted.

------------------------------------------------------------------------

# 8. Monorepo Structure

Target structure:

``` text
kisansetu/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   │
│   │   │   ├── farmer/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── produce/
│   │   │   │   ├── offers/
│   │   │   │   ├── orders/
│   │   │   │   ├── earnings/
│   │   │   │   ├── forecasts/
│   │   │   │   └── assistant/
│   │   │   │
│   │   │   ├── buyer/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── marketplace/
│   │   │   │   ├── requirements/
│   │   │   │   ├── offers/
│   │   │   │   └── orders/
│   │   │   │
│   │   │   ├── transporter/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── vehicles/
│   │   │   │   ├── deliveries/
│   │   │   │   └── routes/
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── users/
│   │   │   │   ├── orders/
│   │   │   │   ├── analytics/
│   │   │   │   └── ai/
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   └── package.json
│   │
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── validators/
│   │   │   ├── utils/
│   │   │   └── server.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   └── ai/
│       ├── app/
│       │   ├── main.py
│       │   ├── api/
│       │   │   ├── demand.py
│       │   │   ├── price.py
│       │   │   ├── matching.py
│       │   │   └── routes.py
│       │   ├── models/
│       │   │   ├── demand_model.py
│       │   │   ├── price_model.py
│       │   │   └── matching_model.py
│       │   ├── services/
│       │   │   ├── demand_service.py
│       │   │   ├── price_service.py
│       │   │   ├── matching_service.py
│       │   │   └── route_service.py
│       │   ├── schemas/
│       │   └── utils/
│       ├── data/
│       │   ├── raw/
│       │   └── processed/
│       ├── notebooks/
│       ├── tests/
│       └── requirements.txt
│
├── packages/
│   ├── types/
│   ├── validation/
│   └── ui/
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── database.md
│
├── .env.example
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# 9. Database Model

Use PostgreSQL with Prisma.

## Users

``` text
users
-----
id
name
phone
email
password_hash
role
language
latitude
longitude
address
city
district
state
created_at
updated_at
```

Roles:

``` text
FARMER
FPO
BUYER
TRANSPORTER
ADMIN
```

## Farmer Profiles

``` text
farmer_profiles
---------------
id
user_id
farm_size
experience_years
verification_status
created_at
updated_at
```

## FPOs

``` text
fpos
----
id
name
registration_number
description
phone
email
address
city
district
state
latitude
longitude
verification_status
created_at
updated_at
```

## FPO Members

``` text
fpo_members
-----------
id
fpo_id
farmer_id
joined_at
```

## Produce Listings

``` text
produce_listings
----------------
id
seller_id
fpo_id
crop_name
category
quantity
unit
quality_grade
asking_price
harvest_date
available_from
available_until
latitude
longitude
description
image_url
status
created_at
updated_at
```

## Buyer Requirements

``` text
buyer_requirements
------------------
id
buyer_id
crop_name
quantity
unit
quality_grade
max_price
required_date
delivery_address
latitude
longitude
status
created_at
updated_at
```

## Offers

``` text
offers
------
id
listing_id
buyer_id
quantity
price_per_unit
message
status
expires_at
created_at
updated_at
```

## Orders

``` text
orders
------
id
offer_id
farmer_id
buyer_id
listing_id
quantity
price_per_unit
total_amount
delivery_address
status
ordered_at
completed_at
```

## Vehicles

``` text
vehicles
--------
id
transporter_id
vehicle_number
vehicle_type
capacity
capacity_unit
cost_per_km
current_latitude
current_longitude
availability
created_at
updated_at
```

## Shipments

``` text
shipments
---------
id
order_id
vehicle_id
transporter_id
pickup_latitude
pickup_longitude
delivery_latitude
delivery_longitude
pickup_time
estimated_delivery
actual_delivery
distance_km
estimated_cost
actual_cost
status
created_at
updated_at
```

## Route Plans

``` text
route_plans
-----------
id
shipment_id
algorithm
total_distance
estimated_cost
estimated_duration
route_data
created_at
```

`route_data` may be JSON containing ordered pickup/drop-off stops.

## Demand History

``` text
demand_history
--------------
id
crop_name
location
date
quantity_demanded
average_price
source
created_at
```

## Demand Forecasts

``` text
demand_forecasts
----------------
id
crop_name
location
forecast_date
predicted_quantity
confidence
model_version
created_at
```

## Price History

``` text
price_history
-------------
id
crop_name
location
quality_grade
price
date
source
```

## Payments

``` text
payments
--------
id
order_id
amount
payment_method
transaction_reference
status
paid_at
created_at
```

Initially use a mock payment system for the SIH prototype.

## Reviews

``` text
reviews
-------
id
order_id
reviewer_id
reviewee_id
rating
comment
created_at
```

## Notifications

``` text
notifications
-------------
id
user_id
title
message
type
is_read
created_at
```

------------------------------------------------------------------------

# 10. Database Relationships

``` text
USER
 ├── FARMER_PROFILE
 ├── FPO
 ├── BUYER
 └── TRANSPORTER

FPO
 └── FPO_MEMBER
       └── FARMER

FARMER/FPO
 └── PRODUCE_LISTING

BUYER
 └── BUYER_REQUIREMENT

PRODUCE_LISTING + BUYER
 └── OFFER
       └── ORDER
             ├── PAYMENT
             ├── SHIPMENT
             │     ├── VEHICLE
             │     └── ROUTE_PLAN
             └── REVIEW

DEMAND_HISTORY
 └── DEMAND_FORECAST

PRICE_HISTORY
 └── PRICE INTELLIGENCE

ORDER + LOCATIONS
 └── ROUTE OPTIMIZER
```

------------------------------------------------------------------------

# 11. API Design

Base path:

``` text
/api
```

## Authentication

``` text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Farmers

``` text
GET /api/farmers/:id
PUT /api/farmers/:id
GET /api/farmers/:id/earnings
```

## Produce

``` text
POST   /api/produce
GET    /api/produce
GET    /api/produce/:id
PUT    /api/produce/:id
DELETE /api/produce/:id
```

## Buyer Requirements

``` text
POST   /api/requirements
GET    /api/requirements
GET    /api/requirements/:id
PUT    /api/requirements/:id
DELETE /api/requirements/:id
```

## Offers

``` text
POST /api/offers
GET  /api/offers
PUT  /api/offers/:id/accept
PUT  /api/offers/:id/reject
```

## Orders

``` text
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
PUT  /api/orders/:id/status
```

## Logistics

``` text
POST /api/vehicles
GET  /api/vehicles
POST /api/shipments
GET  /api/shipments/:id
```

## AI

``` text
POST /api/ai/demand/forecast
POST /api/ai/price/predict
POST /api/ai/matching/score
POST /api/ai/routes/optimize
```

------------------------------------------------------------------------

# 12. AI Features

## 12.1 Demand Forecasting --- REQUIRED

The system should forecast future demand based on historical data.

Potential features:

-   Crop
-   Location
-   Date
-   Historical demand
-   Historical price
-   Season
-   Day of week
-   Festival/holiday indicator
-   Weather data if available

Output:

``` json
{
  "crop": "Tomato",
  "location": "Jaipur",
  "forecast": [
    {
      "date": "2026-09-03",
      "demand": 4720
    }
  ]
}
```

Start with a robust baseline such as XGBoost/Random Forest or an
appropriate time-series approach. Do not over-engineer before the
end-to-end feature works.

------------------------------------------------------------------------

# 13. Route Optimization --- REQUIRED

Treat route planning as an optimization problem.

Inputs:

-   Pickup locations
-   Buyer delivery location
-   Produce quantities
-   Vehicle capacity
-   Vehicle location
-   Delivery deadline
-   Distance/travel time
-   Transport cost

Objective:

> Minimize total transportation distance/cost while respecting capacity
> and delivery constraints.

Vehicle Routing Problem (VRP) or a suitable variant can be used.

OR-Tools is an appropriate implementation option.

Output should include:

``` text
Optimized route
Total distance
Estimated duration
Estimated cost
Ordered pickup/drop stops
```

------------------------------------------------------------------------

# 14. Smart Matching

Match farmers/FPO listings to buyer requirements.

Example scoring:

``` text
Score =
0.30 × PriceScore
+ 0.25 × DistanceScore
+ 0.20 × QuantityScore
+ 0.15 × QualityScore
+ 0.10 × DateScore
```

The exact weights can be tuned.

Potential additional factor:

-   Buyer/farmer reliability score from completed orders and reviews.

Example output:

``` text
Buyer A → 94%
Buyer B → 87%
Buyer C → 72%
```

------------------------------------------------------------------------

# 15. Price Intelligence

Recommended additional feature.

Show:

-   Current local price
-   Historical price
-   Current buyer offers
-   Demand level
-   Estimated fair price
-   Estimated net farmer earnings

Example:

``` text
Tomato — Grade A

Local market: ₹27/kg
Current offers: ₹29–32/kg
AI fair price: ₹30.50/kg

Expected net after logistics:
₹29.20/kg
```

Never present an AI price prediction as guaranteed. Use language such as
"estimated", "suggested", or "fair-price range".

------------------------------------------------------------------------

# 16. AI Farmer Assistant

Optional but highly recommended for demo quality.

The assistant should be connected to actual KisanSetu functionality.

Examples:

``` text
"Mere tamatar ka kya bhav mil raha hai?"

"Who is offering the highest price?"

"Which buyer is closest?"

"When should I sell?"

"How much demand is expected next week?"

"Where is my order?"
```

The assistant should use backend tools/data rather than behaving like a
generic chatbot.

------------------------------------------------------------------------

# 17. Marketplace Workflow

## Farmer listing

``` text
Farmer
  ↓
Add produce
  ↓
System calculates estimated price
  ↓
Matching buyers found
  ↓
Buyer offers
  ↓
Farmer accepts offer
  ↓
Order created
```

## Buyer-driven workflow

``` text
Buyer
  ↓
Post requirement
  ↓
Matching engine
  ↓
Compatible farmers/FPOs
  ↓
Offers
  ↓
Buyer accepts
  ↓
Order
```

------------------------------------------------------------------------

# 18. Logistics Workflow

``` text
Order confirmed
      ↓
Find suitable transporters
      ↓
Check capacity + availability
      ↓
Calculate routes
      ↓
Optimize route
      ↓
Assign transporter
      ↓
Pickup
      ↓
In transit
      ↓
Delivery
      ↓
Order completed
```

------------------------------------------------------------------------

# 19. Farmer Net Earnings

This is a key product metric.

Always distinguish between:

**Gross sale value**

and

**Net farmer earnings**

Example:

``` text
Sale value:          ₹16,000
Transportation:     -₹1,000
Platform/handling:    -₹200
--------------------------------
Farmer net:          ₹14,800
```

The exact fee structure should be configurable and clearly displayed.

------------------------------------------------------------------------

# 20. SIH Demo Story

The ideal demo should tell one continuous story.

### Step 1 --- Farmer

Farmer has:

``` text
500 kg Tomato
Grade A
```

### Step 2 --- AI price

System estimates:

``` text
Fair price: ₹30/kg
```

### Step 3 --- AI demand

System predicts:

``` text
Demand expected to rise 12% over next 7 days.
```

### Step 4 --- Buyers

Offers appear:

``` text
Hotel A       ₹32/kg
FreshMart     ₹31/kg
Restaurant B  ₹30/kg
```

### Step 5 --- Farmer accepts

Order is created.

### Step 6 --- Logistics

System finds transport.

### Step 7 --- Route AI

System produces optimized pickup/delivery route.

### Step 8 --- Impact

Show comparison:

``` text
Traditional estimated farmer value: ₹23/kg
KisanSetu estimated net:            ₹30.3/kg

Difference: +₹7.3/kg
```

For 500 kg:

``` text
Additional estimated earning: ₹3,650
```

Any impact numbers used in a demo must be clearly marked as
demo/simulated calculations unless backed by verified real data.

------------------------------------------------------------------------

# 21. Admin Dashboard

Admin should see:

``` text
Farmers
FPOs
Buyers
Transporters

Active listings
Active requirements
Orders
Produce traded

Average farmer price
Average logistics cost
Estimated farmer benefit
Delivery efficiency

Demand forecast accuracy
Route optimization savings
```

Use charts and maps.

------------------------------------------------------------------------

# 22. Security

All protected API routes must implement:

``` text
Request
  ↓
Authentication
  ↓
JWT/session verification
  ↓
User identification
  ↓
Role authorization
  ↓
Resource ownership/permission check
  ↓
Controller
```

Examples:

-   Farmer cannot access admin endpoints.
-   Buyer cannot edit another buyer's requirement.
-   Farmer cannot edit another farmer's listing.
-   Transporter cannot modify orders they are not assigned to.
-   Admin has elevated permissions.

Never trust a user-provided role or user ID without server-side
verification.

------------------------------------------------------------------------

# 23. Validation

Use Zod or equivalent validation at API boundaries.

Validate:

-   Required fields
-   Quantity \> 0
-   Price \>= 0
-   Valid dates
-   Valid coordinates
-   Valid enum values
-   Ownership of resources
-   Allowed state transitions

Never rely only on frontend validation.

------------------------------------------------------------------------

# 24. Order State Machine

Use controlled transitions.

``` text
CONFIRMED
   ↓
PROCESSING
   ↓
READY_FOR_PICKUP
   ↓
PICKED_UP
   ↓
IN_TRANSIT
   ↓
DELIVERED
```

Cancellation rules should prevent invalid transitions.

Do not allow arbitrary status changes from the client.

------------------------------------------------------------------------

# 25. Development Strategy

Build in this exact order:

``` text
1. Repository + tooling
2. PostgreSQL + Prisma
3. Authentication + role authorization
4. Farmer/FPO module
5. Buyer module
6. Marketplace
7. Offers
8. Orders
9. Transporters + vehicles
10. Shipments
11. Maps
12. Route optimization
13. Demand forecasting
14. Price intelligence
15. Smart matching
16. AI assistant
17. Notifications
18. Admin analytics
19. Testing
20. Deployment
21. SIH demo polish
```

Do not build all AI features first.

------------------------------------------------------------------------

# 26. Vibe Coding Rules

When using an AI coding agent:

### Rule 1 --- Work incrementally

Never ask:

> "Build the entire KisanSetu application."

Instead give one bounded task.

### Rule 2 --- Protect existing functionality

Every implementation prompt should say:

> Do not modify unrelated modules. Preserve existing functionality.

### Rule 3 --- Inspect before editing

The agent should inspect relevant existing files before making changes.

### Rule 4 --- Use existing patterns

If a service/controller/validator pattern already exists, follow it
rather than creating a new architecture.

### Rule 5 --- No unnecessary dependencies

Only add a package when there is a clear requirement.

### Rule 6 --- Type safety

Avoid `any` unless there is a strong reason.

### Rule 7 --- No hard-coded business data

Use database/configuration/seed data.

### Rule 8 --- No fake AI

If a feature is currently simulated, explicitly label it as
demo/simulation.

### Rule 9 --- Test every module

After implementing a feature:

1.  Run type checks.
2.  Run lint.
3.  Run tests.
4.  Run the application.
5.  Test the relevant API/UI flow.

### Rule 10 --- Small commits

Prefer commits such as:

``` text
feat(auth): add role-based authentication
feat(marketplace): add produce listings
feat(offers): add buyer offers
feat(logistics): add shipment management
feat(ai): add demand forecast endpoint
```

------------------------------------------------------------------------

# 27. First Coding-Agent Task

The first task should ONLY establish the foundation.

Use this prompt:

``` text
Read the KisanSetu project specification in this file before making any changes.

Create the KisanSetu monorepo foundation using:

- Next.js + TypeScript for the web application
- Node.js + Express + TypeScript for the API
- Python + FastAPI for AI services
- PostgreSQL
- Prisma ORM
- pnpm workspaces
- Docker Compose for PostgreSQL

Create the project folder structure described in the specification.

Set up:
1. pnpm workspace configuration
2. Next.js application
3. Express TypeScript API
4. FastAPI AI application
5. PostgreSQL Docker Compose service
6. Environment variable templates
7. TypeScript/Python configuration
8. Basic health-check endpoints
9. Prisma initialization
10. README with setup instructions

Do NOT implement marketplace, authentication, AI models, logistics, payments, or other business features yet.

Do NOT create fake business logic.

All three applications must be able to start independently.

The API should expose a simple health endpoint and verify database connectivity.

Before finishing:
- Run type checks
- Run lint if configured
- Verify the Next.js app starts
- Verify the Node API starts
- Verify the FastAPI service starts
- Verify PostgreSQL connectivity
- Report any remaining setup issues

Do not modify unrelated files.
```

------------------------------------------------------------------------

# 28. What Comes Immediately After Foundation

Once the foundation works, the next task is:

**Design and implement the complete Prisma schema from this
specification.**

Then:

``` text
Prisma schema
     ↓
Migration
     ↓
Seed data
     ↓
Authentication
     ↓
Role-based access
     ↓
Farmer marketplace
```

The database schema should become the contract that subsequent
AI-generated modules follow.

------------------------------------------------------------------------

# 29. Non-Goals for the Initial Prototype

Do NOT spend early development time on:

-   Real payment settlement
-   Complex blockchain
-   Full production-grade KYC
-   Custom mobile apps for every role
-   Advanced computer vision
-   Overly complex deep learning
-   Nationwide logistics integration
-   Building a custom map engine
-   Microservices for every feature

First make the core SIH workflow reliable.

------------------------------------------------------------------------

# 30. Definition of Done

The SIH prototype is considered successful when a judge can see this
complete flow:

``` text
Farmer/FPO
    ↓
Lists produce
    ↓
AI price intelligence
    ↓
Buyer discovers produce
    ↓
Offer/requirement matching
    ↓
Buyer + farmer complete order
    ↓
Transporter assigned
    ↓
AI route optimization
    ↓
Delivery
    ↓
Farmer earnings shown
    ↓
AI demand forecast informs future supply
```

The system should demonstrate that it addresses the official problem
statement rather than being only a generic marketplace.

------------------------------------------------------------------------

# 31. Product North Star

The most important metric for KisanSetu is:

> **How much more value can reach the farmer while maintaining a viable
> price for the buyer and reducing avoidable logistics costs?**

Every major feature should connect back to at least one of:

-   Higher farmer earnings
-   Lower consumer/buyer price
-   Lower logistics cost
-   Better demand planning
-   Reduced wastage
-   Greater supply-chain transparency
-   More efficient matching

If a proposed feature does not contribute to one of these outcomes,
question whether it belongs in the SIH MVP.
