#!/usr/bin/env python3
"""Generate CWPD Website Redesign RFP proposal PDF for Clarke Design Studio."""

from pathlib import Path
from datetime import date

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    Image,
    KeepTogether,
)
from reportlab.lib.enums import TA_CENTER

OUT = Path("/workspace/docs/CWPD-Website-Redesign-Proposal-Clarke-Design-Studio.pdf")
ARTIFACT = Path(
    "/opt/cursor/artifacts/CWPD-Website-Redesign-Proposal-Clarke-Design-Studio.pdf"
)
LOGO_LOCKUP = Path("/workspace/docs/brand/loader-lockup.png")

# Clarke Design Studio brand
BLUE = HexColor("#4A9BC4")
BLUE_SOFT = HexColor("#9BCDE6")
BLUE_PALE = HexColor("#E4F0F8")
INK = HexColor("#0B0D10")
INK_SOFT = HexColor("#1A1F26")
MUTED = HexColor("#6B7480")
LINE = HexColor("#E6EAEE")
PAPER = HexColor("#F7F9FB")


def styles():
    base = getSampleStyleSheet()
    return {
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=HexColor("#E8EEF2"),
            spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=INK,
            spaceBefore=14,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=BLUE,
            spaceBefore=10,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=INK,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=12.5,
            textColor=INK,
            leftIndent=12,
            spaceAfter=2,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
            spaceAfter=4,
        ),
        "table_cell": ParagraphStyle(
            "table_cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=INK,
        ),
        "table_head": ParagraphStyle(
            "table_head",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=white,
        ),
        "price": ParagraphStyle(
            "price",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=14,
            textColor=INK,
            spaceAfter=3,
        ),
    }


def P(text, style):
    return Paragraph(text.replace("\n", "<br/>"), style)


def bullets(items, st):
    return [P(f"— {item}", st["bullet"]) for item in items]


def add_header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.7 * inch, 0.55 * inch, letter[0] - 0.7 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        0.7 * inch,
        0.32 * inch,
        "Clarke Design Studio  ·  CWPD Website Redesign Proposal",
    )
    canvas.drawRightString(letter[0] - 0.7 * inch, 0.32 * inch, f"{doc.page}")
    canvas.restoreState()


def cover_page(st):
    story = []
    logo = Image(str(LOGO_LOCKUP), width=1.05 * inch, height=1.07 * inch)

    right = P(
        "<font color='#4A9BC4'><b>PROPOSAL</b></font><br/><br/>"
        "<font color='white' size='15'><b>Website Redesign<br/>"
        "Centerville-Washington Park District</b></font><br/><br/>"
        "<font color='#c5dff0' size='9'>RFP response · Due October 12, 2026</font><br/><br/>"
        "<font color='#e8eef2' size='9'>"
        "<b>Clarke Design Studio</b><br/>"
        "Ryan Clarke · ryan@clarkedesignstudio.com<br/>"
        "clarkedesignstudio.com<br/><br/>"
        f"{date.today().strftime('%B %d, %Y')}<br/>"
        "Live site: https://centerville-park.pages.dev/"
        "</font>",
        st["cover_sub"],
    )

    band = Table([[logo, right]], colWidths=[1.35 * inch, 5.15 * inch])
    band.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), INK),
                ("TOPPADDING", (0, 0), (-1, -1), 26),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 26),
                ("LEFTPADDING", (0, 0), (0, 0), 22),
                ("RIGHTPADDING", (0, 0), (0, 0), 12),
                ("LEFTPADDING", (1, 0), (1, 0), 8),
                ("RIGHTPADDING", (1, 0), (1, 0), 22),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(band)
    story.append(Spacer(1, 16))
    story.append(
        P(
            "This proposal covers launching the CWPD site already live at "
            "<b>centerville-park.pages.dev</b> — mobile-first parks, programs, events, "
            "RecDesk registration, field status, Google Translate, and WCAG 2.1 AA structure — "
            "by pointing <b>cwpd.org</b> to Cloudflare Pages.",
            st["body"],
        )
    )
    return story


