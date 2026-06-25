import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aaron Technologies Inc. | Industrial Components from India",
    template: "%s | Aaron Technologies Inc.",
  },
  description:
    "US-based industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, valves, and machined parts from ISO-certified Indian manufacturers. Competitive landed costs, full material traceability, and US-based support.",
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
    "ISO certified",
    "RFQ",
    "engineering components",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aaron Technologies Inc.",
    title: "Aaron Technologies Inc. | Industrial Components from India",
    description:
      "Precision-engineered industrial components sourced from ISO-certified Indian manufacturers. Competitive landed costs and full traceability.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
