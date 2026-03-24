# ED10X.com

Production-ready landing website for **ED10X.com** — premium, minimal, high-conversion.

**Repository:** [github.com/educationtech10x-crypto/ed10x](https://github.com/educationtech10x-crypto/ed10x)

## Tech

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn-style UI components (Radix + CVA)
- Framer Motion animations
- React Hook Form + Zod validation
- Static export (`output: "export"`) + PHP contact handler (`public/contact.php`)
- **`composer.json` / `composer.lock`** for Hostinger **Git deploy** (runs `composer install` only — see below)

## What’s in this repo (why not “only HTML”?)

| Path | Purpose |
|------|--------|
| `src/`, `public/`, `package.json`, `next.config.ts`, `tsconfig.json`, etc. | **Source** — you need these to run `npm run dev` and `npm run build`. **Do not delete them.** |
| `out/` | **Built static site** — what Hostinger should serve (`index.html`, `_next/`, `contact.php`, …). Produced by `npm run build`. |

There is no separate `www/` folder anymore; **`out/`** is the only build output (this is Next.js’s default). Previously `www/` was just a duplicate of `out/` for Hostinger subfolder setups.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Contact form email setup

The contact form posts to **`/contact.php`** (copied into `out/` on build). On the server:

1. After deploying, copy `contact-config.example.php` to **`contact-config.php`** next to **`index.html`** (same folder as the live site root — e.g. inside **`out/`** on the server if that folder is your document root, or directly in **`public_html`** if you uploaded the contents of `out/` there).
2. Fill in SMTP and addresses (Hostinger mailbox SMTP is a good default). Do not commit `contact-config.php` — it is gitignored under `public/`; create it only on the server.

Local `npm run dev` does not run PHP; test the form on the server or with a local PHP server pointed at `out/`.

## Logo assets

- `public/ed10x-logo.svg`
- `public/ed10x-logo.png`
- `public/ed10x-icon.svg`
- `public/ed10x-icon.png`

Regenerate PNGs from SVG:

```bash
npm run generate:logo
```

## Deployment (Hostinger single / static hosting)

### Git deploy + Composer (Deploy button)

1. After any change to pages or styles, run **`npm run build`**, then **commit and push** the updated **`out/`** folder so the server receives a fresh static site (shared hosting has no Node.js build).
2. In hPanel, run your **Deploy** / **Git** workflow so **`composer install`** runs (`composer.json` + `composer.lock`).
3. Set the domain **document root** to the **`out`** folder inside the deployed tree (e.g. `.../public_html/out`), **or** move **everything inside `out/`** up into **`public_html`** if you want the site root flat with no `out` in the URL path.
4. On the server, add **`contact-config.php`** next to **`index.html`** (same folder as above).
5. Enable **HTTPS** in hPanel.

### Manual upload (no Git)

1. Run **`npm run build`**.
2. Upload **everything inside `out/`** into **`public_html`** (so `public_html/index.html` exists).

Optional: **Vercel** and similar hosts can run a Node deployment if you drop static export and restore a server-side contact API.

See [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) for details.

### Composer lock hash

If you change **`require`** or **`name`** in `composer.json`, run **`composer update --no-install`** (or full `composer update`) locally to refresh **`composer.lock`**, or Hostinger may report a lock mismatch.

### If you don’t want `out/` in Git

Add **`/out/`** back to `.gitignore` and deploy only by **uploading** the contents of `out/` to `public_html` after each local build. Git deploy will then **not** update the live HTML unless you use another pipeline.
