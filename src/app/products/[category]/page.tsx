import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import { resolveIcon } from "@/lib/icons";

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
    title: `${category.name} — Industrial ${category.name} Supplier`,
    description: `${category.shortDescription}. Sourced from vetted Indian manufacturers with full traceability. Request a quote today.`,
  };
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
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight">
                  Industrial Sourcing
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5">
                {category.name}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5 items-center">
                <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight mr-1">
                  Standards:
                </span>
                {category.standards.map((std) => (
                  <span
                    key={std}
                    className="font-mono text-[9px] uppercase bg-bg-subtle border border-border rounded px-2 py-1 text-text-tertiary tracking-tight"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-xl border border-border-strong">
                <Image
                  src={category.heroImage}
                  alt={category.name}
                  width={640}
                  height={384}
                  priority
                  className="w-full h-72 md:h-80 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main (2/3) */}
            <div className="lg:col-span-2 space-y-14">
              {/* Specification Table */}
              <div>
                <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-3">
                  Specifications
                </span>
                <h2 className="text-2xl mb-5">
                  Technical <strong>Specifications</strong>
                </h2>

                <div className="overflow-x-auto rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-bg-subtle">
                        <th className="text-left px-6 py-3 font-mono text-[10px] uppercase text-text-tertiary tracking-tight w-40">
                          Attribute
                        </th>
                        <th className="text-left px-6 py-3 font-mono text-[10px] uppercase text-text-tertiary tracking-tight">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {specRows.map((row) => (
                        <tr key={row.label} className="border-b border-border last:border-b-0">
                          <td className="px-6 py-4 font-medium text-text-primary align-top whitespace-nowrap">
                            {row.label}
                          </td>
                          <td className="px-6 py-4">
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
                                      className="flex items-start gap-2 text-text-secondary"
                                    >
                                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-muted shrink-0" />
                                      {isTypes ? (
                                        <Link
                                          href={`/products/${category.slug}/${productSlug}`}
                                          className="text-text-primary hover:text-primary font-medium hover:underline"
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
                              <span className="text-text-secondary">
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
                  <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-3">
                    Use Cases
                  </span>
                  <h2 className="text-2xl mb-5">
                    <strong>Applications</strong>
                  </h2>

                  <div className="grid gap-px bg-border sm:grid-cols-2 rounded-xl overflow-hidden border border-border">
                    {category.applications.map((app) => (
                      <div
                        key={app}
                        className="flex items-center gap-3 bg-white p-4 hover:bg-bg-subtle transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-muted" aria-hidden="true" />
                        <span className="text-sm font-medium text-text-primary">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-6">
              {/* Required Docs */}
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
                  <h3 className="text-[15px] font-medium text-text-primary">
                    Required Documents
                  </h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Every shipment of {category.name.toLowerCase()} includes:
                </p>
                <ul className="space-y-3">
                  {category.requiredDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      <span className="text-sm text-text-secondary leading-snug">
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standards */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-[15px] font-medium text-text-primary mb-4">
                  Applicable Standards
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.standards.map((std) => (
                    <span
                      key={std}
                      className="font-mono text-[9px] uppercase bg-bg-subtle border border-border rounded px-2 py-1 text-text-tertiary tracking-tight"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-[15px] font-medium text-text-primary mb-4">
                  Available Materials
                </h3>
                <ul className="space-y-2">
                  {category.materials.map((mat) => (
                    <li
                      key={mat}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-muted" />
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-6">
            Request a quote for <strong>{category.name}</strong>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            Tell us your specifications, quantities, and delivery timeline.
            We&apos;ll respond within one business day with a competitive
            landed-cost quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="btn-primary px-8 py-3.5 text-base"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="btn-secondary px-8 py-3.5 text-base"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
