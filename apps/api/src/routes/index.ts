import type { Express, Request, Response } from 'express';
import { getModuleManifest } from '../controllers/module.controller';
import { requireAuth } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';

export function registerRoutes(app: Express): void {
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'aems-api' });
  });
  app.get('/api/v1/modules/manifest', requireAuth, requirePermission('module:read'), getModuleManifest);
}
