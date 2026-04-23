import { useMutation } from '@tanstack/react-query';

import { tanstackQueryClient } from '@/integrations/tanstack-query/root-provider';

import { PRIMITIVE_TOKENS_KEYS } from './primitive-tokens.key';
import { createPrimitiveToken, deletePrimitiveToken, updatePrimitiveToken } from './primitive-tokens.service';

export const useCreatePrimitiveTokenMutation = () => {
  return useMutation({
    mutationFn: createPrimitiveToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.LIST });
    },
  });
};

export const useUpdatePrimitiveTokenMutation = () => {
  return useMutation({
    mutationFn: updatePrimitiveToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeletePrimitiveTokenMutation = () => {
  return useMutation({
    mutationFn: deletePrimitiveToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.LIST });
    },
  });
};
