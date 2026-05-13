import type { DashboardResponse } from './types';
import { apiGet } from '../api/client';
export function getDashboard(token: string): Promise<DashboardResponse> { return apiGet('/api/v1/core/dashboard', token); }
