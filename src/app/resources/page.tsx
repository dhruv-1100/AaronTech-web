import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/site";
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
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Technical Resources
          </span>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-5 max-w-3xl">
            Knowledge Base & <strong>Insights</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Procurement guides, compliance explainers, and market updates to help
            you source smarter, reduce landed costs, and navigate trade agreements.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <ResourcesClient posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
