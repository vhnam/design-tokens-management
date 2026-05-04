import type { TokenType } from '@/enums/token';

export type CreatePrimitiveTokenPayload = {
  organizationId: string;
  name: string;
  dotPath: string;
  rawValue: string;
  type: TokenType;
  description?: string;
};

export type UpdatePrimitiveTokenPayload = {
  id: string;
  name: string;
  dotPath: string;
  rawValue: string;
  type: TokenType;
  description?: string;
};

export type DeletePrimitiveTokenPayload = {
  id: string;
};
