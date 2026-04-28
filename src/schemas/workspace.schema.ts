import { z } from 'zod/v4';

export const workspaceSchema = z.object({
  workspaceName: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  workspaceImage: z.string().optional(),
});

export type WorkspaceSchemaType = z.infer<typeof workspaceSchema>;
