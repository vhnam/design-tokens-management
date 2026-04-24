import type { TokenType } from '@/enums/token';

export type CreatePrimitiveTokenPayload = {
  workspaceId: string;
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
