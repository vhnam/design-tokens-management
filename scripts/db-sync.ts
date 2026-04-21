import { connect, type Database } from '@tursodatabase/sync';
import BetterSqlite3 from 'better-sqlite3';

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

const localPath = process.env.DATABASE_URL!;

const db = await connect({
  path: localPath,
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
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
