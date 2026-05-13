import type { Express, Request, Response } from 'express';
import { getModuleManifest } from '../controllers/module.controller';
import { requireAuth } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { listEmployees, createEmployee } from '../controllers/core/employee.controller';
import { listDepartments, createDepartment } from '../controllers/core/department.controller';
import { listAttendance, checkIn, checkOut } from '../controllers/core/attendance.controller';
import { getDashboard } from '../controllers/core/dashboard.controller';

export function registerRoutes(app: Express): void {
  app.get('/health', (_req: Request, res: Response) => res.json({ status: 'ok', service: 'aems-api' }));

  app.get('/api/v1/modules/manifest', requireAuth, requirePermission('module:read'), getModuleManifest);
  app.get('/api/v1/core/dashboard', requireAuth, requirePermission('analytics:read'), getDashboard);

  app.get('/api/v1/core/employees', requireAuth, requirePermission('user:manage'), listEmployees);
  app.post('/api/v1/core/employees', requireAuth, requirePermission('user:manage'), createEmployee);

  app.get('/api/v1/core/departments', requireAuth, requirePermission('user:manage'), listDepartments);
  app.post('/api/v1/core/departments', requireAuth, requirePermission('user:manage'), createDepartment);

  app.get('/api/v1/core/attendance', requireAuth, requirePermission('analytics:read'), listAttendance);
  app.post('/api/v1/core/attendance/check-in', requireAuth, requirePermission('user:manage'), checkIn);
  app.post('/api/v1/core/attendance/check-out', requireAuth, requirePermission('user:manage'), checkOut);
}
