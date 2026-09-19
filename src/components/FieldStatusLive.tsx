"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FieldRow = {
  name: string;
  park: string;
  status: string;
  updated: string;
};

type Payload = {
  source: string;
  provider: string;
  rainoutLine: string;
  subscribeUrl: string;
  fields: FieldRow[];
  fetchedAt: string;
  error?: string;
};

function toneFor(status: string) {
  const s = status.toLowerCase();
  if (s.includes("closed") || s.includes("cancel")) {
    return {
      className: "bg-[#f8e8e8] text-danger border-[#e2b4b4]",
      icon: "■",
    };
  }
  if (
    s.includes("limited") ||
    s.includes("game time") ||
    s.includes("not scheduled") ||
    s.includes("scheduled")
  ) {
    return {
      className: "bg-amber-soft text-warn border-[#e2c77a]",
      icon: "◐",
    };
  }
  return {
    className: "bg-[#e6f4ec] text-ok border-[#b7dfc6]",
    icon: "●",
  };
}

export function FieldStatusLive() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/field-status")
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json: Payload) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="border border-line bg-paper p-6 text-sm text-ink-muted">
        Live field status couldn’t load. Check the district’s{" "}
        <a
          className="font-semibold text-forest underline-offset-2 hover:underline"
          href="https://cwpd.org/field_status/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Athletic Field Status
        </a>{" "}
        page or call the Rainout Line at{" "}
        <a className="font-semibold text-forest" href="tel:9372652001">
          (937) 265-2001
        </a>
        .
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-3 py-10 text-sm text-ink-muted">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-forest/20 border-t-forest"
          aria-hidden
        />
        Loading live field status from RainoutLine…
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 border border-line bg-paper p-5 md:flex md:items-start md:justify-between md:gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-mid">
            Live from {data.provider}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Same source as{" "}
            <a
              className="font-semibold text-forest underline-offset-2 hover:underline"
              href={data.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              cwpd.org/field_status
            </a>
            . Coaches can also call the Rainout Line or subscribe to alerts.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 md:mt-0 md:items-end">
          <a
            href={`tel:${data.rainoutLine.replace(/\D/g, "")}`}
            className="focus-ring text-sm font-semibold text-forest"
          >
            Rainout Line {data.rainoutLine}
          </a>
          <a
            href={data.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm text-ink-muted underline-offset-2 hover:underline"
          >
            Text / email alerts ↗
          </a>
        </div>
      </div>

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
          className={`mt-3 inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider md:mt-0 ${toneFor("Open").className}`}
        >
          <span aria-hidden>●</span> Open
        </span>
      </div>

      <ul className="grid gap-3 md:grid-cols-2" aria-label="Field statuses">
        {data.fields.map((f) => {
          const t = toneFor(f.status);
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
                    {f.name.replace(/^.*?Park\s+/, "") || f.name}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${t.className}`}
                >
                  <span aria-hidden>{t.icon}</span>
                  {f.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Updated {f.updated}
              </p>
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
  );
}
