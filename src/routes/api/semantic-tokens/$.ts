import { createFileRoute } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { semanticTokens } from '@/db/tokens.table';
import { TokenType } from '@/enums/token';
import { semanticTokenSchema, typographyCompositeSchema } from '@/schemas/semantic-token.schema';

function parseTypographyValue(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

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

        const parsed = semanticTokenSchema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const payload = parsed.data;
        if (payload.type === TokenType.Typography) {
          const typographyResult = typographyCompositeSchema.safeParse(parseTypographyValue(payload.value));
          if (!typographyResult.success) {
            return new Response(JSON.stringify({ error: 'Invalid typography token value' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }

        const [row] = await db
          .insert(semanticTokens)
          .values({
            name: payload.name.trim(),
            value: payload.value.trim(),
            type: payload.type,
            group: payload.group.trim(),
            theme: payload.theme,
            description: payload.description?.trim() ? payload.description.trim() : null,
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

        const { id, name, value, type, group, theme, description } = body as Record<string, unknown>;
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
          type?: (typeof semanticTokens.$inferInsert)['type'];
          group?: string;
          theme?: (typeof semanticTokens.$inferInsert)['theme'];
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
          if (type !== TokenType.Typography && type !== TokenType.Shadow && type !== TokenType.Border && type !== TokenType.Gradient) {
            return new Response(JSON.stringify({ error: 'Invalid token type' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.type = type;
        }

        if (group !== undefined) {
          if (typeof group !== 'string' || group.trim() === '') {
            return new Response(JSON.stringify({ error: 'group must be a non-empty string' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.group = group.trim();
        }

        if (theme !== undefined) {
          if (theme !== 'light' && theme !== 'dark') {
            return new Response(JSON.stringify({ error: 'theme must be either "light" or "dark"' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          patch.theme = theme;
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
          patch.group !== undefined ||
          patch.theme !== undefined ||
          patch.description !== undefined;

        if (!hasTokenField) {
          return new Response(JSON.stringify({ error: 'No valid fields to update' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const existingTokens = await db
          .select({
            type: semanticTokens.type,
            value: semanticTokens.value,
          })
          .from(semanticTokens)
          .where(eq(semanticTokens.id, idStr));

        if (existingTokens.length === 0) {
          return new Response(JSON.stringify({ error: 'Token not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const existingToken = existingTokens[0];
        const nextType = patch.type ?? existingToken.type;
        const nextValue = patch.value ?? existingToken.value;
        if (nextType === TokenType.Typography) {
          const typographyResult = typographyCompositeSchema.safeParse(parseTypographyValue(nextValue));
          if (!typographyResult.success) {
            return new Response(JSON.stringify({ error: 'Invalid typography token value' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }

        patch.updatedAt = new Date();
        const rows = await db.update(semanticTokens).set(patch).where(eq(semanticTokens.id, idStr)).returning();
        if (rows.length === 0) {
          return new Response(JSON.stringify({ error: 'Token not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify(rows[0]), {
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

        const { id } = body as Record<string, unknown>;
        const idStr = typeof id === 'string' ? id.trim() : '';
        if (!idStr) {
          return new Response(JSON.stringify({ error: 'id is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        await db.delete(semanticTokens).where(eq(semanticTokens.id, idStr));
        return new Response(null, { status: 204 });
      },
    },
  },
});
