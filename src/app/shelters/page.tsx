import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
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
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          Shelters
        </p>
        <h1
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Reserve a group shelter
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Community parks offer reservable shelters for reunions, birthdays, and
          team parties. Booking continues through RecDesk with clearer park
          context on this site.
        </p>
        <div className="mt-8">
          <ButtonLink
            href="https://secure.recdesk.com/Community/Home"
            external
          >
            Start a reservation
          </ButtonLink>
        </div>
      </div>

      <div className="section-pad py-12 md:py-16">
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
