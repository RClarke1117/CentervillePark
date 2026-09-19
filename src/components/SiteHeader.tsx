"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteSearch } from "@/components/SiteSearch";

const nav = [
  { href: "/parks", label: "Find a Park" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/fields", label: "Field Status" },
  { href: "/shelters", label: "Shelters" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-forest-deep/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad flex items-center justify-between gap-3 py-3 md:py-4">
        <Link
          href="/"
          className="focus-ring group flex items-center gap-3 rounded-sm"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/cwpd-logo.png"
            alt="Centerville-Washington Park District"
            width={180}
            height={35}
            className="h-7 w-auto brightness-0 invert md:h-8"
            priority
          />
          <span className="sr-only">Centerville-Washington Park District</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-sm px-2.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/foundation"
            className="focus-ring ml-1 rounded-sm border border-[#9ec0ef]/50 bg-[#1e3a5f]/80 px-3 py-2 text-sm font-semibold text-white transition hover:bg-foundation"
          >
            Foundation
          </Link>
          <div className="ml-2">
            <SiteSearch />
          </div>
          <label className="ml-1 flex items-center">
            <span className="sr-only">Language</span>
            <select
              className="focus-ring cursor-pointer rounded-sm border border-white/25 bg-forest-deep px-2 py-1.5 text-xs font-medium text-white"
              defaultValue="en"
              aria-label="Language translation"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="zh">中文</option>
            </select>
          </label>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch />
          <button
            type="button"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-sm border border-white/30 bg-white/10 text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="section-pad border-t border-white/15 bg-forest-deep py-3 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-sm px-2 py-3 text-base font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/foundation"
              className="focus-ring mt-2 rounded-sm bg-[#9ec0ef] px-3 py-3 text-center text-base font-semibold text-foundation"
              onClick={() => setOpen(false)}
            >
              Foundation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
