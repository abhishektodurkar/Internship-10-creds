import { apiGet } from '../api/client';
export interface AttendanceRecord { id: string; checkInAt: string; checkOutAt?: string; overtimeMins: number; employee: { fullName: string; employeeCode: string; }; }
export function listAttendance(token: string): Promise<AttendanceRecord[]> { return apiGet('/api/v1/core/attendance', token); }
