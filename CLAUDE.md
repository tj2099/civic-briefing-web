# CitySmart Web

## Architecture

The entire public-facing website lives in one file: **`public/mockup_overhaul.html`**. The Next.js middleware in `middleware.ts` rewrites every public route to serve this static HTML file.

**Do not edit `app/` files to change the website.** The following app routes are intercepted by middleware and never reach Next.js:

| Route | Middleware match | Edit here instead |
|-------|-----------------|-------------------|
| `/` | ✓ | `public/mockup_overhaul.html` |
| `/about`, `/sample`, `/past-issues` | ✓ | `public/mockup_overhaul.html` |
| `/housing`, `/transit`, `/climate`, `/public-safety`, `/arts` | ✓ | `public/mockup_overhaul.html` |
| `/d1`–`/d11`, `/contact` | ✓ | `public/mockup_overhaul.html` |

**These Next.js routes ARE live** (not in the middleware matcher):

- `app/api/` — API routes (`/api/signup`, `/api/[token]`, `/api/resend-webhook`)
- `app/unsubscribe/` — the unsubscribe page at `/unsubscribe`

## How the SPA works (inside mockup_overhaul.html)

- Screens are `<div class="screen" id="screen-{name}">` elements, shown/hidden via `.screen.active` CSS
- `goTo('name')` switches screens and calls `history.pushState` to update the URL
- On page load, `_pathToScreenId(location.pathname)` maps the URL to a screen ID
- URL mapping: `/contact` → screen id `contact` → `#screen-contact`

## Adding a new page — checklist

1. Add `<div class="screen" id="screen-{name}">...</div>` to `public/mockup_overhaul.html`
2. Add `"/{name}"` to the `matcher` array in `middleware.ts`
3. Link to it with `onclick="goTo('{name}')"` in the header nav and/or mobile nav
