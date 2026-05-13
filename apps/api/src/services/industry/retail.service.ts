import { RetailRepository } from '../../repositories/industry/retail.repository';
export class RetailService {
  constructor(private readonly repo = new RetailRepository()) {}
  listInventory(companyId: string, search?: string) { return this.repo.listInventory(companyId, search); }
  createInventory(companyId: string, data: { sku: string; quantity: number }) { return this.repo.createInventory(companyId, data); }
}
