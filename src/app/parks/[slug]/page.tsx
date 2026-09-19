import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ParkProgramsEmbed } from "@/components/ParkProgramsEmbed";
import { SharePrint } from "@/components/SharePrint";
import { AMENITY_LABELS, getPark, parks } from "@/data/parks";
import { getUpcomingEvents } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return parks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const park = getPark(slug);
  if (!park) return { title: "Park" };
  return {
    title: park.name,
    description: park.summary,
  };
}

export default async function ParkDetailPage({ params }: Props) {
  const { slug } = await params;
  const park = getPark(slug);
  if (!park) notFound();

  const relatedNews = getUpcomingEvents().slice(0, 2);
  const hasReservableShelter = park.amenities.includes("shelter-reservable");
  const hasDogPark = park.amenities.includes("dog-park");

  return (
    <article>
      <header className="relative min-h-[70svh] overflow-hidden bg-forest-deep text-white">
        <Image
          src={park.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/25" />
        <div className="section-pad relative flex min-h-[70svh] flex-col justify-end pb-12 pt-28">
          <Breadcrumbs
            items={[
              { href: "/parks", label: "Parks" },
              { label: park.name },
            ]}
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
            {park.type} park
            {park.acres != null ? ` · ${park.acres} acres` : ""}
          </p>
          <h1
            className="mt-3 font-[family-name:var(--font-display)] text-5xl tracking-tight md:text-6xl"
            style={{ fontVariationSettings: '"SOFT" 40' }}
          >
            {park.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{park.summary}</p>
          <p className="mt-3 text-sm text-white/70">
            {park.address} · {park.city}
          </p>
        </div>
      </header>

      <div className="section-pad grid gap-12 py-14 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 30' }}
          >
            Amenities at a glance
          </h2>
          {park.amenities.length > 0 ? (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {park.amenities.map((a) => (
                <li
                  key={a}
                  className="border border-line bg-mist/50 px-4 py-3 text-sm font-medium text-forest"
                >
                  {AMENITY_LABELS[a]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Natural or open space with limited developed amenities — see the
              park description for what to expect.
            </p>
          )}

          <div className="mt-12">
            <h2
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
              style={{ fontVariationSettings: '"SOFT" 30' }}
            >
              Upcoming events
            </h2>
            <ul className="mt-5 space-y-4">
              {relatedNews.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/events/${n.slug}/`}
                    className="focus-ring group block"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-mid">
                      {new Date(`${n.date}T12:00:00`).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )}
                    </p>
                    <p className="mt-1 font-semibold group-hover:text-forest-mid">
                      {n.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Visit
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            Open from one-half hour before sunrise to one-half hour after sunset,
            unless posted for evening programs or permits.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Pets on a visible leash no longer than 8 feet
            {hasDogPark
              ? ", except inside the fenced off-leash dog park"
              : ""}. Owners must clean up pet waste. Pets are not permitted in
            playground, sprayground, skatepark, fenced baseball diamond, or
            tennis court areas.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Alcoholic beverages are prohibited except by Park District permit.
            Smoking is prohibited in all indoor facilities.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <FavoriteButton slug={park.slug} name={park.name} />
            <SharePrint title={`${park.name} · CWPD`} />
            {hasReservableShelter ? (
              <ButtonLink href="/shelters">Reserve a shelter</ButtonLink>
            ) : null}
            <ButtonLink href="/parks" variant="ghost">
              Back to park finder
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            Questions? Call{" "}
            <a className="underline" href="tel:9374335155">
              (937) 433-5155
            </a>
          </p>
        </aside>
      </div>

      <div className="section-pad border-t border-line bg-mist/40 py-14 pb-24">
        <h2
          className="font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
          style={{ fontVariationSettings: '"SOFT" 30' }}
        >
          Programs at {park.name}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
          Register for programs held at this park.
        </p>
        <div className="mt-8">
          <ParkProgramsEmbed
            parkName={park.name}
            facilityIds={park.recdeskFacilityIds}
          />
        </div>
      </div>
    </article>
  );
}
