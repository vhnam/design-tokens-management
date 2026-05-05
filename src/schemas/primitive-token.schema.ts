import { z } from 'zod/v4';

import { TOKEN_TYPE_LIST } from '@/constants/token';

import { isTokenAliasRawValue, isValidColorValue } from '@/lib/token';

import { TokenType } from '@/enums/token';

const dotPathPattern = /^[-a-zA-Z0-9_.]+(?:\.[-a-zA-Z0-9_.]+)*$/;

export const primitiveTokenSchema = z
  .object({
    tokenName: z.string().min(1, 'Name is mandatory').max(512, 'Name must be less than 512 characters'),
    tokenDotPath: z.string().min(1, 'Dot path is mandatory').max(512, 'Dot path must be less than 512 characters'),
    tokenValue: z.string().min(1, 'Value is mandatory').max(4000, 'Value must be less than 4000 characters'),
    tokenType: z.enum(TOKEN_TYPE_LIST).default(TokenType.Color),
    tokenDescription: z.string().max(255, 'Description must be less than 255 characters').optional(),
  })
  .refine((data) => dotPathPattern.test(data.tokenDotPath.trim()), {
    message:
      'Use a non-empty path of segments separated by dots (letters, numbers, underscore, hyphen). Example: color.blue.500',
    path: ['tokenDotPath'],
  })
  .refine(
    (data) =>
      data.tokenType !== TokenType.Color ||
      isTokenAliasRawValue(data.tokenValue) ||
      isValidColorValue(data.tokenValue.trim()),
    {
      message: 'Invalid color value',
      path: ['tokenValue'],
    },
  );

export type PrimitiveTokenSchemaType = z.infer<typeof primitiveTokenSchema>;
