#!/usr/bin/env python3
"""Generate CWPD Website Redesign RFP proposal PDF for Clarke Design Studio."""

from pathlib import Path
from datetime import date

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    HRFlowable,
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

OUT = Path("/workspace/docs/CWPD-Website-Redesign-Proposal-Clarke-Design-Studio.pdf")
ARTIFACT = Path(
    "/opt/cursor/artifacts/CWPD-Website-Redesign-Proposal-Clarke-Design-Studio.pdf"
)

FOREST = HexColor("#1a4a36")
FOREST_DEEP = HexColor("#0f2f23")
GOLD = HexColor("#d4a017")
INK = HexColor("#142018")
MUTED = HexColor("#3d4f44")
LINE = HexColor("#c5d9c8")
MIST = HexColor("#eef4f0")


def styles():
    base = getSampleStyleSheet()
    s = {
        "cover_eyebrow": ParagraphStyle(
            "cover_eyebrow",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=GOLD,
            tracking=2,
            spaceAfter=12,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=28,
            leading=34,
            textColor=white,
            spaceAfter=16,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=12,
            leading=18,
            textColor=HexColor("#e8f0eb"),
            spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Times-Bold",
            fontSize=18,
            leading=22,
            textColor=FOREST_DEEP,
            spaceBefore=18,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=FOREST,
            spaceBefore=14,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=INK,
            spaceAfter=8,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=INK,
            leftIndent=14,
            spaceAfter=4,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=MUTED,
            spaceAfter=4,
        ),
        "table_cell": ParagraphStyle(
            "table_cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=INK,
        ),
        "table_head": ParagraphStyle(
            "table_head",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=white,
        ),
        "price": ParagraphStyle(
            "price",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=FOREST_DEEP,
            spaceAfter=4,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }
    return s


def P(text, style):
    return Paragraph(text.replace("\n", "<br/>"), style)


def bullets(items, st):
    return [P(f"• {item}", st["bullet"]) for item in items]


def add_header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.75 * inch, 0.65 * inch, letter[0] - 0.75 * inch, 0.65 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        0.75 * inch,
        0.4 * inch,
        "Clarke Design Studio  ·  CWPD Website Redesign Proposal",
    )
    canvas.drawRightString(
        letter[0] - 0.75 * inch, 0.4 * inch, f"Page {doc.page}"
    )
    canvas.restoreState()


def cover_page(st):
    story = []
    # Spacer for green band drawn in first page template — use a table as cover block
    cover_data = [
        [
            P(
                "<font color='#e8b923'><b>PROPOSAL</b></font><br/><br/>"
                "<font color='white' size='22'><b>Website Redesign<br/>for Centerville-Washington<br/>Park District</b></font><br/><br/>"
                "<font color='#e8f0eb' size='11'>Response to RFP — Website Redesign<br/>"
                "Released September 1, 2026 · Proposals due October 12, 2026</font><br/><br/>"
                "<font color='#e8f0eb' size='10'>Submitted by<br/>"
                "<b>Clarke Design Studio</b><br/>"
                "Ryan Clarke, Designer<br/>"
                "clarkeanthonyryan@yahoo.com<br/><br/>"
                f"Date: {date.today().strftime('%B %d, %Y')}<br/>"
                "Live concept: https://centerville-park.pages.dev/</font>",
                st["cover_sub"],
            )
        ]
    ]
    t = Table(cover_data, colWidths=[6.5 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), FOREST_DEEP),
                ("TOPPADDING", (0, 0), (-1, -1), 48),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 48),
                ("LEFTPADDING", (0, 0), (-1, -1), 28),
                ("RIGHTPADDING", (0, 0), (-1, -1), 28),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 24))
    story.append(
        P(
            "This proposal is grounded in the working prototype we designed and built for CWPD: "
            "a mobile-first park district site on Cloudflare Pages, with live RecDesk registration, "
            "RainoutLine field status, Google Translate, Domine/Montserrat brand typography, "
            "and WCAG 2.1 AA–minded structure. Timeline is <b>immediate</b> because the public experience is already live.",
            st["body"],
        )
    )
    story.append(PageBreak())
    return story


