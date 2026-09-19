import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ButtonLink";
import {
  getUpcomingEvents,
  RECDESK_SPECIAL_EVENTS,
} from "@/data/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming special events from Centerville-Washington Park District.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Events"
        title="Upcoming events"
        description="Special events only — pick one for details and registration."
        crumbs={[{ label: "Events" }]}
      >
        <ButtonLink href={RECDESK_SPECIAL_EVENTS} external>
          Browse all special events
        </ButtonLink>
      </PageHero>

      <div className="section-pad py-12 pb-24 md:py-16">
        {upcoming.length === 0 ? (
          <p className="text-ink-muted">
            No upcoming events right now. Check back soon, or browse the full
            special events list.
          </p>
        ) : (
          <ul className="mx-auto flex max-w-3xl flex-col gap-4">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/events/${e.slug}/`}
                  className="focus-ring group grid overflow-hidden border border-line bg-paper transition hover:border-forest/30 sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative min-h-28 sm:min-h-full">
                    <Image
                      src={e.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="140px"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-mid">
                      {new Date(`${e.date}T12:00:00`).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                      {" · "}
                      {e.timeLabel.replace(/^[^·]+·\s*/, "")}
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight group-hover:text-forest-mid">
                      {e.title}
                    </h2>
                    <p className="text-sm text-ink-muted">{e.location}</p>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {e.excerpt}
                    </p>
                    <span className="mt-1 text-sm font-semibold text-forest">
                      Details & register →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
