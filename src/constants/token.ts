import { TokenType } from '@/enums/token';

export const TOKEN_TYPE_LIST = [
  TokenType.Color,
  TokenType.Dimension,
  TokenType.FontFamily,
  TokenType.FontWeight,
  TokenType.FontSize,
  TokenType.LineHeight,
  TokenType.LetterSpacing,
  TokenType.Duration,
  TokenType.CubicBezier,
  TokenType.Transition,
  TokenType.Number,
  TokenType.String,
] as const;

export const COMPOSITE_TOKEN_TYPE_LIST = [
  TokenType.Typography,
  TokenType.Shadow,
  TokenType.Border,
  TokenType.Gradient,
] as const;

export const TOKEN_TYPE_OPTIONS: { group: string; items: { label: string; value: TokenType }[] }[] = [
  {
    group: 'Simple tokens',
    items: [
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
        label: 'Font Size',
        value: TokenType.FontSize,
      },
      {
        label: 'Line Height',
        value: TokenType.LineHeight,
      },
      {
        label: 'Letter Spacing',
        value: TokenType.LetterSpacing,
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
        label: 'Transition',
        value: TokenType.Transition,
      },
      {
        label: 'Number',
        value: TokenType.Number,
      },
      {
        label: 'String',
        value: TokenType.String,
      },
    ],
  },
  {
    group: 'Composite tokens',
    items: [
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
    ],
  },
];

export const PRIMITIVE_TOKEN_TYPE_OPTIONS: { group: string; items: { label: string; value: TokenType }[] }[] = [
  TOKEN_TYPE_OPTIONS[0],
];

export const COMPOSITE_TOKEN_TYPE_OPTIONS: { group: string; items: { label: string; value: TokenType }[] }[] = [
  TOKEN_TYPE_OPTIONS[1],
];

export const TOKEN_TYPE_LABELS: Record<TokenType, string> = {
  [TokenType.Color]: 'Color',
  [TokenType.Dimension]: 'Dimension',
  [TokenType.Typography]: 'Typography',
  [TokenType.Shadow]: 'Shadow',
  [TokenType.Gradient]: 'Gradient',
  [TokenType.Border]: 'Border',
  [TokenType.Transition]: 'Transition',
  [TokenType.FontFamily]: 'Font Family',
  [TokenType.FontWeight]: 'Font Weight',
  [TokenType.FontSize]: 'Font Size',
  [TokenType.LineHeight]: 'Line Height',
  [TokenType.LetterSpacing]: 'Letter Spacing',
  [TokenType.Duration]: 'Duration',
  [TokenType.CubicBezier]: 'Cubic Bezier',
  [TokenType.Number]: 'Number',
  [TokenType.String]: 'String',
};

export const BORDER_STYLE_LIST: { label: string; value: string }[] = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Double', value: 'double' },
  { label: 'Groove', value: 'groove' },
  { label: 'Ridge', value: 'ridge' },
  { label: 'Inset', value: 'inset' },
  { label: 'Outset', value: 'outset' },
];
