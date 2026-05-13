import { z } from 'zod';
export const employeeCreateSchema = z.object({ fullName: z.string().min(2), email: z.string().email().optional(), phone: z.string().optional(), employeeCode: z.string().min(2), departmentId: z.string().optional(), monthlySalary: z.coerce.number().nonnegative(), status: z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE', 'TERMINATED']).optional() });
