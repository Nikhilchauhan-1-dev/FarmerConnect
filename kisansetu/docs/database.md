# KisanSetu — Database

**Source of truth:** `KISANSETU_CONTEXT.md`.

The current foundation intentionally contains only the Prisma generator and PostgreSQL datasource. Business models are added as a dedicated next phase after the schema is reviewed.

Planned domains include:

- Identity and roles: users, farmer profiles, FPOs, FPO membership
- Marketplace: crops/listings, buyer requirements, offers
- Commerce: orders, payments, reviews
- Logistics: vehicles, shipments, route plans
- Intelligence: demand history/forecasts and price history
- Platform: notifications

When implementing the schema, use explicit relations, enums for controlled states/roles, sensible indexes for marketplace searches and foreign keys, timestamps, and database constraints where supported. Avoid premature over-normalization or storing duplicated derived values unless there is a clear reason.
