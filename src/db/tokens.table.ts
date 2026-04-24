import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { TokenLayer, TokenTheme } from '@/enums/token';
import type { TokenType } from '@/enums/token';

import { timestampColumns } from './base.table';

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
export const primitiveTokens = sqliteTable(
  'primitive_tokens',
  {
    ...baseColumns,
    workspaceId: text('workspace_id').notNull(),
    ...timestampColumns,
  },
  (t) => [index('primitive_workspace_idx').on(t.workspaceId)],
);

// Layer 2 — has theme, no brand, no component
export const semanticTokens = sqliteTable(
  'semantic_tokens',
  {
    ...baseColumns,
    group: text('group').notNull(),
    theme: text('theme').$type<TokenTheme>().notNull().default(TokenTheme.Light),
    ...timestampColumns,
  },
  (t) => [index('semantic_theme_group_name_idx').on(t.theme, t.group, t.name)],
);

// Layer 3a — brand overrides on semantic tokens
export const brandOverrides = sqliteTable(
  'brand_overrides',
  {
    ...baseColumns,
    theme: text('theme').$type<TokenTheme>().notNull().default(TokenTheme.Light),
    brand: text('brand').notNull(),
    layer: text('layer').$type<TokenLayer>().notNull().default(TokenLayer.Semantic),
    ...timestampColumns,
  },
  (t) => [index('override_brand_idx').on(t.brand), index('override_name_brand_idx').on(t.name, t.brand)],
);

// Layer 3b — component tokens per brand + theme
export const componentTokens = sqliteTable(
  'component_tokens',
  {
    ...baseColumns,
    theme: text('theme').$type<TokenTheme>().notNull().default(TokenTheme.Light),
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
