import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { programs } from "@/data/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Search and register for Centerville-Washington Park District programs — camps, classes, and activities with a clearer path into RecDesk.",
};

export default function ProgramsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          Programs & registration
        </p>
        <h1
          className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Find a program. Register once.
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Program listings here mirror RecDesk where feasible — reducing
          duplicate staff entry while keeping registration on the system CWPD
          already trusts.
        </p>
        <div className="mt-8">
          <ButtonLink
            href="https://secure.recdesk.com/Community/Home"
            external
          >
            Open RecDesk registration
          </ButtonLink>
        </div>
      </div>

      <div className="section-pad py-12 md:py-16">
        <div className="overflow-x-auto border border-line bg-paper">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Upcoming and ongoing programs</caption>
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
              {programs.map((p) => (
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
                      {p.status}
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
          to the live registration record. Where automation is limited, staff
          publish once in RecDesk and sync summaries here.
        </p>
      </div>
    </div>
  );
}
