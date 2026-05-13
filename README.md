# AEMS Quick Start (single command)

## Prerequisites
- Node.js 20+
- Python 3.10+
- pnpm (`npm i -g pnpm`)

## Recommended startup (works even if AI dependencies were missing)
```bash
pnpm install
pnpm dev
```

This will:
- prepare local env files
- run Prisma generate + db push
- start API + Web
- auto-install AI Python requirements and start AI service

If you want only API + Web:
```bash
pnpm run dev:webapi
```

## URLs
- Web: http://localhost:5173
- API Health: http://localhost:4000/health
- AI Health: http://localhost:8000/health
