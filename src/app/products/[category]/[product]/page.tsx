import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Package,
} from "lucide-react";
import { productCategories } from "@/lib/data/products";
import { getProductDetails } from "@/lib/data/products-detail";
import ProductSpecsAccordion from "@/components/ProductSpecsAccordion";

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
    alternates: { canonical: `/products/${categorySlug}/${productSlug}` },
    openGraph: {
      title: `${product.name} | Aaron Technologies`,
      description: product.description,
      url: `/products/${categorySlug}/${productSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Aaron Technologies`,
    },
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
      {/* Product + BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              brand: { "@type": "Brand", name: "Aaron Technologies Inc." },
              category: category.name,
              manufacturer: { "@type": "Organization", name: "Aaron Technologies Inc." },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                priceCurrency: "USD",
                seller: { "@type": "Organization", name: "Aaron Technologies Inc." },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Products", item: "https://www.aarontechno.com/products" },
                { "@type": "ListItem", position: 2, name: category.name, item: `https://www.aarontechno.com/products/${categorySlug}` },
                { "@type": "ListItem", position: 3, name: product.name, item: `https://www.aarontechno.com/products/${categorySlug}/${productSlug}` },
              ],
            },
          ]),
        }}
      />
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-text-tertiary mb-8">
            <Link href="/products" className="hover:text-text-primary transition-colors">
              Products
            </Link>
            <span className="text-text-muted">/</span>
            <Link
              href={`/products/${category.slug}`}
              className="hover:text-text-primary transition-colors"
            >
              {category.name}
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight">
                  {category.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-border-strong" />
                <span className="font-mono text-[10px] uppercase text-text-muted tracking-tight">
                  Component Detail
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5">
                {product.name}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                {product.description}
              </p>

              {/* Lead Time & MOQ */}
              <div className="mt-8 flex flex-wrap gap-8 items-center border-t border-border pt-6">
                <div>
                  <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-0.5">
                    Lead Time
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {product.leadTime}
                  </span>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-0.5">
                    MOQ
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {product.moq}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-xl border border-border-strong">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={640}
                  height={320}
                  priority
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main (2/3) */}
            <div className="lg:col-span-2 space-y-14">
              {/* Specs Accordion */}
              <div>
                <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-3">
                  Specifications
                </span>
                <h2 className="text-2xl mb-5">
                  Technical <strong>Specifications</strong>
                </h2>
                <ProductSpecsAccordion product={product} />
              </div>

              {/* Key Features */}
              <div>
                <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-3">
                  Quality
                </span>
                <h2 className="text-2xl mb-5">
                  Quality & <strong>Features</strong>
                </h2>
                <div className="grid gap-px bg-border grid-cols-1 sm:grid-cols-2 rounded-xl overflow-hidden border border-border">
                  {product.keyFeatures.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-start gap-3 bg-white p-4 hover:bg-bg-subtle transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary-muted" aria-hidden="true" />
                      <span className="text-sm text-text-secondary leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-3">
                  Use Cases
                </span>
                <h2 className="text-2xl mb-5">
                  <strong>Applications</strong>
                </h2>
                <div className="grid gap-px bg-border grid-cols-1 sm:grid-cols-2 rounded-xl overflow-hidden border border-border">
                  {product.applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-3 bg-white p-4 hover:bg-bg-subtle transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-muted shrink-0" />
                      <span className="text-sm font-medium text-text-primary">
                        {app}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-6">
              {/* RFQ Card */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-[15px] font-medium text-text-primary mb-3">
                  Sourcing Request (RFQ)
                </h3>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                  Submit your engineering drawings and component requirements for
                  a complete landed-cost quotation.
                </p>

                <div className="space-y-4">
                  <div className="bg-bg-subtle p-3.5 border border-border rounded-lg">
                    <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-0.5">
                      Target Component
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {product.name}
                    </span>
                  </div>

                  <Link
                    href={`/quote?category=${category.slug}&product=${encodeURIComponent(product.name)}`}
                    className="btn-primary w-full justify-center py-3.5"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* QA Card */}
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-success" aria-hidden="true" />
                  <h3 className="text-[15px] font-medium text-text-primary">
                    Quality Assurance
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  All shipments are audited prior to US export. Deliverables include:
                </p>
                <ul className="space-y-2">
                  {product.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-muted mt-1.5 shrink-0" />
                      <span className="text-sm text-text-secondary">
                        {cert}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logistics Card */}
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-text-tertiary" aria-hidden="true" />
                  <h4 className="text-sm font-medium text-text-primary">
                    Supply Security
                  </h4>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We manage logistics, customs filing, sea/air shipping, and local
                  US warehousing if stocking programs are required.
                </p>
              </div>
            </aside>
          </div>

          {/* Related Products */}
          {otherProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-4">
                Related
              </span>
              <h3 className="text-lg font-medium text-text-primary mb-6">
                Other Components in {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {otherProducts.slice(0, 5).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${category.slug}/${p.slug}`}
                    className="p-4 rounded-xl hover-glass-card text-center group flex flex-col justify-center min-h-[96px]"
                  >
                    <span className="text-sm font-medium text-text-primary block truncate">
                      {p.name}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted uppercase tracking-tight mt-1 block">
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
