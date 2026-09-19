import Link from "next/link";
import { SiteTranslate } from "@/components/SiteTranslate";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/parks", label: "Find a Park" },
      { href: "/programs", label: "Programs & registration" },
      { href: "/events", label: "Upcoming events" },
      { href: "/shelters", label: "Reserve a shelter" },
    ],
  },
  {
    title: "Today",
    links: [
      { href: "/fields", label: "Athletic field status" },
      { href: "/parks?amenity=dog-park", label: "Dog park" },
      { href: "/news", label: "Park District news" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/foundation", label: "Foundation" },
      { href: "/about", label: "About CWPD" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/about#volunteer", label: "Volunteer" },
      { href: "/about#careers", label: "Careers" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="section-pad grid gap-8 border-b border-white/10 py-10 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright">
            Visit the office
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            221 N. Main Street
            <br />
            Centerville, Ohio 45459
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright">
            Hours
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Monday–Friday
            <br />
            8:00 a.m. – 3:30 p.m.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright">
            Call
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            <a className="focus-ring underline-offset-2 hover:underline" href="tel:9374335155">
              (937) 433-5155
            </a>
            <br />
            <span className="text-white/70">FAX (937) 433-6564</span>
          </p>
        </div>
      </div>

      <div className="section-pad grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
        <div>
          <p
            className="font-[family-name:var(--font-display)] text-2xl leading-tight tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 40, "WONK" 0' }}
          >
            Centerville-Washington
            <br />
            Park District
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Your community&apos;s big backyard — 51 parks across 1,063 acres in
            Centerville and Washington Township.
          </p>
          <p className="mt-6 text-xs text-white/70">
            Parks open from one-half hour before sunrise to one-half hour after
            sunset, unless posted for programs or permits.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring text-sm text-white/90 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-pad border-t border-white/10 py-6">
        <SiteTranslate />
      </div>

      <div className="section-pad flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Centerville-Washington Park District</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href="/accessibility"
            className="focus-ring text-white underline-offset-2 hover:underline"
          >
            Accessibility
          </Link>
          <span aria-hidden className="text-white/40">
            ·
          </span>
          <span>
            Redesign concept by{" "}
            <a
              href="https://clarkedesignstudio.com"
              className="focus-ring text-white underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Clarke Design Studio
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
