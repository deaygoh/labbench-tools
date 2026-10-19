# Maintenance, monetization and costs

Prepared October 19, 2026. No monetization programs have been joined. No paid resources, domains or production AI APIs have been purchased.

## Cost model

The application has zero runtime dependencies, server functions, storage bindings or database services. Static files can use the approved Cloudflare Pages Free project and its included pages.dev subdomain. [Cloudflare documents Free plan limits](https://developers.cloudflare.com/pages/platform/limits/), including 500 monthly builds and 20,000 files. This project is far smaller; verify the actual account plan before creation. GitHub Actions availability and quotas depend on account/repository settings; do not enable paid overages. No guarantee is made that third-party free plans remain unchanged.

No hosting charges incurred by this work so far. Projected initial application infrastructure cost: $0/month within free service allowances. Owner time for distribution and editorial review remains a real cost. There is no observed revenue.

## Monetization candidates

| Program | Fit | Requirements / constraints | Expected direct program cost | Readiness |
|---|---|---|---|---|
| Google AdSense | Contextual display ads after the explanatory content; keep controls and results free of deceptive placements. | Owner must meet age and site eligibility requirements; original useful content, policy compliance, site control and approval. Consent/privacy work may be required depending on region and ad configuration. No approval or earnings guarantee. | [Participation is free](https://support.google.com/adsense/answer/32850?hl=en-GB); consent tooling may introduce separate costs and must be reviewed before adoption. | Do not apply until there is an actual public site and sufficient original content. Owner approval required for enrollment. |
| Amazon Associates (US example) | Drives/enclosures on RAID page, networking gear on transfer page, energy meters on energy page. | [Application review](https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM) requires at least 3 qualifying sales in 180 days, original public content and compliance. Self-purchases do not qualify. Country-specific programs, attribution, disclosures, tax/payment setup and eligibility require owner involvement. | No paid tooling or product API is proposed. Confirm the applicable program's enrollment terms and fees before joining. | No referral tags, product images, live prices or affiliate links have been inserted. Wait for audience evidence before starting the review window. |

[AdSense eligibility source](https://support.google.com/adsense/answer/9724?hl=en). [Amazon official overview](https://affiliate-program.amazon.com/). Do not reuse commission percentages from unrelated product categories or claim expected earnings.

Each calculator already has an editorial “before buying” section appropriate for future relevant placements. Implement future links only from verified program-issued destinations, with a nearby clear compensation disclosure and `rel="sponsored"`. Keep source references editorial. Add actual approved ad code only after owner enrollment approval and privacy review; never ship placeholder fake ads or affiliate IDs. Update the public disclosure and privacy pages when funding changes.

## Analytics

Use [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/) once the hosting account is accessible. It is described by Cloudflare as free and privacy-first. [Pages enablement instructions](https://developers.cloudflare.com/pages/how-to/web-analytics/) cover the account setup. Current build intentionally contains no beacon and makes no claim that analytics is collecting data.

Enable for the real production hostname. Update the public privacy page with the actual data flow. The current CSP permits only self-hosted scripts and connections; if the beacon is enabled, narrowly allow `https://static.cloudflareinsights.com` for scripts and the documented collection endpoint for connections after inspecting the actual snippet. Do not simply allow all third-party scripts. Check browser requests for successful collection and verify a controlled visit appears in the dashboard. Report analytics as configured only after those checks. Avoid capturing query parameters or calculator inputs; confirm provider behavior before activation.

Track aggregate organic entry pages and returning useful visits, not personal profiles. Page views alone do not prove task completion or revenue. Use Search Console after ownership verification for search impressions and indexing. No follow-up automation has been scheduled.

## Maintenance routine

- On each source change: tests, build, preview changed interactions and deploy only a passing artifact. GitHub CI is included; Cloudflare's build command repeats tests before release.
- After deployment: verify the three calculator routes, all assets, 404 response and headers, then run a known example in the browser. Keep the previous deployment available for rollback.
- Monthly: review uptime, analytics/indexing, broken source links, unusual traffic/build usage and program policy changes. No hardware catalogue needs updating.
- Quarterly: repeat numerical examples, browser/mobile checks, free-plan limits and privacy/affiliate disclosures; update Node/action versions deliberately and rerun CI.
- If calculations fail: revert the bad release; add a regression for the specific failure before republishing. If traffic is negligible after 90 days, investigate indexing and search intent before adding unrelated tools or buying services.

## Business limitations

This is an initial related-tool portfolio within one niche, not three proven independent revenue businesses. Demand and monetization are hypotheses pending real traffic and eligible program enrollment. Distribution will likely require more effort than technical operations. Revenue, rankings, approvals and zero-maintenance operation cannot be promised.
