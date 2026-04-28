import { env } from '@/config/env';
import { createAuthClient } from 'better-auth/react';

const authBaseURL = env.VITE_API_ENDPOINT;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});
