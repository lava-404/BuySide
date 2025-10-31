## Buyside

E‑commerce demo built with Next.js App Router, Prisma (MongoDB), and Tailwind.

### Stack
- Next.js 16 (App Router) + TypeScript
- React 19
- Prisma 6 + MongoDB (Atlas or local)
- Tailwind CSS v4

---

## Quickstart

1) Install deps
```bash
pnpm install
# or npm i
```

2) Configure env
Create `.env` in the project root:
```bash
DATABASE_URL="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"
```

3) Setup database
```bash
npx prisma db push      # create collections/indexes
npx prisma generate     # generate Prisma Client
npx prisma db seed      # optional: seed products
```

4) Run
```bash
npm run dev
# open http://localhost:3000
```

---

## App Structure
- `app/` App Router pages and routes
  - `/` Home
  - `/products` Product list (client search/add)
  - `/products/[slug]` Product detail (server + client component)
  - `/admin` Admin panel (CRUD via API)
  - `/api/products` REST endpoints (GET, POST)
  - `/api/products/[id]` REST endpoints (GET, PUT, DELETE)
- `prisma/schema.prisma` Prisma schema (MongoDB)
- `prisma/seed.ts` Seed data (uses placehold.co images)
- `next.config.ts` Remote image domains (placehold.co)

---

## Features
- Products list with client‑side search/filter and add form
- Product detail page rendered on the server; client component for interactions
- Admin panel with create, edit, delete via API
- Prisma schema for `Product` with unique `slug`
- Image loading from `placehold.co` (configured in `next.config.ts`)

---

## Scripts
```bash
npm run dev       # start dev server
npm run build     # production build
npm start         # start production server
npm run lint      # lint
```

---

## Notes & Troubleshooting

### Prisma
- If `npx prisma db push` fails with P1013, ensure your `DATABASE_URL` includes a database name (e.g., `/buyside`).
- After editing `schema.prisma`, run `npx prisma generate` to refresh types.

### Images
- If you see “next/image unconfigured host”, add the domain to `next.config.ts` `images.remotePatterns`.
- Project is configured for `placehold.co` and sets `images.unoptimized = true` for local dev.

### Dev Toolbar/Indicators
- If a Next.js dev indicator shows, it appears only in dev. You can disable via `devIndicators` in `next.config.ts` if desired.

---

## Roadmap (for the assignment)
- Home `/`: convert to SSG (build‑time fetch) and show products with client search
- Product `/products/[slug]`: add ISR (`export const revalidate = 60`) + `generateStaticParams`
- Dashboard `/dashboard`: move to SSR (server component, fetch on each request)
- Admin `/admin`: already client‑side fetching + forms
- Bonus: `/recommendations` using React Server Components + small client action

# BuySide
