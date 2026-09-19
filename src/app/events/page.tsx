import type { Metadata } from "next";
import Link from "next/link";
import { news } from "@/data/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming special events from Centerville-Washington Park District.",
};

export default function EventsPage() {
  const events = news.filter((n) => n.category === "Event");

  return (
    <div className="atmosphere min-h-screen">
      <div className="section-pad border-b border-line bg-forest-deep pb-14 pt-28 text-white md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          Events
        </p>
        <h1
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Gather outdoors
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Movie nights, glow runs, adapted play days, and signature walks —
          roughly 30 large special events each year.
        </p>
      </div>
      <div className="section-pad py-12 md:py-16">
        <ul className="mx-auto max-w-3xl divide-y divide-line border border-line bg-paper">
          {events.map((e) => (
            <li key={e.slug} className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-mid">
                {new Date(e.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tight">
                {e.title}
              </h2>
              <p className="mt-2 text-ink-muted">{e.excerpt}</p>
              <Link
                href="/programs"
                className="focus-ring mt-4 inline-block text-sm font-semibold text-forest underline-offset-4 hover:underline"
              >
                Registration & details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
