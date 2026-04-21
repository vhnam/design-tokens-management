export type PrimitiveToken = {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier' | 'number';
  description: string;
};
