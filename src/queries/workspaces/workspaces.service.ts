import api from '@/integrations/axios/api';

import type { CreateWorkspacePayload, DeleteWorkspacePayload, UpdateWorkspacePayload } from './workspaces.type';

const API_ENDPOINT = '/api/workspaces';

export const getWorkspaces = async () => {
  const response = await api.get(API_ENDPOINT);
  return response.data;
};

export const createWorkspace = async (payload: CreateWorkspacePayload) => {
  const response = await api.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateWorkspace = async ({ id, ...payload }: UpdateWorkspacePayload) => {
  const response = await api.patch(`${API_ENDPOINT}/${id}`, payload);
  return response.data;
};

export const deleteWorkspace = async ({ id }: DeleteWorkspacePayload) => {
  const response = await api.delete(`${API_ENDPOINT}/${id}`);
  return response.data;
};
