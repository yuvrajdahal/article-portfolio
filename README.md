# yuvrajdahal.com.np

Personal site — portfolio, blog, résumé. Hugo + Tailwind CSS v4.

## Requirements

- [Hugo](https://gohugo.io) 0.164+ (Tailwind is invoked through Hugo Pipes)
- Node.js — for the `@tailwindcss/cli` binary in `node_modules`

```bash
npm install
```

## Commands

```bash
hugo server        # dev server at http://localhost:1313, live reload
hugo               # production build into ./public
```

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
hugo new content blog/my-post.md
```

Remove `draft: true` when it's ready.

**A project**

```bash
hugo new content projects/my-project.md
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

**Photos** go straight into `content/life/`. Anything you drop there shows up
as a Polaroid. To caption one, add it to `photos:` in `content/life/index.md`:

```yaml
photos:
  - file: "kathmandu-dusk.jpg"
    caption: "kathmandu, dusk"
```

Listed photos come first in the order given; the rest follow, uncaptioned. The
numbering (`#1`, `#2`, …) is generated.

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

`hugo` outputs a static site to `public/`. On Cloudflare Pages or Netlify:

- Build command: `npm install && hugo --gc --minify`
- Output directory: `public`
- Environment: `HUGO_VERSION = 0.164.0`

Set `baseURL` in `hugo.toml` if the domain changes.
