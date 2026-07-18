import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/lib/data/products";
import ProductsDeckClient from "@/components/ProductsDeckClient";

export const metadata: Metadata = {
  title: "Industrial Components Catalog | Fasteners, Forgings, Castings & More",
  description:
    "Browse precision-engineered industrial components — fasteners, forgings, castings, bearings, valves, and more — sourced from vetted Indian manufacturers.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Product Catalog
          </span>
          <h1 className="text-4xl md:text-5xl leading-[1.1] mb-5">
            Precision <strong>Sourcing Lines</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Select a product line below to view size capacities, engineering standards,
            and finishes. Sourced direct-from-foundry with full lot traceability.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 border-t border-border pt-8">
            {[
              { value: "12", label: "Product Categories" },
              { value: "50+", label: "Standards Covered" },
              { value: "100%", label: "Lot Traceability" },
              { value: "Vetted", label: "Supplier Network" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`${i < 3 ? "border-r border-border" : ""} ${i > 0 ? "pl-6" : ""} py-2`}
              >
                <p className="text-2xl md:text-3xl text-text-primary tracking-tight">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase text-text-tertiary mt-1 tracking-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Deck */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <ProductsDeckClient categories={productCategories} />

          {/* Bottom CTA */}
          <div className="mt-20 rounded-xl border border-border-strong p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl leading-tight mb-3">
              Can&apos;t find your specific <strong>drawing match?</strong>
            </h3>
            <p className="text-text-secondary max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              We manufacture custom components according to proprietary blueprints
              and standard tolerances. Contact our US engineering desk with your spec sheets.
            </p>
            <Link
              href="/quote"
              className="btn-primary px-8 py-3.5"
            >
              Request a Custom Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
