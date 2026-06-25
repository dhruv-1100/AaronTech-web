import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Flame,
  FlaskConical,
  CircleDot,
  Gauge,
  Target,
  ToggleRight,
  Droplets,
  Layers,
  Zap,
  Spline,
  Circle,
  ArrowRight,
  Search,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse 12 categories of precision-engineered industrial components — fasteners, forgings, castings, bearings, valves, and more — sourced from ISO-certified Indian manufacturers.",
};

// ---------------------------------------------------------------------------
// Icon Resolver — maps the icon name stored in data to the Lucide component
// ---------------------------------------------------------------------------
const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Flame,
  FlaskConical,
  CircleDot,
  Gauge,
  Target,
  ToggleRight,
  Droplets,
  Layers,
  Zap,
  Spline,
  Circle,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Circle;
}

// ---------------------------------------------------------------------------
// ProductCard (server sub-component — no hooks)
// ---------------------------------------------------------------------------
function ProductCard({ category }: { category: ProductCategory }) {
  const Icon = resolveIcon(category.icon);

  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn(
        "group relative flex flex-col rounded-none border border-steel-300 bg-white overflow-hidden",
        "transition-all duration-300",
        "hover:border-copper-400 hover:shadow-md"
      )}
    >
      {/* Top Header Image */}
      <div className="h-44 w-full overflow-hidden relative bg-steel-200 border-b border-steel-300">
        <img
          src={category.heroImage}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay Icon Badge */}
        <div className="absolute bottom-0 left-6 translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white text-navy-900 border border-steel-300 shadow-sm transition-colors group-hover:border-copper-500 group-hover:text-copper-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 pt-8 flex-1 flex flex-col">
        {/* Name */}
        <h3 className="font-heading text-lg font-bold text-navy-900 mb-1.5">
          {category.name}
        </h3>

        {/* Short description */}
        <p className="text-sm leading-relaxed text-steel-600 mb-4 flex-1">
          {category.shortDescription}
        </p>

        {/* Standard badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {category.standards.slice(0, 3).map((std) => (
            <span
              key={std}
              className="inline-block rounded-none bg-steel-200 px-2 py-0.5 text-[11px] font-medium text-steel-700 leading-snug"
            >
              {std}
            </span>
          ))}
          {category.standards.length > 3 && (
            <span className="inline-block rounded-none bg-steel-200 px-2 py-0.5 text-[11px] font-medium text-steel-500 leading-snug">
              +{category.standards.length - 3} more
            </span>
          )}
        </div>

        {/* View Details link */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600 transition-colors group-hover:text-copper-500">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-copper-400 font-heading text-sm font-semibold uppercase tracking-widest mb-3">
              Product Catalog
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5">
              Our Product Lines
            </h1>
            <p className="text-lg md:text-xl text-steel-400 leading-relaxed max-w-2xl">
              A comprehensive catalog of precision-engineered industrial
              components — sourced from ISO-certified manufacturers in India and
              delivered with full material traceability, test reports, and
              US-based support.
            </p>
          </div>

          {/* Quick stats row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-navy-700 pt-8">
            {[
              { value: "12", label: "Product Categories" },
              { value: "50+", label: "Standards Covered" },
              { value: "100%", label: "Lot Traceability" },
              { value: "ISO 9001", label: "Certified Suppliers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-heading font-bold text-copper-400">
                  {stat.value}
                </p>
                <p className="text-sm text-steel-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────── */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Section header with decorative search hint */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
                Browse Categories
              </h2>
              <p className="text-steel-600 mt-1.5 text-base">
                Select a category to view specifications, standards, and
                available materials.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-steel-500">
              <Search className="h-4 w-4" />
              <span>
                {productCategories.length} categories available
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => (
              <ProductCard key={category.id} category={category} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-none bg-navy-900 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-steel-100 mb-3">
              Can&apos;t find what you need?
            </h3>
            <p className="text-steel-400 max-w-xl mx-auto mb-6 text-base leading-relaxed">
              We source a wide range of industrial components beyond what&apos;s
              listed here. Tell us what you&apos;re looking for and we&apos;ll
              provide a competitive quote.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-none transition-colors"
            >
              Request a Custom Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
