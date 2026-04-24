import { readFileSync } from 'node:fs';

import { config } from 'dotenv';
import { eq } from 'drizzle-orm';

config({ path: ['.env.local', '.env'] });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env or .env.local.');
  process.exit(1);
}

const { db } = await import(new URL('../src/db/index.ts', import.meta.url).href);
const { primitiveTokens } = await import(new URL('../src/db/tokens.table.ts', import.meta.url).href);
const { workspaces } = await import(new URL('../src/db/workspace.table.ts', import.meta.url).href);

const WORKSPACE_NAME = 'TailwindCSS';

const [tailwindWorkspace] = await db.select().from(workspaces).where(eq(workspaces.name, WORKSPACE_NAME));

if (!tailwindWorkspace) {
  console.error(`Workspace "${WORKSPACE_NAME}" not found. Run db-seed-workspaces first.`);
  process.exit(1);
}

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
  return JSON.parse(readFileSync(url, 'utf8')) as Array<Omit<TokenRow, 'workspaceId'>>;
});

const tokensWithWorkspace: TokenRow[] = rawTokens.map((token) => ({
  ...token,
  workspaceId: tailwindWorkspace.id,
}));

await db.delete(primitiveTokens).where(eq(primitiveTokens.workspaceId, tailwindWorkspace.id));

const result =
  tokensWithWorkspace.length === 0
    ? []
    : await db.insert(primitiveTokens).values(tokensWithWorkspace).returning({ id: primitiveTokens.id });

console.log(
  `[db:seed:primitive-tokens] Seeded ${result.length} rows into primitive_tokens for workspace "${WORKSPACE_NAME}" (${tailwindWorkspace.id}).`,
);
