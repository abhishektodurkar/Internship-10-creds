# Adaptive AI-Powered Enterprise Management System (AEMS)

A multi-tenant ERP SaaS monorepo with:
- **API**: Express + Prisma + RBAC + module engine + core/industry workflows
- **Web**: React + Vite + Tailwind + Recharts dashboards + AI chat panel
- **AI Service**: FastAPI + LangChain + ChromaDB + Ollama RAG

## 1) Software to install
1. Node.js 20+
2. pnpm 10+
3. PostgreSQL 15+
4. Python 3.10+
5. Ollama
6. (optional) Docker + Docker Compose

## 2) Install pnpm
```bash
npm install -g pnpm
```

## 3) Clone and install dependencies (repo root)
```bash
pnpm install
```

## 4) Create env files (repo root)
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/ai-service/.env.example apps/ai-service/.env
```

Update values:
- `apps/api/.env`: set `DATABASE_URL`, JWT secrets
- `apps/web/.env`: set `VITE_DEV_JWT_TOKEN` and `VITE_DEV_COMPANY_ID` for local development
- `apps/ai-service/.env`: `OLLAMA_BASE_URL`, `CHROMA_PERSIST_DIR`

## 5) Start PostgreSQL
Local installation or Docker:
```bash
docker run --name aems-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aems -p 5432:5432 -d postgres:15
```

## 6) Create DB schema (repo root)
```bash
pnpm --filter @aems/api prisma:generate
pnpm --filter @aems/api prisma:migrate
```

## 7) Start Ollama and models
```bash
ollama serve
ollama pull nomic-embed-text
ollama pull llama3.1
```

## 8) Run API + Web
```bash
pnpm dev
```
- API: http://localhost:4000
- Web: http://localhost:5173

## 9) Run AI service
From `apps/ai-service`:
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.api.main:app --reload --port 8000
```
AI health: http://localhost:8000/health

## 10) Create first company/admin user
Use Prisma Studio or SQL inserts:
```bash
pnpm --filter @aems/api exec prisma studio
```
Create:
- `Company`
- `Role` (e.g. `company_admin`)
- `User` linked to company and role
- `CompanyModule` rows for enabled modules

Generate JWT token externally using your `JWT_SECRET` and set in `apps/web/.env` as `VITE_DEV_JWT_TOKEN`.

## 11) API testing (examples)
```bash
curl http://localhost:4000/health
curl -H "Authorization: Bearer <token>" http://localhost:4000/api/v1/core/dashboard
curl -H "Authorization: Bearer <token>" http://localhost:4000/api/v1/manufacturing/batches
curl -H "Authorization: Bearer <token>" http://localhost:4000/api/v1/logistics/shipments
curl -H "Authorization: Bearer <token>" "http://localhost:4000/api/v1/retail/inventory?search=SKU"
```

## 12) AI assistant usage
1. Open Web app.
2. In **AI Assistant (RAG)**, upload a company SOP PDF.
3. Ask operational questions.
4. Response includes answer and source citations.

## 13) Docker all-in-one (repo root)
```bash
docker compose up --build
```

## 14) Build for production
```bash
pnpm -r build
```

## 15) Deploy
- API -> Render/Railway/Fly
- Web -> Vercel/Netlify
- DB -> Neon/Render Postgres
- AI service -> Render/Fly/self-hosted VM with Ollama
