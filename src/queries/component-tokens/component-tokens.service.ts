import axios from 'axios';

import type {
  CreateComponentTokenPayload,
  DeleteComponentTokenPayload,
  UpdateComponentTokenPayload,
} from './component-tokens.type';

const API_ENDPOINT = '/api/component-tokens';

export const getComponentTokens = async () => {
  const response = await axios.get(API_ENDPOINT);
  return response.data;
};

export const createComponentToken = async (payload: CreateComponentTokenPayload) => {
  const response = await axios.post(API_ENDPOINT, { data: payload });
  return response.data;
};

export const updateComponentToken = async (payload: UpdateComponentTokenPayload) => {
  const response = await axios.patch(API_ENDPOINT, { data: payload });
  return response.data;
};

export const deleteComponentToken = async (payload: DeleteComponentTokenPayload) => {
  const response = await axios.delete(API_ENDPOINT, { data: payload });
  return response.data;
};
