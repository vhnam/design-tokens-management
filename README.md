# Design Tokens Management

A TanStack Start app for managing multi-layer design tokens with local SQLite persistence and Better Auth authentication.

## Tech Stack

- TanStack Start + TanStack Router
- React 19 + Vite
- Tailwind CSS 4
- Better Auth
- Drizzle ORM + Drizzle Kit
- SQLite (via `better-sqlite3`)

## Prerequisites

- Node.js 20+
- npm 10+

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Fill required values in `.env.local`:
   - `BETTER_AUTH_URL` (for local dev: `http://localhost:3000`)
   - `BETTER_AUTH_SECRET` (generate with `npx -y @better-auth/cli secret`)
   - `DATABASE_URL` (for local SQLite: `dev.db`)

4. Run Better Auth migrations:

   ```bash
   pnpm dlx auth@latest migrate
   ```

   This creates/updates Better Auth tables (`user`, `session`, `account`, `verification`).

5. Run Drizzle migrations:

   ```bash
   npm run db:migrate
   ```

   This applies app-specific schema changes from `src/db/schema.ts`.

6. Start development server:

   ```bash
   npm run dev
   ```

App runs at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Start local development server on port `3000`
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run test`: Run tests with Vitest
- `npm run lint`: Run ESLint
- `npm run format`: Check formatting with Prettier
- `npm run check`: Auto-fix formatting and lint issues
- `npm run db:generate`: Generate Drizzle migration files from schema
- `npm run db:migrate`: Apply pending migrations
- `npm run db:push`: Push schema changes directly to database
- `npm run db:pull`: Pull schema from existing database
- `npm run db:studio`: Open Drizzle Studio

## Authentication

- Better Auth is configured in `src/lib/auth.ts`.
- Auth API handlers are exposed at `src/routes/api/auth/$.ts`.
- Client helpers live in `src/lib/auth-client.ts`.

## Database

- Drizzle schema: `src/db/schema.ts`
- Drizzle config: `drizzle.config.ts`
- Migration output: `drizzle/`
- Database client: `src/db/index.ts`

Current schema models token layers and workspaces, including:

- `primitive_tokens`
- `semantic_tokens`
- `brand_overrides`
- `component_tokens`
- `workspaces`

## Routing

This project uses file-based routing with TanStack Router:

- Root shell/layout: `src/routes/__root.tsx`
- Home route: `src/routes/index.tsx`

## Notes

- Do not commit real secrets in `.env.local`.
- Keep `.env.example` as the source of truth for required environment variables.
