"use client";

import { useMemo, useState } from "react";
import {
  AMENITY_LABELS,
  filterParks,
  type Amenity,
  type ParkType,
} from "@/data/parks";
import { ParkResultCard } from "@/components/ParkResultCard";

const amenityFilters: Amenity[] = [
  "playground",
  "accessible-playground",
  "sprayground",
  "dog-park",
  "skatepark",
  "hiking-trails",
  "paved-trails",
  "shelter-reservable",
  "sports-fields",
  "archery",
  "fishing",
  "pickleball",
];

const types: { value: ParkType | "all"; label: string }[] = [
  { value: "all", label: "All parks" },
  { value: "community", label: "Community" },
  { value: "nature", label: "Nature" },
  { value: "neighborhood", label: "Neighborhood" },
];

export function ParkFinder({
  initialAmenity,
}: {
  initialAmenity?: Amenity;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ParkType | "all">("all");
  const [amenities, setAmenities] = useState<Amenity[]>(
    initialAmenity ? [initialAmenity] : [],
  );

  const results = useMemo(
    () => filterParks({ query, type, amenities }),
    [query, type, amenities],
  );

  function toggleAmenity(a: Amenity) {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit border border-line bg-paper p-5 lg:sticky lg:top-6">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Park name or amenity"
            className="focus-ring mt-2 w-full border border-line bg-mist px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60"
          />
        </label>

        <fieldset className="mt-6">
          <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Park type
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {types.map((t) => (
              <label key={t.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="park-type"
                  checked={type === t.value}
                  onChange={() => setType(t.value)}
                  className="accent-forest"
                />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Amenities
          </legend>
          <p className="mt-1 text-xs text-ink-muted">
            Results show amenities up front — no need to open every park page.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {amenityFilters.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  className="accent-forest"
                />
                {AMENITY_LABELS[a]}
              </label>
            ))}
          </div>
        </fieldset>

        {(query || type !== "all" || amenities.length > 0) && (
          <button
            type="button"
            className="focus-ring mt-6 w-full border border-line py-2 text-sm font-medium text-forest hover:bg-mist"
            onClick={() => {
              setQuery("");
              setType("all");
              setAmenities([]);
            }}
          >
            Clear filters
          </button>
        )}
      </aside>

      <div>
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <p className="text-sm text-ink-muted" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            park{results.length === 1 ? "" : "s"} match
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {results.map((park) => (
            <ParkResultCard key={park.slug} park={park} />
          ))}
          {results.length === 0 && (
            <p className="border border-dashed border-line p-8 text-center text-ink-muted">
              No parks match those filters. Try removing an amenity or broadening
              the search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
