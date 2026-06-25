import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/site";
import ResourcesClient from "./ResourcesClient";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Resources & Sourcing Insights",
  description:
    "Explore our technical guides, sourcing checklists, and industry updates on importing precision-engineered industrial components from India.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-copper-400 text-sm font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Technical Resources</span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4 leading-[1.1]">
              Knowledge Base & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-2xl">
              Procurement guides, compliance explainers, and market updates to help you source smarter, reduce landed costs, and navigate trade agreements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-steel-100 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
          <ResourcesClient posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
