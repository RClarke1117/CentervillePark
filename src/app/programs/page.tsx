import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RecDeskEmbed } from "@/components/RecDeskEmbed";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Search and register for Centerville-Washington Park District programs — live listings from RecDesk.",
};

const RECDESK_PROGRAMS = "https://cwpd.recdesk.com/Community/Program";

export default function ProgramsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Programs & registration"
        title="Find a program. Register once."
        description="Live program listings, dates, and registration status from RecDesk — the system CWPD already uses. No duplicate entry on this site."
        crumbs={[{ label: "Programs" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={RECDESK_PROGRAMS} external>
            Open RecDesk programs
          </ButtonLink>
          <ButtonLink
            href="https://cwpd.recdesk.com/Community/Member/Signup"
            variant="secondary"
            external
          >
            Create an account
          </ButtonLink>
        </div>
      </PageHero>

      <div className="section-pad py-10 pb-24 md:py-14">
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Browse here",
              d: "Search live programs inside the RecDesk panel — status updates when CWPD updates RecDesk.",
            },
            {
              n: "02",
              t: "Register once",
              d: "Checkout stays in RecDesk so fees, forms, and waitlists stay accurate.",
            },
            {
              n: "03",
              t: "One source of truth",
              d: "Staff maintain programs in RecDesk only — this page embeds that live catalog.",
            },
          ].map((step) => (
            <div key={step.n} className="border-l-2 border-gold pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                {step.n}
              </p>
              <p className="mt-1 font-semibold text-ink">{step.t}</p>
              <p className="mt-1 text-sm text-ink-muted">{step.d}</p>
            </div>
          ))}
        </div>

        <RecDeskEmbed
          src={RECDESK_PROGRAMS}
          title="CWPD program registration"
          openLabel="Open full RecDesk programs"
          frameHeight={1100}
        />
      </div>
    </div>
  );
}
