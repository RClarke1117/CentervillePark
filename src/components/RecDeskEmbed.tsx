"use client";

import { useState } from "react";

type Props = {
  src: string;
  title: string;
  openLabel: string;
  minHeight?: number;
};

export function RecDeskEmbed({
  src,
  title,
  openLabel,
  minHeight = 900,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <section className="overflow-hidden border border-line bg-paper shadow-[0_20px_60px_rgba(15,47,35,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist/80 px-4 py-3 md:px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
            Live from RecDesk
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink">{title}</p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-sm font-semibold text-forest underline-offset-4 hover:underline"
        >
          {openLabel} ↗
        </a>
      </div>

      <div className="relative bg-[#f7faf8]" style={{ minHeight }}>
        {!loaded && !failed && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-mist/90"
            aria-hidden={!loaded}
          >
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest"
              aria-hidden
            />
            <p className="text-sm text-ink-muted">Loading live RecDesk…</p>
          </div>
        )}

        {failed ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="max-w-md text-ink-muted">
              RecDesk couldn&apos;t be embedded in this browser. Continue on the
              live registration portal.
            </p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-mid"
            >
              {openLabel}
            </a>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            className="w-full border-0 bg-white"
            style={{ height: minHeight }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <div className="border-t border-line bg-paper px-4 py-3 text-xs leading-relaxed text-ink-muted md:px-5">
        Status, dates, and availability update in RecDesk — this panel shows the
        live portal. Centerville / Washington Township residents: use{" "}
        <strong className="font-semibold text-ink">Dayton</strong> as your city
        when creating an account.
      </div>
    </section>
  );
}
