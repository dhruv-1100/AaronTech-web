import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { PageHero, CtaBand } from "@/components/ui/Page";
import { cn } from "@/lib/utils";
import { industries } from "@/lib/data/industries";
import { productCategories } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Industries We Supply — MRO, OEM, Aerospace, Energy & Automotive",
  description:
    "Aaron Technologies supplies precision-engineered industrial components to MRO distributors, OEMs, automotive, aerospace, and energy sectors.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Supply | Aaron Technologies",
    description:
      "Precision-engineered industrial components for MRO, OEM, aerospace, energy, and automotive sectors.",
    url: "/industries",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Supply | Aaron Technologies",
  },
};

/**
 * Tier framing. Qualification effort rises sharply with tier, so the page is
 * organised by how long it takes to become an approved vendor rather than by
 * sector — that is the number a buyer is actually weighing.
 */
const TIERS = [
  {
    tier: 1 as const,
    label: "Tier 01",
    title: "Fast sourcing & distribution",
    lede: "Distributors, machine shops and supply houses working to standard specifications with rapid procurement cycles.",
    timeframe: "1–2 weeks qualification",
    background: "bg-paper",
    divider: "border-b border-rule-strong",
  },
  {
    tier: 2 as const,
    label: "Tier 02",
    title: "Engineering & mid-market OEMs",
    lede: "Equipment manufacturers, custom engineering shops and Tier 2 automotive suppliers. Requires first-article inspection and dimensional reporting.",
    timeframe: "3–6 weeks qualification",
    background: "bg-paper-2",
    divider: "border-b border-rule-strong",
  },
  {
    tier: 3 as const,
    label: "Tier 03",
    title: "Critical & high-value sectors",
    lede: "Aerospace, defense and oil & gas with strict material traceability, AS9100/API certification requirements and long qualification runs.",
    timeframe: "3–6 months qualification",
    background: "bg-paper",
    divider: "border-b border-ink",
  },
];

const categoryName = (slug: string) =>
  productCategories.find((c) => c.slug === slug)?.name ?? slug;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Market focus"
        title="Industries we serve."
        lede="From volume MRO supply houses to mission-critical aerospace OEMs, we supply components matched to your cost, quality and documentation requirements — and we are honest about how long qualification takes in each tier."
      />

      {TIERS.map((tier) => {
        const members = industries.filter((i) => i.tier === tier.tier);

        return (
          <section
            key={tier.tier}
            className={cn(tier.background, tier.divider, "py-20 md:py-[100px]")}
          >
            <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-[88px]">
              <div className="lg:sticky lg:top-[132px]">
                <span className="bg-signal px-2.5 py-[5px] font-mono text-[11px] uppercase tracking-[0.15em] text-ink">
                  {tier.label}
                </span>
                <h2 className="mt-6 mb-[18px] text-[clamp(1.875rem,3.4vw,2.625rem)] text-ink">
                  {tier.title}
                </h2>
                <p className="m-0 mb-[26px] text-[15px] leading-[1.65] text-body">
                  {tier.lede}
                </p>
                <div className="border-t border-rule-strong pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    Target timeframe
                  </div>
                  <div className="mt-[7px] font-mono text-[15px] text-ink">
                    {tier.timeframe}
                  </div>
                </div>
              </div>

              <Reveal className="border-t-2 border-ink">
                {members.map((industry, i) => (
                  <div
                    key={industry.slug}
                    id={industry.slug}
                    className={cn(
                      "scroll-mt-32 py-[34px]",
                      i === members.length - 1
                        ? "border-b-2 border-ink"
                        : "border-b border-rule-strong"
                    )}
                  >
                    <div className="grid items-start gap-x-11 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]">
                      <h3 className="m-0 text-[22px] text-ink">
                        {industry.name}
                      </h3>
                      <div>
                        <p className="m-0 mb-5 text-[15px] leading-[1.65] text-body">
                          {industry.description}
                        </p>

                        <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          Related lines
                        </div>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {industry.relatedCategories.map((slug) => (
                            <Link
                              key={slug}
                              href={`/products/${slug}`}
                              className="border border-rule-strong px-2.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-signal hover:bg-signal"
                            >
                              {categoryName(slug)}
                            </Link>
                          ))}
                        </div>

                        <div className="text-[13px] leading-[1.6] text-soft">
                          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            Typical buyers
                          </span>
                          {industry.examples.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Custom component requirements?"
        body="We supply buyers across dozens of sub-sectors with custom forgings, assemblies and specialty fasteners. Tell us the sector and the spec."
        primary={{ label: "Contact sourcing →", href: "/contact" }}
        secondary={{ label: "Request a quote", href: "/quote" }}
      />
    </>
  );
}
