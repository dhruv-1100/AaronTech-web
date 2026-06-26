"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  FileText,
  Clock,
  Compass,
  Boxes,
  Truck,
  Database,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function ConsolidationPage() {
  const pipelineSteps = [
    {
      step: "01",
      icon: FileText,
      title: "RFQ Submission",
      description: "Centralized drawing ingestion & HS code verification.",
    },
    {
      step: "02",
      icon: Compass,
      title: "Factory Vetting",
      description: "Match with audited, ISO-certified Indian foundries.",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "100% Quality Audits",
      description: "On-site dimensional checking and material assays.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Freight Consolidation",
      description: "Optimize LCL to FCL shipping & customs clearance.",
    },
    {
      step: "05",
      icon: Boxes,
      title: "US Warehousing",
      description: "Buffer stocks & JIT delivery to your production line.",
    },
  ];

  const comparisonRows = [
    {
      metric: "Communications & Invoices",
      fragmented: "Dozens of emails and separate foreign invoices.",
      consolidated: "Single US point-of-contact & one monthly invoice.",
      isBetter: true,
    },
    {
      metric: "Quality & Tolerance Control",
      fragmented: "High risk; errors caught only after delivery in the US.",
      consolidated: "On-site pre-shipment inspections with dimensional assays.",
      isBetter: true,
    },
    {
      metric: "Freight & Shipping Cost",
      fragmented: "High LCL ocean rates and separate port handling fees.",
      consolidated: "Consolidated container shipping & bulk freight pricing.",
      isBetter: true,
    },
    {
      metric: "Material Traceability",
      fragmented: "Inconsistent; mill test certificates (MTC) often missing.",
      consolidated: "100% traceability; EN 10204 3.1 certs on every shipment.",
      isBetter: true,
    },
    {
      metric: "Inventory Buffering",
      fragmented: "None; supply chain halts if shipping is delayed.",
      consolidated: "US safety stocking programs for JIT delivery.",
      isBetter: true,
    },
  ];

  return (
    <div className="bg-navy-950 min-h-screen text-steel-100 relative overflow-hidden">
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── 1. Asymmetric Hero Section ─────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-copper-500/30 bg-copper-500/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-copper-500 animate-pulse" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-copper-300">
              Supply Chain Consolidation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] tracking-tight">
            Consolidate Your <br />
            <span className="text-gradient">India Sourcing Pipeline</span>
          </h1>

          <p className="text-base md:text-lg text-steel-400 leading-relaxed max-w-xl">
            Bridge the gap between Indian manufacturing hubs and your US assembly lines. Eliminate the overhead of managing dozens of separate vendors, logistics agents, and customs brokers.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm transition-colors"
            >
              Analyze Sourcing Pipeline
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-steel-750 hover:bg-white/5 text-steel-200 font-semibold text-sm transition-colors"
            >
              Explore Components
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-steel-800/40">
            <div>
              <span className="text-3xl md:text-4xl font-heading font-bold text-copper-400">25%</span>
              <span className="block text-xs uppercase tracking-wider text-steel-500 mt-1">Avg. Cost Savings</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-heading font-bold text-copper-400">100%</span>
              <span className="block text-xs uppercase tracking-wider text-steel-500 mt-1">Material Traceability</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Bento Box */}
        <div className="lg:col-span-5 relative h-full min-h-[350px]">
          <div className="absolute -inset-2 border border-steel-800/30 pointer-events-none" />
          <div className="relative bg-navy-900 border border-steel-800 p-6 flex flex-col h-full justify-between shadow-2xl">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold font-heading text-steel-500 tracking-wider uppercase">
                Diagnostic Monitor
              </span>
              <Database className="w-5 h-5 text-copper-400" />
            </div>

            <div className="space-y-3.5 mt-8">
              <div className="bg-navy-950/60 border border-steel-800/60 p-3.5 flex items-center justify-between">
                <span className="text-xs font-mono text-steel-400">CRM_PORTAL_SYNC</span>
                <span className="text-xs font-mono text-success flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-success rounded-full" />
                  CONNECTED
                </span>
              </div>
              <div className="bg-navy-950/60 border border-steel-800/60 p-3.5 flex items-center justify-between">
                <span className="text-xs font-mono text-steel-400">CONSOLIDATED_CONTAINERS</span>
                <span className="text-xs font-mono text-white font-bold">
                  14 ACTIVE
                </span>
              </div>
              <div className="bg-navy-950/60 border border-steel-800/60 p-3.5 flex items-center justify-between">
                <span className="text-xs font-mono text-steel-400">LOT_REJECTION_RATE</span>
                <span className="text-xs font-mono text-[#C75B2A] font-bold">
                  0.02%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Connected Pipeline Flow ─────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-steel-800/30">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-3">
            Engineered Sourcing Pipeline
          </h2>
          <p className="text-sm md:text-base text-steel-400 leading-relaxed">
            Consolidating the supply chain into a single, predictable flow that manages technical specifications, manufacturing execution, visual assays, and sea freight logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-steel-800/50 z-0" />

          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-navy-900 border border-steel-800 p-6 flex flex-col items-center text-center gap-4 relative z-10 hover:border-copper-500/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-navy-950 border border-steel-800 text-copper-400 flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(199,91,42,0.06)] group-hover:border-copper-500 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-copper-500 block mb-1">
                    STAGE {step.step}
                  </span>
                  <h3 className="font-heading text-sm font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-steel-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Consolidation Center Widget ─────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-steel-800/30">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-3">
            Consolidation Center Widget
          </h2>
          <p className="text-sm md:text-base text-steel-400 leading-relaxed">
            Compare the operational friction of dealing directly with multiple international foundries versus routing through the Aaron Consolidated Sourcing pipeline.
          </p>
        </div>

        <div className="overflow-x-auto rounded-none border border-steel-800 bg-navy-900 shadow-2xl">
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
                <tr key={row.metric} className="hover:bg-steel-800/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-white font-heading">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 text-xs sm:text-sm text-steel-400">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 text-error shrink-0" />
                      <span>{row.fragmented}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs sm:text-sm text-white font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-success shrink-0" />
                      <span>{row.consolidated}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. ERP & CRM Integrations Block ────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-steel-800/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              Software-Integrated Procurement
            </h2>
            <p className="text-sm md:text-base text-steel-400 leading-relaxed">
              We sync our operations directly with your existing enterprise software. From automated quote routing in HubSpot CRM to material ledger logging and shipping status emails, Aaron Technologies bridges the digital and physical pipelines.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "HubSpot", desc: "Automatic Lead Sync" },
              { name: "SAP ERP", desc: "Material ledger log" },
              { name: "NetSuite", desc: "PO reconciliation" },
              { name: "Resend", desc: "Real-time alerts" },
            ].map((integ) => (
              <div
                key={integ.name}
                className="bg-navy-900 border border-steel-800 p-5 text-center flex flex-col justify-center items-center gap-1.5 hover:border-copper-500/40 transition-colors"
              >
                <div className="h-8 w-8 rounded-none bg-copper-500/10 flex items-center justify-center text-copper-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-sm text-white">
                  {integ.name}
                </span>
                <span className="text-[10px] text-steel-500 uppercase tracking-wider block">
                  {integ.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Call to Action ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <div className="bg-navy-900 border border-steel-800 p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-copper-500 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-4">
            Optimize Your Supply Chain Operations
          </h2>
          <p className="text-steel-400 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Consolidating vendors, optimizing freight container usage, and routing through stateside buffers is the smartest way to source industrial parts from India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm transition-colors"
            >
              Start Pipeline Audit
              <ArrowUpRight className="w-4.5 h-4.5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-steel-750 hover:bg-white/5 text-steel-200 font-semibold text-sm transition-colors"
            >
              Consult an Engineer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
