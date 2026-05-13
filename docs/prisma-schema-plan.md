# Prisma Schema Plan (Initial)

Core tenant-aware tables:

- `users`
- `roles`
- `permissions`
- `role_permissions`
- `companies`
- `company_modules`
- `departments`
- `employees`
- `attendance`
- `documents`
- `notifications`
- `audit_logs`
- `analytics`
- `ai_chat_history`

Industry extension tables:

- Manufacturing: `production_batches`, `machine_logs`, `reels`, `defects`
- Shipping: `shipments`, `dispatches`, `vehicles`, `drivers`, `routes`
- Retail: `inventory`, `pos_transactions`, `warehouse`, `returns`

Indexing guidance:

- composite indexes on `(company_id, created_at)`
- unique constraints with tenant scope where applicable
- soft delete fields for auditability
