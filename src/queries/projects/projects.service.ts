import api from '@/integrations/axios/api';

import type { CreateProjectPayload, DeleteProjectPayload, UpdateProjectPayload } from './projects.type';

const API_ENDPOINT = '/api/projects';

export const getProjects = async () => {
  const response = await api.get(API_ENDPOINT);
  return response.data;
};

export const createProject = async (payload: CreateProjectPayload) => {
  const response = await api.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateProject = async ({ id, ...payload }: UpdateProjectPayload) => {
  const response = await api.patch(`${API_ENDPOINT}/${id}`, payload);
  return response.data;
};

export const deleteProject = async ({ id }: DeleteProjectPayload) => {
  const response = await api.delete(`${API_ENDPOINT}/${id}`);
  return response.data;
};
