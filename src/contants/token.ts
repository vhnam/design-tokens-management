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
  {
    label: 'Typography',
    value: TokenType.Typography,
  },
  {
    label: 'Shadow',
    value: TokenType.Shadow,
  },
  {
    label: 'Border',
    value: TokenType.Border,
  },
  {
    label: 'Gradient',
    value: TokenType.Gradient,
  },
];

export const TOKEN_TYPE_LABELS: Record<TokenType, string> = {
  [TokenType.Color]: 'Color',
  [TokenType.Dimension]: 'Dimension',
  [TokenType.FontFamily]: 'Font Family',
  [TokenType.FontWeight]: 'Font Weight',
  [TokenType.Duration]: 'Duration',
  [TokenType.CubicBezier]: 'Cubic Bezier',
  [TokenType.Number]: 'Number',
  [TokenType.Typography]: 'Typography',
  [TokenType.Shadow]: 'Shadow',
  [TokenType.Border]: 'Border',
  [TokenType.Gradient]: 'Gradient',
};
