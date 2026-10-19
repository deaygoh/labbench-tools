# LabBench

Three browser-local utilities for home-lab planning: RAID capacity, backup transfer time, and electricity cost. Static HTML, CSS and JavaScript; no runtime dependencies, accounts, database or AI API.

## Run

Requires Node.js 22 or newer. No dependency installation is needed.

```powershell
npm test
npm run build
npm start
```

Open http://127.0.0.1:4173. Stop with Ctrl+C.

Production: set `SITE_URL` to the actual HTTPS origin before building. This emits canonical URLs, Open Graph URLs and sitemap.xml. Never use a hypothetical production URL as evidence of deployment.

## Layout

- `src/calculations.mjs`: pure arithmetic and input validation.
- `src/app.mjs`: form behavior, live results, setup sharing.
- `src/style.css`: responsive layout.
- `scripts/build.mjs`: original page content and static output.
- `tests/`: independent numerical examples, boundaries, build/route checks.
- `docs/`: research, deployment, operations, verification status.

GitHub Actions runs tests and builds on main pushes and pull requests. Cloudflare Pages should run `npm test && npm run build`, output `dist`, to prevent publishing a failing build. Deployment and analytics are not configured until account setup and public verification are complete.

All calculator inputs can become public when explicitly shared in a URL. No affiliate, ad or analytics code is active. See [release status](docs/REPORT.md).
