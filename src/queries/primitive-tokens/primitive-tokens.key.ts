export const PRIMITIVE_TOKENS_KEYS = {
  ALL: ['primitive-tokens'] as const,
  LIST: (workspaceId?: string) => ['primitive-tokens', workspaceId] as const,
};
