import { createFileRoute } from '@tanstack/react-router';

import { db } from '@/db';
import { workspaces } from '@/db/workspace.table';

export const Route = createFileRoute('/api/workspaces/$')({
  server: {
    handlers: {
      GET: async () => {
        const rows = await db.select().from(workspaces);
        return new Response(JSON.stringify(rows), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
