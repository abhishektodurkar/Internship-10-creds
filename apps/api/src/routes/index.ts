import type { Express, Request, Response } from 'express';
import { getModuleManifest } from '../controllers/module.controller';
import { requireAuth } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { listEmployees, createEmployee } from '../controllers/core/employee.controller';
import { listDepartments, createDepartment } from '../controllers/core/department.controller';
import { listAttendance, checkIn, checkOut } from '../controllers/core/attendance.controller';
import { getDashboard } from '../controllers/core/dashboard.controller';
import { listProductionBatches, createProductionBatch, listMachineLogs, createMachineLog } from '../controllers/industry/manufacturing.controller';
import { listShipments, createShipment } from '../controllers/industry/logistics.controller';
import { listInventory, createInventory } from '../controllers/industry/retail.controller';

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

  app.get('/api/v1/manufacturing/batches', requireAuth, requirePermission('manufacturing:manage'), listProductionBatches);
  app.post('/api/v1/manufacturing/batches', requireAuth, requirePermission('manufacturing:manage'), createProductionBatch);
  app.get('/api/v1/manufacturing/machine-logs', requireAuth, requirePermission('manufacturing:manage'), listMachineLogs);
  app.post('/api/v1/manufacturing/machine-logs', requireAuth, requirePermission('manufacturing:manage'), createMachineLog);

  app.get('/api/v1/logistics/shipments', requireAuth, requirePermission('logistics:manage'), listShipments);
  app.post('/api/v1/logistics/shipments', requireAuth, requirePermission('logistics:manage'), createShipment);

  app.get('/api/v1/retail/inventory', requireAuth, requirePermission('retail:manage'), listInventory);
  app.post('/api/v1/retail/inventory', requireAuth, requirePermission('retail:manage'), createInventory);
}
