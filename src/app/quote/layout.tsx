import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote (RFQ) — Get Competitive Pricing",
  description:
    "Submit your RFQ for industrial components — fasteners, forgings, castings, bearings, valves, and machined parts. Get competitive landed cost pricing within 24–48 hours from Aaron Technologies.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Request a Quote (RFQ) — Get Competitive Pricing",
    description:
      "Submit your RFQ for industrial components. Get competitive landed cost pricing within 24–48 hours.",
    url: "/quote",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote (RFQ) | Aaron Technologies",
    description:
      "Submit your RFQ for industrial components. Get competitive landed cost pricing within 24–48 hours.",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
