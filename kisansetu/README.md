# KisanSetu

AI-powered farm-to-market platform connecting farmers/FPOs directly with
consumers and bulk buyers — SIH 2026, Problem Statement 26033.

> **Foundation build.** This repo currently contains only the project
> skeleton: folder structure, tooling, Docker Compose for PostgreSQL, and
> health-check endpoints for all three apps. No business features
> (auth, marketplace, offers, orders, logistics, AI models, payments)
> are implemented yet — see `docs/` and `KISANSETU_CONTEXT.md` for the full project specification
> and what comes next.

## Stack

| Layer    | Tech |
|----------|------|
| Web      | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| API      | Node.js, Express, TypeScript, Prisma ORM |
| AI       | Python, FastAPI |
| Database | PostgreSQL 16 (via Docker Compose) |
| Monorepo | pnpm workspaces |

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`corepack enable` will provide this automatically)
- Python ≥ 3.11
- Docker + Docker Compose

## First-time setup

```bash
# 1. Install Node dependencies for web + api + shared packages
pnpm install

# 2. Copy environment templates
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp apps/ai/.env.example apps/ai/.env

# 3. Start PostgreSQL
docker compose up -d postgres

# 4. Generate the Prisma client (schema is connection-only for now)
pnpm --filter @kisansetu/api prisma:generate

# 5. Set up the Python AI service's virtual environment
cd apps/ai
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cd ../..
```

## Running each app independently

```bash
# Web (http://localhost:3000)
pnpm --filter @kisansetu/web dev

# API (http://localhost:4000)
pnpm --filter @kisansetu/api dev

# AI service (http://localhost:8000)
cd apps/ai && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000
```

Or use the root scripts: `pnpm dev:web`, `pnpm dev:api`, `pnpm dev:ai`.

## Verifying the foundation works

```bash
# API liveness
curl http://localhost:4000/health

# API readiness (confirms it can reach PostgreSQL)
curl http://localhost:4000/health/db

# AI service liveness
curl http://localhost:8000/health
```

`apps/web` at `http://localhost:3000` should render a plain "KisanSetu"
placeholder page.

## Repository structure

```text
kisansetu/
├── apps/
│   ├── web/    # Next.js frontend (role-based routes, currently empty shells)
│   ├── api/    # Express API + Prisma (health check only so far)
│   └── ai/     # FastAPI AI service (health check only so far)
├── packages/
│   ├── types/       # Shared TypeScript types (empty — populated with schema)
│   ├── validation/  # Shared Zod schemas (empty)
│   └── ui/          # Shared UI components (empty)
├── docs/       # architecture.md, api.md, database.md
├── docker-compose.yml
└── pnpm-workspace.yaml
```

## AI coding agent instruction

**Before changing architecture, database models, API contracts, or major modules, read `KISANSETU_CONTEXT.md` completely.** It is the project source of truth. Make bounded changes, preserve existing functionality, and do not invent unrelated architecture.

## Project principles (see full spec for details)

- Farmer-first, demand-driven, transparent about pricing/costs/earnings.
- AI must solve real problems — no feature is labeled "AI" unless it's a
  real model/optimization algorithm, or is clearly labeled as
  demo/simulated.
- Python AI services never write to PostgreSQL directly; they return
  results to the Node API, which decides what gets persisted.
- Build incrementally — one bounded module at a time, following the
  order in spec section 25.

## What's next

Per `KISANSETU_CONTEXT.md`, the next task is:
**design and implement the complete Prisma schema**, then run the
migration → seed data → authentication → role-based access →
farmer marketplace sequence.
