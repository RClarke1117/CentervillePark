"use client";

import { useEffect, useState } from "react";
import { RecDeskEmbed } from "@/components/RecDeskEmbed";
import { RECDESK_PROGRAMS, recdeskProgramUrl } from "@/data/content";

type ProgramHit = {
  id: string;
  title: string;
  category: string | null;
  ages: string | null;
  dates: string | null;
  days: string | null;
  url: string;
};

type Props = {
  parkName: string;
  facilityIds?: number[];
  locationLabels?: string[];
};

type LoadState =
  | { status: "loading" }
  | { status: "empty"; summary: string | null }
  | { status: "ready"; programs: ProgramHit[]; summary: string | null }
  | { status: "error" };

export function ParkProgramsEmbed({
  parkName,
  facilityIds = [],
  locationLabels = [],
}: Props) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  const facilityKey = facilityIds.join(",");

  useEffect(() => {
    if (!facilityKey) {
      setState({ status: "empty", summary: null });
      return;
    }

    let cancelled = false;

    async function load() {
      setState({ status: "loading" });
      try {
        const res = await fetch(
          `/api/park-programs?facilities=${facilityKey}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const programs: ProgramHit[] = data.programs || [];
        if (!programs.length) {
          setState({ status: "empty", summary: data.summary ?? null });
        } else {
          setState({
            status: "ready",
            programs,
            summary: data.summary ?? null,
          });
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [facilityKey]);

  if (!facilityIds.length || state.status === "error") {
    return (
      <div>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-ink-muted">
          {facilityIds.length
            ? "Live filter is temporarily unavailable — browse all programs below and use Location Filter for this park."
            : "This park isn’t listed as a RecDesk location yet — browse district programs below."}
        </p>
        <RecDeskEmbed
          src={RECDESK_PROGRAMS}
          title={`Programs · ${parkName}`}
          openLabel="Open programs in RecDesk"
          frameHeight={1000}
        />
      </div>
    );
  }

  return (
    <section className="overflow-hidden border border-line bg-paper shadow-[0_20px_60px_rgba(15,47,35,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist/80 px-4 py-3 md:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
            Live registration · filtered to this park
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink">
            Programs at {parkName}
          </p>
        </div>
        <a
          href={RECDESK_PROGRAMS}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex shrink-0 items-center justify-center rounded-sm bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-mid"
        >
          Open full program list ↗
        </a>
      </div>

      <div className="min-h-[240px] bg-[#f7faf8]">
        {state.status === "loading" && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest"
              aria-hidden
            />
            <p className="text-sm text-ink-muted">
              Loading programs for {parkName}…
            </p>
          </div>
        )}

        {state.status === "empty" && (
          <div className="px-5 py-12 text-center">
            <p className="text-base font-semibold text-ink">
              No open programs at {parkName} right now
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Check back as seasons open, or browse the full district list.
              {locationLabels[0]
                ? ` In RecDesk, Location Filter → “${locationLabels[0]}”.`
                : ""}
            </p>
            <a
              href={RECDESK_PROGRAMS}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-mid"
            >
              Browse all programs
            </a>
          </div>
        )}

        {state.status === "ready" && (
          <ul className="divide-y divide-line">
            {state.programs.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5"
              >
                <div className="min-w-0">
                  {p.category && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-forest-mid">
                      {p.category}
                    </p>
                  )}
                  <p className="mt-0.5 font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {[p.dates, p.days, p.ages].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <a
                  href={p.url || recdeskProgramUrl(p.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex shrink-0 items-center justify-center rounded-sm bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-mid"
                >
                  Register ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-line bg-paper px-4 py-3 text-xs leading-relaxed text-ink-muted md:px-5">
        Filtered live from RecDesk by park location. Openings and waitlists
        update automatically. Questions? Call{" "}
        <a
          className="font-semibold text-forest underline-offset-2 hover:underline"
          href="tel:9374335155"
        >
          (937) 433-5155
        </a>
        .
      </div>
    </section>
  );
}
