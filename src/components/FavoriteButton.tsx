"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "cwpd-favorite-parks";

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    setIds((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((slug: string) => ids.includes(slug), [ids]);

  return { ids, toggle, has };
}

export function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const { has, toggle } = useFavorites();
  const on = has(slug);

  return (
    <button
      type="button"
      className={`focus-ring inline-flex items-center gap-1.5 rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition ${
        on
          ? "border-gold bg-amber-soft text-forest-deep"
          : "border-line bg-paper text-ink-muted hover:border-forest/30 hover:text-forest"
      }`}
      aria-pressed={on}
      onClick={() => toggle(slug)}
    >
      <span aria-hidden>{on ? "★" : "☆"}</span>
      {on ? "Saved" : `Save ${name}`}
    </button>
  );
}
