import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Centerville-Washington Park District — mission, funding, and community partnerships.",
};

export default function AboutPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="About"
        title="Who we are"
        description="Founded in 1959, CWPD now stewards eight community parks, nature preserves, and neighborhood greens across 1,063 acres — so there is a park near every home."
        crumbs={[{ label: "About" }]}
      />

      <div className="section-pad grid gap-12 py-14 pb-8 md:grid-cols-2 md:py-20">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
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
        className="section-pad border-t border-line py-14 pb-24 md:py-16"
      >
        <h2
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
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
