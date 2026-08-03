#!/usr/bin/env bash
# Scaffold content.
#
#   ./scripts/new.sh post my-post          -> content/blog/my-post.md
#   ./scripts/new.sh project my-project    -> content/projects/my-project.md
set -euo pipefail
source "$(dirname "$0")/lib.sh"

need_hugo

kind="${1:-}"
slug="${2:-}"
[ -n "$kind" ] && [ -n "$slug" ] || die "Usage: ./scripts/new.sh {post|project} <slug>"

slug="${slug%.md}"

case "$kind" in
  post)    path="blog/$slug.md" ;;
  project) path="projects/$slug.md" ;;
  *)       die "Unknown kind '$kind'. Use: post | project" ;;
esac

hugo new content "$path"
say "Created content/$path — remove 'draft: true' when it's ready."
