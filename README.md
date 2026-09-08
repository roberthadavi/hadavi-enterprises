# hadavienterprises.com

Static site for Hadavi Enterprises (David S. Hadavi) served by a Cloudflare Worker with static assets.

- `public/` — the site (single page, self-hosted fonts, WebP images, sitemap, robots, 404)
- `worker.js` — www→apex + http→https redirects, security headers, noindex on workers.dev
- `wrangler.jsonc` — Worker config (`run_worker_first: true` so redirects work)

Deploy: push to `main` → Cloudflare Workers Builds. Local: `npm i && npm run dev`.
