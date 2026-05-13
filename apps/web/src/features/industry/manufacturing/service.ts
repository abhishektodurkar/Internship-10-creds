import { apiGet } from '../../core/api/client';
export interface ProductionBatch { id: string; batchNo: string; status: string; createdAt: string; }
export interface MachineLog { id: string; machineCode: string; runtimeMinutes: number; downtimeMinutes: number; createdAt: string; }
export function listBatches(token: string, status?: string): Promise<ProductionBatch[]> { return apiGet(`/api/v1/manufacturing/batches${status ? `?status=${encodeURIComponent(status)}` : ''}`, token); }
export function listMachineLogs(token: string): Promise<MachineLog[]> { return apiGet('/api/v1/manufacturing/machine-logs', token); }
