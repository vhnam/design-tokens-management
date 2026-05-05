import { api } from '@/integrations/axios';

import type {
  CreateComponentTokenPayload,
  DeleteComponentTokenPayload,
  UpdateComponentTokenPayload,
} from './component-tokens.type';

const API_ENDPOINT = '/api/component-tokens';

export const getComponentTokens = async () => {
  const response = await api.get(API_ENDPOINT);
  return response.data;
};

export const createComponentToken = async (payload: CreateComponentTokenPayload) => {
  const response = await api.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateComponentToken = async ({ id, ...payload }: UpdateComponentTokenPayload) => {
  const response = await api.patch(`${API_ENDPOINT}/${id}`, payload);
  return response.data;
};

export const deleteComponentToken = async ({ id }: DeleteComponentTokenPayload) => {
  const response = await api.delete(`${API_ENDPOINT}/${id}`);
  return response.data;
};
