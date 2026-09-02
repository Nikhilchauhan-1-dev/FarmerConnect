# KisanSetu — API Documentation

Foundation phase: only a health check exists.

## `GET /health`
Liveness check. Returns `{ status, service, timestamp }`.

## `GET /health/db`
Readiness check — verifies PostgreSQL connectivity via Prisma.
Returns `200` with `{ status: "ok", database: "connected" }` when the
database is reachable, or `503` with `{ status: "unavailable", database: "disconnected" }`
otherwise.

Business endpoints (auth, marketplace, offers, orders, logistics,
forecasting, etc.) are documented here as each module is implemented.
