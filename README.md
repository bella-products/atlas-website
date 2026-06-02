# atlas-website

Atlas's marketing site - `atlasapp.au` (planned). Static HTML + Tailwind, served by GitHub Pages.

## Conventions

Follow the standards in [`bella-team-files`](https://github.com/elysee-dubois/bella-team-files):

- `CODING_PRACTICES.md`
- `DESIGN.md`
- `NEW_PROJECT_BEST_PRACTICES.md`

## Local dev

```
npm install      # first time
npm run dev      # http://localhost:5173 with live-reload + Tailwind watch
```

The Android waitlist form (`/playstore`) posts to the bella-api `/waitlist` endpoint with a `source: "atlas"` payload field, so Atlas signups can be filtered server-side. The site auto-detects localhost and points at the dev API on `:8787` instead - see [`assets/js/config.js`](assets/js/config.js).

## Build

```
npm run build    # rebuilds HTML + Tailwind CSS
```

The built `assets/css/styles.css` is committed so GitHub Pages can serve it without a build step. Run `npm run build` before any push.

## Pages

| Route | Source | Notes |
|---|---|---|
| `/` | [`pages/index.html`](pages/index.html) | Landing - phone-mock + content pill + store badges |
| `/contact` | [`pages/contact/index.html`](pages/contact/index.html) | Atlas team pill + email + socials |
| `/privacy` | [`pages/privacy/index.html`](pages/privacy/index.html) | Verbatim copy lifted from `atlas-app/app/legal/privacy.tsx` |
| `/terms` | [`pages/terms/index.html`](pages/terms/index.html) | Verbatim copy lifted from `atlas-app/app/legal/terms.tsx` |
| `/playstore` | [`pages/playstore/index.html`](pages/playstore/index.html) | Android waitlist form (posts to bella-api) |
| `/404` | [`pages/404.html`](pages/404.html) | Fallback for unknown routes |

When the legal copy changes in [`atlas-app`](https://github.com/elysee-dubois/atlas-app), re-lift it manually and bump the "Effective" date.

## Project layout

```
atlas-website/
├── pages/                  # *.html source - edit these
│   ├── index.html
│   ├── 404.html
│   ├── contact/index.html
│   ├── playstore/index.html
│   ├── privacy/index.html
│   └── terms/index.html
├── partials/               # reusable HTML fragments
│   ├── layout-start.html   # <!doctype>, <head>, <body>, nav
│   ├── layout-end.html     # </main>, footer, scripts
│   ├── head.html           # meta, fonts, favicon
│   ├── nav.html            # fixed header (logo + Contact / hamburger)
│   ├── footer.html         # privacy/terms pill + socials pill + copyright
│   ├── store-badges.html   # App Store + Google Play badge buttons
│   └── phone-mock.html     # animated phone with floating products + Mecca/Rhode pills
├── assets/
│   ├── css/input.css       # Tailwind v4 source (theme tokens, fonts, custom CSS)
│   ├── css/styles.css      # built - committed, don't edit
│   ├── js/                 # vanilla JS modules
│   │   ├── config.js       # bella-api base URL switcher
│   │   ├── nav.js          # mobile hamburger drawer toggle
│   │   ├── reveal.js       # data-reveal fade-in observer
│   │   └── waitlist.js     # Android waitlist form handler
│   └── img/                # screenshots, product PNGs, stickers, brand logos
├── build.mjs               # tiny Node builder: pages + partials → root HTML
├── .nojekyll               # tells Pages to skip Jekyll
├── sitemap.xml
├── robots.txt
└── (built output at root: index.html, contact/, privacy/, terms/, playstore/, 404.html)
```

> A `CNAME` file is **not** committed yet - add one once Atlas has a custom domain. Planned: `atlasapp.au`. Do not reuse `bellaapp.au`.

## Editing pages

Each file in `pages/` starts with a metadata directive (consumed by `build.mjs`):

```html
<!-- meta title: ... | description: ... | path: /... | active: ... -->
{{> layout-start}}
... page body ...
{{> layout-end}}
```

Available `{{> partial}}` includes: `layout-start`, `layout-end`, `head`, `nav`, `footer`, `scripts`, `store-badges`, `phone-mock`.

## Typography + design tokens

- **Plus Jakarta Sans** (loaded 400/500/600/700) - page headings via the `font-euclid` token
- **Geist** (loaded 300-700) - body / UI text
- **Instrument Serif** (regular + italic) - retained but no longer used by default; available via the `font-display` token if needed

Color tokens (defined in `assets/css/input.css` under `@theme`):

- `--color-ink: #5B5B5B` (warm dark grey for text)
- `--color-mute: #8E8E8E`
- `--color-line: #ECEAE5` (hairline borders)
- `--color-surface: #FAFAFA`, `--color-surface-muted: #F5F4F1`
- `--color-link: #5BA3D9`, `--color-accent-pink: #E94B7B`

## Deployment

Pushing to `main` is the deploy - GitHub Pages serves whatever's at the root of `main`. Add a `CNAME` file with the Atlas domain when one is allocated, and keep `.nojekyll` in place.
