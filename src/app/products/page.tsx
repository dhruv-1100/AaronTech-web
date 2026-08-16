import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Page";
import { productCategories } from "@/lib/data/products";
import { catalogIndex } from "@/lib/data/catalog-index";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industrial Components Catalog | Fasteners, Forgings, Castings & More",
  description:
    "Browse precision-engineered industrial components — fasteners, forgings, castings, bearings, valves, and more — sourced from vetted Indian manufacturers.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Industrial Components Catalog | Fasteners, Forgings, Castings & More",
    description:
      "Browse precision-engineered industrial components sourced from vetted Indian manufacturers.",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Components Catalog | Aaron Technologies",
  },
};

const DOCUMENTS = [
  {
    title: "Mill test certificates",
    body: "EN 10204 3.1 certs with chemical composition, mechanical properties and heat treatment per the governing standard.",
  },
  {
    title: "First-article & CMM reports",
    body: "Dimensional verification against your drawing before the batch runs, with CMM output on precision work.",
  },
  {
    title: "Certificates of conformance",
    body: "Signed CoCs tying the lot to the specification, plus heat and lot codes for traceability.",
  },
  {
    title: "NDT & PMI reports",
    body: "Radiographic or ultrasonic testing and positive material identification on critical forgings and valves.",
  },
  {
    title: "Pressure & load test reports",
    body: "API 598 valve testing, hydraulic pressure tests and spring load/deflection verification.",
  },
  {
    title: "Compliance declarations",
    body: "RoHS and REACH declarations, UL listings and CE marking documentation where the market requires them.",
  },
];

const ROW_GRID =
  "grid-cols-[36px_minmax(0,1fr)_28px] gap-x-5 lg:grid-cols-[44px_minmax(0,1.25fr)_minmax(0,1.5fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_30px] lg:gap-[26px]";

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product catalog / 12 lines"
        title="Precision sourcing lines."
        lede="Twelve component families, each quoted and inspected against the governing specification. Custom parts built to your drawings run through the same intake."
        stats={[
          { value: "12", label: "Product categories" },
          { value: "50+", label: "Standards covered" },
          { value: "100%", label: "Lot traceability" },
          { value: "30+", label: "Vetted facilities" },
        ]}
      />

      {/* Catalog index */}
      <section className="border-b border-ink bg-paper py-20 md:py-[104px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="Index"
              title="Every line we quote"
              lede="Standards listed are what we quote and inspect against. Open a line for size ranges, materials, finishes and required documentation."
            />
          </Reveal>

          <Reveal>
            <div className="border-t-2 border-ink">
              {productCategories.map((category, i) => {
                const entry = catalogIndex[category.slug];
                return (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className={cn(
                      "catalog-row",
                      ROW_GRID,
                      "py-[26px]",
                      i === productCategories.length - 1
                        ? "border-b-2 border-ink"
                        : "border-b border-rule"
                    )}
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[19px] font-bold tracking-[-0.02em] text-ink">
                      {category.name}
                    </span>
                    <span className="col-start-2 text-sm leading-[1.55] text-body lg:col-start-auto">
                      {entry?.description ?? category.shortDescription}
                    </span>
                    <span className="col-start-2 font-mono text-xs leading-[1.65] text-muted lg:col-start-auto">
                      {entry?.standards}
                    </span>
                    <span className="col-start-2 text-[13px] leading-[1.6] text-soft lg:col-start-auto">
                      {entry?.materials}
                    </span>
                    <span
                      aria-hidden="true"
                      className="row-arrow col-start-3 row-start-1 justify-self-end text-sm text-ink lg:col-start-auto lg:row-start-auto"
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

      {/* Documentation */}
      <section className="bg-ink py-20 md:py-[104px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              tone="ink"
              eyebrow="Documentation"
              title="What ships with the parts"
              lede="Paperwork is part of the deliverable, not an afterthought. Every shipment carries the documents your quality team needs to release the lot."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-px border border-ink-3 bg-ink-3 sm:grid-cols-2 lg:grid-cols-3">
              {DOCUMENTS.map((doc) => (
                <div key={doc.title} className="bg-ink px-[30px] py-[34px]">
                  <h3 className="m-0 mb-3 text-[19px] text-white">
                    {doc.title}
                  </h3>
                  <p className="m-0 text-sm leading-[1.65] text-dim-2">
                    {doc.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="No drawing match in the index?"
        body="Most of what we ship is custom, built to customer-supplied CAD and tolerance specs. Send the package and we will confirm manufacturability before quoting."
        primary={{ label: "Request a custom quote →", href: "/quote" }}
        secondary={{ label: "Talk to sourcing", href: "/contact" }}
      />
    </>
  );
}
