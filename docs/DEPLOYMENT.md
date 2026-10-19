# Release procedure

The owner approved creating a new free Cloudflare Pages project on October 19, 2026. No paid plan or domain purchase is authorized.

## GitHub and Pages

1. Publish this source to the owner's GitHub repository, default branch `main`. Verify the remote commit matches the tested source. No credentials belong in files or commit history.
2. In the authenticated Cloudflare account, create a Pages project using the GitHub integration. Authorize only the intended repository if new access is required, with the owner completing any sensitive access grant.
3. Select Free plan, production branch `main`, framework preset None, build command `npm test && npm run build`, output directory `dist`, root directory `/`. No functions or paid add-ons.
4. Set build environment `NODE_VERSION=22`. Set `SITE_URL` to the production HTTPS origin actually assigned by Pages. Set the same GitHub repository variable for CI if desired. Do not invent a live URL from the preferred project name.
5. Trigger the production build. Confirm tests and build pass in the deployment log, then verify the assigned public URL from an unauthenticated browser.
6. Verify `/raid-capacity/`, `/transfer-time/`, `/energy-cost/`, `/privacy/`, `/sitemap.xml`, `/robots.txt` and a nonexistent route. Expected unknown-route status: HTTP 404, not an SPA fallback. Verify the `_headers` policies are applied.
7. Enable and verify analytics using OPERATIONS.md. Until then the published privacy notice should continue to state analytics is absent.

Cloudflare's Git integration provides automatic deployment on main pushes. Running tests inside the Pages build command ensures failed tests block that deployment independently of GitHub status timing. Pull requests should get preview deployments if allowed by project settings. No API token is required for this approach.

Sources: [Cloudflare GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/).

## Verification record

Record production origin, GitHub commit SHA, passing CI run, Cloudflare deployment ID/log, browser examples and timestamps in REPORT.md. Until those observations exist, release remains pending and the goal must remain incomplete.
