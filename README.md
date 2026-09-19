# Centerville-Washington Park District — Redesign Prototype

Concept redesign of [cwpd.org](https://cwpd.org) for the CWPD Website Redesign RFP (proposals due Oct 12, 2026).

**Live:** https://centerville-park.pages.dev/

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npx wrangler pages deploy out --project-name=centerville-park
```

Static HTML is written to `out/`. Cloudflare Pages Functions in `functions/api/` provide:

- `/api/field-status` — live RainoutLine status from cwpd.org  
- `/api/park-programs` — RecDesk facility-filtered program list  

## Self-contained assets

Everything needed to render the public site is in this repository:

- Logo and photography under `public/images/` (including all 51 park photos)  
- Domine + Montserrat via `next/font` (downloaded at build, served from the deploy)  
- Page content in `src/data/`  

Third-party services used by design (same class as the live district site):

- **RecDesk** — program/shelter registration embeds  
- **Google Translate** — footer language control  
- **RainoutLine / cwpd.org field status** — live field board  

The static front end still works if those services are slow; embeds and APIs degrade gracefully.

## RFP readiness

See [docs/rfp-readiness.md](./docs/rfp-readiness.md) for a requirement-by-requirement check against the CWPD RFP.

## Stack

Next.js App Router (static export), TypeScript, Tailwind CSS v4, Cloudflare Pages.
