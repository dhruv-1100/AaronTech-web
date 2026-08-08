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

const iconMap: Record<string, React.ElementType> = {
  Warehouse, Factory, Cog, Settings, Building2, Car, Plane, Fuel,
};

const tierVisuals: Record<
  1 | 2 | 3,
  {
    title: string;
    description: string;
    label: string;
    timeframe: string;
  }
> = {
  1: {
    title: "Fast Sourcing & Distribution",
    description:
      "Distributors, machine shops, and supply houses requiring standard specifications and rapid procurement cycles.",
    label: "Tier 01",
    timeframe: "1-2 weeks qualification",
  },
  2: {
    title: "Engineering & Mid-Market OEMs",
    description:
      "Equipment manufacturers, custom engineering shops, and Tier 2 automotive suppliers. Requires first-article inspections and dimensional reporting.",
    label: "Tier 02",
    timeframe: "3-6 weeks qualification",
  },
  3: {
    title: "Critical & High-Value Sectors",
    description:
      "Aerospace, defense, and oil & gas sectors with strict material traceability, AS9100/API certification requirements, and long qualification runs.",
    label: "Tier 03",
    timeframe: "3-6 months qualification",
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Market Focus
          </span>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-5 max-w-3xl">
            Industries We <strong>Serve</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            From volume MRO supply houses to mission-critical aerospace OEMs, we
            deliver precision-engineered industrial components matching your exact
            cost, quality, and documentation specs.
          </p>
        </div>
      </section>

      {/* Tiered Industry Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6 space-y-24">
          {([1, 2, 3] as const).map((tier) => {
            const visual = tierVisuals[tier];
            const tierIndustries = industries.filter((i) => i.tier === tier);

            return (
              <div
                key={tier}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Left: Sticky label */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
                  <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight block">
                    {visual.label}
                  </span>
                  <h2 className="text-2xl leading-tight">
                    {visual.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {visual.description}
                  </p>
                  <div className="pt-1">
                    <span className="font-mono text-[10px] uppercase text-text-muted tracking-tight block mb-0.5">
                      Target Timeframe
                    </span>
                    <span className="text-sm text-text-secondary">
                      {visual.timeframe}
                    </span>
                  </div>
                </div>

                {/* Right: Industry rows */}
                <div className="lg:col-span-8 rounded-xl border border-border overflow-hidden">
                  {tierIndustries.map((ind, i) => {
                    const IndustryIcon = iconMap[ind.icon] || Warehouse;
                    return (
                      <div
                        key={ind.id}
                        className={cn(
                          "p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-start hover:bg-bg-subtle transition-colors",
                          i < tierIndustries.length - 1 && "border-b border-border"
                        )}
                      >
                        {/* Icon & Title */}
                        <div className="md:w-1/3 flex gap-3 items-start">
                          <div className="w-9 h-9 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0">
                            <IndustryIcon className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <h3 className="text-[15px] font-medium text-text-primary leading-snug">
                            {ind.name}
                          </h3>
                        </div>

                        {/* Description & Tags */}
                        <div className="md:w-2/3 space-y-3">
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {ind.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight mr-1">
                              Related:
                            </span>
                            {ind.relatedCategories.map((slug) => (
                              <Link
                                key={slug}
                                href={`/products/${slug}`}
                                className="font-mono text-[9px] uppercase text-text-tertiary bg-bg-subtle hover:bg-primary hover:text-white px-2 py-1 rounded tracking-tight transition-colors"
                              >
                                {slug
                                  .split("-")
                                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                  .join(" ")}
                              </Link>
                            ))}
                          </div>

                          <div className="text-xs text-text-tertiary">
                            <span className="font-medium text-text-secondary">
                              Example Customers:{" "}
                            </span>
                            {ind.examples.join(", ")}
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
      <section className="border-t border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-6">
            Custom component <strong>requirements?</strong>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            We partner with buyers across dozens of sub-sectors to supply custom
            forgings, assemblies, and specialty fasteners.
          </p>
          <Link
            href="/contact"
            className="btn-primary px-8 py-3.5 text-base"
          >
            Contact Sourcing Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
