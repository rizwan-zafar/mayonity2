#!/bin/bash
set -euo pipefail

APP_PATH="${1:?App path is required}"
NODEVENV="${2:-}"

cd "$APP_PATH"

if [ -n "$NODEVENV" ] && [ -f "$NODEVENV" ]; then
  # CloudLinux activate (bin/activate) expects CL_VIRTUAL_ENV = the version dir (…/20),
  # not the activate file. It also reads $CL_VIRTUAL_ENV before setting it, which
  # crashes under `set -u`.
  export CL_VIRTUAL_ENV="$(cd "$(dirname "$NODEVENV")/.." && pwd)"
  set +u
  # shellcheck disable=SC1090
  source "$NODEVENV"
  set -u
fi

if [ -f .env ]; then
  set -a
  set +u
  # shellcheck disable=SC1091
  source .env
  set -u
  set +a
fi

if [ -z "${DATABASE_URL:-}" ] || [ -z "${AUTH_SECRET:-}" ] || [ -z "${NEXT_PUBLIC_SITE_URL:-}" ]; then
  echo "ERROR: $APP_PATH/.env must contain DATABASE_URL, AUTH_SECRET and NEXT_PUBLIC_SITE_URL"
  exit 1
fi

export NODE_ENV=production
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"

echo "Installing dependencies..."
npm ci

echo "Syncing database schema..."
npx prisma generate
npx prisma db push

echo "Seeding database if empty..."
npm run db:seed

echo "Building Next.js..."
npx next build

mkdir -p tmp
touch tmp/restart.txt

if command -v cloudlinux-selector >/dev/null 2>&1; then
  cloudlinux-selector restart --json --interpreter=nodejs --app-root="$APP_PATH" || true
fi

echo "Deploy finished. App restarted."
