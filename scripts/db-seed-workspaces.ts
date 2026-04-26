import { config } from 'dotenv';

import { serverEnv } from '../src/config/server-env';

config({ path: ['.env.local', '.env'] });

if (!serverEnv.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env or .env.local.');
  process.exit(1);
}

const { db } = await import(new URL('../src/db/index.ts', import.meta.url).href);
const { workspaces } = await import(new URL('../src/db/workspace.table.ts', import.meta.url).href);

const rawWorkspaces = [
  {
    name: 'TailwindCSS',
    image: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.96ee6a5a.svg',
    brands: ['default'],
    themes: ['light', 'dark'],
  },
  {
    name: 'Chakra UI',
    image: 'https://github.com/chakra-ui/chakra-ui/blob/main/media/logomark-colored@2x.png?raw=true',
    brands: ['default'],
    themes: ['light', 'dark'],
  },
  {
    name: 'Mantine',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/63dafbbf5f0135eb36455b7add4c0ddcd0f3240a/apps/mantine.dev/public/favicon.svg',
    brands: ['default'],
    themes: ['light', 'dark'],
  },
  {
    name: 'Care',
    image: 'https://avatars.slack-edge.com/2025-04-04/8704509673861_8d73c671ec094e04f86d_102.png',
    brands: ['default'],
    themes: ['light'],
  },
];

const workspaceRows = rawWorkspaces.map((workspace) => ({
  ...workspace,
  brands: JSON.stringify(workspace.brands),
  themes: JSON.stringify(workspace.themes),
}));

await db.delete(workspaces);

const result =
  workspaceRows.length === 0 ? [] : await db.insert(workspaces).values(workspaceRows).returning({ id: workspaces.id });

console.log(`[db:seed:workspaces] Seeded ${result.length} rows into workspaces.`);
