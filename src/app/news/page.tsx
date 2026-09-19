import type { Metadata } from "next";
import Image from "next/image";
import { news } from "@/data/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Centerville-Washington Park District.",
};

export default function NewsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="News"
        title="Stories from the backyard"
        crumbs={[{ label: "News" }]}
      />
      <div className="section-pad py-12 pb-24 md:py-16">
        <ul className="grid gap-10 md:grid-cols-2">
          {news.map((item) => (
            <li key={item.slug}>
              <article>
                <div className="media-frame relative mb-4 aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-mid">
                  {item.category} ·{" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-2 text-ink-muted">{item.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
