import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";

// ---------------------------------------------------------------------------
// Static route generation
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return productCategories.map((cat) => ({ category: cat.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = productCategories.find((c) => c.slug === categorySlug);
  if (!category) return { title: "Product Not Found" };

  return {
    title: category.name,
    description: category.shortDescription,
  };
}

// ---------------------------------------------------------------------------
// Icon resolver
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
// Page
// ---------------------------------------------------------------------------
export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = productCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const Icon = resolveIcon(category.icon);

  // Spec rows for the table — only include rows that have data
  const specRows: { label: string; values: string[] | string }[] = [
    { label: "Types", values: category.types },
    { label: "Standards", values: category.standards },
    { label: "Materials", values: category.materials },
  ];
  if (category.finishes) {
    specRows.push({ label: "Finishes", values: category.finishes });
  }
  if (category.sizes) {
    specRows.push({ label: "Sizes", values: category.sizes });
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 overflow-hidden border-b border-navy-800">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Back link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-steel-200 transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            All Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Details */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper-500/10 text-copper-400 border border-copper-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="inline-block rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-copper-400 border border-navy-700">
                  Industrial Sourcing
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-[1.1] mb-5">
                {category.name}
              </h1>

              <p className="text-base md:text-lg text-steel-300 leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Standard Quick Badges */}
              <div className="mt-8 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-steel-400 mr-2">Standards:</span>
                {category.standards.map((std) => (
                  <span
                    key={std}
                    className="inline-block rounded-full bg-navy-850 px-2.5 py-1 text-xs font-semibold text-steel-300 border border-navy-700"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Image Preview */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Border frames for premium/industrial design */}
                <div className="absolute -inset-2 border border-steel-750/30 rounded-3xl pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]" />
                <div className="relative overflow-hidden bg-navy-950 border border-steel-700/80 p-2 shadow-2xl rounded-2xl">
                  <img
                    src={category.heroImage}
                    alt={category.name}
                    className="w-full h-72 md:h-80 lg:h-96 object-cover filter brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle caption or tag */}
                  <div className="absolute bottom-4 right-4 bg-navy-900/90 backdrop-blur-sm border border-steel-700/85 px-3 py-1 text-[11px] font-medium text-steel-300 rounded-lg">
                    High-traceability ISO Product Line
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* ── Main column (2/3) ──────────────────────────────── */}
            <div className="lg:col-span-2 space-y-14">
              {/* Specification Table */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5">
                  Technical Specifications
                </h2>

                <div className="overflow-x-auto rounded-2xl border border-steel-200/85 bg-white shadow-sm overflow-hidden">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th className="w-40">Attribute</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specRows.map((row) => (
                        <tr key={row.label}>
                          <td className="font-semibold text-navy-900 align-top whitespace-nowrap">
                            {row.label}
                          </td>
                          <td>
                            {Array.isArray(row.values) ? (
                              <ul className="list-none space-y-1">
                                {row.values.map((v) => {
                                  const isTypes = row.label === "Types";
                                  const productSlug = v.toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/[^\w\-]+/g, "");
                                  return (
                                    <li
                                      key={v}
                                      className="flex items-start gap-2 text-steel-700"
                                    >
                                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-copper-500 shrink-0" />
                                      {isTypes ? (
                                        <Link
                                          href={`/products/${category.slug}/${productSlug}`}
                                          className="text-copper-600 hover:text-copper-500 font-semibold hover:underline"
                                        >
                                          {v}
                                        </Link>
                                      ) : (
                                        v
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <span className="text-steel-700">
                                {row.values}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Applications */}
              {category.applications && category.applications.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5">
                    Applications
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.applications.map((app) => (
                      <div
                        key={app}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border border-steel-200/80 bg-white p-4",
                          "transition-all duration-300 hover:border-copper-500/40 hover:shadow-md"
                        )}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-copper-500/10 text-copper-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-navy-900">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar (1/3) ───────────────────────────────────── */}
            <aside className="space-y-8">
              {/* Required Documents */}
              <div className="rounded-2xl border border-steel-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-copper-500" />
                  <h3 className="font-heading text-lg font-bold text-navy-900">
                    Required Documents
                  </h3>
                </div>
                <p className="text-sm text-steel-600 mb-4">
                  Every shipment of {category.name.toLowerCase()} includes the
                  following documentation:
                </p>
                <ul className="space-y-3">
                  {category.requiredDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 mt-0.5 shrink-0 text-success" />
                      <span className="text-sm text-steel-700 leading-snug">
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standards quick list */}
              <div className="rounded-2xl border border-steel-200/80 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-4">
                  Applicable Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.standards.map((std) => (
                    <span
                      key={std}
                      className="inline-block rounded-full bg-navy-900/5 border border-navy-900/10 px-2.5 py-1 text-xs font-medium text-navy-800"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials quick list */}
              <div className="rounded-2xl border border-steel-200/80 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-4">
                  Available Materials
                </h3>
                <ul className="space-y-2">
                  {category.materials.map((mat) => (
                    <li
                      key={mat}
                      className="flex items-center gap-2 text-sm text-steel-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-copper-500" />
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-steel-100 mb-3">
              Request a Quote for {category.name}
            </h2>
            <p className="text-steel-400 max-w-xl mb-8 text-base leading-relaxed">
              Tell us your specifications, quantities, and delivery timeline.
              We&apos;ll respond within one business day with a competitive
              landed-cost quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-steel-600 hover:border-steel-400 text-steel-300 hover:text-steel-100 font-semibold rounded-full transition-all hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
