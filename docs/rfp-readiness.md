# RFP readiness — CWPD Website Redesign

Assessment against the Centerville-Washington Park District RFP
(released Sep 1, 2026; proposals due Oct 12, 2026, 4:30 p.m.).

Live prototype: https://centerville-park.pages.dev/

## Verdict

**Ready to write the proposal** with this prototype as the design/UX sample.

**Not ready to claim a finished production CMS** — the RFP awards a full engagement (CMS, training, migration, hosting plan, pricing). This repo proves the public experience; the written proposal must still cover CMS, cost, timeline, staffing, and RecDesk automation path.

---

## Customer-facing RFP requirements

| Requirement | Status | Evidence |
| --- | --- | --- |
| Mobile-first responsive design | Ready | Mobile dock, responsive layouts, 60%+ mobile audience addressed |
| Find a Park / Park Finder | Ready | `/parks` filters + at-a-glance amenities |
| All 51 parks, repeatable templates | Ready | `/parks/[slug]`, photos in repo |
| Athletic field status | Ready | `/fields` + live RainoutLine via Pages Function |
| Upcoming events | Ready | `/events` + RecDesk detail embeds |
| Programs registration | Ready | `/programs` + RecDesk embed |
| Group shelters | Ready | `/shelters` + RecDesk Facility |
| Foundation (own identity + home link) | Ready | `/foundation` + home section |
| News section + on home | Ready | `/news` + home “Park District news” |
| Language translation | Ready | Footer Google Translate (39 languages) |
| Brand / storytelling | Ready | Domine + Montserrat, forest/gold system |
| WCAG 2.1 AA | Strong prototype | `/accessibility`, axe: 0 District-controlled violations |
| RecDesk relationship | Partial | Live embeds + park program proxy; not a staff CMS feed yet |
| Staff CMS / roles / scheduling | **Gap** | Static content in Git — proposal must recommend CMS |
| Hosting & security package | **Gap** | Demo on Cloudflare Pages; proposal must specify host/DR/cost |
| Written proposal package | **Gap** | 9 vendor questions, timeline, pricing, references |

---

## Proposal submittals still needed

Answer in the written proposal (not only in code):

1. Three biggest opportunities  
2. What to retain  
3. RecDesk integration approach  
4. CMS recommendation + costs  
5. WCAG 2.1 AA plan  
6. SEO preservation during migration  
7. IA recommendations  
8. CWPD staff responsibilities  
9. Post-launch technical resources  

Also: timeline, cost breakdown + maintenance option, comparable work, key personnel, accessibility process, RecDesk experience/limits, references, IP ownership.

---

## What this prototype *is*

A permanent, self-contained **public-site concept** that can stay online:

- All images and logo committed under `public/images/`
- Static export (`output: "export"`) + Cloudflare Pages Functions for field status and RecDesk filter
- Fonts bundled at build via `next/font`
- No dependence on cwpd.org for site chrome/assets (JSON-LD logo is local)

## What it is *not*

- A staff CMS with roles, media library, or scheduled publishing  
- A guaranteed official RecDesk API product (uses public RecDesk UI + filter proxy)  
- A signed hosting/SLA package for DataYard replacement  

---

## Recommendation

1. Keep this demo live as the **design + UX exhibit** for the proposal.  
2. Draft the written RFP responses now (CMS pick, RecDesk plan, pricing, timeline).  
3. Optionally attach this readiness sheet and the axe report (`/accessibility/wcag21-aa-axe-summary.md`).

**Bottom line:** The site experience is proposal-ready. The **proposal document** still needs to be written before Oct 12.
