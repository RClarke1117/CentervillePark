"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parks } from "@/data/parks";
import { news, programs, getUpcomingEvents } from "@/data/content";

type Hit = { href: string; title: string; meta: string; group: string };

function buildIndex(): Hit[] {
  const pages: Hit[] = [
    { href: "/parks", title: "Find a Park", meta: "Directory & filters", group: "Pages" },
    { href: "/programs", title: "Programs", meta: "Registration via RecDesk", group: "Pages" },
    { href: "/events", title: "Events", meta: "Special events calendar", group: "Pages" },
    { href: "/fields", title: "Field Status", meta: "Athletic fields & dog park", group: "Pages" },
    { href: "/shelters", title: "Reserve a Shelter", meta: "Group picnic shelters", group: "Pages" },
    { href: "/foundation", title: "Foundation", meta: "Give & dedications", group: "Pages" },
    { href: "/about", title: "About CWPD", meta: "Mission & funding", group: "Pages" },
    { href: "/contact", title: "Contact", meta: "Main office", group: "Pages" },
    { href: "/news", title: "News", meta: "Park District stories", group: "Pages" },
  ];
  const parkHits = parks.map((p) => ({
    href: `/parks/${p.slug}`,
    title: p.name,
    meta: `${p.type} · ${p.city}`,
    group: "Parks",
  }));
  const programHits = programs.map((p) => ({
    href: "/programs",
    title: p.title,
    meta: `${p.audience} · ${p.location}`,
    group: "Programs",
  }));
  const newsHits = news.map((n) => ({
    href: "/news/",
    title: n.title,
    meta: n.category,
    group: "News",
  }));
  const eventHits = getUpcomingEvents().map((e) => ({
    href: `/events/${e.slug}/`,
    title: e.title,
    meta: e.location,
    group: "Events",
  }));
  return [...pages, ...parkHits, ...programHits, ...eventHits, ...newsHits];
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return index.slice(0, 8);
    return index
      .filter((h) => `${h.title} ${h.meta} ${h.group}`.toLowerCase().includes(query))
      .slice(0, 12);
  }, [index, q]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white/85 transition hover:bg-white/20"
        aria-label="Search site"
      >
        <span aria-hidden>⌕</span>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-white/20 px-1 py-0.5 text-[10px] text-white/60 md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-forest-deep/55 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full max-w-xl overflow-hidden border border-line bg-paper shadow-2xl">
            <label className="flex items-center gap-3 border-b border-line px-4">
              <span className="text-ink-muted" aria-hidden>
                ⌕
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search parks, programs, pages…"
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-ink-muted/60"
              />
              <button
                type="button"
                className="focus-ring text-xs font-semibold uppercase tracking-wider text-ink-muted"
                onClick={close}
              >
                Esc
              </button>
            </label>
            <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
              {results.map((hit) => (
                <li key={`${hit.group}-${hit.href}-${hit.title}`}>
                  <Link
                    href={hit.href}
                    onClick={close}
                    className="focus-ring flex items-baseline justify-between gap-3 px-4 py-2.5 hover:bg-mist"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{hit.title}</span>
                      <span className="text-xs text-ink-muted">{hit.meta}</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-mid">
                      {hit.group}
                    </span>
                  </Link>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-ink-muted">
                  No matches for “{q}”
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
