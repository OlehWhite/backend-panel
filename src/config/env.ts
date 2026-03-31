import 'dotenv/config';
import z from "zod";

const envSchema = z.object({
  PORT: z.string().min(1, 'PORT is required'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  BCRYPT_SALT_ROUNDS: z.string().min(1, 'BCRYPT_SALT_ROUNDS is required'),
})

export const env = envSchema.parse(process.env)