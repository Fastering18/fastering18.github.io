# Fastering18 Portfolio

Personal portfolio of **Muhammad Brahmana Priambudi** (**Fastering18** / FasteringDev).

Live site: [https://fastering.is-cool.dev](https://fastering.is-cool.dev)

## What this is

A Next.js portfolio for full stack and Roblox systems work: project case studies, skills, contact links, a private admin CMS, and operator only visitor analytics.

Brand names used on the site and in search metadata:

- Fastering18
- Fastering
- FasteringDev
- Muhammad Brahmana Priambudi

## Stack

- Next.js (App Router) + TypeScript + React
- Drizzle ORM + PostgreSQL (Neon)
- NextAuth (admin)
- Framer Motion, Lucide icons
- Vercel hosting and Analytics

## Features

- Public portfolio with featured projects and media galleries
- CMS admin for projects, skills, and settings
- Private analytics (country, device, daily visits) under `/admin/analytics`
- SEO: metadata, sitemap, robots, RSS feed, JSON-LD, `llms.txt`
- Legal pages for Google Search Console / brand reference:
  - `/privacy-policy`
  - `/tos`  
  (not linked from the main homepage navigation)

## Getting started

Requirements: [Bun](https://bun.sh) (or Node 20+) and a Postgres `DATABASE_URL`.

```bash
bun install
# copy env from Vercel or create .env.local with:
# DATABASE_URL, AUTH_SECRET, ADMIN_USER, ADMIN_PASS, NEXTAUTH_URL
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

```bash
bun run dev        # local development
bun run build      # production build
bun run start      # serve production build
bun run db:seed    # reseed projects (uses .env.local)
bun run db:check   # inspect DB schema helpers
bun run lint       # ESLint
```

### Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | NextAuth secret |
| `ADMIN_USER` / `ADMIN_PASS` | Admin login |
| `NEXTAUTH_URL` | Auth base URL (local or production) |

## Project structure

```
src/app/           # routes (home, projects, admin, legal, api)
src/components/    # UI and admin forms
src/sections/      # homepage sections
src/lib/           # db, auth, seo, analytics
public/            # static assets, favicon, Google verify HTML
```

## Deploy

Deployed on Vercel from the `design2026` branch (or your configured production branch).

1. Set the same env vars in the Vercel project.
2. Deploy.
3. Optional: reseed with `bun run db:seed` against production DB only when intentional.

After deploy, confirm:

- Homepage and project pages
- Favicon (not the framework default)
- Google verify file: `/google6c1608097a1e7dc4.html`
- Sitemap: `/sitemap.xml`
- Privacy and ToS: `/privacy-policy`, `/tos`

## Author

**Muhammad Brahmana Priambudi (Fastering18)**

- Site: https://fastering.is-cool.dev
- GitHub: https://github.com/Fastering18
- X: https://x.com/FasteringDev
- Email: brahmana@fastering.thedev.id

## License

Portfolio content and branding belong to Muhammad Brahmana Priambudi / Fastering18 unless a linked repository states another license.
