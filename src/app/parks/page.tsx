import type { Metadata } from "next";
import { Suspense } from "react";
import { ParkFinder } from "@/components/ParkFinder";
import { PageHero } from "@/components/PageHero";
import { parks } from "@/data/parks";

export const metadata: Metadata = {
  title: "Find a Park",
  description:
    "Search Centerville-Washington parks by amenity, type, and name — see playgrounds, trails, shelters, and more before you open a park page.",
};

export default function ParksPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Parks"
        title="Find a park that fits today"
        description={`All ${parks.length} Centerville-Washington parks — filter by trails, spraygrounds, shelters, dog parks, and more.`}
        crumbs={[{ label: "Find a Park" }]}
      />
      <div className="section-pad py-10 pb-24 md:py-14">
        <Suspense
          fallback={
            <p className="text-sm text-ink-muted">Loading park finder…</p>
          }
        >
          <ParkFinder />
        </Suspense>
        <p className="mt-10 text-sm text-ink-muted">
          Looking for Cornerstone or Stubbs Park? Those are operated by the City
          of Centerville. Countryside Park is operated by Washington Township.
        </p>
      </div>
    </div>
  );
}
