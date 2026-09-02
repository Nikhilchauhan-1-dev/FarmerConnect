# KisanSetu — Architecture

**Source of truth:** `KISANSETU_CONTEXT.md` at the repository root. Read it before making architectural changes.

## Phase 0 architecture

```text
                    KISANSETU
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
     Next.js Web    Node.js API   Python AI
          │             │             │
          │             ▼             │
          │        PostgreSQL ◄───────┘
          │
          ├── Farmer/FPO UI
          ├── Buyer UI
          ├── Transporter UI
          └── Admin UI
```

- **apps/web:** Next.js/TypeScript frontend with role-based route groups.
- **apps/api:** Node.js/Express/TypeScript REST API and Prisma data-access layer. The Node API is the application backend and controls persistence.
- **apps/ai:** Python/FastAPI service for demand forecasting, price intelligence, smart matching, and route optimization. It is computational/stateless with respect to PostgreSQL.
- **PostgreSQL:** persistent application data, accessed through Prisma from the Node API.

## Service boundary

The browser talks to the Node API. The Node API may call the Python AI service. The Python service must not write directly to PostgreSQL.

```text
Browser → Node API → PostgreSQL
                  ↘ Python AI
```

## Architectural rules

1. Keep marketplace, logistics, and AI modules modular.
2. Do not expose AI service endpoints directly to the browser for business workflows.
3. Keep external providers (maps, payments, notifications) behind service abstractions where practical.
4. Validate and authorize requests server-side.
5. Prefer incremental changes; do not rewrite unrelated modules.
