# RBAC Permission Matrix (Initial)

| Role | Example Permissions |
|---|---|
| super_admin | `*` |
| company_admin | `company.manage`, `users.manage`, `modules.manage`, `analytics.read` |
| hr_manager | `employees.read`, `employees.write`, `payroll.manage`, `leave.approve` |
| attendance_manager | `attendance.read`, `attendance.write`, `shifts.manage` |
| production_manager | `production.read`, `production.write`, `machines.read`, `wastage.read` |
| logistics_manager | `shipments.read`, `dispatch.write`, `fleet.manage`, `routes.read` |
| warehouse_manager | `warehouse.read`, `inventory.write`, `suppliers.read` |
| worker | `self.attendance.read`, `tasks.read` |
| employee | `self.profile.read`, `self.leave.write` |
| viewer | `dashboard.read`, `reports.read` |

> This is a bootstrap matrix. Production rollout should use database-managed permission sets.
