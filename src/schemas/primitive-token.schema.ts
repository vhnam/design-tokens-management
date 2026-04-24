import { z } from 'zod/v4';

import { TOKEN_TYPE_LIST } from '@/contants/token';

import { isValidColorToken } from '@/lib/token';

import { TokenType } from '@/enums/token';

export const primitiveTokenSchema = z
  .object({
    tokenName: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
    tokenValue: z.string().min(1, 'Value is mandatory').max(255, 'Value must be less than 255 characters'),
    tokenType: z.enum(TOKEN_TYPE_LIST).default(TokenType.Color),
    tokenDescription: z.string().max(255, 'Description must be less than 255 characters').optional(),
  })
  .refine((data) => data.tokenName.startsWith('--'), {
    message: 'Token name must start with "--"',
    path: ['tokenName'],
  })
  .refine((data) => data.tokenType !== TokenType.Color || isValidColorToken(data.tokenValue), {
    message: 'Invalid color token',
    path: ['tokenValue'],
  });

export type PrimitiveTokenSchemaType = z.infer<typeof primitiveTokenSchema>;
