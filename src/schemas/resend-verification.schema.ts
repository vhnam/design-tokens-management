import z from 'zod/v4';

import { MAX_EMAIL_LENGTH } from '@/constants/auth';

export const resendVerificationSchema = z.object({
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`),
});

export type ResendVerificationSchemaType = z.infer<typeof resendVerificationSchema>;
