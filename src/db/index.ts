import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as authSchema from './auth.table.ts';
import * as tokensSchema from './tokens.table.ts';

export const schema = {
  ...tokensSchema,
  ...authSchema,
};

export const db = drizzle(process.env.DATABASE_URL!, { schema });
export { authSchema };
export * as authTable from './auth.table.ts';
