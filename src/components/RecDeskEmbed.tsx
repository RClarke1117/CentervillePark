"use client";

import { useState } from "react";

type Props = {
  src: string;
  title: string;
  openLabel: string;
  frameHeight?: number;
};

export function RecDeskEmbed({
  src,
  title,
  openLabel,
  frameHeight = 1100,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <section className="overflow-hidden border border-line bg-paper shadow-[0_20px_60px_rgba(15,47,35,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist/80 px-4 py-3 md:px-5">
        <div className="min-w-0 flex-1">
          <p className="mt-0.5 text-sm font-semibold text-ink">{title}</p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex shrink-0 items-center justify-center rounded-sm bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-mid"
        >
          {openLabel} ↗
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <div className="relative bg-[#f7faf8]" style={{ minHeight: frameHeight }}>
        {!loaded && !failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-mist/90">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest"
              aria-hidden
            />
            <p className="text-sm text-ink-muted">Loading…</p>
          </div>
        )}

        {failed ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="max-w-md text-ink-muted">
              Registration couldn&apos;t load here. Open the full list instead.
            </p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-mid"
            >
              {openLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            className="w-full border-0 bg-white"
            style={{ height: frameHeight }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-third-party="recdesk"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </section>
  );
}