def section_overview(st):
    story = []
    story.append(P("1. Understanding & approach", st["h1"]))
    story.append(
        P(
            "CWPD asked for a mobile-first redesign that makes parks, programs, events, and facilities "
            "easier to find; connects cleanly to RecDesk; meets WCAG 2.1 AA; and can be sustained after launch. "
            "Our answer is the site already running at <b>centerville-park.pages.dev</b>, ready for the "
            "<b>cwpd.org</b> domain to point at Cloudflare Pages.",
            st["body"],
        )
    )
    story.append(P("What we designed (now live)", st["h2"]))
    story.extend(
        bullets(
            [
                "Home: brand-led hero (“Your community’s big backyard”), plan links, featured parks, upcoming events, news, Foundation handoff",
                "Find a Park with amenity filters so residents can decide without opening every park page",
                "All 51 parks with unique photos, amenities, Visit rules, and park-filtered RecDesk programs",
                "Programs, Events, Shelters, and Fields (live athletic field status)",
                "Foundation section with its own visual identity",
                "Footer Google Translate (39 languages) and Accessibility page with axe-core evidence",
                "Domine + Montserrat — CWPD’s brand font pairing",
            ],
            st,
        )
    )
    return story


def section_vendor_questions(st):
    story = []
    story.append(P("2. Answers to vendor questions", st["h1"]))

    qa = [
        (
            "1. Three biggest opportunities for improvement",
            "First: make discovery mobile-first — more than 60% of traffic is mobile, so Find a Park, fields, and registration must work in one thumb-friendly path (we built the mobile dock, full-width RecDesk on small screens, and at-a-glance park results). "
            "Second: stop asking staff to re-enter programs on the website — wire RecDesk as the source of truth via embeds and facility-filtered program lists (already in the prototype). "
            "Third: treat accessibility and clarity as brand — WCAG 2.1 AA structure, skip links, contrast, and plain visitor copy instead of meta “AI” explanation text.",
        ),
        (
            "2. What we would retain",
            "CWPD’s slogan and voice (“Your community’s big backyard”), Domine/Montserrat brand fonts, the high-traffic destinations (field status, Find a Park, events, shelters, major parks), RecDesk as the registration system of record, Google Translate for multilingual access, RainoutLine for athletic fields, and the Foundation as a distinct but connected brand. We also retain the practical park taxonomy (community / nature / neighborhood) residents already understand.",
        ),
        (
            "3. RecDesk integration approach",
            "RecDesk remains the system of record for programs and shelter reservations. The public site embeds live RecDesk program and facility lists, deep-links to registration and membership signup, and uses a Cloudflare Pages Function to filter programs by park facility IDs where RecDesk has no public location URL. "
            "Program titles, dates, fees, and availability stay in RecDesk — staff do not duplicate that catalog into the marketing site. "
            "Limitation (disclosed): this uses RecDesk’s public Community UI and FilterPrograms endpoint, not a private vendor API. If RecDesk later offers an official feed/API, we can migrate the proxy to it under the monthly retainer without redesigning the visitor experience.",
        ),
        (
            "4. CMS recommendation and costs",
            "For the launch path CWPD described — pointing the domain to our Cloudflare Pages site — we recommend <b>not</b> standing up a heavy WordPress rebuild on day one. The site is a static Next.js export: fast, secure (no PHP plugin surface), and already built. "
            "<b>Day-one CMS model:</b> Clarke Design Studio manages content updates under the monthly retainer (news, alerts, park copy, photos, seasonal pages). Staff email or share copy; we publish. "
            "<b>Optional Phase 2 (if CWPD wants in-house editing):</b> Decap CMS (open-source, Git-based) or Sanity free/team tier wired to the same Pages deploy — estimated setup <b>$2,500</b> one-time, then included in retainer hours. "
            "This meets the RFP spirit (non-technical staff can request changes; optional future self-serve) without forcing a CMS migration before the domain cutover.",
        ),
        (
            "5. How we achieve WCAG 2.1 AA",
            "We design and ship with AA as a requirement, not a retrofit. The prototype already includes skip-to-content, visible focus, landmarks, labeled controls, reduced-motion support, contrast-minded UI, new-tab announcements, and an Accessibility statement. "
            "Automated axe-core audits (WCAG 2.1 A/AA tags) report <b>0 violations on District-controlled UI</b>; RecDesk iframes and Google Translate are documented third-party limitations. "
            "Before cutover and under retainer: keyboard pass, screen-reader spot checks, remediations, and keeping the public axe summary updated. Mandatory AA by April 2028 is planned as continuous compliance, not a scramble.",
        ),
        (
            "6. Preserving SEO during migration",
            "We ship robots.txt and sitemap.xml with the static site, preserve meaningful URL patterns where possible (/parks/{slug}/, /events/, /fields/, etc.), keep title/meta/OG tags and Organization JSON-LD, and provide a 301 redirect map from legacy WordPress URLs to the new routes during DNS cutover. "
            "Search Console and analytics stay on CWPD’s properties; we assist with property verification after cwpd.org points to Cloudflare Pages.",
        ),
        (
            "7. Information architecture recommendations",
            "Keep the customer jobs clear in primary nav: Find a Park, Programs, Events, Fields, Shelters, About — plus Foundation as a distinct callout. Home leads with brand, then “what do you need today,” featured parks, events, news, and Foundation. "
            "Park Finder stays the decision tool; park pages stay a single repeatable template with amenities, Visit rules, and programs. We de-emphasize duplicate “related parks” clutter and meta marketing language. Analytics’ top pages (fields, finder, events, shelters, Oak Grove, Bill Yeck, Grant) remain one tap away.",
        ),
        (
            "8. What CWPD staff will be responsible for",
            "Provide and approve final copy, photos, and policy language; manage RecDesk programs, fees, and shelter inventory; manage RainoutLine field updates; approve DNS cutover timing; review accessibility/content proofs; and designate a single marketing contact for retainer requests. "
            "Staff are not required to learn a developer workflow for day-one launch.",
        ),
        (
            "9. Ongoing technical resources after launch",
            "Cloudflare Pages hosting (SSL, CDN, global edge), the monthly Clarke Design Studio retainer for content and maintenance, RecDesk (existing CWPD account), and Google Translate (no CWPD license fee for the standard website translator). "
            "No DataYard WordPress stack is required for this path. Optional later: staff CMS credentials if Phase 2 Decap/Sanity is approved.",
        ),
    ]

    for title, body in qa:
        story.append(P(title, st["h2"]))
        story.append(P(body, st["body"]))
    return story


