#!/usr/bin/env bash
# Deploy the site.
#
#   ./scripts/deploy.sh              git deploy — build to verify, then push to origin
#   ./scripts/deploy.sh cloudflare   direct upload of ./public via wrangler
#   ./scripts/deploy.sh netlify      direct upload of ./public via netlify-cli
#
# The default assumes the host (Cloudflare Pages / Netlify) builds from the
# GitHub repo on push. The local build still runs first, so a broken site is
# caught here rather than in the hosted build.
set -euo pipefail
source "$(dirname "$0")/lib.sh"

TARGET="${1:-git}"
BRANCH="${DEPLOY_BRANCH:-main}"

confirm() {
  printf '%s [y/N] ' "$1"
  read -r reply
  [[ "$reply" =~ ^[Yy]$ ]] || die "Aborted."
}

case "$TARGET" in
  git)
    need git "Install git."
    [ -z "$(git status --porcelain)" ] || die "Working tree is dirty — commit or stash first."

    current="$(git rev-parse --abbrev-ref HEAD)"
    [ "$current" = "$BRANCH" ] || die "On branch '$current', expected '$BRANCH'. Set DEPLOY_BRANCH to override."

    ./scripts/build.sh

    git fetch origin "$BRANCH" --quiet
    ahead="$(git rev-list --count "origin/$BRANCH..$BRANCH")"
    if [ "$ahead" -eq 0 ]; then
      say "origin/$BRANCH is already up to date — nothing to push."
      exit 0
    fi

    say "About to push $ahead commit(s) to origin/$BRANCH — this publishes the live site:"
    git --no-pager log --oneline "origin/$BRANCH..$BRANCH"
    confirm "Push?"

    git push origin "$BRANCH"
    say "Pushed. The host build takes it from here."
    ;;

  cloudflare|cf)
    need npx "Install Node.js to run wrangler."
    # wrangler.jsonc names the Worker, runs `npm run build` as its custom build,
    # and serves ./public as static assets — so no build step or flags here.
    confirm "Deploy to the Cloudflare Worker named in wrangler.jsonc?"
    npx --yes wrangler deploy
    ;;

  netlify)
    need npx "Install Node.js to run netlify-cli."
    ./scripts/build.sh
    confirm "Upload ./public to Netlify (production)?"
    npx --yes netlify-cli deploy --dir public --prod
    ;;

  *)
    die "Unknown target '$TARGET'. Use: git | cloudflare | netlify"
    ;;
esac
