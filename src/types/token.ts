export type TokenLayer = 'primitive' | 'semantic' | 'component';

export type TokenTheme = 'light' | 'dark';

export enum TokenType {
  Color = 'color',
  Dimension = 'dimension',
  FontFamily = 'fontFamily',
  FontWeight = 'fontWeight',
  Duration = 'duration',
  CubicBezier = 'cubicBezier',
  Number = 'number',
}

export type PrimitiveToken = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  description: string;
};