def section_overview(st):
    story = []
    story.append(P("1. Approach", st["h1"]))
    story.append(
        P(
            "CWPD needs a mobile-first site that makes parks, programs, events, and fields "
            "easy to find, connects to RecDesk, meets WCAG 2.1 AA, and stays maintainable. "
            "That site is built and running. Remaining work is content sync, DNS cutover, "
            "and ongoing updates under retainer.",
            st["body"],
        )
    )
    story.extend(
        bullets(
            [
                "Home, Find a Park, all 51 parks, Programs, Events, Shelters, Fields",
                "Live RecDesk embeds and park-filtered program lists",
                "Foundation section, footer Translate (39 languages), Accessibility page",
                "CWPD brand fonts (Domine + Montserrat) and slogan",
            ],
            st,
        )
    )
    return story


def section_vendor_questions(st):
    story = []
    story.append(P("2. Vendor questions", st["h1"]))

    qa = [
        (
            "1. Three biggest opportunities",
            "Mobile-first discovery (over 60% of traffic is mobile). Keep RecDesk as the "
            "single source for programs so staff do not re-enter listings. Ship clear writing "
            "and WCAG 2.1 AA structure as the default.",
        ),
        (
            "2. What we would retain",
            "Slogan and voice, Domine/Montserrat, Find a Park, fields, events, shelters, "
            "major parks, RecDesk, Google Translate, RainoutLine, Foundation identity, "
            "and the community / nature / neighborhood park types.",
        ),
        (
            "3. RecDesk integration",
            "RecDesk stays the system of record. The site embeds live lists, links to "
            "registration, and uses a Cloudflare Function to filter programs by park when "
            "needed. Catalog data is not duplicated into a second CMS.",
        ),
        (
            "4. CMS recommendation",
            "No WordPress rebuild on day one. The studio publishes updates under the monthly "
            "retainer. Optional later: Decap or Sanity for staff editing (~$2,500 setup).",
        ),
        (
            "5. WCAG 2.1 AA",
            "Built with skip links, focus styles, landmarks, contrast, and an Accessibility "
            "statement. axe-core shows 0 violations on District-controlled UI. RecDesk and "
            "Google Translate are documented third-party limits. Keyboard and screen-reader "
            "checks before cutover; fixes under retainer through the April 2028 deadline.",
        ),
        (
            "6. SEO during migration",
            "robots.txt, sitemap, stable URL patterns, titles and Open Graph tags, JSON-LD, and a "
            "301 redirect map from WordPress URLs at DNS cutover.",
        ),
        (
            "7. Information architecture",
            "Primary nav: Find a Park, Programs, Events, Fields, Shelters, About, plus "
            "Foundation. Home leads with brand, then parks, events, and news. One park "
            "page template for all 51 parks.",
        ),
        (
            "8. CWPD staff responsibilities",
            "Approve copy and photos; manage RecDesk and RainoutLine; approve DNS timing; "
            "name one marketing contact for retainer requests. No developer workflow required "
            "for launch.",
        ),
        (
            "9. Ongoing technical resources",
            "Cloudflare Pages, the $200/month retainer, existing RecDesk, and Google "
            "Translate. No DataYard WordPress stack required for this path.",
        ),
    ]

    for title, body in qa:
        story.append(P(title, st["h2"]))
        story.append(P(body, st["body"]))
    return story


def section_timeline(st):
    story = []
    story.append(P("3. Timeline", st["h1"]))
    story.append(
        P(
            "Immediate cutover — design and build are done. Target: live on cwpd.org in "
            "about <b>2–3 weeks</b> after notice to proceed.",
            st["body"],
        )
    )
    rows = [
        [
            P("<b>Stage</b>", st["table_head"]),
            P("<b>When</b>", st["table_head"]),
            P("<b>Work</b>", st["table_head"]),
        ],
        [
            P("Design &amp; build", st["table_cell"]),
            P("Done", st["table_cell"]),
            P("Live on Cloudflare Pages", st["table_cell"]),
        ],
        [
            P("Content sync", st["table_cell"]),
            P("Week 1", st["table_cell"]),
            P("Final copy, photos, news, alerts", st["table_cell"]),
        ],
        [
            P("AA &amp; QA", st["table_cell"]),
            P("Week 1–2", st["table_cell"]),
            P("Accessibility pass; RecDesk / fields check", st["table_cell"]),
        ],
        [
            P("Launch", st["table_cell"]),
            P("Week 2–3", st["table_cell"]),
            P("DNS to Cloudflare Pages; redirects", st["table_cell"]),
        ],
        [
            P("Support", st["table_cell"]),
            P("Ongoing", st["table_cell"]),
            P("Monthly retainer", st["table_cell"]),
        ],
    ]
    t = Table(rows, colWidths=[1.35 * inch, 0.9 * inch, 4.25 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BLUE),
                ("BACKGROUND", (0, 1), (-1, -1), PAPER),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)
    return story


