import { apiGet } from '../api/client';
export interface EmployeeInput { fullName: string; employeeCode: string; monthlySalary: number; departmentId?: string; }
export interface Employee extends EmployeeInput { id: string; createdAt: string; }
export function listEmployees(token: string): Promise<Employee[]> { return apiGet('/api/v1/core/employees', token); }
export async function createEmployee(token: string, input: EmployeeInput): Promise<Employee> {
  const r = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/core/employees`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(input) });
  if (!r.ok) throw new Error('create employee failed');
  return r.json() as Promise<Employee>;
}
