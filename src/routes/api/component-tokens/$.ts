import { createFileRoute } from '@tanstack/react-router';

import { db } from '@/db';
import { componentTokens } from '@/db/tokens.table';

export const Route = createFileRoute('/api/component-tokens/$')({
  server: {
    handlers: {
      GET: async () => {
        const rows = await db.select().from(componentTokens);
        return new Response(JSON.stringify(rows), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
