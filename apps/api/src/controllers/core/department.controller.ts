import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { prisma } from '../../configs/prisma';
import { AppError } from '../../utils/app-error';
import { z } from 'zod';
const schema = z.object({ name: z.string().min(2) });
export async function listDepartments(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); res.json(await prisma.department.findMany({ where: { companyId: req.auth.companyId }, include: { _count: { select: { employees: true } } } })); }
export async function createDepartment(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); const { name } = schema.parse(req.body); res.status(201).json(await prisma.department.create({ data: { companyId: req.auth.companyId, name } })); }
