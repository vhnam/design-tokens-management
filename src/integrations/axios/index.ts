import axios from 'axios';

import { authClient } from '@/integrations/better-auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      void authClient.signOut();
    }
    return Promise.reject(error);
  },
);
