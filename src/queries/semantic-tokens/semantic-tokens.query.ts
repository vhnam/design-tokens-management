import { useQuery } from '@tanstack/react-query';

import { SEMANTIC_TOKENS_KEYS } from './semantic-tokens.key';
import { getSemanticTokens } from './semantic-tokens.service';

export const useGetSemanticTokensQuery = () => {
  return useQuery({
    queryKey: SEMANTIC_TOKENS_KEYS.LIST,
    queryFn: getSemanticTokens,
  });
};
