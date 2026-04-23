import type { TokenType } from '@/types/token';

export type CreatePrimitiveTokenPayload = {
  name: string;
  value: string;
  type: TokenType;
  description?: string;
};

export type UpdatePrimitiveTokenPayload = {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  description?: string;
};

export type DeletePrimitiveTokenPayload = {
  id: string;
};
