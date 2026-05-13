import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { AppError } from '../../utils/app-error';
import { LogisticsService } from '../../services/industry/logistics.service';
import { shipmentCreateSchema } from '../../validators/industry/logistics.validator';
const service = new LogisticsService();
export async function listShipments(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.json(await service.listShipments(req.auth.companyId, req.query.status as string|undefined)); }
export async function createShipment(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.status(201).json(await service.createShipment(req.auth.companyId, shipmentCreateSchema.parse(req.body))); }
