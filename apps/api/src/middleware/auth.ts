import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../configs/env';
import { AppError } from '../utils/app-error';
export interface AuthClaims { sub: string; companyId: string; roleKey: string; }
export interface AuthenticatedRequest extends Request { auth?: AuthClaims; }
export function requireAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void { const authHeader = req.headers.authorization; if (!authHeader?.startsWith('Bearer ')) throw new AppError(401, 'Missing bearer token'); const token = authHeader.replace('Bearer ', '').trim(); req.auth = jwt.verify(token, env.JWT_SECRET) as AuthClaims; next(); }
