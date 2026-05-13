import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { prisma } from '../../configs/prisma';
import { z } from 'zod';
import { AppError } from '../../utils/app-error';
const checkInSchema = z.object({ employeeId: z.string(), shiftId: z.string().optional(), method: z.enum(['manual', 'qr']).default('manual') });
const checkOutSchema = z.object({ attendanceId: z.string() });
export async function listAttendance(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); const rows = await prisma.attendance.findMany({ where: { employee: { companyId: req.auth.companyId } }, include: { employee: true, shift: true }, orderBy: { checkInAt: 'desc' }, take: 100 }); res.json(rows); }
export async function checkIn(req: AuthenticatedRequest, res: Response): Promise<void> { if (!req.auth) throw new AppError(401, 'Unauthorized'); const payload = checkInSchema.parse(req.body); res.status(201).json(await prisma.attendance.create({ data: { employeeId: payload.employeeId, shiftId: payload.shiftId, checkInAt: new Date(), method: payload.method } })); }
export async function checkOut(req: AuthenticatedRequest, res: Response): Promise<void> { const payload = checkOutSchema.parse(req.body); const record = await prisma.attendance.findUnique({ where: { id: payload.attendanceId } }); if (!record) throw new AppError(404, 'Attendance record not found'); const now = new Date(); const overtimeMins = Math.max(Math.floor((now.getTime() - record.checkInAt.getTime()) / 60000) - 480, 0); res.json(await prisma.attendance.update({ where: { id: payload.attendanceId }, data: { checkOutAt: now, overtimeMins } })); }
