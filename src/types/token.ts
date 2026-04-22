export type TokenLayer = 'primitive' | 'semantic' | 'component';

export type TokenTheme = 'light' | 'dark';

export type TokenType = 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier' | 'number';

export type PrimitiveToken = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  description: string;
};
