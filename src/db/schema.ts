import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export type TokenLayer = 'primitive' | 'semantic' | 'component';

export type TokenTheme = 'light' | 'dark';

export type TokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier'
  | 'number';

const timestampColumns = {
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
};

// shared column factories
const baseColumns = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  value: text('value').notNull(),
  type: text('type').$type<TokenType>().notNull(),
  description: text('description'),
};

// Layer 1 — no theme, no brand, no component
export const primitiveTokens = sqliteTable('primitive_tokens', {
  ...baseColumns,
  ...timestampColumns,
});

// Layer 2 — has theme, no brand, no component
export const semanticTokens = sqliteTable(
  'semantic_tokens',
  {
    ...baseColumns,
    theme: text('theme').$type<TokenTheme>().notNull().default('light'),
    ...timestampColumns,
  },
  (t) => [
    index('semantic_theme_idx').on(t.theme),
    index('semantic_name_idx').on(t.name),
  ],
);

// Layer 3a — brand overrides on semantic tokens
export const brandOverrides = sqliteTable(
  'brand_overrides',
  {
    ...baseColumns,
    theme: text('theme').$type<TokenTheme>().notNull().default('light'),
    brand: text('brand').notNull(),
    layer: text('layer').$type<TokenLayer>().notNull().default('semantic'),
    ...timestampColumns,
  },
  (t) => [
    index('override_brand_idx').on(t.brand),
    index('override_name_brand_idx').on(t.name, t.brand),
  ],
);

// Layer 3b — component tokens per brand + theme
export const componentTokens = sqliteTable(
  'component_tokens',
  {
    ...baseColumns,
    theme: text('theme').$type<TokenTheme>().notNull().default('light'),
    brand: text('brand').notNull().default('default'),
    component: text('component').notNull(),
    ...timestampColumns,
  },
  (t) => [
    index('component_brand_idx').on(t.brand),
    index('component_name_idx').on(t.component),
    index('component_brand_theme_idx').on(t.brand, t.theme),
  ],
);

export const workspaces = sqliteTable('workspaces', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  brands: text('brands').notNull().default('["default"]'), // JSON array
  themes: text('themes').notNull().default('["light","dark"]'), // JSON array
  ...timestampColumns,
});
