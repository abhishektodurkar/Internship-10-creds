import { prisma } from '../configs/prisma';
export class ModuleRepository {
  async listByCompany(companyId: string) { return prisma.companyModule.findMany({ where: { companyId, enabled: true }, orderBy: { key: 'asc' } }); }
}
