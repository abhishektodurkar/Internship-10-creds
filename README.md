# Adaptive AI-Powered Enterprise Management System (AEMS)

AEMS is a modular multi-tenant ERP SaaS platform that dynamically adapts to each company's industry, enabled modules, and role permissions.

## Monorepo Layout

- `apps/web` – React + Vite frontend
- `apps/api` – Node.js + Express + Prisma backend
- `services/ai-rag` – FastAPI + LangChain + ChromaDB RAG service
- `packages/config` – shared config/types/constants
- `docs` – architecture, roadmap, data model

## Current Delivery Scope

This initial scaffold delivers:

1. Modular architecture and registry-driven design
2. Industry/module metadata for 3 initial industries
3. RBAC permission matrix design
4. Multi-tenant backend service boundaries
5. Phase-based implementation roadmap

See `docs/architecture.md` for full architecture.
