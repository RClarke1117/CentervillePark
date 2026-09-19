"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  openLabel: string;
  /** Logical height of the RecDesk desktop layout inside the frame */
  frameHeight?: number;
};

/** RecDesk's mobile CSS wraps category labels badly; we always paint a desktop-width portal and scale it to fit. */
const DESKTOP_WIDTH = 1100;

export function RecDeskEmbed({
  src,
  title,
  openLabel,
  frameHeight = 1100,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / DESKTOP_WIDTH));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = Math.round(frameHeight * scale);

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
          className="focus-ring inline-flex items-center justify-center rounded-sm bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-mid"
        >
          {openLabel} ↗
        </a>
      </div>

      {/* Mobile-first: clear full-portal action before the scaled frame */}
      <div className="border-b border-line bg-amber-soft/40 px-4 py-3 text-sm text-ink md:hidden">
        For the clearest mobile browsing, open the full RecDesk portal. Or scroll
        the live panel below (desktop layout, scaled to fit).
      </div>

      <div
        ref={shellRef}
        className="relative overflow-x-hidden bg-[#f7faf8]"
        style={{ height: scaledHeight || frameHeight }}
      >
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
            className="origin-top-left"
            style={{
              width: DESKTOP_WIDTH,
              height: frameHeight,
              transform: `scale(${scale})`,
            }}
          >
            <iframe
              src={src}
              title={title}
              className="border-0 bg-white"
              style={{ width: DESKTOP_WIDTH, height: frameHeight }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          </div>
        )}
      </div>

      <div className="border-t border-line bg-paper px-4 py-3 text-xs leading-relaxed text-ink-muted md:px-5">
        Live status comes from RecDesk. Panel uses a desktop-width layout so
        category labels stay readable on phones. Centerville / Washington Township
        residents: use <strong className="font-semibold text-ink">Dayton</strong>{" "}
        as your city when creating an account.
      </div>
    </section>
  );
}
