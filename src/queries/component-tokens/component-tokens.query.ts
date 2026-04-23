import { useQuery } from '@tanstack/react-query';

import { COMPONENT_TOKENS_KEYS } from './component-tokens.key';
import { getComponentTokens } from './component-tokens.service';

export const useGetComponentTokensQuery = () => {
  return useQuery({
    queryKey: COMPONENT_TOKENS_KEYS.LIST,
    queryFn: getComponentTokens,
  });
};
