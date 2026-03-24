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

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Contact form email setup

The contact form posts to **`/contact.php`** (copied into `out/` on build). On the server:

1. After deploying, copy `contact-config.example.php` to **`contact-config.php`** next to `index.html` (in **`www/`** on the server if you use Git deploy, or in `public_html` if you upload manually).
2. Fill in SMTP and addresses (Hostinger mailbox SMTP is a good default). Do not commit `contact-config.php` — it is gitignored.

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

1. **Before every push** that changes the site, run **`npm run build:deploy`**. That runs `next build` and copies **`out/` → `www/`**. Commit the updated **`www/`** files so the server always has a fresh static site (single hosting usually has **no Node.js**, so the live site comes from this folder).
2. Push to GitHub. In hPanel, use your **Deploy** / **Git** workflow so it runs **`composer install`** (it will find `composer.json` and `composer.lock`). There is **no post-install shell step**: shared hosting PHP usually blocks `exec` / `passthru`, so the live site is always the **`www/`** folder you committed in step 1.
3. Set the domain **document root** to the **`www`** folder inside the deployed project (e.g. `.../public_html/www` or `.../repositories/ed10x/www` — match whatever path Hostinger shows after clone).
4. On the server, add **`contact-config.php`** (from `contact-config.example.php`) **inside `www/`** with your SMTP settings.
5. Enable **HTTPS** in hPanel.

### Manual upload (no Git)

1. Run **`npm run build`** (or **`npm run build:deploy`**).
2. Upload everything inside **`out/`** (or **`www/`**) to **`public_html`**.

Optional: **Vercel** and similar hosts can run a Node deployment if you drop static export and restore a server-side contact API.

See [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) for details.

### Composer lock hash

If you change **`require`** or **`name`** in `composer.json`, run **`composer update --no-install`** (or full `composer update`) locally to refresh **`composer.lock`**, or Hostinger may report a lock mismatch.
