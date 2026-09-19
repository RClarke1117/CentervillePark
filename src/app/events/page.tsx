import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { news } from "@/data/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming special events from Centerville-Washington Park District.",
};

export default function EventsPage() {
  const events = news.filter((n) => n.category === "Event");

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Events"
        title="Gather outdoors"
        description="Movie nights, glow runs, adapted play days, and signature walks — roughly 30 large special events each year."
        crumbs={[{ label: "Events" }]}
      />
      <div className="section-pad py-12 pb-24 md:py-16">
        <ol className="relative mx-auto max-w-3xl border-l border-forest/25 pl-8">
          {events.map((e) => (
            <li key={e.slug} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[2.15rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-forest bg-paper"
                aria-hidden
              />
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
        </ol>
      </div>
    </div>
  );
}
