import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Centerville-Washington Park District — mission, funding, and community partnerships.",
};

export default function AboutPage() {
  return (
    <div className="atmosphere min-h-screen">
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          About
        </p>
        <h1
          className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Who we are
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Founded in 1959, CWPD now stewards eight community parks, nature
          preserves, and neighborhood greens across 1,063 acres — so there is a
          park near every home.
        </p>
      </div>

      <div className="section-pad grid gap-12 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            How we are funded
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
            <li>
              <strong className="text-ink">Property taxes</strong> — voter-approved
              levies dedicated to operating, maintaining, and improving 51 parks.
            </li>
            <li>
              <strong className="text-ink">Responsible management</strong> — no
              operating dollars from city, township, county, or state.
            </li>
            <li>
              <strong className="text-ink">Additional support</strong> — grants,
              program fees, and Foundation donations stretch every levy dollar.
            </li>
          </ul>
        </div>
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            Proud to be home
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Centerville–Washington Township is a community where people are proud
            to live, work, learn, play, and serve. CWPD partners with the City,
            Township, Library, and Schools as one connected system for quality of
            life.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/parks">Explore parks</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        id="volunteer"
        className="section-pad border-t border-line py-14 md:py-16"
      >
        <h2
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
          style={{ fontVariationSettings: '"SOFT" 30' }}
        >
          Volunteer & careers
        </h2>
        <p className="mt-3 max-w-xl text-ink-muted">
          From Project VIPR to seasonal roles, there are ways to help keep the
          backyard thriving.
        </p>
        <div id="careers" className="mt-6">
          <ButtonLink href="/contact" variant="ghost">
            Get involved
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
