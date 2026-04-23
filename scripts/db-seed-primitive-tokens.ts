import { readFileSync } from 'node:fs';

import { config } from 'dotenv';

config({ path: ['.env.local', '.env'] });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env or .env.local.');
  process.exit(1);
}

const { db } = await import(new URL('../src/db/index.ts', import.meta.url).href);
const { primitiveTokens } = await import(new URL('../src/db/tokens.table.ts', import.meta.url).href);

type TokenRow = Omit<typeof primitiveTokens.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>;

const tokenFiles = [
  '../src/assets/primitive-tokens-tailwind-v4-colors.json',
  '../src/assets/primitive-tokens-tailwind-v4-typography.json',
  '../src/assets/primitive-tokens-tailwind-v4-sizing.json',
  '../src/assets/primitive-tokens-tailwind-v4-motion.json',
  '../src/assets/primitive-tokens-tailwind-v4-shadows.json',
];

const rawTokens = tokenFiles.flatMap((file) => {
  const url = new URL(file, import.meta.url);
  return JSON.parse(readFileSync(url, 'utf8')) as Array<TokenRow>;
});

await db.delete(primitiveTokens);

const result =
  rawTokens.length === 0
    ? []
    : await db.insert(primitiveTokens).values(rawTokens).returning({ id: primitiveTokens.id });

console.log(`[db:seed:primitive-tokens] Seeded ${result.length} rows into primitive_tokens.`);
