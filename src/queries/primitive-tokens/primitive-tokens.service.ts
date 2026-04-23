import axios from 'axios';

import type {
  CreatePrimitiveTokenPayload,
  DeletePrimitiveTokenPayload,
  UpdatePrimitiveTokenPayload,
} from './primitive-tokens.type';

const API_ENDPOINT = '/api/primitive-tokens';

export const getPrimitiveTokens = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data;
};

export const createPrimitiveToken = async (payload: CreatePrimitiveTokenPayload) => {
  const response = await axios.post(API_ENDPOINT, payload);
  return response.data;
};

export const updatePrimitiveToken = async (payload: UpdatePrimitiveTokenPayload) => {
  const response = await axios.patch(API_ENDPOINT, payload);
  return response.data;
};

export const deletePrimitiveToken = async (payload: DeletePrimitiveTokenPayload) => {
  const response = await axios.delete(API_ENDPOINT, { data: payload });
  return response.data;
};
