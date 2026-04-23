import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COMPONENT_TOKENS_KEYS } from './component-tokens.key';
import { createComponentToken, deleteComponentToken, updateComponentToken } from './component-tokens.service';

export const useCreateComponentTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComponentToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};

export const useUpdateComponentTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComponentToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};

export const useDeleteComponentTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComponentToken,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COMPONENT_TOKENS_KEYS.LIST });
    },
  });
};
