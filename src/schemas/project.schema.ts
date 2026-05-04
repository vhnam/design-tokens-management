import { z } from 'zod/v4';

export const projectSchema = z.object({
  projectName: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
