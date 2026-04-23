import { createFileRoute } from '@tanstack/react-router';

import { db } from '@/db';
import { semanticTokens } from '@/db/tokens.table';

export const Route = createFileRoute('/api/semantic-tokens/$')({
  server: {
    handlers: {
      GET: async () => {
        const rows = await db.select().from(semanticTokens);
        return new Response(JSON.stringify(rows), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