def section_timeline(st):
    story = []
    story.append(P("3. Proposed timeline — immediate", st["h1"]))
    story.append(
        P(
            "Because the public experience is already designed and deployed, we propose an <b>immediate</b> cutover path rather than a 2027 greenfield rebuild. Stages below compress discovery/design (complete) into launch and support.",
            st["body"],
        )
    )

    rows = [
        [
            P("<b>Stage</b>", st["table_head"]),
            P("<b>Timing</b>", st["table_head"]),
            P("<b>Work</b>", st["table_head"]),
        ],
        [
            P("Discovery &amp; IA", st["table_cell"]),
            P("Complete", st["table_cell"]),
            P("RFP goals mapped; mobile IA shipped in prototype", st["table_cell"]),
        ],
        [
            P("Design &amp; build", st["table_cell"]),
            P("Complete", st["table_cell"]),
            P("Live concept on Cloudflare Pages", st["table_cell"]),
        ],
        [
            P("Content sync", st["table_cell"]),
            P("Week 1", st["table_cell"]),
            P("Staff-provided final copy/photos; park &amp; news polish", st["table_cell"]),
        ],
        [
            P("Testing &amp; AA pass", st["table_cell"]),
            P("Week 1–2", st["table_cell"]),
            P("axe + keyboard review; RecDesk/field checks", st["table_cell"]),
        ],
        [
            P("Training", st["table_cell"]),
            P("Week 2", st["table_cell"]),
            P("Retainer request process; optional CMS intro", st["table_cell"]),
        ],
        [
            P("Launch", st["table_cell"]),
            P("Week 2–3", st["table_cell"]),
            P("Point cwpd.org DNS to Cloudflare Pages; redirects", st["table_cell"]),
        ],
        [
            P("Post-launch support", st["table_cell"]),
            P("Ongoing", st["table_cell"]),
            P("Monthly retainer; monitoring; enhancements", st["table_cell"]),
        ],
    ]
    t = Table(rows, colWidths=[1.4 * inch, 1.0 * inch, 4.1 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("BACKGROUND", (0, 1), (-1, -1), MIST),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 10))
    story.append(
        P(
            "Target: domain live on the new site within approximately <b>two to three weeks</b> of award/notice to proceed, pending CWPD DNS access and content approvals.",
            st["body"],
        )
    )
    return story


