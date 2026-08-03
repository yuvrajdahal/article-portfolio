#!/usr/bin/env bash
# Remove build output and Hugo's resource cache.
set -euo pipefail
source "$(dirname "$0")/lib.sh"

for d in public resources .hugo_build.lock; do
  if [ -e "$d" ]; then
    say "Removing $d"
    rm -rf "$d"
  fi
done

say "Clean"
