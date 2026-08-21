# Vercel Web Analytics Setup

This project now includes Vercel Web Analytics for tracking page views and visitor metrics.

## What was installed

1. **@vercel/analytics** package (v1.4.1) - Official Vercel Analytics SDK
2. **esbuild** (v0.24.0) - For bundling the analytics script

## Implementation Details

### Files Created

- `package.json` - Package configuration for npm dependencies
- `package-lock.json` - Lock file for consistent dependency versions
- `build.js` - Build script for bundling analytics code
- `src/analytics.js` - Source file that imports and injects Vercel Analytics
- `assets/js/analytics.js` - Compiled/bundled analytics script (loaded by HTML)
- `.gitignore` - Ignores node_modules and build artifacts

### Files Modified

All HTML files have been updated to include the analytics script:

**Main Pages:**
- `index.html`
- `about.html`
- `work.html`
- `archive.html`
- `portfolio_revised.html`

**Project Pages:**
- `projects/akum.html`
- `projects/fastrack.html`
- `projects/handyman.html`
- `projects/handymen.html`
- `projects/maamaka.html`
- `projects/planetcred.html`
- `projects/RAS.html`

Each file now includes the following script tag before the main.js script:
```html
<!-- Vercel Web Analytics -->
<script src="assets/js/analytics.js" defer></script>
```

(Project pages use `../assets/js/analytics.js` for correct relative paths)

## How It Works

1. When a page loads, it executes `assets/js/analytics.js`
2. The script calls `inject()` from `@vercel/analytics`
3. This automatically injects the Vercel Analytics tracking script
4. The script loads from `/_vercel/insights/script.js` (in production on Vercel)
5. Analytics data is sent to Vercel's analytics dashboard

## Building

To rebuild the analytics script after updates:

```bash
npm install
npm run build
```

This will compile `src/analytics.js` into `assets/js/analytics.js`.

## Deployment

When you deploy to Vercel:

1. The analytics will automatically start working
2. Enable Web Analytics in your Vercel dashboard (Project Settings → Analytics)
3. After a few page views, you'll see data in the Analytics tab

## Verification

You can verify analytics is working by:

1. Opening your deployed site
2. Opening browser DevTools → Network tab
3. Looking for requests to `/_vercel/insights/view`
4. These requests indicate analytics is tracking page views

## Documentation

This implementation follows the official Vercel documentation:
https://vercel.com/docs/analytics/quickstart

The vanilla JavaScript approach was used (via `inject()` function) since this is a static HTML website without a JavaScript framework.
