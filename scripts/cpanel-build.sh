#!/bin/bash
set -euo pipefail

APP_PATH="${1:?App path is required}"
NODEVENV="${2:-}"

cd "$APP_PATH"

if [ -z "$NODEVENV" ]; then
  echo "ERROR: CPANEL_NODEVENV was empty. Expected .../nodevenv/subdomains/mayonity/20/bin/activate"
  exit 1
fi

if [ -d "$NODEVENV" ] && [ -x "$NODEVENV/npm" ]; then
  NODEVENV_BIN="$NODEVENV"
elif [ -f "$NODEVENV" ]; then
  NODEVENV_BIN="$(cd "$(dirname "$NODEVENV")" && pwd)"
else
  echo "ERROR: CPANEL_NODEVENV does not exist on the server: $NODEVENV"
  echo "Expected: /home/mayonity/nodevenv/subdomains/mayonity/20/bin/activate"
  exit 1
fi

if [ ! -x "$NODEVENV_BIN/node" ] || [ ! -x "$NODEVENV_BIN/npm" ]; then
  echo "ERROR: node/npm missing in $NODEVENV_BIN"
  ls -la "$NODEVENV_BIN" || true
  exit 1
fi

# Put cPanel Node first on PATH. Do not rely on CloudLinux activate alone.
export CL_VIRTUAL_ENV="$(cd "$NODEVENV_BIN/.." && pwd)"
export PATH="$NODEVENV_BIN:$PATH"

if [ -f "$NODEVENV_BIN/activate" ]; then
  set +u
  # shellcheck disable=SC1091
  source "$NODEVENV_BIN/activate"
  set -u
  export PATH="$NODEVENV_BIN:$PATH"
fi

hash -r

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: node/npm still not on PATH after loading $NODEVENV_BIN"
  echo "PATH=$PATH"
  exit 1
fi

echo "Using $(command -v node) $(node -v)"
echo "Using $(command -v npm) $(npm -v)"

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
