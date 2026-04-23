import axios from 'axios';

import type {
  CreateSemanticTokenPayload,
  DeleteSemanticTokenPayload,
  UpdateSemanticTokenPayload,
} from './semantic-tokens.type';

const API_ENDPOINT = '/api/semantic-tokens';

export const getSemanticTokens = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data;
};

export const createSemanticToken = async (payload: CreateSemanticTokenPayload) => {
  const response = await axios.post(API_ENDPOINT, payload);
  return response.data;
};

export const updateSemanticToken = async (payload: UpdateSemanticTokenPayload) => {
  const response = await axios.patch(API_ENDPOINT, payload);
  return response.data;
};

export const deleteSemanticToken = async (payload: DeleteSemanticTokenPayload) => {
  const response = await axios.delete(API_ENDPOINT, { data: payload });
  return response.data;
};
