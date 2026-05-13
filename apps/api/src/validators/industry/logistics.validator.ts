import { z } from 'zod';
export const shipmentCreateSchema = z.object({ trackingNo: z.string().min(4), status: z.string().min(2) });
