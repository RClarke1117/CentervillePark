import type { Metadata } from "next";
import { fieldStatuses } from "@/data/content";

export const metadata: Metadata = {
  title: "Athletic Field Status",
  description:
    "Current open, limited, and closed status for Centerville-Washington Park District athletic fields.",
};

const tone = {
  Open: "bg-[#e6f4ec] text-ok border-[#b7dfc6]",
  Limited: "bg-amber-soft text-warn border-[#e2c77a]",
  Closed: "bg-[#f8e8e8] text-danger border-[#e2b4b4]",
};

export default function FieldsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          Today
        </p>
        <h1
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Athletic field status
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          One of the most-visited pages on cwpd.org — updated for coaches,
          parents, and league organizers before they leave the house.
        </p>
        <p className="mt-3 text-sm text-white/60">
          Last district update: Today · 6:15 a.m. · Conditions can change after
          rain.
        </p>
      </div>

      <div className="section-pad py-12 md:py-16">
        <ul className="grid gap-3 md:grid-cols-2">
          {fieldStatuses.map((f) => (
            <li
              key={`${f.park}-${f.name}`}
              className="border border-line bg-paper p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {f.park}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">
                    {f.name}
                  </h2>
                </div>
                <span
                  className={`border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${tone[f.status]}`}
                >
                  {f.status}
                </span>
              </div>
              {f.note && (
                <p className="mt-3 text-sm text-ink-muted">{f.note}</p>
              )}
              <p className="mt-3 text-xs text-ink-muted">Updated {f.updated}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-muted">
          Dog park status and other amenity alerts can share this same “today”
          pattern for consistency.
        </p>
      </div>
    </div>
  );
}
