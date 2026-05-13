import { apiGet } from '../../core/api/client';
export interface InventoryItem { id: string; sku: string; quantity: number; createdAt: string; }
export function listInventory(token: string, search?: string): Promise<InventoryItem[]> { return apiGet(`/api/v1/retail/inventory${search ? `?search=${encodeURIComponent(search)}` : ''}`, token); }
