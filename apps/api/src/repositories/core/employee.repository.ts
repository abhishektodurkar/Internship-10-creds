import { prisma } from '../../configs/prisma';
export class EmployeeRepository {
  list(companyId: string) { return prisma.employee.findMany({ where: { companyId }, include: { department: true }, orderBy: { createdAt: 'desc' } }); }
  create(companyId: string, input: { fullName: string; email?: string; phone?: string; employeeCode: string; departmentId?: string; monthlySalary: number; status?: 'ACTIVE'|'ON_LEAVE'|'INACTIVE'|'TERMINATED'; }) {
    return prisma.employee.create({ data: { ...input, companyId, monthlySalary: input.monthlySalary } });
  }
}
