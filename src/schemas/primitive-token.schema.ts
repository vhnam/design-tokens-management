import { z } from 'zod/v4';

import { TOKEN_TYPE_LIST } from '@/contants/token';

import { TokenType } from '@/types/token';

export const primitiveTokenSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  value: z.string().min(1, 'Value is mandatory').max(255, 'Value must be less than 255 characters'),
  type: z.enum(TOKEN_TYPE_LIST).default(TokenType.Color),
  description: z.string().max(255, 'Description must be less than 255 characters').optional(),
});

export type PrimitiveTokenSchemaType = z.infer<typeof primitiveTokenSchema>;
