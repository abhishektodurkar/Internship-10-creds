import { ModuleRepository } from '../repositories/module.repository';
import { moduleCatalog } from '../module-engine/module-catalog';
export class ModuleService {
  constructor(private readonly moduleRepository = new ModuleRepository()) {}
  async getModuleManifest(companyId: string, roleKey: string) {
    const enabled = await this.moduleRepository.listByCompany(companyId);
    const enabledKeys = new Set(enabled.map((module) => module.key));
    const modules = moduleCatalog.filter((module) => enabledKeys.has(module.key));
    return { companyId, roleKey, modules };
  }
}
