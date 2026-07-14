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
      {/* ── Hero Banner (Clay Style) ─────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-copper-400 font-heading text-sm font-semibold uppercase tracking-widest mb-3">
              Product Catalog
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5 tracking-tight">
              Precision <span className="text-gradient">Sourcing lines</span>
            </h1>
            <p className="text-lg text-steel-400 leading-relaxed max-w-2xl">
              Select one of our product lines below to view size capacities, engineering standards, and finishes. Sourced direct-from-foundry with full lot traceability.
            </p>
          </div>

          {/* Quick stats row (Swap style) */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-navy-800 pt-8">
            {[
              { value: "12", label: "Product Categories" },
              { value: "50+", label: "Standards Covered" },
              { value: "100%", label: "Lot Traceability" },
              { value: "Vetted", label: "Supplier Network" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-heading font-bold text-copper-400">
                  {stat.value}
                </p>
                <p className="text-xs text-steel-500 mt-1 uppercase font-semibold tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Display Deck Section ─────────────────────────────── */}
      <section className="bg-steel-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          
          {/* Client Interactive Filter & Deck Grid */}
          <ProductsDeckClient categories={productCategories} />

          {/* Bottom CTA Card */}
          <div className="mt-20 rounded-2xl bg-navy-900 border border-navy-800/80 p-8 md:p-12 text-center shadow-xl relative overflow-hidden section-dark">
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-steel-100 mb-3">
                Can&apos;t find your specific drawing match?
              </h3>
              <p className="text-steel-400 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                We manufacture custom components according to proprietary blueprints and standard tolerances. Contact our US engineering desk with your spec sheets.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Request a Custom Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
