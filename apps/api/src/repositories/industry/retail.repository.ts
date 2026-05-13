import { prisma } from '../../configs/prisma';
export class RetailRepository {
  listInventory(companyId: string, search?: string) { return prisma.inventory.findMany({ where: { companyId, ...(search ? { sku: { contains: search, mode: 'insensitive' } } : {}) }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  createInventory(companyId: string, data: { sku: string; quantity: number }) { return prisma.inventory.create({ data: { companyId, ...data } }); }
}
