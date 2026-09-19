import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  tone = "forest",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: { href?: string; label: string }[];
  children?: React.ReactNode;
  tone?: "forest" | "foundation";
}) {
  const bg = tone === "foundation" ? "bg-foundation" : "bg-forest-deep";
  const eye =
    tone === "foundation" ? "text-[#9ec0ef]" : "text-gold-bright";

  return (
    <div className={`section-pad border-b border-line ${bg} pb-14 pt-28 text-white md:pt-32`}>
      <Breadcrumbs items={crumbs} />
      <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${eye}`}>
        {eyebrow}
      </p>
      <h1
        className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
        style={{ fontVariationSettings: '"SOFT" 40' }}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-white/80">{description}</p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
