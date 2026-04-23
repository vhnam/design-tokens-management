import { useMutation } from '@tanstack/react-query';

import { tanstackQueryClient } from '@/integrations/tanstack-query/root-provider';

import { COMPONENT_TOKENS_KEYS } from './component-tokens.key';
import { createComponentToken, deleteComponentToken, updateComponentToken } from './component-tokens.service';

export const useCreateComponentTokenMutation = () => {
  return useMutation({
    mutationFn: createComponentToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};

export const useUpdateComponentTokenMutation = () => {
  return useMutation({
    mutationFn: updateComponentToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeleteComponentTokenMutation = () => {
  return useMutation({
    mutationFn: deleteComponentToken,
    onSuccess: () => {
      void tanstackQueryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};
