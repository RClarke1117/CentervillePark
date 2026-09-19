import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RecDeskEmbed } from "@/components/RecDeskEmbed";
import { parks } from "@/data/parks";

export const metadata: Metadata = {
  title: "Reserve a Shelter",
  description:
    "Reserve group picnic shelters at Centerville-Washington community parks via live RecDesk facilities.",
};

const RECDESK_FACILITY = "https://cwpd.recdesk.com/Community/Facility";

export default function SheltersPage() {
  const withShelter = parks.filter((p) =>
    p.amenities.some((a) => a.includes("shelter")),
  );

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Shelters"
        title="Reserve a group shelter"
        description="Browse parks with shelters below, then reserve in the live RecDesk facilities panel — availability stays current in RecDesk."
        crumbs={[{ label: "Shelters" }]}
      >
        <ButtonLink href={RECDESK_FACILITY} external>
          Open RecDesk facilities
        </ButtonLink>
      </PageHero>

      <div className="section-pad py-10 pb-24 md:py-14">
        <div className="mb-10">
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            Parks with shelters
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Context from the park directory — reservations are confirmed in
            RecDesk.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {withShelter.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/parks/${p.slug}/`}
                  className="focus-ring block border border-line bg-paper p-5 transition hover:border-forest/30 hover:bg-mist"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-mid">
                    {p.type}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{p.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{p.address}</p>
                  <p className="mt-3 text-xs text-ink-muted">
                    {p.amenities.includes("shelter-reservable")
                      ? "Reservable shelter available"
                      : "Drop-in shelter"}
                    {p.amenities.includes("restrooms") ? " · Restrooms" : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <RecDeskEmbed
          src={RECDESK_FACILITY}
          title="CWPD facility & shelter reservations"
          openLabel="Open full RecDesk facilities"
          frameHeight={1000}
        />
      </div>
    </div>
  );
}
