import { z } from 'zod';
export const inventoryCreateSchema = z.object({ sku: z.string().min(2), quantity: z.coerce.number().int() });