def section_pricing(st):
    story = []
    story.append(P("4. Investment", st["h1"]))

    story.append(P("Launch package — $2,000", st["h2"]))
    story.extend(
        bullets(
            [
                "Content sync, DNS cutover, 301 redirects",
                "Pre-launch WCAG 2.1 AA check (District-controlled UI)",
                "RecDesk and field-status production check",
                "Staff handoff; 30 days hypercare after go-live",
            ],
            st,
        )
    )

    story.append(P("Monthly retainer — $200 / month", st["h2"]))
    story.extend(
        bullets(
            [
                "Up to 2 hours / month for content updates and small fixes",
                "Security / dependency updates; uptime checks",
                "Email support on business days; larger work quoted separately",
            ],
            st,
        )
    )

    story.append(P("Optional CMS setup — $2,500", st["h2"]))
    story.append(
        P(
            "Decap or Sanity for in-house editing, if CWPD wants it after launch.",
            st["body"],
        )
    )

    summary = [
        [
            P("<b>Item</b>", st["table_head"]),
            P("<b>Amount</b>", st["table_head"]),
        ],
        [P("Launch package", st["table_cell"]), P("$2,000", st["table_cell"])],
        [P("Monthly retainer", st["table_cell"]), P("$200 / month", st["table_cell"])],
        [P("Optional CMS setup", st["table_cell"]), P("$2,500", st["table_cell"])],
    ]
    t = Table(summary, colWidths=[4.5 * inch, 2.0 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("BACKGROUND", (0, 1), (-1, -1), BLUE_PALE),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(Spacer(1, 6))
    story.append(t)
    story.append(Spacer(1, 4))
    story.append(
        P(
            "Fees in USD; valid 90 days. CWPD owns delivered content, design files, and custom code.",
            st["meta"],
        )
    )
    return story


def section_hosting_security(st):
    story = []
    block = []
    block.append(P("5. Hosting &amp; security", st["h1"]))
    block.append(
        P(
            "Move from DataYard WordPress to <b>Cloudflare Pages</b>. Domain stays cwpd.org.",
            st["body"],
        )
    )
    items = [
        ("Stack", "Static Next.js export + Cloudflare Pages Functions"),
        ("SSL / CDN", "HTTPS and global edge via Cloudflare"),
        ("Backups", "Git is source of truth; deploy history for rollback"),
        ("Security", "No WordPress plugins; dependency updates under retainer"),
        ("Outages", "Business-day response; critical DNS issues same day when notified"),
    ]
    rows = [[P("<b>Topic</b>", st["table_head"]), P("<b>Approach</b>", st["table_head"])]]
    for k, v in items:
        rows.append([P(k, st["table_cell"]), P(v, st["table_cell"])])
    t = Table(rows, colWidths=[1.3 * inch, 5.2 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BLUE),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("BACKGROUND", (0, 1), (-1, -1), white),
            ]
        )
    )
    block.append(t)
    story.append(KeepTogether(block))
    return story


def section_close(st):
    story = []
    story.append(P("6. Team, sample &amp; terms", st["h1"]))
    story.append(
        P(
            "<b>Ryan Clarke</b> — design, build, accessibility, RecDesk/fields wiring, "
            "launch, and retainer. ryan@clarkedesignstudio.com",
            st["body"],
        )
    )
    story.append(
        P(
            "Primary sample: <b>https://centerville-park.pages.dev/</b>. "
            "References available on request.",
            st["body"],
        )
    )
    story.append(
        P(
            "Delivered content, design files, and custom code belong to CWPD upon payment. "
            "Open-source libraries keep their licenses. RecDesk and Google Translate remain "
            "third-party services.",
            st["body"],
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        P(
            "Ready to point <b>cwpd.org</b> to Cloudflare Pages and support the site under retainer.",
            st["body"],
        )
    )
    story.append(
        P(
            "Clarke Design Studio · Ryan Clarke · ryan@clarkedesignstudio.com · "
            "clarkedesignstudio.com",
            st["meta"],
        )
    )
    return story


def build():
    st = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.7 * inch,
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
    story.extend(section_hosting_security(st))
    story.extend(section_close(st))
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_bytes(OUT.read_bytes())
    print("wrote", OUT, "bytes", OUT.stat().st_size)
    print("artifact", ARTIFACT)


if __name__ == "__main__":
    build()
