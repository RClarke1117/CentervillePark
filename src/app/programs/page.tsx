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
        description="Search programs below and register in one place — openings and waitlists stay up to date automatically."
        crumbs={[{ label: "Programs" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={RECDESK_PROGRAMS} external>
            Open full program list
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
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-ink-muted">
          Browse and register below. If you live in Centerville or Washington
          Township, choose <strong className="font-semibold text-ink">Dayton</strong>{" "}
          as your city when you create an account.
        </p>

        <RecDeskEmbed
          src={RECDESK_PROGRAMS}
          title="Program registration"
          openLabel="Open full program list"
          frameHeight={1100}
        />
      </div>
    </div>
  );
}
