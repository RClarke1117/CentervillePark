"use client";

import { useCallback } from "react";

export function SharePrint({ title }: { title: string }) {
  const share = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    alert("Link copied");
  }, [title]);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className="focus-ring border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-mist"
      >
        Share
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="focus-ring border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-mist"
      >
        Print
      </button>
    </div>
  );
}
