import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PROJECTS_KEYS } from './projects.key';
import { createProject, deleteProject, updateProject } from './projects.service';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.LIST });
    },
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.LIST });
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.LIST });
    },
  });
};
