import { z } from 'zod/v4';

export const organizationSchema = z.object({
  organizationName: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  organizationSlug: z.string().slugify().min(1, 'Slug is mandatory').max(255, 'Slug must be less than 255 characters'),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;
