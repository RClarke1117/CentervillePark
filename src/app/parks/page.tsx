import type { Metadata } from "next";
import { ParkFinder } from "@/components/ParkFinder";
import type { Amenity } from "@/data/parks";

export const metadata: Metadata = {
  title: "Find a Park",
  description:
    "Search 51 Centerville-Washington parks by amenity, type, and name — see playgrounds, trails, shelters, and more before you open a park page.",
};

export default async function ParksPage({
  searchParams,
}: {
  searchParams: Promise<{ amenity?: string }>;
}) {
  const params = await searchParams;
  const initialAmenity = params.amenity as Amenity | undefined;

  return (
    <div className="atmosphere min-h-screen">
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          Parks
        </p>
        <h1
          className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Find a park that fits today
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80">
          Filter by what you need — trails, spraygrounds, shelters, dog parks —
          and read amenity summaries without opening every park page. A park
          within walking distance of every home.
        </p>
      </div>
      <div className="section-pad py-10 md:py-14">
        <ParkFinder initialAmenity={initialAmenity} />
        <p className="mt-10 text-sm text-ink-muted">
          Looking for Cornerstone or Stubbs Park? Those are operated by the City
          of Centerville. Countryside Park is operated by Washington Township.
        </p>
      </div>
    </div>
  );
}
