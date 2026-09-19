import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Foundation for Centerville-Washington Parks",
  description:
    "Support trails, trees, benches, and programs through the Foundation for Centerville-Washington Parks.",
};

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <PageHero
        tone="foundation"
        eyebrow="Foundation for Centerville-Washington Parks"
        title="Private generosity for a public backyard."
        description="A nonprofit partner funding trees, benches, trail enhancements, and program scholarships."
        crumbs={[{ label: "Foundation" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href="/contact"
            variant="foundation"
            className="!bg-white !text-foundation hover:!bg-[#e8eef6]"
          >
            Donate / inquire
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to CWPD
          </ButtonLink>
        </div>
      </PageHero>

      <div className="section-pad grid gap-10 py-16 pb-24 md:grid-cols-2 md:py-20">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foundation"
          >
            Ways to give
          </h2>
          <ul className="mt-6 space-y-4 text-ink-muted">
            <li className="border-l-2 border-foundation pl-4">
              <strong className="block text-ink">Tree & bench dedications</strong>
              Honor someone with a lasting place in the parks.
            </li>
            <li className="border-l-2 border-foundation pl-4">
              <strong className="block text-ink">Sponsorships</strong>
              Support events and programs that bring the community outside.
            </li>
            <li className="border-l-2 border-foundation pl-4">
              <strong className="block text-ink">Trailblazers newsletter</strong>
              Stay close to Foundation projects and stories.
            </li>
          </ul>
        </div>
        <div className="relative min-h-72 overflow-hidden">
          <Image
            src="/images/foundation.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
