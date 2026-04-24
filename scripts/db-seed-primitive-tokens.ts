import { readFileSync, readdirSync } from 'node:fs';

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

const WORKSPACE_NAMES = [
  {
    name: 'TailwindCSS',
    slug: 'tailwind-v4',
  },
  {
    name: 'Care',
    slug: 'care',
  },
  // {
  //   name: 'Chakra UI',
  //   slug: 'chakra-ui',
  // },
  // {
  //   name: 'Mantine',
  //   slug: 'mantine',
  // },
];

for (const workspaceData of WORKSPACE_NAMES) {
  const [workspace] = await db.select().from(workspaces).where(eq(workspaces.name, workspaceData.name));
  if (!workspace) {
    console.error(`Workspace "${workspaceData.name}" not found. Run db-seed-workspaces first.`);
    process.exit(1);
  }
}

async function seedingWorkspace(workspaceData: (typeof WORKSPACE_NAMES)[number]) {
  const [workspace] = await db.select().from(workspaces).where(eq(workspaces.name, workspaceData.name));
  if (!workspace) {
    console.error(`Workspace "${workspaceData.name}" not found. Run db-seed-workspaces first.`);
    process.exit(1);
  }

  type TokenRow = Omit<typeof primitiveTokens.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>;
  const tokensDirectory = new URL(`../src/assets/${workspaceData.slug}/`, import.meta.url);
  let tokenFiles: string[] = [];
  try {
    tokenFiles = readdirSync(tokensDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json') && entry.name.startsWith('primitive-tokens-'))
      .map((entry) => entry.name)
      .sort();
  } catch {
    console.error(
      `Token directory for workspace "${workspaceData.name}" not found at src/assets/${workspaceData.slug}.`,
    );
    process.exit(1);
  }

  const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

  const rawTokens = tokenFiles.flatMap((file) => {
    const url = new URL(file, tokensDirectory);
    const parsed = JSON.parse(readFileSync(url, 'utf8'));
    if (!Array.isArray(parsed)) {
      console.warn(
        `[db:seed:primitive-tokens] Skipping non-array JSON file "${file}" for workspace "${workspaceData.name}".`,
      );
      return [];
    }

    return parsed.flatMap((token, index) => {
      if (typeof token !== 'object' || token === null) {
        console.warn(
          `[db:seed:primitive-tokens] Skipping invalid token at ${file}[${index}] for workspace "${workspaceData.name}" (expected object).`,
        );
        return [];
      }

      const candidate = token as Partial<Omit<TokenRow, 'workspaceId'>>;
      if (
        !isNonEmptyString(candidate.name) ||
        !isNonEmptyString(candidate.value) ||
        !isNonEmptyString(candidate.type)
      ) {
        console.warn(
          `[db:seed:primitive-tokens] Skipping invalid token at ${file}[${index}] for workspace "${workspaceData.name}" (requires non-empty name, value, and type).`,
        );
        return [];
      }

      return [candidate];
    });
  });

  const tokensWithWorkspace: TokenRow[] = rawTokens.map((token) => ({
    ...token,
    workspaceId: workspace.id,
  }));

  await db.delete(primitiveTokens).where(eq(primitiveTokens.workspaceId, workspace.id));

  const result =
    tokensWithWorkspace.length === 0
      ? []
      : await db.insert(primitiveTokens).values(tokensWithWorkspace).returning({ id: primitiveTokens.id });

  console.log(
    `[db:seed:primitive-tokens] Seeded ${result.length} rows into primitive_tokens for workspace "${workspaceData.name}" (${workspace.id}).`,
  );
}

await Promise.all(WORKSPACE_NAMES.map((workspaceData) => seedingWorkspace(workspaceData)));
