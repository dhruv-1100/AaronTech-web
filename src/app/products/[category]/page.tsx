import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import {
  Breadcrumbs,
  Eyebrow,
  RuleTab,
  SectionHead,
  StatStrip,
  CtaBand,
} from "@/components/ui/Page";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import { detailedProducts } from "@/lib/data/products-detail";
import { catalogIndex } from "@/lib/data/catalog-index";

export function generateStaticParams() {
  return productCategories.map((cat) => ({ category: cat.slug }));
}

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
    alternates: { canonical: `/products/${categorySlug}` },
    openGraph: {
      title: `${category.name} — Industrial Supplier | Aaron Technologies`,
      description: `${category.shortDescription}. Sourced from vetted Indian manufacturers.`,
      url: `/products/${categorySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Aaron Technologies`,
    },
  };
}

/**
 * Editorial selection guides. Only lines where picking the wrong
 * specification is a real and common procurement error get one.
 */
const SELECTION_GUIDES: Record<
  string,
  {
    eyebrow: string;
    title: string;
    lede: string;
    columns: [string, string];
    rows: { attribute: string; left: string; right: string }[];
  }
> = {
  fasteners: {
    eyebrow: "Selection guide",
    title: "A193 or A320?",
    lede: "The two specifications overlap in chemistry but not in intent. Pick on service temperature and the acceptance testing your application demands.",
    columns: ["ASTM A193 (B7 / B8M)", "ASTM A320 (L7 / L43)"],
    rows: [
      {
        attribute: "Service intent",
        left: "High-temperature and high-pressure bolting",
        right: "Low-temperature service bolting",
      },
      {
        attribute: "Typical range",
        left: "Ambient up to 1,000°F depending on grade",
        right: "Down to −150°F, grade dependent",
      },
      {
        attribute: "Impact testing",
        left: "Not generally required",
        right: "Charpy V-notch required per grade",
      },
      {
        attribute: "Common grades",
        left: "B7 (alloy), B8/B8M (stainless 304/316)",
        right: "L7, L7M, L43",
      },
      {
        attribute: "Where we see it",
        left: "Refinery flanges, pressure vessels, steam service",
        right: "Cryogenic piping, LNG, cold-climate plant",
      },
    ],
  },
};

