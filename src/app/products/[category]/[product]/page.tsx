import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Package,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import { getProductDetails } from "@/lib/data/products-detail";

// ---------------------------------------------------------------------------
// Static route generation
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  const params: { category: string; product: string }[] = [];
  productCategories.forEach((cat) => {
    cat.types.forEach((type) => {
      const productSlug = type
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      params.push({ category: cat.slug, product: productSlug });
    });
  });
  return params;
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductDetails(categorySlug, productSlug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Sourcing from India`,
    description: product.description,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = productCategories.find((c) => c.slug === categorySlug);
  const product = getProductDetails(categorySlug, productSlug);

  if (!category || !product) {
    notFound();
  }

  // Get other products in the same category for bottom navigation
  const otherProducts = category.types
    .filter((type) => type !== product.name)
    .map((type) => ({
      name: type,
      slug: type
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, ""),
    }));

  return (
    <>
      {/* ── Hero Header ───────────────────────────────────────────── */}
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

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-steel-400 mb-8">
            <Link href="/products" className="hover:text-steel-200 transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products/${category.slug}`}
              className="hover:text-steel-200 transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
            <span className="text-copper-400 font-semibold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Core Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-copper-400 border border-navy-700">
                  {category.name}
                </span>
                <span className="inline-block rounded-full bg-navy-800/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-steel-400 border border-navy-700/55">
                  Component Detail
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-[1.15] mb-5">
                {product.name}
              </h1>

              <p className="text-base md:text-lg text-steel-300 leading-relaxed max-w-2xl">
                {product.description}
              </p>

              {/* Lead Time & MOQ Summary */}
              <div className="mt-8 flex flex-wrap gap-4 items-center border-t border-navy-800 pt-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-steel-500 block">
                    Lead Time Estimate
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {product.leadTime}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-navy-800 hidden sm:block" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-steel-500 block">
                    Minimum Order Quantity (MOQ)
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {product.moq}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Product Image Frame */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-2 border border-steel-750/30 rounded-3xl pointer-events-none" />
                <div className="relative overflow-hidden bg-navy-950 border border-steel-700/80 p-2 shadow-2xl rounded-2xl">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={640}
                    height={320}
                    priority
                    className="w-full h-64 sm:h-80 object-cover filter brightness-95 contrast-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-navy-900/90 backdrop-blur-sm border border-steel-700/85 px-3 py-1 text-[11px] font-medium text-steel-300 rounded-lg">
                    India Sourcing Catalogue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Section ──────────────────────────────────── */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left 2 Columns: Technical Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Spec Table */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5 font-heading">
                  Technical Specifications
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-steel-200/85 bg-white shadow-sm overflow-hidden">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th className="w-44">Attribute</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold text-navy-900 align-top">
                          Materials & Grades
                        </td>
                        <td className="text-steel-700 leading-relaxed whitespace-pre-line">
                          {product.material}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-navy-900 align-top">
                          Applicable Standards
                        </td>
                        <td className="text-steel-700">
                          <div className="flex flex-wrap gap-1.5">
                            {product.standards.map((std) => (
                              <span
                                key={std}
                                className="inline-block bg-steel-200 text-steel-800 text-xs px-2 py-0.5"
                              >
                                {std}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-navy-900 align-top">
                          Size Capabilities
                        </td>
                        <td className="text-steel-700">{product.sizes}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-navy-900 align-top">
                          Available Finishes
                        </td>
                        <td className="text-steel-700">
                          {product.finishes.join(", ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-navy-900 align-top">
                          Machining Tolerances
                        </td>
                        <td className="text-steel-700 leading-relaxed">
                          {product.tolerances}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5 font-heading">
                  Quality & Features
                </h2>
                <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {product.keyFeatures.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 bg-white p-4 border border-steel-200/80 rounded-2xl shadow-sm hover:border-copper-500/40 hover:shadow-md transition-all duration-300"
                    >
                      <CheckCircle2 className="h-5 w-5 mt-[3px] shrink-0 text-copper-600" aria-hidden="true" />
                      <span className="text-sm text-steel-700 leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-5 font-heading">
                  Applications
                </h2>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                    {product.applications.map((app) => (
                      <div
                        key={app}
                        className="flex items-center gap-3 bg-white p-4 border border-steel-200/80 rounded-2xl shadow-sm hover:border-copper-500/40 hover:shadow-md transition-all duration-300"
                      >
                        <div className="h-8 w-8 rounded-xl bg-copper-500/10 flex items-center justify-center shrink-0">
                          <Wrench className="w-4 h-4 text-copper-600" aria-hidden="true" />
                        </div>
                        <span className="text-sm font-semibold text-navy-900 leading-relaxed">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="space-y-8">
              {/* RFQ Sidebar Card */}
              <div className="rounded-2xl border border-steel-200/80 bg-white p-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-copper-500" />
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-3">
                  Sourcing Request (RFQ)
                </h3>
                <p className="text-xs text-steel-600 mb-6 leading-relaxed">
                  Submit your engineering drawings and component requirements. Our US team and India-based foundry coordinators will provide a complete landed-cost quotation.
                </p>

                <div className="space-y-4">
                  <div className="bg-steel-100 p-3.5 border border-steel-200/60 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-steel-500 block">
                      Target Component
                    </span>
                    <span className="text-sm font-bold text-navy-900">
                      {product.name}
                    </span>
                  </div>

                  <Link
                    href={`/quote?category=${category.slug}&product=${encodeURIComponent(product.name)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-full transition-all shadow-md hover:shadow-lg"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Quality & Traceability Certification */}
              <div className="rounded-2xl border border-steel-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <ShieldCheck className="w-5 h-5 text-success" aria-hidden="true" />
                  <h3 className="font-heading text-base font-bold text-navy-900">
                    Quality Assurance
                  </h3>
                </div>
                <p className="text-xs text-steel-600 leading-relaxed mb-4">
                  All shipments are audited prior to US export. Deliverables include full mill test certificates and compliance checklists:
                </p>
                <ul className="space-y-2">
                  {product.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-copper-500 mt-1.5 shrink-0" />
                      <span className="text-xs text-steel-700 font-medium">
                        {cert}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sourcing Support Callout */}
              <div className="rounded-2xl bg-navy-900 text-white p-6 shadow-sm border border-navy-800 section-dark">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-copper-400" aria-hidden="true" />
                  <h4 className="font-heading font-bold text-white text-sm">
                    Supply Security
                  </h4>
                </div>
                <p className="text-xs text-steel-400 leading-relaxed">
                  We manage logistics, customs filing, sea/air shipping, and local US warehousing if stocking programs are required.
                </p>
              </div>
            </aside>
          </div>

          {/* ── Related Products ────────────────────────────────────── */}
          {otherProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-steel-300">
              <h3 className="font-heading text-lg font-bold text-navy-900 mb-6">
                Other Components in {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {otherProducts.slice(0, 5).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${category.slug}/${p.slug}`}
                    className="p-4 bg-white border border-steel-200/80 rounded-xl hover:border-copper-500/40 hover:bg-copper-500/5 hover:shadow-sm transition-all text-center group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-navy-900 group-hover:text-copper-600 block truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-steel-500 uppercase tracking-widest mt-1 block">
                      View Specs
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
