import type { Metadata } from "next";
import Link from "next/link";
import {
  Warehouse,
  Factory,
  Cog,
  Settings,
  Building2,
  Car,
  Plane,
  Fuel,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { industries } from "@/lib/data/industries";
import type { Industry } from "@/types";

export const metadata: Metadata = {
  title: "Industries We Supply — MRO, OEM, Aerospace, Energy & Automotive",
  description:
    "Aaron Technologies supplies precision-engineered industrial components to MRO distributors, OEMs, automotive, aerospace, and energy sectors.",
};

const iconMap: Record<string, React.ElementType> = {
  Warehouse,
  Factory,
  Cog,
  Settings,
  Building2,
  Car,
  Plane,
  Fuel,
};

const tierVisuals: Record<
  1 | 2 | 3,
  {
    title: string;
    description: string;
    badgeText: string;
    badgeBg: string;
    icon: React.ElementType;
    timeframe: string;
  }
> = {
  1: {
    title: "Tier 1: Fast Sourcing & Distribution",
    description:
      "Distributors, machine shops, and supply houses requiring standard specifications and rapid procurement cycles. Standard specification requirements with fast procurement cycles and competitive pricing focus.",
    badgeText: "text-emerald-700 bg-emerald-50 border-emerald-200",
    badgeBg: "bg-emerald-500",
    icon: Zap,
    timeframe: "1-2 weeks qualification",
  },
  2: {
    title: "Tier 2: Engineering & Mid-Market OEMs",
    description:
      "Equipment manufacturers, custom engineering shops, and Tier 2 automotive suppliers. Requires first-article inspections and dimensional reporting.",
    badgeText: "text-amber-700 bg-amber-50 border-amber-200",
    badgeBg: "bg-amber-500",
    icon: TrendingUp,
    timeframe: "3-6 weeks qualification",
  },
  3: {
    title: "Tier 3: Critical & High-Value Sectors",
    description:
      "Aerospace, defense, and oil & gas sectors with strict material traceability, AS9100/API certification requirements, and long qualification runs.",
    badgeText: "text-copper-700 bg-copper-50 border-copper-200",
    badgeBg: "bg-copper-500",
    icon: ShieldCheck,
    timeframe: "3-6 months qualification",
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-copper-400">
              Market Focus
            </p>
            <h1 className="max-w-3xl text-4xl sm:text-5xl font-heading font-bold leading-tight text-white mb-4">
              Industries We <span className="text-gradient">Serve</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-2xl">
              From volume MRO supply houses to mission-critical aerospace OEMs, we deliver precision-engineered industrial components matching your exact cost, quality, and documentation specs.
            </p>
          </div>
        </div>
      </section>

      {/* Main content - non-card split layout */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
          {([1, 2, 3] as const).map((tier) => {
            const visual = tierVisuals[tier];
            const tierIndustries = industries.filter((i) => i.tier === tier);
            const TierIcon = visual.icon;

            return (
              <div
                key={tier}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left side: Sticky info panel (Minimal context card, NOT a generic grid card) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase border tracking-wider",
                    visual.badgeText
                  )}>
                    <TierIcon className="w-3.5 h-3.5" />
                    Tier {tier} Sourcing
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-navy-900 leading-tight">
                    {visual.title}
                  </h2>
                  <p className="text-sm text-steel-600 leading-relaxed">
                    {visual.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-navy-900 uppercase tracking-wider block">
                      Target Timeframe
                    </span>
                    <span className="text-sm text-steel-600 mt-1 block">
                      {visual.timeframe}
                    </span>
                  </div>
                </div>

                {/* Right side: Clean row list (No cards!) */}
                <div className="lg:col-span-8 bg-white border border-steel-200/85 rounded-2xl divide-y divide-steel-200 shadow-sm overflow-hidden">
                  {tierIndustries.map((ind) => {
                    const IndustryIcon = iconMap[ind.icon] || Warehouse;
                    return (
                      <div
                        key={ind.id}
                        className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-start transition-colors hover:bg-steel-50/50"
                      >
                        {/* Icon & Title Group */}
                        <div className="md:w-1/3 flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-xl bg-navy-900/5 text-navy-700 flex items-center justify-center shrink-0">
                            <IndustryIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-navy-900 text-base leading-snug">
                              {ind.name}
                            </h3>
                          </div>
                        </div>

                        {/* Description & Metadata (Products / Customers) */}
                        <div className="md:w-2/3 space-y-4">
                          <p className="text-sm text-steel-600 leading-relaxed">
                            {ind.description}
                          </p>

                          {/* Related Products Badges */}
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[10px] font-semibold text-steel-500 uppercase tracking-wider mr-1">
                              Related:
                            </span>
                            {ind.relatedCategories.map((slug) => (
                              <Link
                                key={slug}
                                href={`/products/${slug}`}
                                className="px-2.5 py-0.5 rounded-full bg-steel-100 hover:bg-copper-500/10 hover:text-copper-600 text-xs font-semibold text-steel-700 transition-colors"
                              >
                                {slug
                                  .split("-")
                                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                  .join(" ")}
                              </Link>
                            ))}
                          </div>

                          {/* Target Buyers */}
                          <div className="text-xs text-steel-500 flex flex-wrap gap-1">
                            <span className="font-semibold text-steel-600">
                              Example Customers:
                            </span>
                            <span>{ind.examples.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-steel-300">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-heading font-bold text-navy-900 mb-4">
            Custom Component Requirements?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-steel-600 leading-relaxed">
            We partner with buyers across dozens of sub-sectors to supply custom forgings, assemblies, and specialty fasteners. Reach out to discuss your drawings and volume needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-copper-600 cursor-pointer shadow-md hover:shadow-lg"
          >
            Contact Sourcing Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
