import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/site";
import { PageHero, CtaBand } from "@/components/ui/Page";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Technical Resources & Sourcing Insights",
  description:
    "Explore our technical guides, sourcing checklists, and industry updates on importing precision-engineered industrial components from India.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Technical Resources & Sourcing Insights",
    description:
      "Technical guides, sourcing checklists, and industry updates on importing industrial components from India.",
    url: "/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Aaron Technologies",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical resources"
        title="Knowledge base & insights."
        lede="Procurement guides, compliance explainers and market updates to help you source smarter, reduce landed costs and read a trade agreement without a lawyer."
      />

      <section className="border-b border-ink bg-paper pt-12 pb-14 md:pt-[88px] md:pb-[100px]">
        <div className="shell">
          <ResourcesClient posts={blogPosts} />
        </div>
      </section>

      <CtaBand
        title="Want the landed-cost worksheet?"
        body="We keep a working spreadsheet for FOB-to-dock comparison across freight modes and duty rates. Ask and we will send it over."
        primary={{ label: "Request a quote →", href: "/quote" }}
        secondary={{ label: "Email us", href: "mailto:kushal@aarontechno.com" }}
      />
    </>
  );
}
