import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void { if (err instanceof AppError) { res.status(err.statusCode).json({ message: err.message, details: err.details }); return; } logger.error('Unhandled error', { path: req.path, method: req.method, err }); res.status(500).json({ message: 'Internal server error' }); }
