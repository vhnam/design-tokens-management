import type { TokenType } from '@/enums/token';

/** Maps to a `tokens` row under a primitive-level group (`dotPath`, `rawValue`, …). */
export type PrimitiveToken = {
  id: string;
  /** Leaf segment in DB (`name`). */
  name: string;
  /** Full reference path (`dot_path`). */
  dotPath: string;
  rawValue: string | null;
  type: TokenType | null;
  description?: string | null;
  isAlias?: boolean;
  isComposite?: boolean;
};

export type SemanticToken = {
  id: string;
  semanticToken: string;
  primitiveToken: PrimitiveToken;
  description?: string;
};

export type ComponentToken = {
  id: string;
  componentToken: string;
  semanticToken: SemanticToken;
  description?: string;
};
