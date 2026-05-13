import { prisma } from '../../configs/prisma';
export class LogisticsRepository {
  listShipments(companyId: string, status?: string) { return prisma.shipment.findMany({ where: { companyId, ...(status ? { status } : {}) }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  createShipment(companyId: string, data: { trackingNo: string; status: string }) { return prisma.shipment.create({ data: { companyId, ...data } }); }
}
