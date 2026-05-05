import { z } from 'zod/v4';

import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from '@/constants/auth';

export const loginSchema = z.object({
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`),
  password: z
    .string()
    .min(1, 'Password is mandatory')
    .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
