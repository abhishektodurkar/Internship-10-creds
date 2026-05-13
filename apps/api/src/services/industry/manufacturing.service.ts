import { ManufacturingRepository } from '../../repositories/industry/manufacturing.repository';
export class ManufacturingService {
  constructor(private readonly repo = new ManufacturingRepository()) {}
  listBatches(companyId: string, status?: string) { return this.repo.listBatches(companyId, status); }
  createBatch(companyId: string, data: { batchNo: string; status: string }) { return this.repo.createBatch(companyId, data); }
  listMachineLogs(companyId: string) { return this.repo.listMachineLogs(companyId); }
  createMachineLog(companyId: string, data: { machineCode: string; runtimeMinutes: number; downtimeMinutes: number }) { return this.repo.createMachineLog(companyId, data); }
}
