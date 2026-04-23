import { useMutation } from '@tanstack/react-query';

import { tanstackQueryClient } from '@/integrations/tanstack-query/root-provider';

import { SEMANTIC_TOKENS_KEYS } from './semantic-tokens.key';
import { createSemanticToken, deleteSemanticToken, updateSemanticToken } from './semantic-tokens.service';

export const useCreateSemanticTokenMutation = () => {
  return useMutation({
    mutationFn: createSemanticToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};

export const useUpdateSemanticTokenMutation = () => {
  return useMutation({
    mutationFn: updateSemanticToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeleteSemanticTokenMutation = () => {
  return useMutation({
    mutationFn: deleteSemanticToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: SEMANTIC_TOKENS_KEYS.LIST });
    },
  });
};
