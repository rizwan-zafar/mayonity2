# Mayonity

Marketing site and CMS for [Mayonity](https://mayonity.com): Next.js 16, Prisma, and MySQL on cPanel.

Admin lives at `/admin`. The public site reads the same database.

## Requirements

- Node.js 20+
- MySQL 8 (local, or cPanel MySQL via SSH tunnel)

## Local setup

```bash
cp .env.example .env
npm ci
```

Point `.env` at a database you can reach from this machine.

**cPanel MySQL from your laptop** (SSH tunnel). Keep this running in a second terminal:

```bash
ssh -i sshkey -N -L 3307:127.0.0.1:3306 CPANEL_USER@CPANEL_HOST
```

Then in `.env`:

```env
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@127.0.0.1:3307/DB_NAME"
AUTH_SECRET="a-long-random-string"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

URL-encode special characters in the password (`&` → `%26`, `*` → `%2A`, `@` → `%40`).

Apply schema and optional seed (only if the database is empty / you intend to write seed data):

```bash
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is taken, Next.js will use 3001.

Default seeded admin (change after first login): `admin@mayonity.com`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local Next.js dev server |
| `npm run build` | `prisma generate` + production build |
| `npm start` | Production server (`server.js`) for cPanel |
| `npm run db:push` | Push Prisma schema to the DB in `DATABASE_URL` |
| `npm run db:seed` | Seed (skips if users already exist) |
| `npm run db:studio` | Prisma Studio |
| `npm run cpanel:pack` | Local tarball for a manual File Manager upload |

## Environment

| Variable | Local | cPanel (live) |
|---|---|---|
| `DATABASE_URL` | Often `127.0.0.1:3307` (tunnel) | `127.0.0.1:3306` (MySQL on the same server) |
| `AUTH_SECRET` | Any long random string | Separate production secret |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://mayonity.com` |
| `NODE_ENV` | unset / `development` | `production` |
| `SMTP_HOST` | Optional locally | cPanel mail host, e.g. `mail.mayonity.com` |
| `SMTP_PORT` | `587` | `587` or `465` |
| `SMTP_USER` / `SMTP_PASS` | Optional | Mailbox used to send |
| `SMTP_FROM` | Optional | e.g. `Mayonity <mayonitynetwork@gmail.com>` |
| `SMTP_SECURE` | `false` | `true` if port is `465` |

Do not commit `.env` or SSH private keys.

Contact form submissions still save to the database. After a successful save, the app sends a confirmation to the visitor and a notification to `mayonitynetwork@gmail.com`. If SMTP is missing or sending fails, the form still succeeds.

Prisma talks to MySQL through `@prisma/adapter-mariadb` (`engineType = "client"`). The Rust query engine panics on this cPanel OpenSSL stack.

Production uses a pool of **1** connection so shared-hosting `max_user_connections` is not exhausted.

## Admin

- Login: `/admin/login`
- Content: services, portfolio, team, testimonials, clients, blog, statistics, messages, settings
- Uploads go to `public/uploads` (persists on cPanel disk; not on Vercel)

Portfolio **category** options (Web, Mobile, …) are hardcoded in:

- `src/app/admin/portfolio/[id]/page.js`
- `src/components/portfolio/PortfolioFilter.js`

Blog categories can be added from **Admin → Blog**.

## Deploy to cPanel

Push to **`main`** runs `.github/workflows/deploy.yml`:

1. GitHub builds on Ubuntu (`npm ci`, Prisma generate, `next build`)
2. SSH upload to `CPANEL_APP_PATH`
3. Writes `.env` from GitHub secrets
4. Restarts the Node app

**Schema is not applied on deploy.** Tables/columns are managed with dumps, phpMyAdmin, or `npx prisma db push` against the live DB. The server script does not run migrations.

### GitHub Actions secrets

| Secret | Value |
|---|---|
| `CPANEL_HOST` | Server IP or hostname |
| `CPANEL_USERNAME` | cPanel user (`/home/<this>/…`) |
| `CPANEL_PORT` | `22` |
| `CPANEL_SSH_KEY` | Private SSH key |
| `CPANEL_SSH_PASSPHRASE` | Key passphrase, if any |
| `CPANEL_APP_PATH` | Full path, e.g. `/home/mayonity/subdomains/mayonity` |
| `CPANEL_NODEVENV` | Node selector env, e.g. `…/nodevenv/subdomains/mayonity/20/bin/activate` |
| `ENV_DATABASE_URL` | `mysql://USER:PASS@127.0.0.1:3306/DBNAME` (server, **not** 3307) |
| `ENV_AUTH_SECRET` | Production auth secret |
| `ENV_NEXT_PUBLIC_SITE_URL` | `https://mayonity.com` |
| `ENV_SMTP_HOST` | Optional. Contact emails skipped if empty |
| `ENV_SMTP_PORT` | Optional, default `587` |
| `ENV_SMTP_USER` | Optional |
| `ENV_SMTP_PASS` | Optional |
| `ENV_SMTP_FROM` | Optional |
| `ENV_SMTP_SECURE` | Optional, `true` for port 465 |

`CPANEL_PASSWORD` is not used. This workflow authenticates with the SSH key.

cPanel **Setup Node.js App**: Node 20+, application root = `CPANEL_APP_PATH`, startup file = **`server.js`**.

Manual upload: `npm run cpanel:pack`, extract `mayonity-cpanel.tar.gz` in the app folder, create `.env`, restart Node.

## Schema changes

After editing `prisma/schema.prisma`:

1. `npx prisma db push` (tunnel or server)
2. Push code to `main`

A new table will **not** appear from GitHub Actions alone.

## Health

`/api/health/db` reports whether Prisma can reach MySQL (host/port/database, no password).

## Vercel

Do not point Vercel at this cPanel MySQL. Inbound **3306** is blocked from the public internet. Local tunnel (`3307`) only exists on your Mac.
