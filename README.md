# AEMS Quick Start (single command)

## Prerequisites
- Node.js 20+
- Python 3.10+
- pnpm (`npm i -g pnpm`)

## Run locally
From project root:

```bash
pnpm install
pnpm dev
```

That is all.

`pnpm dev` automatically:
- creates missing `.env` files
- generates Prisma client
- pushes schema to local SQLite DB (`apps/api/prisma/dev.db`)
- starts API on `http://localhost:4000`
- starts Web on `http://localhost:5173`
- starts AI service on `http://localhost:8000`

## URLs
- Web: http://localhost:5173
- API Health: http://localhost:4000/health
- AI Health: http://localhost:8000/health
