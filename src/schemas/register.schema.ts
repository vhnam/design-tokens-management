import { z } from 'zod/v4';

import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/constants/auth';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is mandatory')
    .max(MAX_NAME_LENGTH, `Name must be less than ${MAX_NAME_LENGTH} characters`),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`)
    .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
