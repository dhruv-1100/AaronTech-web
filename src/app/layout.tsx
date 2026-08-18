import type { Metadata, Viewport } from "next";
import { chivo, robotoMono } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aarontechno.com'),
  title: {
    default: "Aaron Technologies Inc. | Industrial Components from India",
    template: "%s | Aaron Technologies Inc.",
  },
  description:
    "US-based industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, valves, and machined parts from vetted Indian manufacturers. Competitive landed costs, full material traceability, and US-based support.",
  keywords: [
    "industrial components",
    "India import",
    "fasteners",
    "forged components",
    "castings",
    "bearings",
    "industrial valves",
    "precision machined parts",
    "B2B supplier",
    "vetted manufacturers",
    "RFQ",
    "engineering components",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aaron Technologies Inc.",
    title: "Aaron Technologies Inc. | Industrial Components from India",
    description:
      "Precision-engineered industrial components sourced from vetted Indian manufacturers. Competitive landed costs and full traceability.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aaron Technologies — Industrial Components from India',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aaron Technologies Inc. | Industrial Components from India',
    description:
      'Precision-engineered industrial components sourced from vetted Indian manufacturers.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#131619',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chivo.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-signal focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Aaron Technologies Inc.',
              alternateName: 'Aaron Technologies',
              url: 'https://www.aarontechno.com',
              logo: 'https://www.aarontechno.com/logo.png',
              description: 'US-based B2B industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, and machined parts from vetted ISO 9001-certified Indian manufacturers.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-640-272-1906',
                email: 'kushal@aarontechno.com',
                contactType: 'sales',
                areaServed: ['US', 'CA', 'MX'],
                availableLanguage: ['English'],
              },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'NJ',
                addressCountry: 'US',
              },
              knowsAbout: [
                'Industrial Fasteners',
                'Forged Steel Components',
                'Investment Castings',
                'Precision CNC Machining',
                'Industrial Valves',
                'ASTM / ASME Material Standards',
                'ISO 9001 Quality Management',
                'Supply Chain Consolidation',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Industrial Sourcing Catalog',
                itemListElement: [
                  { '@type': 'OfferCatalog', name: 'Industrial Fasteners' },
                  { '@type': 'OfferCatalog', name: 'Forged Components' },
                  { '@type': 'OfferCatalog', name: 'Castings' },
                  { '@type': 'OfferCatalog', name: 'Precision Machined Parts' },
                  { '@type': 'OfferCatalog', name: 'Industrial Valves' },
                ],
              },
            }),
          }}
        />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
