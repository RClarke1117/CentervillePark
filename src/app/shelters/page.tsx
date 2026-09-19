import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { parks } from "@/data/parks";

export const metadata: Metadata = {
  title: "Reserve a Shelter",
  description:
    "Reserve group picnic shelters at Centerville-Washington community parks.",
};

export default function SheltersPage() {
  const withShelter = parks.filter((p) =>
    p.amenities.some((a) => a.includes("shelter")),
  );

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Shelters"
        title="Reserve a group shelter"
        description="Community parks offer reservable shelters for reunions, birthdays, and team parties. Booking continues through RecDesk with clearer park context here."
        crumbs={[{ label: "Shelters" }]}
      >
        <ButtonLink href="https://secure.recdesk.com/Community/Home" external>
          Start a reservation
        </ButtonLink>
      </PageHero>

      <div className="section-pad py-12 pb-24 md:py-16">
        <h2
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
          style={{ fontVariationSettings: '"SOFT" 30' }}
        >
          Parks with shelters
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {withShelter.map((p) => (
            <li key={p.slug} className="border border-line bg-paper p-5">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
