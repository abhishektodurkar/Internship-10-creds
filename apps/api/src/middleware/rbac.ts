import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './auth';
import { AppError } from '../utils/app-error';
const rolePermissions: Record<string, string[]> = { super_admin: ['*'], company_admin: ['module:read', 'user:manage', 'analytics:read'], viewer: ['module:read', 'analytics:read'] };
export function requirePermission(permission: string) { return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => { const roleKey = req.auth?.roleKey; if (!roleKey) throw new AppError(401, 'Not authenticated'); const permissions = rolePermissions[roleKey] ?? []; if (!permissions.includes('*') && !permissions.includes(permission)) throw new AppError(403, 'Insufficient permission', { permission }); next(); }; }
