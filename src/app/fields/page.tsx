import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FieldStatusLive } from "@/components/FieldStatusLive";

export const metadata: Metadata = {
  title: "Athletic Field Status",
  description:
    "Current open, limited, and closed status for Centerville-Washington athletic fields and the Oak Grove dog park.",
};

export default function FieldsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Today"
        title="Athletic field status"
        description="Check conditions before you leave — updated by Park District staff throughout the day."
        crumbs={[{ label: "Field Status" }]}
      />

      <div className="section-pad py-12 pb-24 md:py-16">
        <FieldStatusLive />
      </div>
    </div>
  );
}
