import api from '@/integrations/axios/api';

import type {
  CreatePrimitiveTokenPayload,
  DeletePrimitiveTokenPayload,
  UpdatePrimitiveTokenPayload,
} from './primitive-tokens.type';

const API_ENDPOINT = '/api/primitive-tokens';

export const getPrimitiveTokens = async () => {
  const response = await api.get(API_ENDPOINT);
  return response.data;
};

export const createPrimitiveToken = async (payload: CreatePrimitiveTokenPayload) => {
  const response = await api.post(API_ENDPOINT, payload);
  return response.data;
};

export const updatePrimitiveToken = async ({ id, ...payload }: UpdatePrimitiveTokenPayload) => {
  const response = await api.patch(`${API_ENDPOINT}/${id}`, payload);
  return response.data;
};

export const deletePrimitiveToken = async ({ id }: DeletePrimitiveTokenPayload) => {
  const response = await api.delete(`${API_ENDPOINT}/${id}`);
  return response.data;
};
