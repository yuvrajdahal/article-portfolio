#!/usr/bin/env bash
# Production build into ./public. Extra args are passed straight to `hugo`.
set -euo pipefail
source "$(dirname "$0")/lib.sh"

need_hugo
ensure_deps

say "Building into ./public"
hugo --gc --minify "$@"

say "Done — $(find public -type f | wc -l | tr -d ' ') files, $(du -sh public | cut -f1) in ./public"
