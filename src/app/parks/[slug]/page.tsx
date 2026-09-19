import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { AMENITY_LABELS, getPark, parks } from "@/data/parks";
import { news, programs } from "@/data/content";

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

  const relatedPrograms = programs.filter((p) =>
    p.location.toLowerCase().includes(park.name.split(" ")[0].toLowerCase()),
  );
  const relatedNews = news.slice(0, 2);

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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
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

          <div className="mt-12">
            <h2
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
              style={{ fontVariationSettings: '"SOFT" 30' }}
            >
              Upcoming nearby
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Programs and stories related to this park — pulled from the shared
              content model (RecDesk-ready).
            </p>
            <ul className="mt-5 space-y-3">
              {(relatedPrograms.length ? relatedPrograms : programs.slice(0, 2)).map(
                (p) => (
                  <li
                    key={p.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3"
                  >
                    <div>
                      <p className="font-semibold text-ink">{p.title}</p>
                      <p className="text-sm text-ink-muted">
                        {p.dateLabel} · {p.location}
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-forest-mid">
                      {p.status}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-12">
            <h2
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
              style={{ fontVariationSettings: '"SOFT" 30' }}
            >
              Recent stories
            </h2>
            <ul className="mt-5 space-y-4">
              {relatedNews.map((n) => (
                <li key={n.slug}>
                  <Link href="/news" className="focus-ring group block">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-mid">
                      {n.category}
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

        <aside className="h-fit border border-line bg-paper p-6 lg:sticky lg:top-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Visit
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            Open during daylight hours unless posted otherwise for programs or
            rentals.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Domesticated animals must remain on a visible leash (max 8 ft),
            except inside designated off-leash dog park areas.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/shelters">Reserve a shelter</ButtonLink>
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
    </article>
  );
}
