import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { EmployeeService } from '../../services/core/employee.service';
import { employeeCreateSchema } from '../../validators/core/employee.validator';
import { AppError } from '../../utils/app-error';
const service = new EmployeeService();
export async function listEmployees(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); res.json(await service.list(req.auth.companyId)); }
export async function createEmployee(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); const payload = employeeCreateSchema.parse(req.body); res.status(201).json(await service.create(req.auth.companyId, payload)); }
