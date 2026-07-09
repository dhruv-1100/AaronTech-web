"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Factory,
  Package,
  TrendingDown,
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
  CheckCircle2,
  Globe,
  DollarSign,
  FileCheck,
  Headphones,
  FileText,
  Compass,
  Truck,
  Boxes,
  Database,
  ArrowUpRight,
  Check,
  X,
  Activity,
  Terminal,
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  icon,
}: {
  value: string;
  suffix?: string;
  label: string;
  icon: string;
}) {
  const Icon = iconMap[icon] || Package;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-full bg-copper-500/10 text-copper-500 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl md:text-4xl font-heading font-bold text-navy-900">
        {value}
        <span className="text-copper-500">{suffix}</span>
      </div>
      <div className="text-xs text-steel-500 font-bold uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function SupplyChainVisualizer() {
  return (
    <div className="relative border border-navy-800 bg-navy-900 p-8 shadow-2xl rounded-2xl overflow-hidden flex flex-col justify-between h-[360px]">
      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative space-y-6 flex-1 flex flex-col justify-center">
        {/* Step 1 */}
        <div className="flex items-start gap-4 relative">
          <div className="absolute left-5 top-10 bottom-[-20px] w-[2px] bg-gradient-to-b from-copper-500 to-navy-800 pointer-events-none" />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 rounded-xl relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-copper-500/5 rounded-xl pointer-events-none"
            />
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-copper-400 uppercase tracking-widest block mb-0.5">Stage 01</span>
            <h4 className="text-xs font-bold text-white font-heading">ISO 9001 India Factory Hubs</h4>
            <p className="text-[11px] text-steel-300 mt-0.5 leading-relaxed">Direct coordination with vetted forging, casting & fastener hubs.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 relative">
          <div className="absolute left-5 top-10 bottom-[-20px] w-[2px] bg-gradient-to-b from-navy-800 to-copper-500 pointer-events-none" />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 rounded-xl relative z-10 overflow-hidden">
            <motion.div
              animate={{ y: [-18, 18] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-copper-400 shadow-[0_0_8px_#C75B2A]"
            />
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-copper-400 uppercase tracking-widest block mb-0.5">Stage 02</span>
            <h4 className="text-xs font-bold text-white font-heading">100% Compliance Inspection</h4>
            <p className="text-[11px] text-steel-300 mt-0.5 leading-relaxed">Dimensional checks, material chemical testing, and full trace reports.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 relative">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 rounded-xl relative z-10">
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            >
              <Globe className="h-5 w-5" />
            </motion.div>
          </div>
          <div>
            <span className="text-[9px] font-bold font-mono text-copper-400 uppercase tracking-widest block mb-0.5">Stage 03</span>
            <h4 className="text-xs font-bold text-white font-heading">Landed Duty-Paid US Delivery</h4>
            <p className="text-[11px] text-steel-300 mt-0.5 leading-relaxed">Customs clearance, freight consolidation, and delivery directly to your warehouse.</p>
          </div>
        </div>
      </div>

      {/* Live tracking overlay simulator */}
      <div className="mt-4 pt-4 border-t border-navy-800 flex items-center justify-between text-[11px] text-steel-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span>Global shipment status: Active</span>
        </div>
        <span className="font-mono text-copper-400/80">RFQ Pipeline</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
  const featuredCategories = productCategories.slice(0, 8);
  const featuredIndustries = industries.filter((i) => i.tier <= 2).slice(0, 6);

  return (
    <>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative bg-navy-950 overflow-hidden section-dark">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient accents - Animated floating glows */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-600/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column - Copy & CTA */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper-500/10 border border-copper-500/30 text-copper-300 text-sm font-semibold mb-6"
              >
                <ShieldCheck className="w-4 h-4" />
                ISO 9001 Certified Supplier Network
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-[1.1] mb-6"
              >
                Industrial Components. <br />
                <span className="text-gradient">Sourced Smarter.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-steel-400 leading-relaxed mb-10 max-w-2xl"
              >
                Precision-engineered fasteners, forgings, castings, and machined
                parts sourced from ISO-certified Indian manufacturers — delivered
                with full material traceability and competitive landed costs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/quote"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-base cursor-pointer"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-steel-700 text-steel-300 hover:text-white hover:border-steel-500 font-semibold rounded-full hover:bg-white/5 transition-all text-base"
                >
                  Browse Products
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Visualizer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto"
            >
              <SupplyChainVisualizer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRUST METRICS BAR - Rounded Floating Card (Modern SaaS style)
          ================================================================ */}
      <section className="relative z-10 -mt-10 px-6">
        <div className="max-w-7xl mx-auto bg-white border border-steel-200/80 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-steel-200">
            {trustMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-2 md:p-4 first:pt-0 md:first:pt-4 md:pl-8 first:pl-0"
              >
                <StatCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                  icon={metric.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRODUCT CATALOG - Unified Border Grid (No floating cards!)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-steel-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                Product Lines
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4 text-navy-900">
                Precision Sourced Components
              </h2>
              <p className="text-steel-600 max-w-2xl mx-auto text-lg">
                Explore our featured industrial categories. Every component ships with material test reports (MTCs) and standards verification.
              </p>
            </div>
          </AnimatedSection>

          {/* Spacious Grid of Rounded Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Package;
              return (
                <AnimatedSection key={cat.id} delay={i * 0.04} className="h-full">
                  <Link
                    href={`/products/${cat.slug}`}
                    className="group block p-6 bg-white border border-steel-200/80 rounded-2xl hover:border-copper-500/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-copper-500/10 text-copper-500 flex items-center justify-center mb-5 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 transition-colors" />
                      </div>
                      <h3 className="font-heading font-bold text-navy-900 text-lg mb-2 group-hover:text-copper-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-steel-500 leading-relaxed mb-4">
                        {cat.shortDescription}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cat.standards.slice(0, 2).map((std) => (
                          <span
                            key={std}
                            className="text-[9px] px-2.5 py-1 rounded-full bg-steel-100 text-steel-600 font-bold border border-steel-200/40"
                          >
                            {std.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                      <span className="text-copper-500 text-xs font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-steel-300 text-steel-700 hover:text-navy-900 hover:border-steel-400 font-bold rounded-full transition-all bg-white shadow-sm hover:shadow-md"
            >
              View All 12 Product Lines
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          WHY AARON TECHNOLOGIES - Asymmetric Split Columns (No cards!)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white border-y border-steel-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Typography & Sourcing Narrative */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-6 text-navy-900 leading-tight">
                Sourcing Complexity, Simplified.
              </h2>
              <p className="text-steel-600 text-lg leading-relaxed mb-6">
                Direct-from-foundry importing offers massive cost advantages, but managing quality controls, freight logistics, and compliance from 8,000 miles away is full of risk.
              </p>
              <p className="text-steel-600 leading-relaxed mb-8">
                Aaron Technologies bridges the gap. We qualification-vet manufacturers, inspect components on-site in India, manage container logistics, and invoice as a domestic US partner under US jurisdiction.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Learn About Our Sourcing Process
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Premium Editorial Row List - Interactive Hover Ledger */}
            <div className="lg:col-span-7 divide-y divide-steel-200/80">
              {[
                {
                  icon: DollarSign,
                  title: "25%+ Sourcing Cost Savings",
                  desc: "Leverage direct manufacturing rates in India. We compile transparent landed-cost analyses covering FOB, logistics, and customs so you see real unit economics.",
                },
                {
                  icon: ShieldCheck,
                  title: "ISO 9001 Audited Supplier Network",
                  desc: "We work exclusively with ISO-certified manufacturers. Our local Indian engineering staff runs first-article inspections and stage QC audits before any batch leaves the dock.",
                },
                {
                  icon: FileCheck,
                  title: "100% Material Traceability",
                  desc: "MTCs, heat codes, dimensional logs, and certificates of conformance ship with every container. Your quality team gets complete regulatory assurance.",
                },
                {
                  icon: Headphones,
                  title: "US-Based Sourcing Support",
                  desc: "Aaron Technologies Inc. is a registered US corporation. You get USD invoicing, local contracts, domestic liability limits, and direct US-timezone support.",
                },
              ].map((item, i) => {
                const isHovered = activeAdvantage === i;
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setActiveAdvantage(i)}
                    onMouseLeave={() => setActiveAdvantage(null)}
                    className="group font-sans"
                  >
                    <AnimatedSection
                      delay={i * 0.05}
                      className={cn(
                        "flex gap-5 py-6 px-4 -mx-4 items-start transition-all duration-300 border-l-2 cursor-default",
                        isHovered
                          ? "border-l-copper-500 bg-steel-100/50 shadow-sm"
                          : "border-l-transparent bg-transparent"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                        isHovered ? "bg-copper-500 text-white" : "bg-copper-500/10 text-copper-600"
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-heading font-bold text-base mb-1.5 transition-colors duration-300",
                          isHovered ? "text-copper-600" : "text-navy-900"
                        )}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-steel-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </AnimatedSection>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOURCING CONSOLIDATION CENTER MATRIX (Precoro Style comparison)
          ================================================================ */}
      <section className="relative bg-navy-950 py-20 md:py-28 border-y border-steel-800/40 section-dark overflow-hidden">
        {/* Blueprint mesh background */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mb-12">
              <span className="text-copper-400 font-medium text-sm uppercase tracking-wider">
                Value Assessment
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4 text-white">
                Why Consolidate with Aaron Technologies?
              </h2>
              <p className="text-steel-400 text-lg leading-relaxed">
                Compare the operational overhead of managing multiple isolated international foundries against routing your pipeline through Aaron Technologies.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto rounded-2xl border border-steel-800/80 bg-navy-900 shadow-2xl overflow-hidden">
              <table className="min-w-full divide-y divide-steel-800">
                <thead className="bg-navy-950">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-steel-500 font-heading">
                      Operational Metric
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#C75B2A] font-heading">
                      Fragmented Sourcing (Direct)
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-success font-heading">
                      Aaron Consolidated Pipeline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-850 bg-navy-900">
                  {comparisonRows.map((row) => (
                    <tr key={row.metric} className="hover:bg-steel-800/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-white font-heading">
                        {row.metric}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-steel-400">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 mt-0.5 text-error shrink-0" aria-hidden="true" />
                          <span>{row.fragmented}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-white font-medium">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 text-success shrink-0" aria-hidden="true" />
                          <span>{row.consolidated}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS - Connected Stepper Flowchart (Dynamic & Interactive)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-steel-100 relative overflow-hidden">
        {/* Blueprint mesh background */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--color-navy-900) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-navy-900) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                Sourcing in 4 Steps
              </h2>
              <p className="text-steel-600 max-w-2xl mx-auto text-lg">
                We manage the entire lifecycle from initial blueprints to final delivery.
              </p>
            </div>
          </AnimatedSection>

          {/* Connected Stepper Flowchart */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Desktop horizontal flow line */}
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[1.5px] bg-gradient-to-r from-copper-500/80 via-steel-300 to-copper-500/80 z-0" />

            {[
              {
                step: "01",
                icon: FileText,
                title: "Submit Requirements",
                desc: "Send us your technical drawings, standard specifications, quantities, and target unit pricing.",
              },
              {
                step: "02",
                icon: Compass,
                title: "Vetted Sourcing & Quote",
                desc: "We match specs against our qualified factories and issue a landed-cost quote within 24–48 hours.",
              },
              {
                step: "03",
                icon: ShieldCheck,
                title: "Production & Inspection",
                desc: "Your parts are manufactured under on-site inspection. First-articles are approved before batch completion.",
              },
              {
                step: "04",
                icon: Truck,
                title: "Delivered to Door",
                desc: "We manage freight logistics and customs, delivering products directly to your loading dock with full documentation dossiers.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection
                  key={item.step}
                  delay={i * 0.08}
                  className="bg-white border border-steel-200/85 rounded-2xl p-6 flex flex-col items-center text-center gap-4 relative z-10 shadow-sm hover:border-copper-500/40 hover:shadow-lg transition-all duration-350 group"
                >
                  {/* Step Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-steel-100 border border-steel-200/80 text-copper-500 flex items-center justify-center shrink-0 relative group-hover:border-copper-500 transition-colors">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5 + i, ease: "easeInOut" }}
                      className="absolute inset-0 bg-copper-500/5 rounded-2xl pointer-events-none"
                    />
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-copper-500 block mb-1">
                      STEP {item.step}
                    </span>
                    <h3 className="font-heading text-base font-bold text-navy-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          INDUSTRIES SERVED
          ================================================================ */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-copper-400 font-medium text-sm uppercase tracking-wider">
                Industries
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4 text-white">
                Trusted Across Sectors
              </h2>
              <p className="text-steel-400 max-w-2xl mx-auto text-lg">
                From MRO distributors to aerospace manufacturers — we supply
                components to companies at every level of the industrial supply
                chain.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredIndustries.map((ind, i) => (
              <AnimatedSection key={ind.id} delay={i * 0.06}>
                <Link
                  href="/industries"
                  className="group block p-6 rounded-2xl border border-navy-700/80 bg-navy-800/50 hover:border-copper-500/40 hover:bg-navy-800 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-copper-500/10 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-copper-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white text-base mb-2">
                        {ind.name}
                      </h3>
                      <p className="text-sm text-steel-500 leading-relaxed line-clamp-2">
                        {ind.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/industries"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-navy-600 text-steel-400 hover:text-white hover:border-steel-500 font-semibold rounded-full transition-all"
            >
              View All Industries
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          TRADE DEAL CALLOUT
          ================================================================ */}
      <section className="py-20 md:py-28 bg-steel-100 border-y border-steel-300">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-3xl bg-white border border-steel-200/80 shadow-xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-4 border border-green-200">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  2026 Trade Update
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-navy-900">
                  US-India Tariffs Reduced from 50% to 18%
                </h2>
                <p className="text-steel-600 leading-relaxed mb-6 max-w-lg">
                  The February 2026 bilateral trade agreement significantly
                  reduced tariffs on industrial components from India. Combined
                  with removal of the 25% punitive tariff, this creates the
                  most favorable import conditions in a decade.
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-copper-500 hover:text-copper-600 font-semibold transition-colors"
                >
                  Read Our Trade Deal Analysis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <div className="bg-navy-900 rounded-2xl border border-steel-800/80 p-8 text-center min-w-[220px]">
                  <div className="text-steel-500 text-sm mb-2">Duty Rate</div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl font-heading font-bold text-steel-600 line-through">
                      50%
                    </span>
                    <ArrowRight className="w-5 h-5 text-steel-600" />
                    <span className="text-4xl font-heading font-bold text-copper-400">
                      18%
                    </span>
                  </div>
                  <div className="text-steel-500 text-xs mt-1">
                    Effective Feb 2026
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================
          SOFTWARE-INTEGRATED PROCUREMENT GRID (Integrations block)
          ================================================================ */}
      <section className="relative py-20 md:py-28 bg-white border-t border-steel-300 overflow-hidden">
        {/* Blueprint mesh background */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--color-navy-900) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-navy-900) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                System Sync
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 leading-tight">
                Software-Integrated Procurement
              </h2>
              <p className="text-steel-600 text-lg leading-relaxed">
                We sync our operations directly with your existing enterprise systems. From automated lead sync in HubSpot to material ledger logs and shipping status notifications, we bridge the digital and physical pipelines.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "HubSpot CRM", desc: "Automatic Lead Sync" },
                { name: "SAP ERP", desc: "Material ledger logs" },
                { name: "NetSuite", desc: "PO reconciliation" },
                { name: "Resend", desc: "Real-time alerts" },
              ].map((integ) => (
                <div
                  key={integ.name}
                  className="bg-white border border-steel-200/80 rounded-2xl p-6 text-center flex flex-col justify-center items-center gap-3 hover:border-copper-500/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="h-9 w-9 rounded-xl bg-copper-500/10 text-copper-600 flex items-center justify-center transition-colors group-hover:bg-copper-500 group-hover:text-white shrink-0">
                    <Database className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-heading font-bold text-sm text-navy-900">
                    {integ.name}
                  </span>
                  <span className="text-[10px] text-steel-500 uppercase tracking-wider font-semibold block leading-tight">
                    {integ.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          LANDED COST CALCULATOR
          ================================================================ */}
      <section id="calculator" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                Cost Transparency
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-6 text-navy-900 leading-tight">
                Calculate Your Sourcing Savings
              </h2>
              <p className="text-steel-600 text-lg leading-relaxed mb-6">
                Use our interactive Landed Cost Calculator to estimate the total cost of importing components from India.
              </p>
              <p className="text-steel-600 leading-relaxed mb-8">
                We account for FOB unit price, shipping method, insurance, handling fees, and the updated <span className="font-semibold text-navy-900">18% customs duty rate</span> so you see the true cost per unit delivered directly to your facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  Request Detailed Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-steel-300 text-steel-700 hover:text-navy-900 hover:border-steel-400 font-semibold rounded-full transition-all bg-white shadow-sm hover:shadow-md"
                >
                  Learn About Our Process
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <LandedCostCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="py-20 md:py-28 bg-steel-100 border-t border-steel-300">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-navy-900">
              Ready to Streamline Your Supply Chain?
            </h2>
            <p className="text-steel-600 text-lg max-w-xl mx-auto mb-8">
              Submit an RFQ and receive a detailed, transparent landed-cost quote within 24–48 hours. No obligation.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full transition-all text-lg cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
