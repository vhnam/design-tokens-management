import { z } from 'zod/v4';

import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/constants/auth';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`),
  image: z.url().optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is mandatory')
      .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`)
      .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`)
      .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ProfileSchemaType = z.infer<typeof profileSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
