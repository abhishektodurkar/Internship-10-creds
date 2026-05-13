import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { AppError } from '../../utils/app-error';
import { RetailService } from '../../services/industry/retail.service';
import { inventoryCreateSchema } from '../../validators/industry/retail.validator';
const service = new RetailService();
export async function listInventory(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.json(await service.listInventory(req.auth.companyId, req.query.search as string|undefined)); }
export async function createInventory(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.status(201).json(await service.createInventory(req.auth.companyId, inventoryCreateSchema.parse(req.body))); }
