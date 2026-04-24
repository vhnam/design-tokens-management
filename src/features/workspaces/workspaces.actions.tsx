import {
  useCreateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspacesQuery,
  useUpdateWorkspaceMutation,
} from '@/queries/workspaces';

export const useGetWorkspaces = () => {
  return useGetWorkspacesQuery();
};

export const useCreateWorkspace = () => {
  return useCreateWorkspaceMutation();
};

export const useUpdateWorkspace = () => {
  return useUpdateWorkspaceMutation();
};

export const useDeleteWorkspace = () => {
  return useDeleteWorkspaceMutation();
};
