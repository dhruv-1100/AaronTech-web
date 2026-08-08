import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Aaron Technologies Inc. | Industrial Components from India",
  description:
    "US-based industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, valves, and machined parts from vetted Indian manufacturers. Competitive landed costs, full material traceability, and US-based support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aaron Technologies Inc. | Industrial Components from India",
    description:
      "Precision-engineered industrial components sourced from vetted Indian manufacturers. Competitive landed costs and full traceability.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Technologies Inc. | Industrial Components from India",
    description:
      "Precision-engineered industrial components sourced from vetted Indian manufacturers.",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Aaron Technologies Inc.",
            url: "https://www.aarontechno.com",
            description:
              "US-based industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, valves, and machined parts from vetted Indian manufacturers.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.aarontechno.com/products?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
