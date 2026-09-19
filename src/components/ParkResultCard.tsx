import Link from "next/link";
import Image from "next/image";
import { AMENITY_LABELS, type Park } from "@/data/parks";
import { FavoriteButton } from "@/components/FavoriteButton";

export function ParkResultCard({ park }: { park: Park }) {
  const topAmenities = park.amenities.slice(0, 5);

  return (
    <article className="group grid gap-0 overflow-hidden border border-line bg-paper transition hover:border-forest/30 md:grid-cols-[140px_1fr]">
      <div className="relative min-h-36 md:min-h-full">
        <Image
          src={park.image}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 140px"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
              {park.type} park
              {park.acres != null ? ` · ${park.acres} acres` : ""}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl tracking-tight text-ink">
              <Link
                href={`/parks/${park.slug}`}
                className="focus-ring hover:text-forest-mid"
              >
                {park.name}
              </Link>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FavoriteButton slug={park.slug} name={park.name} />
            <Link
              href={`/parks/${park.slug}`}
              className="focus-ring text-sm font-semibold text-forest underline-offset-4 hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">{park.summary}</p>
        <p className="text-xs text-ink-muted">
          {park.address}
          {park.city ? ` · ${park.city}` : ""}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Amenities">
          {topAmenities.map((a) => (
            <li
              key={a}
              className="border border-line bg-mist px-2 py-1 text-[11px] font-medium text-forest"
            >
              {AMENITY_LABELS[a]}
            </li>
          ))}
          {park.amenities.length > topAmenities.length && (
            <li className="px-2 py-1 text-[11px] text-ink-muted">
              +{park.amenities.length - topAmenities.length} more
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
