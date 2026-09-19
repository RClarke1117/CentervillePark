"use client";

import { useState } from "react";

type Props = {
  src: string;
  title: string;
  openLabel: string;
  frameHeight?: number;
};

/** Desktop width so RecDesk doesn't use its broken mobile category wrap. */
const DESKTOP_WIDTH = 1024;

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
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
            Live registration
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink">{title}</p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex shrink-0 items-center justify-center rounded-sm bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-mid"
        >
          {openLabel} ↗
        </a>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-line bg-[#f3eee0] px-4 py-2.5 text-xs text-ink md:hidden">
        <p className="leading-snug">
          Tip: swipe sideways in the list if you need more room — or open the
          full list above.
        </p>
      </div>

      <div className="relative bg-[#f7faf8]">
        {!loaded && !failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-mist/90">
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
          <div
            className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
            style={{ height: frameHeight }}
          >
            <iframe
              src={src}
              title={title}
              className="block max-w-none border-0 bg-white"
              style={{
                width: DESKTOP_WIDTH,
                minWidth: DESKTOP_WIDTH,
                height: frameHeight,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          </div>
        )}
      </div>

      <div className="border-t border-line bg-paper px-4 py-3 text-xs leading-relaxed text-ink-muted md:px-5">
        Openings and waitlists update automatically. Questions? Call{" "}
        <a className="font-semibold text-forest underline-offset-2 hover:underline" href="tel:9374335155">
          (937) 433-5155
        </a>
        .
      </div>
    </section>
  );
}
