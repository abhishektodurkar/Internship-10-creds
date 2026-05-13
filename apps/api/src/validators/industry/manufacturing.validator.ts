import { z } from 'zod';
export const productionBatchCreateSchema = z.object({ batchNo: z.string().min(2), status: z.string().min(2) });
export const machineLogCreateSchema = z.object({ machineCode: z.string().min(2), runtimeMinutes: z.coerce.number().min(0), downtimeMinutes: z.coerce.number().min(0) });
