import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { timestampColumns } from './base.table';

export const brands = sqliteTable('brands', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text('workspace_id').notNull(),
  name: text('name').notNull(), // "Brand A" — display name
  slug: text('slug').notNull(), // "brand-a" — used as FK in component/override tables
  ...timestampColumns,
});

export const workspaces = sqliteTable('workspaces', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  image: text('image'),
  brands: text('brands').notNull().default('["default"]'), // JSON array
  themes: text('themes').notNull().default('["light","dark"]'), // JSON array
  ...timestampColumns,
});
