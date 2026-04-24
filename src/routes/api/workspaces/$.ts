import { createFileRoute } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { workspaces } from '@/db/workspace.table';

import type { Workspace } from '@/types/workspace';

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
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (body === null || typeof body !== 'object') {
          return new Response(JSON.stringify({ error: 'Body must be a JSON object' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const { name, image, brands, themes } = body as Workspace;
        const nameStr = typeof name === 'string' ? name.trim() : '';
        const imageStr = typeof image === 'string' ? image.trim() : '';
        const brandsStr = brands.map((brand) => brand.trim());
        const themesStr = themes.map((theme) => theme.trim());

        if (!nameStr) {
          return new Response(JSON.stringify({ error: 'Name is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const [row] = await db
          .insert(workspaces)
          .values({
            name: nameStr,
            image: imageStr,
            brands: JSON.stringify(brandsStr),
            themes: JSON.stringify(themesStr),
          })
          .returning();

        return new Response(JSON.stringify(row), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      },
      PATCH: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (body === null || typeof body !== 'object') {
          return new Response(JSON.stringify({ error: 'Body must be a JSON object' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const { id, name, image, brands, themes } = body as Workspace;
        const idStr = typeof id === 'string' ? id.trim() : '';
        const nameStr = typeof name === 'string' ? name.trim() : '';
        const imageStr = typeof image === 'string' ? image.trim() : '';
        const brandsStr = brands.map((brand) => brand.trim());
        const themesStr = themes.map((theme) => theme.trim());

        if (!idStr) {
          return new Response(JSON.stringify({ error: 'Id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!nameStr) {
          return new Response(JSON.stringify({ error: 'Name is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const [row] = await db
          .update(workspaces)
          .set({
            name: nameStr,
            image: imageStr,
            brands: JSON.stringify(brandsStr),
            themes: JSON.stringify(themesStr),
          })
          .where(eq(workspaces.id, idStr))
          .returning();

        return new Response(JSON.stringify(row), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
      DELETE: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (body === null || typeof body !== 'object') {
          return new Response(JSON.stringify({ error: 'Body must be a JSON object' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const { id } = body as Workspace;
        const idStr = typeof id === 'string' ? id.trim() : '';
        if (!idStr) {
          return new Response(JSON.stringify({ error: 'Id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        await db.delete(workspaces).where(eq(workspaces.id, idStr));

        return new Response(null, { status: 204 });
      },
    },
  },
});
