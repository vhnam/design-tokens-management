import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_ENDPOINT: z.url().refine((value) => (import.meta.env.PROD ? value.startsWith('https://') : true), {
      message: 'VITE_API_ENDPOINT must use HTTPS in production',
    }),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
