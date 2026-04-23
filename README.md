# Design Tokens Management

Design Tokens Management is a TanStack Start app for managing multi-layer design tokens with SQLite persistence, Better Auth authentication, and a Tailwind-based component system.

## Tech Stack

- TanStack Start + TanStack Router
- React 19 + Vite
- Tailwind CSS v4 + Base UI + Shadcn/ui
- Better Auth
- Drizzle ORM + Drizzle Kit
- SQLite (via `better-sqlite3`)
- React Hook Form + Zod

## Prerequisites

- Node.js 22+
- pnpm 9+

## Quick Start

```bash
pnpm install
cp .env.example .env.local
cp .env.example .env
pnpm db::generate
pnpm db:migrate
pnpm dev
```

App runs at `http://localhost:3000`.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create environment variable files:

   ```bash
   cp .env.example .env.local
   cp .env.example .env
   ```

   Why both files:
   - `.env.local` is used by the app and local scripts.
   - `.env` is used by commands that explicitly load `.env` (for example `pnpm db:sync`).

3. Fill required values:
   - `BETTER_AUTH_URL` (for local dev: `http://localhost:3000`)
   - `BETTER_AUTH_SECRET` (generate with `npx -y @better-auth/cli secret`)
   - `DATABASE_URL` (for local SQLite: `dev.db`)
   - `MAILER_TOKEN` (required for verification emails)
   - `TURSO_DATABASE_URL` (optional, used by cloud sync flows)
   - `TURSO_AUTH_TOKEN` (optional, used by cloud sync flows)

4. Run Better Auth migrations:

   ```bash
   pnpm dlx auth@latest migrate
   ```

   This creates/updates Better Auth tables (`user`, `session`, `account`, `verification`).

5. Run Drizzle migrations:

   ```bash
   pnpm db:migrate
   ```

   This applies app-specific schema changes from:
   - `src/db/tokens.table.ts`
   - `src/db/auth.table.ts`

6. Seed primitive tokens (optional):

   ```bash
   pnpm db:seed:primitives
   ```

7. Start the development server:

   ```bash
   pnpm dev
   ```

## Scripts

- `pnpm dev`: Start local development server (default `http://localhost:3000`)
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build locally
- `pnpm test`: Run tests with Vitest
- `pnpm lint`: Run ESLint
- `pnpm format`: Check formatting with Prettier
- `pnpm check`: Auto-fix formatting and lint issues
- `pnpm db:generate`: Generate Drizzle migration files from schema
- `pnpm db:migrate`: Apply pending migrations
- `pnpm db:push`: Push schema changes directly to database
- `pnpm db:push:cloud`: Push schema using the Turso config
- `pnpm db:pull`: Pull schema from existing database
- `pnpm db:studio`: Open Drizzle Studio
- `pnpm db:sync`: Sync local and cloud database state
- `pnpm db:seed:primitives`: Seed primitive tokens from `src/assets/primitive-tokens-tailwind-v4-colors.json`

## API

- Primitive tokens API route: `src/routes/api/primitive-tokens/$.ts`
- Auth API route: `src/routes/api/auth/$.ts`

## Authentication

- Better Auth is configured in `src/lib/auth.ts`.
- Auth API handlers are exposed at `src/routes/api/auth/$.ts`.
- Client helpers live in `src/lib/auth-client.ts`.
- UI auth flows live under `src/routes/_public/auth/` (`login`, `register`, `forgot-password`).

## Database

- Drizzle schema files:
  - `src/db/tokens.table.ts`
  - `src/db/auth.table.ts`
- Drizzle config: `drizzle.config.ts`
- Turso Drizzle config: `drizzle.config.turso.ts`
- Migration output: `drizzle/`
- Database client: `src/db/index.ts`

Current schema models token layers and workspaces, including:

- `primitive_tokens`
- `semantic_tokens`
- `brand_overrides`
- `component_tokens`
- `workspaces`

## Routing

This project uses file-based routing with TanStack Router.

- Root shell/layout: `src/routes/__root.tsx`
- Home route: `src/routes/index.tsx`

## UI System

- Primitive components: `src/components/primitives/`
- Composite form components: `src/components/composites/`
- Global styles entry: `src/styles.css`

## Notes

- Do not commit real secrets in `.env.local`.
- Keep `.env.example` as the source of truth for required environment variables.