function SpecRow({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-baseline gap-x-10 gap-y-3 py-[22px] sm:grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)]",
        last ? "border-b-2 border-ink" : "border-b border-rule"
      )}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <div className="text-[15px] text-ink">{children}</div>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="border border-rule-strong px-[11px] py-1.5 font-mono text-xs text-ink"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

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

  const index = productCategories.findIndex((c) => c.slug === categorySlug);
  const guide = SELECTION_GUIDES[categorySlug];
  const skus = Object.keys(detailedProducts[categorySlug] ?? {});
  const heroImage = catalogIndex[categorySlug]?.image ?? category.heroImage;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Products",
                item: "https://www.aarontechno.com/products",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: category.name,
                item: `https://www.aarontechno.com/products/${categorySlug}`,
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="border-b border-ink">
        <div className="shell pt-6 pb-12 md:pt-[34px] md:pb-[76px]">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name },
            ]}
          />
          <div className="animate-rise">
            <RuleTab
              label={`Product line ${String(index + 1).padStart(2, "0")} / ${productCategories.length}`}
            />
          </div>
          <h1 className="animate-rise mb-7 max-w-[17em] text-ink [animation-delay:0.08s]">
            {category.name}.
          </h1>
          <p className="animate-rise m-0 max-w-[42em] text-[19px] leading-[1.6] text-body [animation-delay:0.16s]">
            {category.description}
          </p>
          <StatStrip
            stats={[
              { value: String(category.types.length), label: "Component types" },
              {
                value: String(category.standards.length),
                label: "Governing standards",
              },
              {
                value: String(category.materials.length),
                label: "Material grades",
              },
              {
                value: String(
                  category.finishes?.length ?? category.requiredDocs.length
                ),
                label: category.finishes ? "Finish options" : "Documents",
              },
            ]}
          />
        </div>
      </section>

      {/* Specification */}
      <section className="border-b border-ink bg-paper py-14 md:py-[100px]">
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Specification</Eyebrow>
            <h2 className="mt-[18px] mb-10 text-[clamp(2rem,3.6vw,2.875rem)] text-ink">
              What we quote against
            </h2>
            <div className="border-t-2 border-ink">
              <SpecRow label="Types">
                <Chips items={category.types} />
              </SpecRow>
              <SpecRow label="Standards">
                <Chips items={category.standards} />
              </SpecRow>
              <SpecRow label="Materials">
                {category.materials.join(" · ")}
              </SpecRow>
              {category.finishes && (
                <SpecRow label="Finishes">
                  {category.finishes.join(" · ")}
                </SpecRow>
              )}
              {category.sizes && (
                <SpecRow label="Sizes">{category.sizes}</SpecRow>
              )}
              <SpecRow label="Documentation" last>
                {category.requiredDocs.join(" · ")}
              </SpecRow>
            </div>
          </Reveal>

          <Reveal className="lg:sticky lg:top-[132px]">
            <div className="relative h-[340px] overflow-hidden bg-ink">
              <Image
                src={heroImage}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover brightness-[0.78] grayscale-[0.3]"
              />
              <span className="absolute bottom-6 left-0 bg-signal px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                {category.standards[0]}
              </span>
            </div>
            {category.applications && category.applications.length > 0 && (
              <div className="border-2 border-t-0 border-ink p-7">
                <h3 className="m-0 mb-3.5 text-xl text-ink">Applications</h3>
                <div className="flex flex-col gap-2.5 text-[15px] text-body">
                  {category.applications.map((app, i) => (
                    <span
                      key={app}
                      className={cn(
                        "border-l-[3px] pl-3",
                        i === 0 ? "border-signal" : "border-rule-strong"
                      )}
                    >
                      {app}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/quote?category=${category.slug}`}
                  className="mt-[26px] flex items-center justify-center gap-2.5 bg-ink px-6 py-4 text-[15px] font-bold text-signal transition-colors hover:bg-signal hover:text-ink"
                >
                  Quote this line →
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Sub-lines */}
      {skus.length > 0 && (
        <section className="border-b border-ink bg-paper-2 py-14 md:py-[100px]">
          <div className="shell">
            <Reveal>
              <SectionHead
                eyebrow={`Sub-lines / ${skus.length}`}
                title="Parts in this line"
                lede="Each sub-line carries its own size range, tolerance class, MOQ and lead time. Open one for the full specification sheet."
              />
            </Reveal>
            <Reveal>
              <div className="border-t-2 border-ink">
                {skus.map((slug, i) => {
                  const product = detailedProducts[categorySlug][slug];
                  return (
                    <Link
                      key={slug}
                      href={`/products/${categorySlug}/${slug}`}
                      className={cn(
                        "catalog-row grid-cols-[36px_minmax(0,1fr)_28px] gap-x-5 py-6 md:grid-cols-[44px_minmax(0,1.2fr)_minmax(0,2.4fr)_30px] md:gap-7",
                        i === skus.length - 1
                          ? "border-b-2 border-ink"
                          : "border-b border-rule-strong"
                      )}
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[19px] font-bold tracking-[-0.02em] text-ink capitalize">
                        {slug.replace(/-/g, " ")}
                      </span>
                      <span className="col-start-2 line-clamp-2 text-sm leading-[1.55] text-body md:col-start-auto">
                        {product?.description}
                      </span>
                      <span
                        aria-hidden="true"
                        className="row-arrow col-start-3 row-start-1 justify-self-end text-sm text-ink md:col-start-auto md:row-start-auto"
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Selection guide */}
      {guide && (
        <section className="bg-ink py-14 md:py-[100px]">
          <div className="shell">
            <Reveal>
              <SectionHead
                tone="ink"
                eyebrow={guide.eyebrow}
                title={guide.title}
                lede={guide.lede}
              />
            </Reveal>
            <Reveal>
              <div className="border border-ink-3">
                <div className="grid grid-cols-2 border-b border-ink-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.5fr)]">
                  <div className="hidden px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dim-2 md:block">
                    Attribute
                  </div>
                  <div className="bg-signal px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                    {guide.columns[0]}
                  </div>
                  <div className="border-l border-ink-3 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dim-2">
                    {guide.columns[1]}
                  </div>
                </div>
                {guide.rows.map((row, i) => (
                  <div
                    key={row.attribute}
                    className={cn(
                      "grid grid-cols-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.5fr)]",
                      i < guide.rows.length - 1 && "border-b border-ink-2"
                    )}
                  >
                    <div className="col-span-2 px-6 pt-5 pb-2 text-[15px] font-bold text-white md:col-span-1 md:py-5">
                      {row.attribute}
                    </div>
                    <div className="bg-signal-wash px-6 pb-5 pt-4 text-sm text-ink md:py-5">
                      {row.left}
                    </div>
                    <div className="border-l border-ink-3 px-6 pb-5 pt-4 text-sm text-dim-2 md:py-5">
                      {row.right}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand
        title={`Send the ${category.name.toLowerCase()} schedule.`}
        body="Grades, sizes, finishes and annual volumes — we return an itemized landed cost in 24–48 hours."
        primary={{
          label: "Request a quote →",
          href: `/quote?category=${category.slug}`,
        }}
        secondary={{ label: "Browse all lines", href: "/products" }}
      />
    </>
  );
}
