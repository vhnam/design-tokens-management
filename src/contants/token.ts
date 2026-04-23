import { TokenType } from '@/enums/token';

export const TOKEN_TYPE_LIST: TokenType[] = [
  TokenType.Color,
  TokenType.Dimension,
  TokenType.FontFamily,
  TokenType.FontWeight,
  TokenType.Duration,
  TokenType.CubicBezier,
  TokenType.Number,
];

export const TOKEN_TYPE_OPTIONS: { label: string; value: TokenType }[] = [
  {
    label: 'Color',
    value: TokenType.Color,
  },
  {
    label: 'Dimension',
    value: TokenType.Dimension,
  },
  {
    label: 'Font Family',
    value: TokenType.FontFamily,
  },
  {
    label: 'Font Weight',
    value: TokenType.FontWeight,
  },
  {
    label: 'Duration',
    value: TokenType.Duration,
  },
  {
    label: 'Cubic Bezier',
    value: TokenType.CubicBezier,
  },
  {
    label: 'Number',
    value: TokenType.Number,
  },
];
