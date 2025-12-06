#!/usr/bin/env bash
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL not set."
  exit 1
fi

echo "Running migrations on Neon..."
psql "$DATABASE_URL" -f db/schema.sql
echo "✓ Migrations complete!"