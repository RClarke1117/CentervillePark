import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FieldStatusLive } from "@/components/FieldStatusLive";

export const metadata: Metadata = {
  title: "Athletic Field Status",
  description:
    "Live open, limited, and closed status for CWPD athletic fields — powered by the district RainoutLine feed.",
};

export default function FieldsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Today"
        title="Athletic field status"
        description="Live conditions for coaches, parents, and league organizers — the same RainoutLine feed used on cwpd.org."
        crumbs={[{ label: "Field Status" }]}
      >
        <p className="text-sm text-white/60">
          Updated throughout the day by Park District staff. Conditions can
          change after rain.
        </p>
      </PageHero>

      <div className="section-pad py-12 pb-24 md:py-16">
        <FieldStatusLive />
      </div>
    </div>
  );
}
