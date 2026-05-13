# Adaptive AI-Powered Enterprise Management System (AEMS)

Phase 1 monorepo scaffold with:
- `apps/web` (React + Vite + TypeScript + Tailwind)
- `apps/api` (Express + TypeScript + Prisma)
- `apps/ai-service` (FastAPI + LangChain + Chroma + Ollama)
- shared packages in `packages/*`

## Quick start

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/ai-service/.env.example apps/ai-service/.env
pnpm dev
```

## Prisma

```bash
pnpm --filter @aems/api prisma:generate
pnpm --filter @aems/api prisma:migrate
```
