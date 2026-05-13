import { prisma } from '../../configs/prisma';
export class ManufacturingRepository {
  listBatches(companyId: string, status?: string) { return prisma.productionBatch.findMany({ where: { companyId, ...(status ? { status } : {}) }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  createBatch(companyId: string, data: { batchNo: string; status: string }) { return prisma.productionBatch.create({ data: { companyId, ...data } }); }
  listMachineLogs(companyId: string) { return prisma.machineLog.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  createMachineLog(companyId: string, data: { machineCode: string; runtimeMinutes: number; downtimeMinutes: number }) { return prisma.machineLog.create({ data: { companyId, ...data } }); }
}
