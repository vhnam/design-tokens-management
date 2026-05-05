import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PRIMITIVE_TOKENS_KEYS } from './primitive-tokens.key';
import { createPrimitiveToken, deletePrimitiveToken, updatePrimitiveToken } from './primitive-tokens.service';

export const useCreatePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrimitiveToken,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [...PRIMITIVE_TOKENS_KEYS.LIST, variables.organizationId] });
    },
  });
};

export const useUpdatePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrimitiveToken,
    onSuccess: (_, variables) => {
      if (variables.tokenFileId) {
        void queryClient.invalidateQueries({ queryKey: [...PRIMITIVE_TOKENS_KEYS.LIST, variables.tokenFileId] });
        return;
      }
      void queryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeletePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePrimitiveToken,
    onSuccess: (_, variables) => {
      if (variables.tokenFileId) {
        void queryClient.invalidateQueries({ queryKey: [...PRIMITIVE_TOKENS_KEYS.LIST, variables.tokenFileId] });
        return;
      }
      void queryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.LIST });
    },
  });
};
