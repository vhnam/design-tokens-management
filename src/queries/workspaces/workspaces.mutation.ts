import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WORKSPACES_KEYS } from './workspaces.key';
import { createWorkspace, deleteWorkspace, updateWorkspace } from './workspaces.service';

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACES_KEYS.LIST });
    },
  });
};

export const useUpdateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACES_KEYS.LIST });
    },
  });
};

export const useDeleteWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACES_KEYS.LIST });
    },
  });
};
