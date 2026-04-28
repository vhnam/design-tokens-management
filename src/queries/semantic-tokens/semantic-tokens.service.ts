import api from '@/integrations/axios/api';

import type {
  CreateSemanticTokenPayload,
  DeleteSemanticTokenPayload,
  UpdateSemanticTokenPayload,
} from './semantic-tokens.type';

const API_ENDPOINT = '/api/semantic-tokens';

export const getSemanticTokens = async () => {
  const response = await api.get(API_ENDPOINT);
  return response.data;
};

export const createSemanticToken = async (payload: CreateSemanticTokenPayload) => {
  const response = await api.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateSemanticToken = async ({ id, ...payload }: UpdateSemanticTokenPayload) => {
  const response = await api.patch(`${API_ENDPOINT}/${id}`, payload);
  return response.data;
};

export const deleteSemanticToken = async ({ id }: DeleteSemanticTokenPayload) => {
  const response = await api.delete(`${API_ENDPOINT}/${id}`);
  return response.data;
};
