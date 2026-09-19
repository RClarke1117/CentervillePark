"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/parks", label: "Parks", icon: "◎" },
  { href: "/programs", label: "Programs", icon: "✦" },
  { href: "/fields", label: "Fields", icon: "▣" },
  { href: "/events", label: "Events", icon: "◇" },
];

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`focus-ring flex flex-col items-center gap-0.5 rounded-sm px-1 py-2 text-[10px] font-semibold uppercase tracking-wide ${
                  active ? "text-forest" : "text-ink-muted"
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
