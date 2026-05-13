import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { AppError } from '../../utils/app-error';
import { ManufacturingService } from '../../services/industry/manufacturing.service';
import { machineLogCreateSchema, productionBatchCreateSchema } from '../../validators/industry/manufacturing.validator';
const service = new ManufacturingService();
export async function listProductionBatches(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.json(await service.listBatches(req.auth.companyId, req.query.status as string | undefined)); }
export async function createProductionBatch(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.status(201).json(await service.createBatch(req.auth.companyId, productionBatchCreateSchema.parse(req.body))); }
export async function listMachineLogs(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.json(await service.listMachineLogs(req.auth.companyId)); }
export async function createMachineLog(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401,'Unauthorized'); res.status(201).json(await service.createMachineLog(req.auth.companyId, machineLogCreateSchema.parse(req.body))); }
