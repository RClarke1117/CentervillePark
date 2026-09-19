import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { RecDeskEmbed } from "@/components/RecDeskEmbed";
import {
  events,
  getEvent,
  recdeskProgramUrl,
  RECDESK_SPECIAL_EVENTS,
} from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const recdeskUrl = recdeskProgramUrl(event.recdeskProgramId);
  const dateLabel = new Date(`${event.date}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="atmosphere min-h-screen">
      <div className="relative min-h-[42svh] overflow-hidden bg-forest-deep text-white md:min-h-[50svh]">
        <Image
          src={event.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
        <div className="section-pad relative flex min-h-[42svh] flex-col justify-end pb-10 pt-28 md:min-h-[50svh] md:pb-14">
          <p className="text-xs text-white/85">
            <Link href="/" className="focus-ring hover:text-white">
              Home
            </Link>
            {" / "}
            <Link href="/events/" className="focus-ring hover:text-white">
              Events
            </Link>
            {" / "}
            <span className="text-white/90">{event.title}</span>
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
            Special event
          </p>
          <h1
            className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
            style={{ fontVariationSettings: '"SOFT" 40' }}
          >
            {event.title}
          </h1>
          <p className="mt-4 text-base text-white/85">
            {dateLabel}
            <span className="text-white/70"> · </span>
            {event.timeLabel}
          </p>
          <p className="mt-1 text-sm text-white/70">{event.location}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={recdeskUrl} external>
              Register for this event
            </ButtonLink>
            <ButtonLink href={RECDESK_SPECIAL_EVENTS} variant="secondary" external>
              All special events
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="section-pad py-10 pb-24 md:py-14">
        <div className="mb-10 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink">{event.body}</p>
          <p className="mt-4 text-sm text-ink-muted">
            Register below for this event.
          </p>
          <Link
            href="/events/"
            className="focus-ring mt-4 inline-block text-sm font-semibold text-forest underline-offset-4 hover:underline"
          >
            ← All upcoming events
          </Link>
        </div>

        <RecDeskEmbed
          src={recdeskUrl}
          title={`${event.title} · registration`}
          openLabel="Open event registration"
          frameHeight={1000}
        />
      </div>
    </div>
  );
}
