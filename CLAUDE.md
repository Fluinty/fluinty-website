# CLAUDE.md — fluinty-website

> Root of the `fluinty-website` repo (separate from the AgentAI business-ops
> repo). Scopes the agent to this repo only: site code, content, deploy.

## What this repo is

The production codebase for **fluinty.pl**: a static site with no framework and
no backend, deployed on **Netlify**. Every push to `main` deploys (live in
~30 sec). This is a shared repo, so always `git pull` before starting work.

Since October 2026 the site is the redesign built from `src/` (the old
hand-written pages under `pages/` and `en/pages/` are gone; their URLs
301-redirect to the new ones in `_redirects`).

This repo does **not** contain business context (pricing, leads, contracts,
other clients). That lives in the separate AgentAI workspace. See "Bridge to
AgentAI" below.

## How the site is built

- `src/pages/*.html` — page bodies. PL is `name.html`, EN is `en-name.html`.
- `src/partials/` — `head.html`, `nav.html` / `nav-en.html`,
  `footer.html` / `footer-en.html`.
- `build.mjs` — the page list (source, output path, PL/EN pair, title,
  description) and the assembly. `node build.mjs` writes the finished pages
  into the repo (`index.html`, `realizacje/…/index.html`, `en/…`). The built
  files are committed; Netlify does not run a build.
- `check-site.mjs` — run after every build: dead links, missing images, alt
  text, one h1, banned phrases. Fix everything it reports before pushing.
- `src/KLASY.md` — the CSS classes and components (case covers, process demos,
  client logo strip) and how to use them.
- `css/site.css`, `js/site.js` (every page), `css/case.css`, `js/case.js`
  (case studies only), `assets/klienci/`, `assets/zespol/`.
- `node build.mjs --base new-design` builds a noindex preview into
  `preview/new-design/` (not committed).
- `_redirects` — old URLs, the `/dla/_z` deck-open tracker proxy, 404 rules
  for working files. Netlify treats `/x` and `/x/` as the same path, so never
  redirect a path to itself plus a slash (infinite loop).
- `_headers` — security headers, caching, `noindex` for `/dla/*`.
- `dla/` — unlisted client decks. They are generated from the AgentAI
  workspace, not by `build.mjs`; do not edit them by hand here.
- Contact form: web3forms (redirects to `/dziekujemy/`), meeting booking:
  Calendly inline widget. Cookiebot + GA4 (Consent Mode v2, default denied)
  live in `src/partials/head.html`.

## Blog

A new post is a page like any other:
1. Body in `src/pages/blog-post-SLUG.html` (and `en-blog-post-SLUG.html`, or
   mark it PL-only with `alt: null`).
2. An entry in the page list in `build.mjs` (unique title and description).
3. A card in `src/pages/blog.html` (newest first).
4. A `<url>` entry in `sitemap.xml`.
5. `node build.mjs && node check-site.mjs`, then commit and push.

Per post: one `<h1>`, logical h2/h3 hierarchy, internal links to the relevant
case study or product page.

## Bridge to AgentAI (the business-ops repo)

Blog posts are **drafted in AgentAI**, not here — that's where brand voice,
offer details, pricing, and the `/seo-articles` command with full company
context live (`clients/Fluinty/brand-guide.md`, `context/fluinty.md`).

Workflow:
1. Draft + keyword research happens in AgentAI (`/seo-articles` or manual
   request).
2. The finished draft becomes a page here, following the Blog steps above.
3. `git pull`, commit, `git push` — Netlify deploys automatically.
4. Back in AgentAI, mark the source draft as published so it isn't
   regenerated later.

## Language

- Site copy: Polish (PL) primary, English (EN) under `/en/`
- Code, file names, commit messages: English
