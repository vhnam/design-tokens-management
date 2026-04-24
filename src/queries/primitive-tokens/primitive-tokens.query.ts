import { useQuery } from '@tanstack/react-query';

import { PRIMITIVE_TOKENS_KEYS } from './primitive-tokens.key';
import { getPrimitiveTokens } from './primitive-tokens.service';

export const useGetPrimitiveTokensQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: PRIMITIVE_TOKENS_KEYS.LIST(workspaceId),
    queryFn: () => getPrimitiveTokens(workspaceId),
  });
};
