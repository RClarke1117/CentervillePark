import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Centerville-Washington Park District website accessibility — WCAG 2.1 Level AA commitment, features, and how to get help.",
};

const features = [
  {
    title: "Keyboard access",
    text: "All primary navigation, search, filters, and forms can be reached and operated with a keyboard. A visible focus indicator marks the active control.",
  },
  {
    title: "Skip link",
    text: "A “Skip to content” link appears on focus so keyboard users can bypass the header and go straight to the main landmark.",
  },
  {
    title: "Text alternatives",
    text: "Informative images include alternative text. Decorative images are marked so assistive technology can ignore them.",
  },
  {
    title: "Structure & labels",
    text: "Pages use landmarks, labeled controls, and meaningful link text so screen reader users can navigate by region and heading.",
  },
  {
    title: "Motion",
    text: "Decorative motion respects prefers-reduced-motion and is turned off when that system setting is enabled.",
  },
  {
    title: "Language",
    text: "The site language is set to English. Use Translate this site in the footer to choose another language.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Accessibility"
        title="Built for WCAG 2.1 Level AA"
        description="This redesign targets the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA success criteria for public park district websites."
        crumbs={[{ label: "Accessibility" }]}
      />

      <div className="section-pad grid gap-12 py-14 pb-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            Our commitment
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Centerville-Washington Park District is committed to providing a
            website that is usable by people with disabilities. This site is
            designed to meet WCAG 2.1 Level AA.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.title}>
                <h3 className="text-sm font-semibold text-forest">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {f.text}
                </p>
              </li>
            ))}
          </ul>

          <h2
            className="mt-12 font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            Known limitations
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Some areas of the site embed tools from other providers (program
            registration and translation). Accessibility of those tools may
            vary. If you need help using any part of this site, contact the
            Park District office.
          </p>
        </div>

        <aside className="h-fit border border-line bg-paper p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Need help?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            If you have trouble using this site or need information in another
            format, contact the Park District office.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            <a className="focus-ring font-semibold text-forest underline-offset-2 hover:underline" href="tel:9374335155">
              (937) 433-5155
            </a>
            <br />
            Monday–Friday, 8:00 a.m. – 3:30 p.m.
          </p>
          <p className="mt-4 text-sm">
            <Link
              href="/contact"
              className="focus-ring font-semibold text-forest underline-offset-2 hover:underline"
            >
              Contact form
            </Link>
          </p>
          <p className="mt-6 text-xs leading-relaxed text-ink-muted">
            Standard:{" "}
            <a
              className="focus-ring underline underline-offset-2"
              href="https://www.w3.org/TR/WCAG21/"
              rel="noopener noreferrer"
              target="_blank"
            >
              WCAG 2.1
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            Level AA
          </p>
        </aside>
      </div>
    </div>
  );
}
