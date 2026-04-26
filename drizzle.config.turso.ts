import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

import { serverEnv } from './src/config/server-env';

config({ path: ['.env.local', '.env'] });

if (!serverEnv.TURSO_DATABASE_URL || !serverEnv.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required for Turso drizzle config.');
}

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/tokens.table.ts', './src/db/auth.table.ts', './src/db/workspace.table.ts'],
  dialect: 'turso',
  dbCredentials: {
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
});
