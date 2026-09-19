"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function AlertBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("cwpd-alert-dismissed");
    if (!dismissed) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div
      role="status"
      className="relative z-[55] border-b border-amber-soft/40 bg-[#2a2416] text-amber-soft"
    >
      <div className="section-pad flex items-start gap-3 py-2.5 text-sm md:items-center">
        <span className="mt-0.5 shrink-0 font-bold text-gold-bright md:mt-0" aria-hidden>
          ●
        </span>
        <p className="flex-1 leading-snug text-[#f6e8c4]">
          <strong className="font-semibold text-white">Field update:</strong> Some
          athletic fields are limited after overnight rain.{" "}
          <Link href="/fields" className="focus-ring underline underline-offset-2">
            Check field status
          </Link>
          .
        </p>
        <button
          type="button"
          className="focus-ring shrink-0 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white"
          onClick={() => {
            sessionStorage.setItem("cwpd-alert-dismissed", "1");
            setOpen(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
