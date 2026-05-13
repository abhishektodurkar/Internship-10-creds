import { z } from 'zod';
const schema = z.object({ NODE_ENV: z.enum(['development', 'test', 'production']).default('development'), PORT: z.coerce.number().default(4000), DATABASE_URL: z.string().min(1), JWT_SECRET: z.string().min(16), JWT_EXPIRES_IN: z.string().default('1d'), JWT_REFRESH_SECRET: z.string().min(16).default('change_me_refresh_secret_1234'), JWT_REFRESH_EXPIRES_IN: z.string().default('7d'), CORS_ORIGIN: z.string().default('http://localhost:5173') });
export const env = schema.parse(process.env);