def section_pricing(st):
    story = []
    story.append(P("4. Investment &amp; monthly retainer", st["h1"]))
    story.append(
        P(
            "Pricing reflects work already embodied in the live prototype (design + front-end build) and the remaining cutover, compliance, and ongoing care. Hosting is Cloudflare Pages with the district domain pointed to our project.",
            st["body"],
        )
    )

    story.append(P("One-time launch package", st["h2"]))
    story.append(P("$14,500", st["price"]))
    story.extend(
        bullets(
            [
                "Credit for completed UX/UI and Next.js prototype already demonstrated",
                "Final content sync for parks, news, events, and alerts",
                "DNS cutover plan: point cwpd.org to Cloudflare Pages",
                "301 redirect map from legacy WordPress URLs",
                "Pre-launch WCAG 2.1 AA verification pass (District-controlled UI)",
                "RecDesk embed &amp; field-status production check",
                "Staff handoff session (retainer workflow)",
                "30 days hypercare after go-live included",
            ],
            st,
        )
    )

    story.append(P("Optional add-on", st["h2"]))
    rows = [
        [
            P("<b>Item</b>", st["table_head"]),
            P("<b>Fee</b>", st["table_head"]),
        ],
        [
            P("Phase 2 staff CMS (Decap or Sanity) setup &amp; training", st["table_cell"]),
            P("$2,500 one-time", st["table_cell"]),
        ],
    ]
    t = Table(rows, colWidths=[5.0 * inch, 1.5 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("BACKGROUND", (0, 1), (-1, -1), white),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)

    story.append(P("Monthly retainer (recommended)", st["h2"]))
    story.append(P("$950 / month", st["price"]))
    story.append(
        P(
            "Ongoing maintenance retainer — the model we recommend for CWPD after launch:",
            st["body"],
        )
    )
    story.extend(
        bullets(
            [
                "Up to 6 hours / month of content updates, fixes, and small enhancements",
                "Dependency and security updates for the Pages project",
                "Uptime/visual checks for home, parks, fields, programs, shelters",
                "RecDesk / field-status / Translate smoke checks after vendor changes",
                "Minor accessibility remediations on District-controlled UI",
                "Priority email support (business days)",
                "Unused hours do not roll more than 30 days unless agreed in writing",
                "Larger features quoted separately or drawn from a change budget",
            ],
            st,
        )
    )

    story.append(P("Hosting", st["h2"]))
    story.extend(
        bullets(
            [
                "Platform: Cloudflare Pages (+ Pages Functions for field status &amp; park programs)",
                "CWPD points DNS for cwpd.org (and www) to Cloudflare",
                "SSL via Cloudflare; global CDN",
                "Estimated Cloudflare cost at this traffic: typically within free/low Pro range — we recommend CWPD own the Cloudflare account; studio can administer under retainer",
                "Annual hosting cash cost to CWPD: often $0–$240/year depending on Cloudflare plan chosen; not marked up by Clarke Design Studio",
            ],
            st,
        )
    )

    story.append(P("Summary", st["h2"]))
    summary = [
        [
            P("<b>Package</b>", st["table_head"]),
            P("<b>Amount</b>", st["table_head"]),
        ],
        [
            P("Immediate launch package", st["table_cell"]),
            P("$14,500", st["table_cell"]),
        ],
        [
            P("Optional CMS setup", st["table_cell"]),
            P("$2,500", st["table_cell"]),
        ],
        [
            P("Monthly retainer", st["table_cell"]),
            P("$950 / month", st["table_cell"]),
        ],
    ]
    t2 = Table(summary, colWidths=[4.5 * inch, 2.0 * inch])
    t2.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST_DEEP),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("BACKGROUND", (0, 1), (-1, -1), MIST),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(t2)
    story.append(Spacer(1, 8))
    story.append(
        P(
            "Fees are USD. Proposal valid for 90 days. No WordPress plugin or proprietary lock-in: CWPD owns the site content, design files, and custom code delivered under this engagement.",
            st["meta"],
        )
    )
    return story


