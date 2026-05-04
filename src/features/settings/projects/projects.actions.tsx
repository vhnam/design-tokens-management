import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from '@/queries/projects';

export const useGetProjects = () => {
  return useGetProjectsQuery();
};

export const useCreateProject = () => {
  return useCreateProjectMutation();
};

export const useUpdateProject = () => {
  return useUpdateProjectMutation();
};

export const useDeleteProject = () => {
  return useDeleteProjectMutation();
};
