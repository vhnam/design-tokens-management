import type { TokenType } from '@/enums/token';

export type PrimitiveToken = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  description?: string;
};

export type SemanticToken = {
  id: string;
  semanticToken: string;
  primitiveToken: PrimitiveToken;
  description?: string;
};
