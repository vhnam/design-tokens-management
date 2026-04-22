import { createFileRoute } from '@tanstack/react-router';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { primitiveTokens } from '@/db/tokens.table';

import { TokenType } from '@/types/token';

const TOKEN_TYPES = new Set<TokenType>([
  TokenType.Color,
  TokenType.Dimension,
  TokenType.FontFamily,
  TokenType.FontWeight,
  TokenType.Duration,
  TokenType.CubicBezier,
  TokenType.Number,
]);

function isTokenType(value: unknown): value is TokenType {
  return typeof value === 'string' && TOKEN_TYPES.has(value as TokenType);
}

export const Route = createFileRoute('/api/tokens/$')({
  server: {
    handlers: {
      GET: async () => {
        const rows = await db.select().from(primitiveTokens);
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

        const { name, value, type, description } = body as Record<string, unknown>;
        const nameStr = typeof name === 'string' ? name.trim() : '';
        const valueStr = typeof value === 'string' ? value.trim() : '';
        const descriptionStr = typeof description === 'string' && description.trim() !== '' ? description.trim() : null;

        if (!nameStr || !valueStr) {
          return new Response(JSON.stringify({ error: 'Name and value are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!isTokenType(type)) {
          return new Response(JSON.stringify({ error: 'Invalid token type' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const [row] = await db
          .insert(primitiveTokens)
          .values({
            name: nameStr,
            value: valueStr,
            type,
            description: descriptionStr,
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

        const { id, name, value, type, description } = body as Record<string, unknown>;
        const idStr = typeof id === 'string' ? id.trim() : '';
        if (!idStr) {
          return new Response(JSON.stringify({ error: 'id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const patch: {
          name?: string;
          value?: string;
          type?: TokenType;
          description?: string | null;
          updatedAt?: Date;
        } = {};

        if (name !== undefined) {
          if (typeof name !== 'string' || name.trim() === '') {
            return new Response(JSON.stringify({ error: 'name must be a non-empty string' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.name = name.trim();
        }
        if (value !== undefined) {
          if (typeof value !== 'string' || value.trim() === '') {
            return new Response(JSON.stringify({ error: 'value must be a non-empty string' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.value = value.trim();
        }
        if (type !== undefined) {
          if (!isTokenType(type)) {
            return new Response(JSON.stringify({ error: 'Invalid token type' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.type = type;
        }
        if (description !== undefined) {
          if (description !== null && typeof description !== 'string') {
            return new Response(JSON.stringify({ error: 'description must be a string or null' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.description = typeof description === 'string' && description.trim() !== '' ? description.trim() : null;
        }

        const hasTokenField =
          patch.name !== undefined ||
          patch.value !== undefined ||
          patch.type !== undefined ||
          patch.description !== undefined;

        if (!hasTokenField) {
          return new Response(JSON.stringify({ error: 'No valid fields to update' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        patch.updatedAt = new Date();

        const rows = await db.update(primitiveTokens).set(patch).where(eq(primitiveTokens.id, idStr)).returning();

        if (rows.length === 0) {
          return new Response(JSON.stringify({ error: 'Token not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const updated = rows[0];

        return new Response(JSON.stringify(updated), {
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

        const { ids } = body as Record<string, unknown>;
        if (!Array.isArray(ids) || ids.length === 0) {
          return new Response(JSON.stringify({ error: 'ids must be a non-empty array' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!ids.every((id): id is string => typeof id === 'string' && id.trim() !== '')) {
          return new Response(JSON.stringify({ error: 'Each id must be a non-empty string' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        await db.delete(primitiveTokens).where(inArray(primitiveTokens.id, ids));

        return new Response(null, { status: 204 });
      },
    },
  },
});
