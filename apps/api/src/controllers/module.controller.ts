import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { ModuleService } from '../services/module.service';
import { AppError } from '../utils/app-error';

const moduleService = new ModuleService();
export async function getModuleManifest(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.auth) throw new AppError(401, 'Unauthorized');
  const data = await moduleService.getModuleManifest(req.auth.companyId, req.auth.roleKey);
  res.json(data);
}
