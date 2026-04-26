import { z } from 'zod/v4';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is mandatory')
    .max(255, 'Email must be less than 255 characters'),
  image: z.url().optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255, 'Password must be less than 255 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255, 'Password must be less than 255 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255, 'Password must be less than 255 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ProfileSchemaType = z.infer<typeof profileSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
