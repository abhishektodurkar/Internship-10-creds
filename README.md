# Adaptive AI-Powered Enterprise Management System (AEMS)

Production-grade monorepo foundation for a multi-tenant enterprise SaaS ERP.

## Workspace Layout
- `apps/web` - React + Vite + TypeScript frontend (dynamic module-driven shell)
- `apps/api` - Express + TypeScript backend (tenant-aware module manifest + RBAC middleware)
- `apps/ai-service` - FastAPI AI service scaffold (LangChain + Chroma + Ollama dependencies)

## Prerequisites
- Node.js 20+
- pnpm 10+
- PostgreSQL 15+
- Python 3.10+

## Setup
```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/ai-service/.env.example apps/ai-service/.env
```

## Database bootstrap
```bash
pnpm --filter @aems/api prisma:generate
pnpm --filter @aems/api prisma:migrate
```

## Run web + API
```bash
pnpm dev
```

## Run AI service
```bash
cd apps/ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.api.main:app --reload --port 8000
```

## Development notes
- `GET /api/v1/modules/manifest` is protected by JWT + RBAC middleware and returns enabled module configuration for the authenticated tenant.
- Set `VITE_DEV_JWT_TOKEN` in `apps/web/.env` to let the frontend fetch and render the module sidebar during local development.
