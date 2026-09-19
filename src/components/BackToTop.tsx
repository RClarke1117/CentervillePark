"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      className="focus-ring fixed bottom-20 right-4 z-40 hidden rounded-sm bg-forest px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-forest-mid sm:block lg:bottom-6"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Top
    </button>
  );
}
