import type { Metadata, Viewport } from "next";
import { plusJakarta, jetbrainsMono } from "@/lib/fonts";
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
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm"
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
              url: 'https://www.aarontechno.com',
              logo: 'https://www.aarontechno.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-640-272-1906',
                email: 'kushal@aarontechno.com',
                contactType: 'sales',
                areaServed: 'US',
                availableLanguage: 'English',
              },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'NJ',
                addressCountry: 'US',
              },
              sameAs: [],
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
