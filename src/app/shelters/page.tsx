import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RecDeskEmbed } from "@/components/RecDeskEmbed";
import { parks } from "@/data/parks";

export const metadata: Metadata = {
  title: "Reserve a Shelter",
  description:
    "Reserve group picnic shelters at Centerville-Washington community parks.",
};

const RECDESK_FACILITY = "https://cwpd.recdesk.com/Community/Facility";

export default function SheltersPage() {
  const reservable = parks
    .filter((p) => p.amenities.includes("shelter-reservable"))
    .sort((a, b) => a.name.localeCompare(b.name));
  const dropIn = parks
    .filter(
      (p) =>
        p.amenities.includes("shelter-drop-in") &&
        !p.amenities.includes("shelter-reservable"),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Shelters"
        title="Reserve a group shelter"
        description="Book a group picnic shelter for reunions, birthdays, and celebrations. Choose a date and facility in RecDesk below."
        crumbs={[{ label: "Shelters" }]}
      >
        <ButtonLink href={RECDESK_FACILITY} external>
          Open full reservation list
        </ButtonLink>
      </PageHero>

      <div className="section-pad py-10 pb-24 md:py-14">
        <RecDeskEmbed
          src={RECDESK_FACILITY}
          title="Shelter reservations"
          openLabel="Open full reservation list"
          frameHeight={1000}
        />

        <aside className="mt-12 border-t border-line pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            Parks with reservable shelters
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            Quick links for park details — pick and book in the reservation list
            above.
          </p>
          <ul className="mt-5 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {reservable.map((p) => (
              <li key={p.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/parks/${p.slug}/`}
                  className="focus-ring font-medium text-forest underline-offset-2 hover:underline"
                >
                  {p.name}
                </Link>
                <span className="text-ink-muted"> — {p.address}</span>
              </li>
            ))}
          </ul>

          {dropIn.length > 0 && (
            <details className="mt-8 group">
              <summary className="focus-ring cursor-pointer list-none text-sm font-semibold text-forest">
                <span className="underline-offset-2 group-open:underline">
                  First-come shelters ({dropIn.length})
                </span>
                <span className="ml-2 font-normal text-ink-muted">
                  — not booked through RecDesk
                </span>
              </summary>
              <ul className="mt-4 columns-1 gap-x-8 text-sm text-ink-muted sm:columns-2 lg:columns-3">
                {dropIn.map((p) => (
                  <li key={p.slug} className="mb-2 break-inside-avoid">
                    <Link
                      href={`/parks/${p.slug}/`}
                      className="focus-ring text-forest underline-offset-2 hover:underline"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </aside>
      </div>
    </div>
  );
}
