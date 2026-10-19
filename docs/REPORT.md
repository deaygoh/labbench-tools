# Initial portfolio verification report

Status: initial launch complete. Three public utilities, automated tests/deployment and analytics collection verified. October 19, 2026.

## Delivered

LabBench is a coherent cluster of three utilities: conventional RAID capacity, backup transfer time, and home-server electricity cost. Each has a separate static HTML route, original methodology and worked examples, browser-local calculations, responsive styling, accessible labels, live results, reset and setup-link sharing. RAID capacity can be carried directly into the transfer calculator.

Research compares eight candidate utilities with evidence, alternatives, differentiation, monetization, engineering/maintenance burden and distribution considerations. See RESEARCH.md. Funding, analytics, costs and maintenance are documented in OPERATIONS.md; release configuration is in DEPLOYMENT.md.

## Source and tests

- Repository: https://github.com/deaygoh/labbench-tools (public, owner account verified through GitHub connector).
- Initial implementation commit: `29b372223b81f3f6c510c9d773e54705a8c15c69`.
- Passing hosted CI: https://github.com/deaygoh/labbench-tools/actions/runs/39206643163 (completed, success; checked through GitHub API).
- Analytics/privacy release commit: `849bc7ca776945627aab703fb1a4483cf4ec03f8`; [CI run](https://github.com/deaygoh/labbench-tools/actions/runs/39207136706) completed successfully. Both GitHub check runs, `verify` and `Cloudflare Pages`, report success for this commit.
- Local command `npm test`: 20 tests passed, zero failed. Includes worked numerical examples, invalid values, RAID minimums/parity, binary vs decimal units, zero cases, monotonicity, inherited-property option rejection and build integrity.
- Local command `npm run build`: seven pages generated successfully. Build output includes security headers, robots, 404 page, SVG favicon and shared assets. Sitemap and canonical links require the actual production origin at build time.
- The build test checks all internal page links, unique H1, metadata, canonical URLs and shared-asset budget below 30 KB uncompressed. This is an asset-size check, not a measured Lighthouse or field-performance score.

## Browser observations

Local Chromium preview confirmed:

- Four 8 TB drives in RAID 5: 24 TB usable, 21.83 TiB, 32 TB raw, 8 TB protection overhead, 75% efficiency.
- Two drives in RAID 5: validation error; old results are hidden. Reset restores the valid default.
- Carry-capacity link: 24 TB transfers at 1,000 Mbps / 80% in 2 days 18 hours 40 minutes.
- Reset transfer inputs, then copy setup link: URL contains 1 TB / 1,000 Mbps / 80%; copying reports success and result is 2 hours 46 minutes 40 seconds.
- Energy default: USD 7.68 / 30 days, 38.4 kWh, USD 93.44 / 365 days, average 53.33 W.
- Invalid 25 active hours: explicit validation error and hidden old results.
- A 390 × 844 viewport was checked for the energy page; DOM reported no horizontal overflow. Desktop home-page layout was visually inspected. This is not exhaustive testing on physical devices, Safari or Firefox.

## Hosting and analytics

Cloudflare sign-in was completed by the owner. Owner approved a new free Pages project and separately approved the GitHub app grant restricted to `deaygoh/labbench-tools`. Project `labbench-tools` is deployed with automatic main-branch deployments and `npm test && npm run build` as its build gate, output `dist`, Node 22, and the actual SITE_URL.

Verified public routes:

- Home: https://labbench-tools.pages.dev/
- RAID: https://labbench-tools.pages.dev/raid-capacity/
- Transfer: https://labbench-tools.pages.dev/transfer-time/
- Energy: https://labbench-tools.pages.dev/energy-cost/

Initial deployment ID: `f702141c-76ce-464a-b537-f939dca12e88`. Analytics/privacy release ID: `49ff9491-a6f6-4f12-b444-52757b822965` (confirmed by the Cloudflare Pages check run). Public unauthenticated browser calculations matched the worked examples for all three tools. All three were checked at 390 × 844 without horizontal overflow, in addition to desktop inspection. Edge and the app's Chromium browser were used; physical devices and other browser engines remain untested.

`node scripts/verify-live.mjs https://labbench-tools.pages.dev` passed 14 public checks, including all pages/assets, canonical origin, real sitemap, robots, security headers and HTTP 404 on a nonexistent route. See `live-verification.json` for timestamped observations. Shared application JavaScript and CSS total 11,639 bytes uncompressed, excluding the third-party analytics beacon; this is not a lab or field performance score.

The owner explicitly approved free Cloudflare Web Analytics after automatic review initially blocked enabling a persistent data-collection setting. It is now enabled, its script appears in public HTML, the privacy notice is updated and CSP permits the specific provider endpoints. After controlled browser visits, the dashboard for labbench-tools.pages.dev displayed 1 visit and 2 page views. The detailed charts still reported insufficient data and page-load time remained 0 ms, so field performance is not established. These are QA visits, not organic demand or customer validation. No cookies or custom calculator-input events are added by the application. Cloudflare's current [FAQ](https://developers.cloudflare.com/web-analytics/faq/) says query strings are not logged.

## Costs and commercial limits

No money spent, domain purchased, paid hosting enabled, AI production API called, or monetization program joined. Planned static infrastructure is $0/month within current free allowances. No ads, referral IDs, fake testimonials or revenue claims are included. Program acceptance, search ranking, user demand and income remain unverified hypotheses.

## Remaining completion checks

1. Analytics collection verified through nonzero dashboard totals after controlled visits; no remaining analytics authorization blocker.
2. Source and release documentation are synchronized to GitHub. Documentation release 6c87533b9397f47a5b19cc85e68fc074b808d3e7 passed both GitHub CI (run 39207324765) and Cloudflare Pages deployment 058aef09-c629-4361-9aa0-b830b1bcdb41. The executable application is unchanged from the verified analytics/privacy release.
3. Next business experiment: verify Search Console ownership, submit the real sitemap, and assess organic impressions and useful visits over 60–90 days before requesting monetization enrollment. Search Console setup and revenue validation are not claimed complete.
