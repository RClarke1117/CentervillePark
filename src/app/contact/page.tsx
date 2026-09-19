import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Centerville-Washington Park District.",
};

export default function ContactPage() {
  return (
    <div className="atmosphere min-h-screen">
      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        crumbs={[{ label: "Contact" }]}
      />
      <div className="section-pad grid gap-10 py-14 pb-24 md:grid-cols-2 md:py-16">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Main office
          </h2>
          <p className="mt-3 text-lg text-ink">
            Centerville-Washington Park District
            <br />
            221 N. Main Street
            <br />
            Centerville, Ohio 45459
          </p>
          <p className="mt-4 text-ink">
            <a
              className="focus-ring font-semibold underline-offset-2 hover:underline"
              href="tel:9374335155"
            >
              (937) 433-5155
            </a>
            <br />
            <span className="text-sm text-ink-muted">FAX (937) 433-6564</span>
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Office hours: 8 a.m. – 3:30 p.m., Monday–Friday
          </p>
        </div>
        <form
          className="border border-line bg-paper p-6"
          aria-label="Contact form"
        >
          <label className="block text-sm font-medium">
            Name
            <input
              required
              name="name"
              className="focus-ring mt-1.5 w-full border border-line bg-mist px-3 py-2.5"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Email
            <input
              required
              type="email"
              name="email"
              className="focus-ring mt-1.5 w-full border border-line bg-mist px-3 py-2.5"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Message
            <textarea
              required
              name="message"
              rows={5}
              className="focus-ring mt-1.5 w-full border border-line bg-mist px-3 py-2.5"
            />
          </label>
          <button
            type="submit"
            className="focus-ring mt-5 bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-mid"
          >
            Send message
          </button>
          <p className="mt-3 text-xs text-ink-muted">
            Demo form — wire to CMS or email in production.
          </p>
        </form>
      </div>
    </div>
  );
}
