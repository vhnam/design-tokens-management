import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

import { serverEnv } from './src/config/server-env';

config({ path: ['.env.local', '.env'] });

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/tokens.table.ts', './src/db/auth.table.ts', './src/db/workspace.table.ts'],
  dialect: 'sqlite',
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
