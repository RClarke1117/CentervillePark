"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AMENITY_LABELS,
  filterParks,
  type Amenity,
  type ParkType,
} from "@/data/parks";
import { ParkResultCard } from "@/components/ParkResultCard";
import { useFavorites } from "@/components/FavoriteButton";

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

const quickChips: Amenity[] = [
  "playground",
  "hiking-trails",
  "sprayground",
  "dog-park",
  "shelter-reservable",
  "sports-fields",
];

export function ParkFinder() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("amenity") as Amenity | null;
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ParkType | "all">("all");
  const [amenities, setAmenities] = useState<Amenity[]>(
    initial && initial in AMENITY_LABELS ? [initial] : [],
  );
  const [onlyFavs, setOnlyFavs] = useState(false);
  const { ids: favIds } = useFavorites();

  const results = useMemo(() => {
    let list = filterParks({ query, type, amenities });
    if (onlyFavs) list = list.filter((p) => favIds.includes(p.slug));
    return list;
  }, [query, type, amenities, onlyFavs, favIds]);

  function toggleAmenity(a: Amenity) {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  }

  return (
    <div>
      {/* Quick amenity chips — mobile-first discovery */}
      <div className="mb-6 -mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex min-w-max gap-2">
          {quickChips.map((a) => {
            const on = amenities.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggleAmenity(a)}
                className={`focus-ring whitespace-nowrap border px-3 py-2 text-xs font-semibold transition ${
                  on
                    ? "border-forest bg-forest text-white"
                    : "border-line bg-paper text-forest hover:border-forest/40"
                }`}
                aria-pressed={on}
              >
                {AMENITY_LABELS[a]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit border border-line bg-paper p-5 lg:sticky lg:top-24">
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

          <label className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={onlyFavs}
              onChange={(e) => setOnlyFavs(e.target.checked)}
              className="accent-forest"
            />
            Saved parks only ({favIds.length})
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
              See enough detail to decide without opening every park page.
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

          {(query || type !== "all" || amenities.length > 0 || onlyFavs) && (
            <button
              type="button"
              className="focus-ring mt-6 w-full border border-line py-2 text-sm font-medium text-forest hover:bg-mist"
              onClick={() => {
                setQuery("");
                setType("all");
                setAmenities([]);
                setOnlyFavs(false);
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
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {results.map((park, i) => (
                <motion.div
                  key={park.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, delay: Math.min(i, 6) * 0.04 }}
                >
                  <ParkResultCard park={park} />
                </motion.div>
              ))}
              {results.length === 0 && (
                <p className="border border-dashed border-line p-8 text-center text-ink-muted">
                  No parks match those filters. Try removing an amenity or
                  broadening the search.
                </p>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
