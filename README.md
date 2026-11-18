# Portfolio

Personal portfolio built with Next.js 16, Three.js (react-three-fiber), D3 and Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Customize

Everything personal lives in one file: `src/data/site.ts`.

- `site` — name, role, tagline, email, social links
- `projects` — project cards shown on Home and Work
- `skills` — drives the D3 radial chart on Work
- `timeline` — drives the experience timeline on About

Colors and fonts are tokens in `src/app/globals.css` (Syne for display, Manrope for body, JetBrains Mono for labels).

## Pages

- `/` — 3D hero (distorted blob, orbit rings, particles, mouse parallax), marquee, intro, featured work, CTA
- `/work` — tilt/spotlight project cards, D3 radial skills chart, D3 animated activity line
- `/about` — bio, principles grid, scroll-driven timeline, contact

## Deploy

Push to GitHub and import into Vercel. No environment variables required.
