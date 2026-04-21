import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
import { sql } from 'drizzle-orm';

config({ path: ['.env.local', '.env'] });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env or .env.local.');
  process.exit(1);
}

const { db } = await import(new URL('../src/db/index.ts', import.meta.url).href);
const { primitiveTokens } = await import(new URL('../src/db/schema.ts', import.meta.url).href);

const jsonUrl = new URL('../src/assets/primitive-tokens-tailwind-v4-colors.json', import.meta.url);
const tokens = JSON.parse(readFileSync(jsonUrl, 'utf8')) as (typeof primitiveTokens.$inferInsert)[];

const result = await db
  .insert(primitiveTokens)
  .values(tokens)
  .onConflictDoUpdate({
    target: primitiveTokens.id,
    set: {
      name: sql`excluded.name`,
      value: sql`excluded.value`,
      type: sql`excluded.type`,
      description: sql`excluded.description`,
      updatedAt: new Date(),
    },
  })
  .returning({ id: primitiveTokens.id });

console.log(`[seed:primitive-tokens] Upserted ${result.length} rows into primitive_tokens.`);
