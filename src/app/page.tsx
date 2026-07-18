"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Package,
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
  Check,
  X,
  DollarSign,
  FileCheck,
  Headphones,
  Globe,
  Factory,
  ShieldCheck,
  TrendingDown,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import { trustMetrics } from "@/lib/data/site";
import { industries } from "@/lib/data/industries";
import LandedCostCalculator from "@/components/LandedCostCalculator";

// Icon map for dynamic rendering
const iconMap: Record<string, React.ElementType> = {
  Wrench, Flame, FlaskConical, CircleDot, Gauge, Target,
  ToggleRight, Droplets, Layers, Zap, Spline, Circle,
  Package, Factory, ShieldCheck, TrendingDown,
};

// Comparison data
const comparisonRows = [
  {
    metric: "Communications & Invoices",
    fragmented: "Dozens of emails and separate foreign invoices.",
    consolidated: "Single US point-of-contact & one monthly invoice.",
  },
  {
    metric: "Quality & Tolerance Control",
    fragmented: "High risk; errors caught only after delivery in the US.",
    consolidated: "On-site pre-shipment inspections with dimensional assays.",
  },
  {
    metric: "Freight & Shipping Cost",
    fragmented: "High LCL ocean rates and separate port handling fees.",
    consolidated: "Consolidated container shipping & bulk freight pricing.",
  },
  {
    metric: "Material Traceability",
    fragmented: "Inconsistent; mill test certificates (MTC) often missing.",
    consolidated: "100% traceability; EN 10204 3.1 certs on every shipment.",
  },
  {
    metric: "Inventory Buffering",
    fragmented: "None; supply chain halts if shipping is delayed.",
    consolidated: "US safety stocking programs for JIT delivery.",
  },
];

// Advantages data
const advantages = [
  {
    number: "01",
    title: "Cost Reduction",
    description: "25%+ landed cost savings through consolidated sourcing, bulk freight, and direct factory pricing — without compromising on quality.",
    icon: DollarSign,
  },
  {
    number: "02",
    title: "Quality Assurance",
    description: "Pre-shipment inspections, dimensional verification, and full material traceability on every order. EN 10204 3.1 mill certs included.",
    icon: FileCheck,
  },
  {
    number: "03",
    title: "US-Based Support",
    description: "A single point-of-contact in the US handles procurement, quality control, logistics, and documentation — one invoice, no language barriers.",
    icon: Headphones,
  },
  {
    number: "04",
    title: "Vetted Network",
    description: "30+ ISO 9001-certified Indian manufacturers, audited and validated by our operations team. Consistent supply across 12 product categories.",
    icon: Globe,
  },
];

