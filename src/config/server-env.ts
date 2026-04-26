import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    TURSO_DATABASE_URL: z.string().min(1).optional(),
    TURSO_AUTH_TOKEN: z.string().min(1).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
