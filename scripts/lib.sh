# Shared helpers for the scripts in this directory. Sourced, not executed.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

say()  { printf '\033[1m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[33m==> %s\033[0m\n' "$*" >&2; }
die()  { printf '\033[31m==> %s\033[0m\n' "$*" >&2; exit 1; }

need() {
  command -v "$1" >/dev/null 2>&1 || die "$1 not found on PATH. $2"
}

need_hugo() {
  need hugo "Install it from https://gohugo.io (0.164+ required)."
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
