# Shared helpers for the scripts in this directory. Sourced, not executed.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

say()  { printf '\033[1m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[33m==> %s\033[0m\n' "$*" >&2; }
die()  { printf '\033[31m==> %s\033[0m\n' "$*" >&2; exit 1; }

need() {
  command -v "$1" >/dev/null 2>&1 || die "$1 not found on PATH. $2"
}

# Templates use site.Language.Locale, which only exists in 0.164+. Older Hugo
# fails with a cryptic "can't evaluate field Locale" render error, so check up
# front — the version is pinned for CI in .tool-versions.
HUGO_MIN="0.164.0"

need_hugo() {
  need hugo "Install it from https://gohugo.io ($HUGO_MIN+ required)."

  local have
  have="$(hugo version | sed -n 's/.*hugo v\([0-9.]*\).*/\1/p')"
  [ -n "$have" ] || return 0

  if [ "$(printf '%s\n%s\n' "$HUGO_MIN" "$have" | sort -V | head -1)" != "$HUGO_MIN" ]; then
    die "Hugo $have is too old — $HUGO_MIN+ required (site.Language.Locale)."
  fi
}

# Tailwind runs inside Hugo Pipes via the @tailwindcss/cli binary in node_modules,
# so the modules have to be there before any build or server run.
ensure_deps() {
  need npm "Install Node.js — the Tailwind CLI binary ships through npm."
  if [ ! -x node_modules/.bin/tailwindcss ]; then
    say "Installing npm dependencies"
    npm install
  fi
}
