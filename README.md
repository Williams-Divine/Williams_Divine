# Williams Divine — Portfolio (Multi-Page Version)

## Structure
```
portfolio/
├── index.html          ← Home (landing page with slides)
├── work.html           ← Projects listing
├── about.html          ← About page  
├── assets/
│   ├── css/
│   │   └── style.css   ← Shared stylesheet (all pages)
│   └── js/
│       └── main.js     ← Shared JavaScript (all pages)
└── projects/
    ├── planetcred.html
    ├── fastrack.html
    ├── handyman.html
    ├── handymen.html
    ├── maamaka.html
    └── akum.html
```

## What changed from the original single-file SPA
- All pages are now separate HTML files
- CSS extracted to `assets/css/style.css` (shared, cached by browser)
- JS extracted to `assets/js/main.js` (shared, cached by browser)
- SPA `nav()` calls replaced with real `<a href>` and `window.location` navigation
- CV PDF should be placed at `assets/files/Williams Divine - Product Designer.pdf`
- Images folder (`images/`) should be in the root alongside index.html

## To deploy
Upload the entire folder to your hosting (Netlify, Vercel, GitHub Pages, etc.)
The folder structure must be preserved as-is.
