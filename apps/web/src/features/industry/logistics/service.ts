import { apiGet } from '../../core/api/client';
export interface Shipment { id: string; trackingNo: string; status: string; createdAt: string; }
export function listShipments(token: string, status?: string): Promise<Shipment[]> { return apiGet(`/api/v1/logistics/shipments${status ? `?status=${encodeURIComponent(status)}` : ''}`, token); }
