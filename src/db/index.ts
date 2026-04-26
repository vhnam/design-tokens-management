import { drizzle } from 'drizzle-orm/better-sqlite3';

import { serverEnv } from '@/config/server-env';

import * as tokensSchema from './tokens.table.ts';
import * as workspaceSchema from './workspace.table.ts';

export const schema = {
  ...tokensSchema,
  ...workspaceSchema,
};

export const db = drizzle(serverEnv.DATABASE_URL, { schema });
