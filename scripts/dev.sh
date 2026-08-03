#!/usr/bin/env bash
# Dev server with live reload. Extra args are passed straight to `hugo server`.
set -euo pipefail
source "$(dirname "$0")/lib.sh"

need_hugo
ensure_deps

PORT="${PORT:-1313}"

say "hugo server on http://localhost:$PORT (drafts + future posts shown)"
exec hugo server \
  --port "$PORT" \
  --buildDrafts \
  --buildFuture \
  --navigateToChanged \
  --disableFastRender \
  "$@"
