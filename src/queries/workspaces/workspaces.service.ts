import axios from 'axios';

import type { CreateWorkspacePayload, DeleteWorkspacePayload, UpdateWorkspacePayload } from './workspaces.type';

const API_ENDPOINT = '/api/workspaces';

export const getWorkspaces = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data;
};

export const createWorkspace = async (payload: CreateWorkspacePayload) => {
  const response = await axios.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateWorkspace = async (payload: UpdateWorkspacePayload) => {
  const response = await axios.patch(API_ENDPOINT, payload);
  return response.data;
};

export const deleteWorkspace = async (payload: DeleteWorkspacePayload) => {
  const response = await axios.delete(API_ENDPOINT, { data: payload });
  return response.data;
};
