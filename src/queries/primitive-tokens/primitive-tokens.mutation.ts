import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PRIMITIVE_TOKENS_KEYS } from './primitive-tokens.key';
import { createPrimitiveToken, deletePrimitiveToken, updatePrimitiveToken } from './primitive-tokens.service';

export const useCreatePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrimitiveToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.ALL });
    },
  });
};

export const useUpdatePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrimitiveToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.ALL });
    },
  });
};

export const useDeletePrimitiveTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePrimitiveToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PRIMITIVE_TOKENS_KEYS.ALL });
    },
  });
};