def section_hosting_security(st):
    story = []
    story.append(P("5. Hosting &amp; security", st["h1"]))
    story.append(
        P(
            "Recommended change from DataYard WordPress hosting to <b>Cloudflare Pages</b>, with CWPD (or Clarke Design Studio under retainer) managing the project. Domain remains cwpd.org.",
            st["body"],
        )
    )
    items = [
        ("Environment", "Static site (Next.js export) + Cloudflare Pages Functions"),
        ("Provider", "Cloudflare"),
        ("Data location", "Cloudflare global edge network (US-centric traffic served from nearest PoP)"),
        ("Uptime", "Cloudflare publicly targets high availability; static assets have no origin PHP stack"),
        ("Backups", "Git repository is source of truth; Cloudflare deployment history for rollback"),
        ("DR", "Redeploy from Git; DNS remains under CWPD control"),
        ("SSL", "HTTPS via Cloudflare"),
        ("Auth", "No public-site logins required; RecDesk handles registration accounts"),
        ("Vulnerabilities", "No WordPress plugin attack surface; dependency updates under retainer"),
        ("Malware / monitoring", "Cloudflare edge protections; retainer visual/uptime checks"),
        ("Outage response", "Business-day retainer response; critical DNS/hosting issues escalated same day when notified"),
    ]
    rows = [[P("<b>Topic</b>", st["table_head"]), P("<b>Approach</b>", st["table_head"])]]
    for k, v in items:
        rows.append([P(k, st["table_cell"]), P(v, st["table_cell"])])
    t = Table(rows, colWidths=[1.6 * inch, 4.9 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), FOREST),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("BACKGROUND", (0, 1), (-1, -1), white),
            ]
        )
    )
    story.append(t)
    return story


