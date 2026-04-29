import type { TokenTheme, TokenType } from '@/enums/token';

export type SemanticTokenRecord = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  group: string;
  theme: TokenTheme;
  description?: string;
};

export type CreateSemanticTokenPayload = {
  name: string;
  value: string;
  type: TokenType;
  group: string;
  theme: TokenTheme;
  description?: string;
};

export type UpdateSemanticTokenPayload = CreateSemanticTokenPayload & {
  id: string;
};

export type DeleteSemanticTokenPayload = {
  id: string;
};
