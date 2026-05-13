import { LogisticsRepository } from '../../repositories/industry/logistics.repository';
export class LogisticsService {
  constructor(private readonly repo = new LogisticsRepository()) {}
  listShipments(companyId: string, status?: string) { return this.repo.listShipments(companyId, status); }
  createShipment(companyId: string, data: { trackingNo: string; status: string }) { return this.repo.createShipment(companyId, data); }
}
