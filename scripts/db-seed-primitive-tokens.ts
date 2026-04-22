import { readFileSync } from 'node:fs';

import { config } from 'dotenv';

config({ path: ['.env.local', '.env'] });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env or .env.local.');
  process.exit(1);
}

const { db } = await import(new URL('../src/db/index.ts', import.meta.url).href);
const { primitiveTokens } = await import(new URL('../src/db/tokens.table.ts', import.meta.url).href);

const jsonUrl = new URL('../src/assets/primitive-tokens-tailwind-v4-colors.json', import.meta.url);
const rawTokens = JSON.parse(readFileSync(jsonUrl, 'utf8')) as Array<
  Omit<typeof primitiveTokens.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>
>;

await db.delete(primitiveTokens);

const result =
  rawTokens.length === 0
    ? []
    : await db.insert(primitiveTokens).values(rawTokens).returning({ id: primitiveTokens.id });

console.log(`[db:seed:primitive-tokens] Seeded ${result.length} rows into primitive_tokens.`);
