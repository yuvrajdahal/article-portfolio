#!/usr/bin/env bash
# Build exactly as production does, then serve ./public statically.
# No live reload — this is the artifact that gets deployed.
set -euo pipefail
source "$(dirname "$0")/lib.sh"

PORT="${PORT:-8080}"

./scripts/build.sh "$@"

say "Serving ./public on http://localhost:$PORT"
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT" --directory public
else
  need npx "Install Node.js, or python3, to serve the built site."
  exec npx --yes serve -l "$PORT" public
fi
