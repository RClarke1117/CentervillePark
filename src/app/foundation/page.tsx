import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Foundation for Centerville-Washington Parks",
  description:
    "Support trails, trees, benches, and programs through the Foundation for Centerville-Washington Parks.",
};

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <section className="relative overflow-hidden bg-foundation text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 80% 0%, #4a7ab8, transparent 55%)",
          }}
          aria-hidden
        />
        <div className="section-pad relative pb-16 pt-28 md:pb-24 md:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9ec0ef]">
            Foundation for Centerville-Washington Parks
          </p>
          <h1
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-6xl"
            style={{ fontVariationSettings: '"SOFT" 20' }}
          >
            Private generosity for a public backyard.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            The Foundation is a distinct nonprofit partner — visually separate
            from the Park District — funding trees, benches, trail enhancements,
            and program scholarships.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </div>
      </section>

      <div className="section-pad grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foundation"
            style={{ fontVariationSettings: '"SOFT" 20' }}
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
