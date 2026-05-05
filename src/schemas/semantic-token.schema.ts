import { COMPOSITE_TOKEN_TYPE_LIST } from '@/constants/token';
import { z } from 'zod/v4';

import { TokenTheme } from '@/enums/token';

export const typographyCompositeSchema = z.object({
  fontFamily: z.string().min(1, 'Font family is mandatory').max(255, 'Font family must be less than 255 characters'),
  fontSize: z.string().min(1, 'Font size is mandatory').max(255, 'Font size must be less than 255 characters'),
  fontWeight: z.string().min(1, 'Font weight is mandatory').max(255, 'Font weight must be less than 255 characters'),
  lineHeight: z.string().min(1, 'Line height is mandatory').max(255, 'Line height must be less than 255 characters'),
  letterSpacing: z
    .string()
    .min(1, 'Letter spacing is mandatory')
    .max(255, 'Letter spacing must be less than 255 characters'),
});

export const semanticTokenSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(255, 'Name must be less than 255 characters'),
  value: z.string().min(1, 'Value is mandatory').max(4000, 'Value must be less than 4000 characters'),
  type: z.enum(COMPOSITE_TOKEN_TYPE_LIST),
  group: z.string().min(1, 'Group is mandatory').max(255, 'Group must be less than 255 characters'),
  theme: z.enum([TokenTheme.Light, TokenTheme.Dark]).default(TokenTheme.Light),
  description: z.string().max(255, 'Description must be less than 255 characters').optional(),
});

export const semanticTokenFormSchema = semanticTokenSchema.extend({
  fontFamily: z.string().max(255, 'Font family must be less than 255 characters').optional(),
  fontSize: z.string().max(255, 'Font size must be less than 255 characters').optional(),
  fontWeight: z.string().max(255, 'Font weight must be less than 255 characters').optional(),
  lineHeight: z.string().max(255, 'Line height must be less than 255 characters').optional(),
  letterSpacing: z.string().max(255, 'Letter spacing must be less than 255 characters').optional(),
  shadowColor: z.string().max(255, 'Shadow color must be less than 255 characters').optional(),
  shadowX: z.string().max(255, 'Shadow X must be less than 255 characters').optional(),
  shadowY: z.string().max(255, 'Shadow Y must be less than 255 characters').optional(),
  shadowBlur: z.string().max(255, 'Shadow blur must be less than 255 characters').optional(),
  shadowSpread: z.string().max(255, 'Shadow spread must be less than 255 characters').optional(),
  borderWidth: z.string().max(255, 'Border width must be less than 255 characters').optional(),
  borderColor: z.string().max(255, 'Border color must be less than 255 characters').optional(),
  borderStyle: z.string().max(255, 'Border style must be less than 255 characters').optional(),
  gradientStopColor: z.string().max(255, 'Gradient color must be less than 255 characters').optional(),
  gradientStopPosition: z.string().max(255, 'Gradient position must be less than 255 characters').optional(),
});

export type SemanticTokenFormSchemaType = z.infer<typeof semanticTokenFormSchema>;
