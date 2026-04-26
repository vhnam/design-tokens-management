import z from 'zod/v4';

export const resendVerificationSchema = z.object({
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(255, 'Email must be less than 255 characters'),
});

export type ResendVerificationSchemaType = z.infer<typeof resendVerificationSchema>;
