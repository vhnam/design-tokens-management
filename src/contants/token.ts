import type { TokenType } from '@/types/token';

export const TOKEN_TYPE_OPTIONS: { label: string; value: TokenType }[] = [
  {
    label: 'Color',
    value: 'color',
  },
  {
    label: 'Dimension',
    value: 'dimension',
  },
  {
    label: 'Font Family',
    value: 'fontFamily',
  },
  {
    label: 'Font Weight',
    value: 'fontWeight',
  },
  {
    label: 'Duration',
    value: 'duration',
  },
  {
    label: 'Cubic Bezier',
    value: 'cubicBezier',
  },
  {
    label: 'Number',
    value: 'number',
  },
];
