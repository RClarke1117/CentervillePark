# Centerville-Washington Park District — Redesign Prototype

Concept redesign of [cwpd.org](https://cwpd.org) prepared for the CWPD Website Redesign RFP (proposals due Oct 12, 2026), to Clarke Design Studio quality standards.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s demonstrated

- **Mobile-first IA** focused on Find a Park, shelters, programs/RecDesk handoff, field status, news, and Foundation
- **Improved Park Finder** with amenity filters and at-a-glance results (RFP: decide without opening every park page)
- **Repeatable park templates** with amenities, related programs, and news hooks
- **Foundation** section with a distinct visual identity linked from the home page
- **WCAG-minded** structure: skip link, focus rings, semantic headings, reduced-motion support
- **Brand-led hero** and intentional motion (reveal + subtle ken burns), per Clarke Design Studio expectations

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion available, curated park content from cwpd.org.

## Note

This is a front-end prototype for proposal and design review — not a live CMS or RecDesk integration. Content is representative; production would migrate staff-provided content and wire RecDesk feeds/API.
