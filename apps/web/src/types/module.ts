export interface ModuleManifestItem { key: string; label: string; icon: string; defaultRoute: string; permissions: string[]; widgets: string[]; }
export interface ModuleManifestResponse { companyId: string; roleKey: string; modules: ModuleManifestItem[]; }
