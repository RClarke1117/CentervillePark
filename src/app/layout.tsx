import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AlertBanner } from "@/components/AlertBanner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MobileDock } from "@/components/MobileDock";
import { BackToTop } from "@/components/BackToTop";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Centerville-Washington Park District",
    template: "%s · CWPD",
  },
  description:
    "Explore your community's big backyard — 51 parks, programs, and events across Centerville and Washington Township, Ohio.",
  openGraph: {
    title: "Centerville-Washington Park District",
    description:
      "Your community's big backyard — parks, programs, and events in Centerville & Washington Township.",
    type: "website",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Centerville-Washington Park District",
  alternateName: "CWPD",
  url: "https://cwpd.org",
  logo: "https://cwpd.org/wp-content/uploads/2016/04/CWPD_logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "221 N. Main Street",
    addressLocality: "Centerville",
    addressRegion: "OH",
    postalCode: "45459",
    addressCountry: "US",
  },
  telephone: "+1-937-433-5155",
  description:
    "Park district operating 51 parks across 1,063 acres in Centerville and Washington Township, Ohio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased pb-16 lg:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a href="#main" className="skip-link focus-ring">
          Skip to content
        </a>
        <ScrollProgress />
        <AlertBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileDock />
        <BackToTop />
      </body>
    </html>
  );
}
