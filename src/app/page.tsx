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
            "@graph": [
              {
                "@type": "WebSite",
                "name": "Aaron Technologies Inc.",
                "url": "https://www.aarontechno.com",
                "description":
                  "US-based industrial component supplier sourcing precision-engineered fasteners, forgings, castings, bearings, valves, and machined parts from vetted Indian manufacturers.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target":
                    "https://www.aarontechno.com/products?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How does Aaron Technologies ensure quality control for imported industrial components from India?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "All manufacturing partners in our network are ISO 9001:2015 certified. Every shipment undergoes rigorous on-site pre-shipment dimensional, chemical, and mechanical testing. Full EN 10204 3.1 Mill Test Certificates (MTC) and lot traceability documentation are provided with every order."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the typical lead times and minimum order quantities (MOQs)?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Production lead times typically range from 4 to 8 weeks depending on component complexity and volume, plus ocean freight transit. We offer flexible MOQs tailored to production schedules and maintain US safety stocking programs for JIT delivery."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How are shipping, customs duties, and landed costs handled?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Aaron Technologies provides DDP (Delivered Duty Paid) pricing options. We handle export/import documentation, customs clearances, tariffs, and freight logistics so you receive a single transparent US invoice with zero hidden port fees."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What materials and engineering standards do your supplier facilities cover?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our vetted foundry network produces components in carbon steel, alloy steel, stainless steel (304, 316, Duplex), brass, and aluminum conforming to ASTM, ASME, DIN, ISO, BS, and API standards."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can Aaron Technologies manufacture components according to custom engineering drawings?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. A significant portion of our catalog consists of custom industrial components manufactured strictly according to customer-supplied 2D/3D CAD blueprints and proprietary tolerance specifications."
                    }
                  }
                ]
              }
            ]
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
