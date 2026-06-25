"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      <Icon className="w-6 h-6 text-copper-400 mb-2" />
      <div className="text-3xl md:text-4xl font-heading font-bold text-white">
        {value}
        <span className="text-copper-400">{suffix}</span>
      </div>
      <div className="text-sm text-steel-400 mt-1">{label}</div>
    </div>
  );
}

function SupplyChainVisualizer() {
  return (
    <div className="relative border border-steel-800 bg-navy-900/40 p-6 md:p-8 backdrop-blur-sm shadow-2xl overflow-hidden rounded-none">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative space-y-8">
        {/* Step 1 */}
        <div className="flex items-start gap-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-5 top-10 bottom-[-32px] w-[2px] bg-gradient-to-b from-copper-500 to-steel-700 pointer-events-none" />
          
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-copper-500/5 rounded-full pointer-events-none"
            />
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest block mb-0.5">Stage 01</span>
            <h4 className="text-sm font-bold text-white font-heading">ISO 9001 India Factory Hubs</h4>
            <p className="text-xs text-steel-400 mt-1">Direct coordination with vetted forging, casting & fastener hubs.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 relative">
          <div className="absolute left-5 top-10 bottom-[-32px] w-[2px] bg-gradient-to-b from-steel-700 to-copper-500 pointer-events-none" />
          
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 relative z-10 overflow-hidden">
            {/* Scan animation line */}
            <motion.div
              animate={{ y: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-copper-400 shadow-[0_0_8px_#C75B2A]"
            />
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest block mb-0.5">Stage 02</span>
            <h4 className="text-sm font-bold text-white font-heading">100% Compliance Inspection</h4>
            <p className="text-xs text-steel-400 mt-1">Dimensional checks, material chemical testing, and full trace reports.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 relative">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-copper-500/10 border border-copper-500/30 text-copper-400 relative z-10">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Globe className="h-5 w-5" />
            </motion.div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest block mb-0.5">Stage 03</span>
            <h4 className="text-sm font-bold text-white font-heading">Landed Duty-Paid US Delivery</h4>
            <p className="text-xs text-steel-400 mt-1">Customs clearance, freight consolidation, and delivery directly to your warehouse.</p>
          </div>
        </div>
      </div>

      {/* Live tracking overlay simulator */}
      <div className="mt-6 pt-4 border-t border-steel-800/80 flex items-center justify-between text-[11px] text-steel-500">
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-copper-500/10 border border-copper-500/30 text-copper-300 text-sm font-semibold mb-6"
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
                Industrial Components.{" "}
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
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-none transition-all text-base cursor-pointer"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-steel-700 text-steel-300 hover:text-white hover:border-steel-500 font-medium rounded-none transition-all text-base"
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
          TRUST METRICS BAR
          ================================================================ */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
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

          {/* Unified Mesh Grid Container */}
          <div className="border-t border-l border-steel-300 rounded-none overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCategories.map((cat, i) => {
                const Icon = iconMap[cat.icon] || Package;
                return (
                  <AnimatedSection key={cat.id} delay={i * 0.04} className="h-full">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="group block p-6 border-r border-b border-steel-300 bg-white hover:bg-steel-50/70 transition-all duration-300 h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-none bg-navy-900/5 flex items-center justify-center mb-5 group-hover:bg-copper-500/10 transition-colors">
                          <Icon className="w-5 h-5 text-navy-700 group-hover:text-copper-500 transition-colors" />
                        </div>
                        <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-steel-600 leading-relaxed mb-4">
                          {cat.shortDescription}
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {cat.standards.slice(0, 2).map((std) => (
                            <span
                              key={std}
                              className="text-[10px] px-2 py-0.5 rounded bg-steel-200 text-steel-700 font-semibold"
                            >
                              {std.split(" ")[0]}
                            </span>
                          ))}
                        </div>
                        <span className="text-copper-500 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-steel-300 text-steel-700 hover:text-navy-900 hover:border-steel-400 font-semibold rounded-none transition-all bg-white"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-none transition-colors cursor-pointer"
              >
                Learn About Our Sourcing Process
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Premium Editorial Row List */}
            <div className="lg:col-span-7 divide-y divide-steel-200">
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
              ].map((item, i) => (
                <AnimatedSection
                  key={item.title}
                  delay={i * 0.08}
                  className="flex gap-5 py-6 first:pt-0 last:pb-0 items-start"
                >
                  <div className="w-10 h-10 rounded-none bg-copper-500/10 text-copper-600 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-navy-900 text-base mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-steel-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS - Flat Connected Process Timeline (No cards!)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-steel-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-copper-500 font-medium text-sm uppercase tracking-wider">
                Our Timeline
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                Sourcing in 4 Steps
              </h2>
              <p className="text-steel-600 max-w-2xl mx-auto text-lg">
                We manage the entire lifecycle from initial blueprints to final delivery.
              </p>
            </div>
          </AnimatedSection>

          {/* Connected open columns (no card backgrounds, no borders) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Requirements",
                desc: "Send us your technical drawings, standard specifications, quantities, and target unit pricing.",
              },
              {
                step: "02",
                title: "Vetted Sourcing & Quote",
                desc: "We match specs against our qualified factories and issue a landed-cost quote within 24–48 hours.",
              },
              {
                step: "03",
                title: "Production & Inspection",
                desc: "Your parts are manufactured under on-site inspection. First-articles are approved before batch completion.",
              },
              {
                step: "04",
                title: "Delivered to Door",
                desc: "We manage freight logistics and customs, delivering products directly to your loading dock with full documentation dossiers.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.08} className="relative">
                <span className="text-6xl font-heading font-extrabold text-steel-300/60 leading-none mb-4 block">
                  {item.step}
                </span>
                <div className="h-0.5 bg-copper-500 w-10 mb-4" />
                <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-steel-600 leading-relaxed">
                  {item.desc}
                </p>
              </AnimatedSection>
            ))}
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
                  className="group block p-6 rounded-none border border-navy-700 bg-navy-800/50 hover:border-copper-500/30 hover:bg-navy-800 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-copper-500/10 flex items-center justify-center shrink-0">
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
              className="inline-flex items-center gap-2 px-6 py-3 border border-navy-600 text-steel-400 hover:text-white hover:border-steel-500 font-medium rounded-none transition-all"
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
            <div className="rounded-none bg-white border border-steel-300 p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-green-50 text-green-700 text-sm font-medium mb-4 border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
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
                <div className="bg-navy-900 rounded-none p-8 text-center min-w-[220px]">
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
          LANDED COST CALCULATOR
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-none transition-colors cursor-pointer"
                >
                  Request Detailed Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-steel-300 text-steel-700 hover:text-navy-900 hover:border-steel-400 font-semibold rounded-none transition-colors bg-white"
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
              Ready to Settle Your Supply Chain?
            </h2>
            <p className="text-steel-600 text-lg max-w-xl mx-auto mb-8">
              Submit an RFQ and receive a detailed, transparent landed-cost quote within 24–48 hours. No obligation.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-none transition-all text-lg cursor-pointer animate-pulse"
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
