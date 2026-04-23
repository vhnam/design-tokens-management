import type { TokenType } from '@/types/token';

export type CreateSemanticTokenPayload = {
  semanticToken: string;
  primitiveToken: string;
  type: TokenType;
  description?: string;
};

export type UpdateSemanticTokenPayload = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  description?: string;
};

export type DeleteSemanticTokenPayload = {
  id: string;
};
