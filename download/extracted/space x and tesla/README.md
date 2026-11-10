# Tesla × SpaceX — Bell Invest Concept Prototype

A **temporary visual re-skin** of the Bell Invest trading platform (`https://bellbroker.ojojoarmanitech.com/`) applying a Tesla × SpaceX branded design language. Private concept prototype only — **not an official Tesla or SpaceX website**, and not affiliated with or endorsed by either company.

All original routes, live market data (CoinGecko / Huobi / TradingView), forms, statistics, and content are preserved.

---

## Structure

```
/
├── index.html              Homepage (hero, stats, markets terminal, features, tech, CTA)
├── markets/index.html      Markets page (search, filters, table/cards, pagination)
├── contact/index.html      Contact (info, map, form)
└── assets/
    ├── brand/
    │   ├── brand.js                ← BRAND CONFIG (swap-back point)
    │   ├── tesla-wordmark.svg      Authentic Tesla wordmark (Wikimedia Commons)
    │   ├── spacex-wordmark.svg     Authentic SpaceX wordmark (Wikimedia Commons)
    │   └── tesla-emblem.svg        Tesla emblem used as favicon
    ├── css/styles.css              Design system (palette, type, layout, responsive)
    ├── js/
    │   ├── main.js                 Nav, mobile menu, reveals, count-ups, sparklines
    │   ├── home.js                 CoinGecko ticker + sparklines + TradingView widget
    │   ├── markets.js              Huobi + CoinGecko table, search, filters, pagination
    │   └── contact.js              Contact form validation and submission
    └── img/                        Hero photography (desktop + mobile) + NASA launch imagery
```

**Navigation:** Home → `/`, Markets → `/markets/`, Features → `/#features`, Contact → `/contact/`. There is intentionally **no About page** in this revision.

**Live data:** BTC and Tether stream from CoinGecko (60s refresh) in both the hero tape and the Popular Markets terminal. SpaceX and Tesla are static concept tokens (no public market data exists for them), displayed with their wordmarks; their 7d cell shows an em dash.

---

## Restoring Bell Invest branding (swap-back)

The brand layer is modular. To revert:

### 1. Edit `assets/brand/brand.js`
This single file drives every brand string on the site. It exposes `window.BELL_BRAND` and hydrates all `[data-brand]`, `[data-brand-copyright]`, and `[data-brand-title]` hooks. Update:

- `primary.name` / `secondary.name` — displayed names
- `primary.logo` / `secondary.logo` — logo file paths
- `copyright` — footer copyright line
- `titles` — page `<title>` suffixes

Every page also contains **inline fallback values** in the HTML (e.g. `© 2026 Tesla × SpaceX…`), so the site still renders correctly if `brand.js` is removed — update those fallbacks too, or keep `brand.js` as the single source of truth.

### 2. Replace the logo files
Swap `assets/brand/tesla-wordmark.svg` and `spacex-wordmark.svg` with the original Bell Invest logo(s). Logos are rendered white via CSS `filter: brightness(0) invert(1)` — replace with a file that already suits dark backgrounds, or adjust the filter in `styles.css` (`.brand-lockup__img`).

### 3. Update the favicon
`<link rel="icon" href="/assets/brand/tesla-emblem.svg">` appears in every page `<head>` — point it back to the Bell Invest favicon.

### 4. Update page titles
Titles follow the pattern `Page | Tesla × SpaceX` (driven by `data-brand-title` + `brand.js`). Replace the `titleSuffix` in `brand.js`.

### 5. Review copy
- Hero headline, section headlines, and CTAs were rewritten in the new editorial voice (`TRADE THE FUTURE. WITHOUT LIMITS.`, `YOUR NEXT MOVE STARTS HERE.`, etc.) — restore original copy as needed.
- **Preserved verbatim:** all statistics ($2.4B+, 150K+, 100+, $1.2B, 0.002s), team names, contact details, footer link structure, meta descriptions.

---

## Asset licenses

| Asset | Source | License |
|---|---|---|
| `assets/img/hero-desktop.jpg`, `hero-mobile.jpg` | Supplied by the project owner (desktop + mobile variants of the same artwork) | Project owner's asset — clear rights before any public use |
| `assets/img/artemis-4.jpg` | NASA Image and Video Library (`images-api.nasa.gov`) | Public domain (NASA media usage: generally free for use) |
| `assets/brand/tesla-wordmark.svg` | Wikimedia Commons | Trademark of Tesla, Inc. — used here for a private concept prototype only |
| `assets/brand/spacex-wordmark.svg` | Wikimedia Commons | Trademark of SpaceX — used here for a private concept prototype only |
| `assets/brand/tesla-emblem.svg` | Wikimedia Commons | Trademark of Tesla, Inc. — favicon use, private prototype only |
| Fonts | Google Fonts (Space Grotesk, Inter) | SIL Open Font License |

**Keep this prototype private.** The Tesla and SpaceX names/logos are trademarks; public or commercial use requires permission from the rights holders.

---

## Deployment

Static front-end — deploy to any static host or serve behind the existing Laravel app:

- **Relative-root paths:** all internal links/assets use root-absolute paths (`/assets/...`, `/markets/`). Deploy at the domain root, or rewrite paths for a sub-path deployment.
- **Local preview:** `python -m http.server 8931` from the project root, then open `http://127.0.0.1:8931/`.
- **Auth & trading** link to the live platform: `https://bellbroker.ojojoarmanitech.com/{login,register,user/trading,user/trading/trade/{PAIR}}`.
- **Contact form** POSTs to `/contact` when hosted on `bellbroker.ojojoarmanitech.com`; otherwise it falls back to `mailto:support@domain.com`. When embedding in Laravel, replace the empty `_token` value in `contact/index.html` with `{{ csrf_token() }}`.
- **Market data** requires no keys: CoinGecko (homepage ticker + 7d sparklines) and Huobi (markets table), both refreshed every 60s. TradingView widget loads from `s.tradingview.com`.

## Accessibility & motion

- Semantic HTML (`header`/`nav`/`main`/`footer`), skip link, ARIA labels/`aria-current`/`aria-expanded`, single `h1` per page, `alt` on all images.
- All animations (reveals, count-ups, sparkline draw, nav transition) are gated behind `prefers-reduced-motion: reduce`.
- Fully responsive: desktop (≥1080px), tablet (960px burger nav), mobile (stacked stats, stacked market cards, single-column grids). No horizontal overflow at any breakpoint.
