# AEMS Architecture Blueprint

## 1) Core Architecture

AEMS uses a **modular engine** pattern:

- Industry + module definitions are stored as metadata.
- Company onboarding assigns enabled modules from industry templates.
- Frontend layout, routes, widgets, and API capability checks are generated from:
  - tenant context
  - role permissions
  - enabled modules

No hardcoded separate apps per industry are required.

## 2) Services

### Frontend (`apps/web`)
- React + Vite + Tailwind + shadcn/ui
- Zustand store for auth, tenant, module state
- Dynamic sidebar and dashboard widget engine
- Route guards via permission checks

### API (`apps/api`)
- Express layered architecture:
  - `routes/`
  - `controllers/`
  - `services/`
  - `repositories/`
- Prisma + PostgreSQL
- Tenant isolation middleware (`x-company-id` + JWT claims)
- RBAC authorization middleware (`requirePermission`)
- Socket.IO for notifications and realtime dashboards

### AI/RAG (`services/ai-rag`)
- FastAPI ingestion + query endpoints
- LangChain pipeline
- ChromaDB vectors partitioned by `company_id`
- Ollama model + `nomic-embed-text`

## 3) Dynamic Module Engine

### Industry Templates
- `corrugated_box_manufacturing`
- `shipping_logistics`
- `retail_warehouse`

Each template points to a module list. Modules have:
- `moduleKey`
- `category`
- `requiredPermissions`
- `navConfig`
- `dashboardWidgets`
- `apiScopes`

### Resolution Flow
1. User logs in.
2. API returns tenant profile and role permissions.
3. Web app resolves `enabledModules` from tenant config.
4. Sidebar/routes/widgets render from module metadata + permission checks.

## 4) RBAC Model

Role definition:

```json
{
  "role": "production_manager",
  "permissions": [
    "production.read",
    "production.write",
    "workers.read",
    "inventory.read"
  ]
}
```

Authorization layers:
- UI route/component guard
- API endpoint guard
- Query-level tenant filters

## 5) Multi-Tenancy Strategy

### Logical isolation
All tenant-bound tables include `company_id`.

### Enforcement
- JWT includes `company_id`, `role_id`
- Middleware validates tenant scope
- Repositories always filter by `company_id`

### RAG isolation
- documents/chunks metadata includes `company_id`
- retrieval filter uses same company scope

## 6) Suggested Backend Domains

Universal domains:
- auth
- companies
- roles_permissions
- employees
- attendance
- hr
- notifications
- analytics
- documents
- ai_assistant
- audit_logs

Industry domains are plug-in style and loaded via module keys.

## 7) Implementation Phases

### Phase 1
- auth + onboarding + RBAC + core schema

### Phase 2
- dynamic module resolver + dynamic dashboard + attendance/employee

### Phase 3
- industry modules (manufacturing, shipping, retail)

### Phase 4
- RAG ingestion/retrieval + AI assistant UI

### Phase 5
- realtime streams + alerts + polish + deployment
