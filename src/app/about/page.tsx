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
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Aaron Technologies",
  description:
    "US-based industrial component supplier with an India sourcing network. Competitive pricing, vetted quality, full traceability, and local support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Aaron Technologies",
    description:
      "US-based industrial component supplier with an India sourcing network. Competitive pricing, vetted quality, full traceability.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aaron Technologies",
  },
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
    stat: "Vetted",
    description:
      "Every factory in our network is thoroughly vetted. We supplement their checks with our local Indian engineering inspectors for double quality assurance.",
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
    title: "US Contracts & Support",
    stat: "US Entity",
    description:
      "We are a registered US corporation. You get USD invoicing, local contracts, domestic liability protections, and local support.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Send,
    title: "Submit RFQ & Blueprints",
    description:
      "Send us your CAD drawings, standard specifications, quantities, and target unit pricing. We accept inquiries via our website, email, or direct calls.",
  },
  {
    step: "02",
    icon: Search,
    title: "Sourcing & Landed Quote",
    description:
      "Our engineers match your blueprints to our vetted network and issue a transparent quote covering FOB, freight, insurance, and the 18% customs duty within 24–48 hours.",
  },
  {
    step: "03",
    icon: Factory,
    title: "Tooling, Production & QC",
    description:
      "Production begins under ISO processes. Our Indian inspectors audit first-articles and run dimensional assays at critical production stages.",
  },
  {
    step: "04",
    icon: PackageCheck,
    title: "Delivered to Loading Dock",
    description:
      "We manage door-to-door freight forwarding, customs clearances, and final trucking, delivering parts and quality dossiers directly to your loading dock.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-5 max-w-3xl">
            About Aaron <strong>Technologies</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            We bridge American buyers with India&rsquo;s world-class manufacturing
            ecosystem — delivering premium industrial components with full
            traceability and significant cost savings.
          </p>
        </div>
      </section>

      {/* Story & Stats */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block">
                Who We Are
              </span>
              <h2 className="text-3xl leading-tight">
                Built for American Procurement Teams,{" "}
                <strong>Powered by Indian Engineering</strong>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Aaron Technologies Inc. is a US-registered industrial supplier
                  operating an active sourcing network across India&rsquo;s leading
                  industrial clusters — including Rajkot, Ludhiana, Pune, and Chennai.
                </p>
                <p>
                  We established our firm to solve a common trade problem: American
                  procurement teams want the cost advantages of importing from India,
                  but hesitate due to quality control risks, time-zone disconnects,
                  and customs import logistics.
                </p>
                <p>
                  Our local engineering team in India solves this by inspecting
                  production on-site. Meanwhile, our US entity handles the contracts,
                  invoicing, and logistics. You get direct-from-foundry pricing with
                  the security and ease of a domestic supplier.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border lg:ml-8">
              {[
                { value: "30+", label: "Vetted Factories" },
                { value: "25%+", label: "Average Savings" },
                { value: "100%", label: "MTC Traceability" },
                { value: "Local", label: "US Contracts & Support" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-8 flex flex-col">
                  <div className="text-3xl md:text-4xl text-text-primary tracking-tight mb-1.5">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-b border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
              Why Aaron Technologies
            </span>
            <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-4">
              The Aaron <strong>Advantage</strong>
            </h2>
            <p className="max-w-2xl text-text-secondary text-lg leading-relaxed">
              We eliminate the traditional headaches of international trade to
              deliver direct manufacturing pricing with zero compromise on quality.
            </p>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 rounded-xl overflow-hidden border border-border">
            {valueProps.map((prop) => {
              const PropIcon = prop.icon;
              return (
                <div key={prop.title} className="bg-white p-8 flex gap-5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0">
                    <PropIcon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight block mb-1.5">
                      {prop.stat}
                    </span>
                    <h3 className="text-[15px] font-medium text-text-primary mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {prop.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
              Process
            </span>
            <h2 className="text-3xl md:text-[2.75rem] leading-tight">
              Our Sourcing <strong>Process</strong>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {howItWorks.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="bg-white p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight">
                      Step {step.step}
                    </span>
                    <StepIcon className="w-4 h-4 text-text-tertiary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-[2.75rem] leading-tight mb-6">
            Optimize your <strong>sourcing today</strong>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            Send us your drawing files, specs, and quantities. Our engineering
            team will analyze and issue a landed-cost quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="btn-primary px-8 py-3.5 text-base"
            >
              Request Sourcing Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary px-8 py-3.5 text-base"
            >
              Contact Sourcing Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
