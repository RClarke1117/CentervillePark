import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { fieldStatuses } from "@/data/content";

export const metadata: Metadata = {
  title: "Athletic Field Status",
  description:
    "Current open, limited, and closed status for CWPD athletic fields and dog park.",
};

const tone = {
  Open: {
    className: "bg-[#e6f4ec] text-ok border-[#b7dfc6]",
    icon: "●",
    label: "Open",
  },
  Limited: {
    className: "bg-amber-soft text-warn border-[#e2c77a]",
    icon: "◐",
    label: "Limited",
  },
  Closed: {
    className: "bg-[#f8e8e8] text-danger border-[#e2b4b4]",
    icon: "■",
    label: "Closed",
  },
};

export default function FieldsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Today"
        title="Athletic field status"
        description="One of the most-visited pages on cwpd.org — updated for coaches, parents, and league organizers before they leave the house."
        crumbs={[{ label: "Field Status" }]}
      >
        <p className="text-sm text-white/60">
          Last district update: Today · 6:15 a.m. · Conditions can change after
          rain.
        </p>
      </PageHero>

      <div className="section-pad py-12 pb-24 md:py-16">
        <div className="mb-8 border border-line bg-paper p-5 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-mid">
              Dog park
            </p>
            <h2 className="mt-1 text-lg font-semibold">Oak Grove Off-Leash Area</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Open during park daylight hours · Leash until inside the gate
            </p>
          </div>
          <span
            className={`mt-3 inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider md:mt-0 ${tone.Open.className}`}
          >
            <span aria-hidden>{tone.Open.icon}</span> Open
          </span>
        </div>

        <ul className="grid gap-3 md:grid-cols-2" aria-label="Field statuses">
          {fieldStatuses.map((f) => {
            const t = tone[f.status];
            return (
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
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${t.className}`}
                  >
                    <span aria-hidden>{t.icon}</span>
                    {t.label}
                  </span>
                </div>
                {f.note && (
                  <p className="mt-3 text-sm text-ink-muted">{f.note}</p>
                )}
                <p className="mt-3 text-xs text-ink-muted">Updated {f.updated}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-ink-muted">
          Need a park with sports fields?{" "}
          <Link
            href="/parks?amenity=sports-fields"
            className="focus-ring font-semibold text-forest underline-offset-2 hover:underline"
          >
            Filter the park finder
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
