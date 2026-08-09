# articles.yuvrajdahal.com.np

Personal site — portfolio, blog, résumé. Hugo + Tailwind CSS v4.

## Requirements

- [Hugo](https://gohugo.io) 0.164+ (Tailwind is invoked through Hugo Pipes)
- Node.js — for the `@tailwindcss/cli` binary in `node_modules`

```bash
npm install
```

## Commands

```bash
npm run dev        # dev server at http://localhost:1313, live reload, drafts on
npm run build      # production build (--gc --minify) into ./public
npm run preview    # production build, then serve ./public at :8080 (no live reload)
npm run clean      # remove public/, resources/, .hugo_build.lock
npm run deploy     # build, then push to origin — see "Deploying"
```

The scripts live in `scripts/` and each takes `PORT=…` plus any extra flags,
which are forwarded to Hugo: `npm run dev -- --bind 0.0.0.0`. They install npm
dependencies on first run, since Tailwind is invoked through Hugo Pipes and
needs the CLI binary in `node_modules`.

Tailwind runs inside the Hugo asset pipeline (`css.TailwindCSS` in
`layouts/_partials/head.html`), so there is no separate watch process.

## Where things live

| Path | What |
| --- | --- |
| `hugo.toml` | Site config, contact details, nav menus |
| `data/resume.yaml` | Résumé content — skills, experience, education, events |
| `content/` | Pages and posts in Markdown |
| `content/projects/` | One file per project; `stack:` renders the mono stack line |
| `assets/css/main.css` | Theme tokens (`@theme`) and component classes (`@layer components`) |
| `layouts/` | Templates; layout and spacing live here as utility classes |

## Adding things

**A blog post**

```bash
npm run new post my-post        # -> content/blog/my-post.md
```

Remove `draft: true` when it's ready.

**A project**

```bash
npm run new project my-project  # -> content/projects/my-project.md
```

Then add to the front matter:

```yaml
label: "Platform"          # shown as the row's right-hand tag
period: "2026 — present"
blurb: "One sentence for the list view."
stack: ["Node.js", "PostgreSQL", "Docker"]
link: "https://example.com"
linkLabel: "example.com"
```

**The résumé** is the Google Doc at `params.resumeURL` in `hugo.toml` — the nav,
footer, and home page all link to it in a new tab. There is also a built-in
printable résumé page at `/resume/` driven by `data/resume.yaml`, currently not
linked from anywhere.

## Design notes

Swiss/International grid: hairline rules, a grotesk (Archivo) for structure, a
mono (IBM Plex Mono) for anything that is data — dates, stacks, labels. One
accent, `--color-signal` red, reserved for the active nav item, the current-role
marker on the résumé, and hover states. Change it in one place, in `@theme`.

Every project and role carries a mono "stack line" naming what it actually runs
on — the recurring device that ties the pages together.

## Deploying

`npm run deploy` assumes the host builds from the GitHub repo on push: it
verifies the tree is clean, runs the production build locally so a breakage
surfaces here rather than in the hosted build, shows the commits about to go
out, and pushes to `origin/main` after you confirm. Override the branch with
`DEPLOY_BRANCH`.

To upload `public/` directly instead of going through git:

```bash
npm run deploy cloudflare   # wrangler deploy
npm run deploy netlify      # netlify-cli deploy --prod
```

The site runs as a Cloudflare Worker serving static assets. `wrangler.jsonc`
holds the Worker name, `npm run build` as the custom build command, and
`./public` as the asset directory — without it wrangler auto-detects the
framework and guesses `npx hugo`, which fails, since Hugo is not an npm package.
Check the config with `npx wrangler deploy --dry-run`.

On a host that builds the site itself instead (Pages, Netlify):

- Build command: `npm install && npm run build`
- Output directory: `public`

The Hugo version is pinned in `.tool-versions` (0.164.0). Templates use
`site.Language.Locale`, which does not exist before 0.164 — an older Hugo dies
with `can't evaluate field Locale`. `scripts/lib.sh` checks the version before
building so that fails with a readable message. If the host still picks its own
Hugo (Cloudflare Pages build image v1 ignores `.tool-versions`), set
`HUGO_VERSION = 0.164.0` as a build environment variable, or move the project to
build image v2.

Set `baseURL` in `hugo.toml` if the domain changes.
