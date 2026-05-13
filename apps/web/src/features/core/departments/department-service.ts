import { apiGet } from '../api/client';
export interface Department { id: string; name: string; _count?: { employees: number }; }
export function listDepartments(token: string): Promise<Department[]> { return apiGet('/api/v1/core/departments', token); }
