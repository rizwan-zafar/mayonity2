#!/bin/bash
set -euo pipefail

APP_PATH="${1:?App path is required}"
NODEVENV="${2:-}"

cd "$APP_PATH"

# CloudLinux node/npm in nodevenv are bash wrappers. Real npm is `#!/usr/bin/env node`.
is_cloudlinux_wrapper() {
  local first
  [ -f "$1" ] || return 1
  first="$(head -n 1 "$1" 2>/dev/null || true)"
  case "$first" in
    *bash*|*/bin/sh*) return 0 ;;
  esac
  return 1
}

if [ -z "$NODEVENV" ]; then
  echo "ERROR: CPANEL_NODEVENV was empty."
  echo "Expected: /home/mayonity/nodevenv/subdomains/mayonity/20/bin/activate"
  exit 1
fi

if [ -d "$NODEVENV" ]; then
  NODEVENV_BIN="$NODEVENV"
elif [ -f "$NODEVENV" ]; then
  NODEVENV_BIN="$(cd "$(dirname "$NODEVENV")" && pwd)"
else
  echo "ERROR: CPANEL_NODEVENV does not exist on the server: $NODEVENV"
  exit 1
fi

# nodevenv/.../20/bin/{node,npm} are CloudLinux shell wrappers. They call
# set_env_vars.py (fails for subdomain apps) then /usr/bin/node which is missing.
# Use the real alt-nodejs binaries instead.
NODE_VERSION="$(basename "$(cd "$NODEVENV_BIN/.." && pwd)")"

find_real_toolchain() {
  local version="$1"
  local d
  local candidates=(
    "/opt/alt/alt-nodejs${version}/root/usr/bin"
    "/opt/alt/alt-nodejs${version}/bin"
    "/opt/cpanel/ea-nodejs${version}/bin"
  )
  for d in /opt/alt/alt-nodejs*/root/usr/bin /opt/alt/alt-nodejs*/bin /opt/cpanel/ea-nodejs*/bin; do
    [ -d "$d" ] && candidates+=("$d")
  done
  for d in "${candidates[@]}"; do
    [ -x "$d/node" ] || continue
    [ -e "$d/npm" ] || continue
    is_cloudlinux_wrapper "$d/node" && continue
    is_cloudlinux_wrapper "$d/npm" && continue
    printf '%s\n' "$d"
    return 0
  done
  return 1
}

REAL_BIN="$(find_real_toolchain "$NODE_VERSION" || true)"
if [ -z "$REAL_BIN" ]; then
  echo "ERROR: Could not find a real Node.js toolchain (not the CloudLinux wrapper)."
  echo "nodevenv wrappers: $NODEVENV_BIN"
  echo "Looked for /opt/alt/alt-nodejs${NODE_VERSION} and /opt/cpanel/ea-nodejs${NODE_VERSION}"
  ls -la /opt/alt 2>/dev/null || true
  ls -la /opt/cpanel 2>/dev/null || true
  ls -la "$NODEVENV_BIN" || true
  exit 1
fi

export CL_APP_ROOT="$APP_PATH"
export CL_VIRTUAL_ENV="$(cd "$NODEVENV_BIN/.." && pwd)"
export PATH="$REAL_BIN:$PATH"
hash -r

if is_cloudlinux_wrapper "$(command -v node)" || is_cloudlinux_wrapper "$(command -v npm)"; then
  echo "ERROR: PATH still points at CloudLinux wrappers, not $REAL_BIN"
  echo "node=$(command -v node) npm=$(command -v npm)"
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

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"

echo "Installing dependencies..."
NPM_CONFIG_PRODUCTION=false npm ci --include=dev

echo "Syncing database schema..."
npx prisma generate
npx prisma db push

echo "Seeding database if empty..."
npm run db:seed

echo "Building Next.js..."
export NODE_ENV=production
npx next build

mkdir -p tmp
touch tmp/restart.txt

if command -v cloudlinux-selector >/dev/null 2>&1; then
  cloudlinux-selector restart --json --interpreter=nodejs --app-root="$APP_PATH" || true
fi

echo "Deploy finished. App restarted."
