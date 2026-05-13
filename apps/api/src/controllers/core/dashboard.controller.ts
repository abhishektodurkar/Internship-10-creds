import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../middleware/auth';
import { prisma } from '../../configs/prisma';
import { AppError } from '../../utils/app-error';
export async function getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.auth) throw new AppError(401, 'Unauthorized');
  const companyId = req.auth.companyId;
  const [employees, departments, openLeaves, todayAttendance] = await Promise.all([
    prisma.employee.count({ where: { companyId } }),
    prisma.department.count({ where: { companyId } }),
    prisma.leaveRequest.count({ where: { companyId, status: 'PENDING' } }),
    prisma.attendance.count({ where: { employee: { companyId }, checkInAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } })
  ]);
  res.json({ kpis: { employees, departments, openLeaves, todayAttendance } });
}
