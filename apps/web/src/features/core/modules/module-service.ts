import type { ModuleManifestResponse } from '../../../types/module';
import { apiGet } from '../api/client';

export async function getModuleManifest(token: string): Promise<ModuleManifestResponse> {
  return apiGet<ModuleManifestResponse>('/api/v1/modules/manifest', token);
}
