import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { news, getUpcomingEvents } from "@/data/content";
import { parks } from "@/data/parks";

const planLinks = [
  {
    href: "/parks",
    title: "Find a park",
    text: "Filter by trails, playgrounds, shelters, and more — see what fits before you go.",
  },
  {
    href: "/shelters",
    title: "Reserve a shelter",
    text: "Book a group picnic shelter for reunions, birthdays, and team celebrations.",
  },
  {
    href: "/programs",
    title: "Search & register",
    text: "Camps, classes, and special events — search and register in one place.",
  },
  {
    href: "/fields",
    title: "Check the fields",
    text: "Live athletic field status so coaches and families know before they drive.",
  },
];

export default function HomePage() {
  const featured = parks.filter((p) => p.featured).slice(0, 4);
  const upcoming = getUpcomingEvents().slice(0, 3);
  const latest = upcoming.length
    ? upcoming.map((e) => ({
        slug: e.slug,
        title: e.title,
        date: e.date,
        excerpt: e.excerpt,
        category: "Event" as const,
        image: e.image,
        href: `/events/${e.slug}/`,
      }))
    : news.slice(0, 3).map((n) => ({ ...n, href: "/news/" }));

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-forest-deep text-white">
        <Image
          src="/images/hero-forest.jpg"
          alt=""
          fill
          priority
          className="hero-image object-cover"
          sizes="100vw"
        />
        <div className="hero-grain absolute inset-0" aria-hidden />
        <div className="section-pad relative flex min-h-[100svh] flex-col justify-end pb-20 pt-36 md:pb-24 md:pt-40">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.22em] text-gold-bright md:text-sm">
            Centerville-Washington Park District
          </p>
          <h1
            className="reveal reveal-delay-1 mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.95] tracking-tight"
            style={{ fontVariationSettings: '"SOFT" 50, "WONK" 0, "opsz" 144' }}
          >
            Your community&apos;s
            <br />
            big backyard.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Fifty-one parks. A thousand acres. Fun, healthy outdoor experiences
            across Centerville and Washington Township.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/parks">Find a park</ButtonLink>
            <ButtonLink href="/programs" variant="secondary">
              Browse programs
            </ButtonLink>
          </div>
          <p
            className="scroll-cue mt-14 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
            aria-hidden
          >
            Scroll
          </p>
        </div>
      </section>

      <section className="atmosphere border-b border-line">
        <div className="section-pad py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2
                className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-ink md:text-4xl"
                style={{ fontVariationSettings: '"SOFT" 30' }}
              >
                Plan your park experience
              </h2>
              <p className="mt-3 text-ink-muted">
                Start with what you need today — parks, shelters, programs, or
                field conditions.
              </p>
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {planLinks.map((item, i) => (
              <li key={item.href} className="bg-paper">
                <Reveal delay={i * 80} className="h-full">
                  <Link
                    href={item.href}
                    className="focus-ring group flex h-full flex-col justify-between p-6 transition hover:bg-mist"
                  >
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight text-ink group-hover:text-forest-mid">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {item.text}
                      </p>
                    </div>
                    <span className="mt-6 text-sm font-semibold text-forest">
                      Go <span className="plan-arrow">→</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <h2
                className="font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
                style={{ fontVariationSettings: '"SOFT" 30' }}
              >
                Parks worth knowing by name
              </h2>
              <p className="mt-3 text-ink-muted">
                From spraygrounds to Sugarcreek trails — destinations residents
                return to again and again.
              </p>
            </div>
            <ButtonLink href="/parks" variant="ghost">
              View all parks
            </ButtonLink>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((park, i) => (
            <Reveal key={park.slug} delay={i * 70}>
              <Link
                href={`/parks/${park.slug}`}
                className="focus-ring group relative block min-h-72 overflow-hidden"
              >
                <Image
                  src={park.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-bright">
                    {park.type} · {park.acres} acres
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-3xl tracking-tight">
                    {park.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/80">
                    {park.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-mist/60">
        <div className="section-pad py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                className="font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
                style={{ fontVariationSettings: '"SOFT" 30' }}
              >
                Upcoming events
              </h2>
              <Link
                href="/events/"
                className="focus-ring text-sm font-semibold text-forest underline-offset-4 hover:underline"
              >
                All events
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {latest.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <article className="flex flex-col">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
                    {item.category} ·{" "}
                    {new Date(`${item.date}T12:00:00`).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl leading-snug tracking-tight">
                    <Link
                      href={item.href}
                      className="focus-ring hover:text-forest-mid"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.excerpt}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foundation text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 80% at 90% 20%, #5b8fd4, transparent), linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.25))",
          }}
          aria-hidden
        />
        <div className="section-pad relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9ec0ef]">
                Foundation for Centerville-Washington Parks
              </p>
              <h2
                className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-5xl"
                style={{ fontVariationSettings: '"SOFT" 20' }}
              >
                Give the backyard a future.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                A nonprofit partner funding trees, benches, trails, and
                scholarships across the Park District.
              </p>
              <div className="mt-8">
                <ButtonLink
                  href="/foundation"
                  variant="foundation"
                  className="!bg-white !text-foundation hover:!bg-[#e8eef6]"
                >
                  Visit the Foundation
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/foundation.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
