# Tesla × SpaceX — Bell Invest Concept Prototype

A static website (HTML/CSS/JS) with a Tesla × SpaceX branded design language.
Private concept prototype — not affiliated with or endorsed by Tesla, Inc. or SpaceX.

## Pages
- `/`            Homepage (hero, markets, features, CTA)
- `/markets`     Markets page
- `/contact`     Contact page
- `/login`       Authentication page
- `/register`    Create account page

## Run locally
```bash
python3 -m http.server 8931
# then open http://localhost:8931
```

## Deploy to Vercel
This folder is Vercel-ready (includes vercel.json for clean URLs).

### Option A — CLI
```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

### Option B — Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → "Add New Project" → import the repo
3. Framework Preset: "Other" (static site)
4. Click Deploy — Vercel auto-detects the static files + vercel.json

## Tech
- Pure static HTML/CSS/JS — no build step
- Fonts: Google Fonts (Space Grotesk + Inter)
- Live data: CoinGecko + Huobi (homepage ticker & markets table)
- Auth forms are client-side prototypes (validate + redirect home)

## Asset licenses
- Tesla/SpaceX wordmarks & emblems: trademarks of their owners — private prototype use only
- Launch photography: supplied by project owner
- Fonts: SIL Open Font License
