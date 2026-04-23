import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SEMANTIC_TOKENS_KEYS } from './semantic-tokens.key';
import { createSemanticToken, deleteSemanticToken, updateSemanticToken } from './semantic-tokens.service';

export const useCreateSemanticTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSemanticToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};

export const useUpdateSemanticTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSemanticToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeleteSemanticTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSemanticToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};
