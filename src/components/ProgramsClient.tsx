"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { programs, type Program } from "@/data/content";

const audiences = ["All", "Adult", "Family", "Children", "Preschool", "All ages"] as const;

export function ProgramsClient() {
  const [audience, setAudience] = useState<(typeof audiences)[number]>("All");

  const filtered = useMemo(() => {
    if (audience === "All") return programs;
    return programs.filter((p) => p.audience === audience);
  }, [audience]);

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Programs & registration"
        title="Find a program. Register once."
        description="Listings mirror RecDesk where feasible — reducing duplicate staff entry while keeping registration on the system CWPD already trusts."
        crumbs={[{ label: "Programs" }]}
      >
        <ButtonLink href="https://secure.recdesk.com/Community/Home" external>
          Open RecDesk registration
        </ButtonLink>
      </PageHero>

      <div className="section-pad py-12 pb-24 md:py-16">
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by audience"
        >
          {audiences.map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={audience === a}
              onClick={() => setAudience(a)}
              className={`focus-ring border px-3 py-2 text-xs font-semibold transition ${
                audience === a
                  ? "border-forest bg-forest text-white"
                  : "border-line bg-paper text-forest hover:border-forest/40"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto border border-line bg-paper">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Programs</caption>
            <thead className="border-b border-line bg-mist text-xs uppercase tracking-[0.1em] text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Program</th>
                <th className="px-4 py-3 font-semibold">Audience</th>
                <th className="px-4 py-3 font-semibold">When</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: Program) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-4 font-semibold text-ink">{p.title}</td>
                  <td className="px-4 py-4 text-ink-muted">{p.audience}</td>
                  <td className="px-4 py-4 text-ink-muted">{p.dateLabel}</td>
                  <td className="px-4 py-4 text-ink-muted">{p.location}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        p.status === "Open"
                          ? "text-ok"
                          : p.status === "Filling"
                            ? "text-warn"
                            : "text-danger"
                      }`}
                    >
                      {p.status === "Open"
                        ? "● Open"
                        : p.status === "Filling"
                          ? "◐ Filling"
                          : "■ Waitlist"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink-muted">
          Integration approach: display program name, dates, location, and
          registration status from RecDesk feeds or API where available; deep-link
          to the live registration record.
        </p>
      </div>
    </div>
  );
}