// Process steps
const processSteps = [
  {
    number: "01",
    title: "Submit RFQ",
    description: "Share your specifications, drawings, and quantities. We respond within 24–48 hours with competitive pricing.",
  },
  {
    number: "02",
    title: "Source & Verify",
    description: "We match your requirements to the best-fit manufacturer in our network and validate specs, certifications, and capacity.",
  },
  {
    number: "03",
    title: "Inspect & Ship",
    description: "On-site pre-shipment inspections verify dimensions and material. We handle export, freight, and customs documentation.",
  },
  {
    number: "04",
    title: "Deliver & Support",
    description: "Components arrive at your facility with full traceability. Ongoing support for reorders, inventory programs, and engineering changes.",
  },
];

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const featuredCategories = productCategories.slice(0, 9);
  const featuredIndustries = industries.filter((i) => i.tier <= 2).slice(0, 6);

  return (
    <>
      {/* ================================================================
          HERO SECTION — Clean white, editorial
          ================================================================ */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="badge mb-8 mx-auto"
            >
              US-Based Industrial Sourcing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] mb-6"
            >
              Industrial Components.{" "}
              <strong>Sourced Smarter.</strong>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Precision-engineered fasteners, forgings, castings, and machined
              parts sourced from vetted Indian manufacturers — with full
              material traceability and competitive landed costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/quote"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                Browse Products
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRUST METRICS — Ruled horizontal grid
          ================================================================ */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {trustMetrics.map((metric, i) => {
              const Icon = iconMap[metric.icon] || Package;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className={cn(
                    "flex flex-col items-center text-center py-10 px-6",
                    i < 3 && "md:border-r md:border-border",
                    i < 2 && "border-r border-border md:border-r",
                    i >= 2 && "border-t md:border-t-0 border-border"
                  )}
                >
                  <div className="text-3xl md:text-4xl text-text-primary mb-1.5 tracking-tight">
                    {metric.value}
                    <span className="text-primary-muted">{metric.suffix}</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight">
                    {metric.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRODUCT CATALOG — Ruled grid cards
          ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection>
            <div className="mb-16">
              <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
                Product Lines
              </span>
              <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-4">
                Precision Sourced <strong>Components</strong>
              </h2>
              <p className="text-text-secondary max-w-xl text-lg">
                Every component ships with material test reports and standards verification across 12 industrial categories.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Package;
              return (
                <AnimatedSection key={cat.id} delay={i * 0.04}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="flex items-start gap-4 p-6 rounded-xl hover-glass-card h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0 icon-box-hover transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium text-text-primary mb-1">
                        {cat.name}
                      </div>
                      <div className="text-sm text-text-tertiary leading-relaxed line-clamp-2">
                        {cat.shortDescription}
                      </div>
                      <div className="font-mono text-[10px] uppercase text-text-muted mt-2.5 tracking-tight">
                        {cat.standards?.[0] || "Industry Standards"}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted shrink-0 mt-1 transition-colors" aria-hidden="true" />
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-8 text-center">
            <Link
              href="/products"
              className="btn-secondary text-sm"
            >
              View All 12 Categories
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          WHY AARON TECHNOLOGIES — Editorial two-column
          ================================================================ */}
      <section className="border-t border-b border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — Heading */}
            <AnimatedSection>
              <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
                Why Consolidate With Us
              </span>
              <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-6">
                One partner for your entire <strong>India sourcing</strong> supply chain
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Instead of managing dozens of overseas suppliers, inspectors, freight forwarders,
                and customs brokers — work with a single US-based team that handles everything
                from RFQ to delivery.
              </p>
              <Link href="/about" className="btn-secondary text-sm">
                Learn More About Us
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </AnimatedSection>

            {/* Right — Advantage cards */}
            <div className="flex flex-col">
              {advantages.map((adv, i) => {
                const Icon = adv.icon;
                return (
                  <AnimatedSection
                    key={adv.number}
                    delay={i * 0.08}
                    className={cn(
                      "py-6",
                      i < advantages.length - 1 && "border-b border-border"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-mono text-[10px] text-text-muted uppercase tracking-tight">
                            {adv.number}
                          </span>
                          <span className="text-[15px] font-medium text-text-primary">
                            {adv.title}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {adv.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOURCING COMPARISON TABLE — Clean ruled
          ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
                Comparison
              </span>
              <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-4">
                Fragmented sourcing vs. <strong>consolidated</strong>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto text-lg">
                See how a single-source partnership eliminates complexity and reduces total cost of procurement.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-xl border border-border-strong overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-bg-subtle">
                <div className="p-4 font-mono text-[11px] uppercase text-text-tertiary tracking-tight border-r border-border">
                  Metric
                </div>
                <div className="p-4 font-mono text-[11px] uppercase text-text-tertiary tracking-tight border-r border-border">
                  Fragmented Sourcing
                </div>
                <div className="p-4 font-mono text-[11px] uppercase text-text-primary tracking-tight">
                  Aaron Technologies
                </div>
              </div>

              {/* Table Rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.metric}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] border-t border-border"
                >
                  <div className="p-4 md:border-r border-border text-sm font-medium text-text-primary">
                    {row.metric}
                  </div>
                  <div className="px-4 pb-4 md:py-4 md:border-r border-border">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-error shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-text-tertiary">{row.fragmented}</span>
                    </div>
                  </div>
                  <div className="px-4 pb-4 md:py-4">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-text-secondary">{row.consolidated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS — Horizontal ruled stepper
          ================================================================ */}
      <section className="border-t border-b border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection className="mb-16">
            <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
              Process
            </span>
            <h2 className="text-3xl md:text-[2.75rem] leading-tight">
              How it <strong>works</strong>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.08}>
                <div className="bg-white p-8 h-full flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight block mb-4">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-medium text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INDUSTRIES SERVED — Clean grid
          ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
              <div>
                <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
                  Industries
                </span>
                <h2 className="text-3xl md:text-[2.75rem] leading-tight">
                  Sectors we <strong>supply</strong>
                </h2>
              </div>
              <Link href="/industries" className="btn-secondary text-sm shrink-0">
                View All Industries
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIndustries.map((ind, i) => (
              <AnimatedSection key={ind.id} delay={i * 0.05}>
                <div className="p-6 rounded-xl hover-glass-card h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0 icon-box-hover">
                      <Factory className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-[15px] font-medium text-text-primary">{ind.name}</h3>
                  </div>
                  <p className="text-sm text-text-tertiary leading-relaxed mb-4">
                    {ind.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.relatedCategories.slice(0, 3).map((cat) => (
                      <span key={cat} className="font-mono text-[9px] uppercase text-text-muted bg-bg-subtle px-2 py-1 rounded tracking-tight badge transition-colors">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          LANDED COST CALCULATOR
          ================================================================ */}
      <section id="calculator" className="border-t border-b border-border py-24 md:py-32 bg-bg-subtle">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection className="mb-12">
            <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
              Tool
            </span>
            <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-4">
              Landed Cost <strong>Calculator</strong>
            </h2>
            <p className="text-text-secondary max-w-xl text-lg">
              Estimate your total import cost including freight, duty, insurance, and handling fees.
            </p>
          </AnimatedSection>

          <LandedCostCalculator />
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-6">
              Ready to streamline your <strong>supply chain?</strong>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              Get a competitive quote on industrial components with transparent
              landed-cost pricing. No obligation, fast turnaround.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-8 py-3.5 text-base"
              >
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
