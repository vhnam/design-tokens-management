import { connect } from '@tursodatabase/sync';
import type { Database } from '@tursodatabase/sync';
import BetterSqlite3 from 'better-sqlite3';

import { serverEnv } from '../src/config/server-env';

if (!serverEnv.TURSO_DATABASE_URL || !serverEnv.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required for db:sync.');
}

function hasLocalAppTables(path: string) {
  const sqlite = new BetterSqlite3(path, { readonly: true });

  try {
    const rows = sqlite
      .prepare(
        `
          SELECT name
          FROM sqlite_master
          WHERE type = 'table'
        `,
      )
      .all() as Array<{ name: string }>;

    return rows.some(({ name }) => {
      if (name.startsWith('sqlite_')) return false;
      if (name.startsWith('turso_')) return false;
      if (name === '__drizzle_migrations') return false;
      return true;
    });
  } finally {
    sqlite.close();
  }
}

const localPath = serverEnv.DATABASE_URL;

const db = await connect({
  path: localPath,
  url: serverEnv.TURSO_DATABASE_URL,
  authToken: serverEnv.TURSO_AUTH_TOKEN,
});

async function syncWhenOnline(database: Database) {
  await database.push();
  await database.pull();
}

if (hasLocalAppTables(localPath)) {
  // Push first so local data changes are not overwritten by a pull.
  // Note: schema migrations must be applied directly to Turso.
  await syncWhenOnline(db);
} else {
  // Safety guard: never push an uninitialized local db.
  console.warn('[db:sync] Local db has no app tables. Pulling remote only to avoid destructive push.');
  await db.pull();
}
