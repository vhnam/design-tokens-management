import { useQuery } from '@tanstack/react-query';

import { PRIMITIVE_TOKENS_KEYS } from './primitive-tokens.key';
import { getPrimitiveTokens } from './primitive-tokens.service';

export const useGetPrimitiveTokensQuery = (tokenFileId: string | undefined) => {
  return useQuery({
    queryKey: [...PRIMITIVE_TOKENS_KEYS.LIST, tokenFileId],
    queryFn: () => getPrimitiveTokens(tokenFileId!),
    enabled: Boolean(tokenFileId),
  });
};
