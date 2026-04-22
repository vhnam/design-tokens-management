import { z } from 'zod/v4';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(255, 'Password must be less than 255 characters'),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