def section_experience(st):
    story = []
    story.append(P("6. Experience, personnel, accessibility, RecDesk, IP", st["h1"]))

    story.append(P("Comparable work &amp; sample", st["h2"]))
    story.append(
        P(
            "Primary sample for this RFP: the CWPD redesign concept itself — "
            "<b>https://centerville-park.pages.dev/</b> — a full park-district marketing site with finder, 51 park templates, RecDesk handoff, live fields, Foundation, translation, and accessibility documentation. "
            "Clarke Design Studio specializes in brand-led public and civic digital experiences.",
            st["body"],
        )
    )

    story.append(P("Key personnel", st["h2"]))
    story.append(
        P(
            "<b>Ryan Clarke</b> — Designer / lead. Responsible for visual design, UX, front-end implementation, accessibility review, RecDesk/field integration wiring, launch, and retainer delivery. "
            "Contact: clarkeanthonyryan@yahoo.com",
            st["body"],
        )
    )

    story.append(P("Accessibility process", st["h2"]))
    story.extend(
        bullets(
            [
                "Build with semantic HTML, keyboard access, focus visibility, and contrast from the start",
                "Automated axe-core audits (wcag2a/aa + wcag21a/aa) on key templates before launch",
                "Manual keyboard pass; document known third-party limits (RecDesk, Google Translate)",
                "Remediate District-controlled issues under launch package and retainer",
                "Public Accessibility page + audit summary retained on the site",
            ],
            st,
        )
    )

    story.append(P("RecDesk experience &amp; limitations", st["h2"]))
    story.append(
        P(
            "Implemented live RecDesk Community embeds for programs and facilities; Cloudflare Function proxy for facility-filtered program listings; deep links to membership signup and program detail. "
            "Limitations: no private RecDesk API contract in this proposal; automation is via RecDesk’s public interfaces. Duplicate entry of the program catalog is avoided by not mirroring RecDesk into a second CMS database. "
            "Third-party RecDesk UI accessibility is outside full District control; we mitigate with clear “open full list” paths and titles.",
            st["body"],
        )
    )

    story.append(P("References", st["h2"]))
    story.append(
        P(
            "Professional references available on request for municipal / brand digital work. For this submission, the working CWPD prototype is the primary reviewable artifact.",
            st["body"],
        )
    )

    story.append(P("Intellectual property", st["h2"]))
    story.append(
        P(
            "All website content, data, design files, and custom code delivered for CWPD under this engagement shall be CWPD’s property upon payment. "
            "We do not retain proprietary runtime licenses that would block CWPD from maintaining or migrating the site. Open-source components (Next.js, React, etc.) remain under their respective licenses. "
            "Google Translate and RecDesk remain third-party services under CWPD’s/Google’s/RecDesk’s terms.",
            st["body"],
        )
    )
    return story


def section_close(st):
    story = []
    story.append(P("7. Closing", st["h1"]))
    story.append(
        P(
            "We are ready to point <b>cwpd.org</b> at the Cloudflare Pages project, complete content sync, and operate under a monthly retainer. "
            "The design is not a slide deck — it is already a running park district website.",
            st["body"],
        )
    )
    story.append(
        P(
            "Submitted by Clarke Design Studio<br/>"
            "Ryan Clarke<br/>"
            "clarkeanthonyryan@yahoo.com<br/>"
            "Live concept: https://centerville-park.pages.dev/",
            st["body"],
        )
    )
    story.append(Spacer(1, 12))
    story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=10))
    story.append(
        P(
            "Note on homepage wording: “Your community’s big backyard” uses the singular possessive "
            "<i>community’s</i>, matching CWPD’s established slogan (not “communities”). "
            "If CWPD prefers plural (“communities’”) to emphasize Centerville and Washington Township together, we can change it in one deploy.",
            st["meta"],
        )
    )
    return story


def build():
    st = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.7 * inch,
        bottomMargin=0.85 * inch,
        title="CWPD Website Redesign Proposal — Clarke Design Studio",
        author="Clarke Design Studio",
    )
    story = []
    story.extend(cover_page(st))
    story.extend(section_overview(st))
    story.extend(section_vendor_questions(st))
    story.append(PageBreak())
    story.extend(section_timeline(st))
    story.extend(section_pricing(st))
    story.append(PageBreak())
    story.extend(section_hosting_security(st))
    story.extend(section_experience(st))
    story.extend(section_close(st))
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    ARTIFACT.write_bytes(OUT.read_bytes())
    print("wrote", OUT, "bytes", OUT.stat().st_size)
    print("artifact", ARTIFACT)


if __name__ == "__main__":
    build()
