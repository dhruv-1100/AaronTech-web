import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingDown,
  ShieldCheck,
  FileSearch,
  Headphones,
  Send,
  Search,
  Factory,
  PackageCheck,
  ArrowRight,
  Globe,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Aaron Technologies",
  description:
    "US-based industrial component supplier with an India sourcing network. Competitive pricing, ISO-certified quality, full traceability, and local support.",
};

const valueProps = [
  {
    icon: TrendingDown,
    title: "Competitive Sourcing Pricing",
    stat: "25%+",
    description:
      "Average landed-cost savings versus domestic-only procurement. Our vetted Indian manufacturing network delivers precision-engineered parts at direct rates.",
  },
  {
    icon: ShieldCheck,
    title: "Double-Verified Quality",
    stat: "ISO 9001",
    description:
      "Every factory in our network is ISO certified. We supplement their checks with our local Indian engineering inspectors for double quality assurance.",
  },
  {
    icon: FileSearch,
    title: "Document Traceability",
    stat: "100%",
    description:
      "Mill test certificates (MTCs), certificates of conformance (CoCs), and inspection logs ship digitally with every single order. No exceptions.",
  },
  {
    icon: Headphones,
    title: "US Contracts & Liability",
    stat: "US Entity",
    description:
      "We are a registered US corporation. You get USD invoicing, local contracts, domestic liability protections, and local support.",
  },
];

const howItWorks = [
  {
    icon: Send,
    step: "01",
    title: "Submit RFQ & Blueprints",
    description:
      "Send us your CAD drawings, standard specifications, quantities, and target unit pricing. We accept inquiries via our website, email, or direct calls.",
  },
  {
    icon: Search,
    step: "02",
    title: "Sourcing & Landed Quote",
    description:
      "Our engineers match your blueprints to our vetted network and issue a transparent quote covering FOB, freight, insurance, and the 18% customs duty within 24–48 hours.",
  },
  {
    icon: Factory,
    step: "03",
    title: "Tooling, Production & QC",
    description:
      "Production begins under ISO processes. Our Indian inspectors audit first-articles and run dimensional assays at critical production stages.",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Delivered to Loading Dock",
    description:
      "We manage door-to-door freight forwarding, customs clearances, and final trucking, delivering parts and quality dossiers directly to your loading dock.",
  },
];

export default function AboutPage() {
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
              Our Story
            </p>
            <h1 className="max-w-3xl text-4xl sm:text-5xl font-heading font-bold leading-tight text-white mb-4">
              About Aaron <span className="text-gradient">Technologies</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-2xl">
              We bridge American buyers with India&rsquo;s world-class manufacturing ecosystem — delivering premium industrial components with full traceability and significant cost savings.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Stats - Clean typographic stats instead of card grids */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-copper-500">
                Who We Are
              </p>
              <h2 className="text-3xl font-heading font-bold text-navy-900 leading-tight">
                Built for American Procurement Teams, Powered by Indian Engineering
              </h2>
              <div className="space-y-4 text-steel-600 leading-relaxed text-sm">
                <p>
                  Aaron Technologies Inc. is a US-registered industrial supplier operating an active sourcing network across India&rsquo;s leading industrial clusters — including Rajkot, Ludhiana, Pune, and Chennai.
                </p>
                <p>
                  We established our firm to solve a common trade problem: American procurement teams want the cost advantages of importing from India, but hesitate due to quality control risks, time-zone disconnects, and customs import logistics.
                </p>
                <p>
                  Our local engineering team in India solves this by inspecting production on-site. Meanwhile, our US entity handles the contracts, invoicing, and logistics. You get direct-from-foundry pricing with the security and ease of a domestic supplier.
                </p>
              </div>
            </div>

            {/* Flat stats grid (no card backgrounds or borders) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12 lg:pl-8">
              <div>
                <div className="text-5xl font-heading font-extrabold text-navy-900 mb-1">
                  30+
                </div>
                <div className="w-8 h-0.5 bg-copper-500 mb-2" />
                <div className="text-xs font-semibold text-steel-500 uppercase tracking-wider">
                  Vetted Factories
                </div>
              </div>

              <div>
                <div className="text-5xl font-heading font-extrabold text-navy-900 mb-1">
                  25%+
                </div>
                <div className="w-8 h-0.5 bg-copper-500 mb-2" />
                <div className="text-xs font-semibold text-steel-500 uppercase tracking-wider">
                  Average Savings
                </div>
              </div>

              <div>
                <div className="text-5xl font-heading font-extrabold text-navy-900 mb-1">
                  100%
                </div>
                <div className="w-8 h-0.5 bg-copper-500 mb-2" />
                <div className="text-xs font-semibold text-steel-500 uppercase tracking-wider">
                  MTC Traceability
                </div>
              </div>

              <div>
                <div className="text-5xl font-heading font-extrabold text-navy-900 mb-1">
                  Local
                </div>
                <div className="w-8 h-0.5 bg-copper-500 mb-2" />
                <div className="text-xs font-semibold text-steel-500 uppercase tracking-wider">
                  US Contracts & support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Flat text grid (No cards!) */}
      <section className="bg-steel-100 border-y border-steel-300">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="text-center mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-copper-500">
              Why Aaron Technologies
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
              The Aaron Advantage
            </h2>
            <p className="mx-auto max-w-2xl text-steel-600 leading-relaxed text-base">
              We eliminate the traditional headaches of international trade to deliver direct manufacturing pricing with zero compromise on quality.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-14">
            {valueProps.map((prop) => {
              const PropIcon = prop.icon;
              return (
                <div key={prop.title} className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-copper-500/10 text-copper-600 flex items-center justify-center shrink-0">
                    <PropIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-copper-600 uppercase tracking-wider block mb-1">
                      {prop.stat}
                    </span>
                    <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-steel-600">
                      {prop.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Vertical process timeline for visual layout variety */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="text-center mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-copper-500">
              Simple Pipeline
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
              Our Sourcing Process
            </h2>
            <p className="mx-auto max-w-2xl text-steel-600 leading-relaxed">
              We manage the entire lifecycle from blueprint design to loading dock delivery.
            </p>
          </div>

          {/* Vertical Stepper timeline */}
          <div className="max-w-3xl mx-auto relative pl-8 sm:pl-12 border-l border-steel-350 space-y-12">
            {howItWorks.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* Step circle indicator on the left line */}
                  <div className="absolute -left-[45px] sm:-left-[61px] top-0.5 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-navy-900 text-white font-heading font-bold text-xs sm:text-sm border-4 border-white">
                    {step.step}
                  </div>

                  {/* Step content */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-navy-900 text-lg sm:text-xl flex items-center gap-2">
                      <StepIcon className="w-5 h-5 text-copper-500 shrink-0" />
                      {step.title}
                    </h3>
                    <p className="text-sm text-steel-600 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Optimize Your Sourcing Today
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-steel-400 leading-relaxed">
            Send us your drawing files, specs, and quantities. Our engineering team will analyze and issue a landed-cost quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-copper-600 cursor-pointer shadow-md hover:shadow-lg"
            >
              Request Sourcing Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-steel-600 px-8 py-3.5 font-semibold text-steel-300 transition-all hover:border-steel-400 hover:text-white hover:bg-white/5"
            >
              Contact Sourcing Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
