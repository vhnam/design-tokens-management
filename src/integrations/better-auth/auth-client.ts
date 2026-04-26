import { createAuthClient } from 'better-auth/react';

import { env } from '@/config/env';

const authBaseURL = env.VITE_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});
