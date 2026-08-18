import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { PageHero, Eyebrow, SectionHead, CtaBand } from "@/components/ui/Page";
import { cn } from "@/lib/utils";

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

const FIGURES = [
  { value: "30+", label: "Vetted factories" },
  { value: "25%+", label: "Average savings" },
  { value: "100%", label: "MTC traceability" },
  { value: "US", label: "Contracts & support" },
];

const ADVANTAGES = [
  {
    tag: "25%+",
    title: "Competitive sourcing pricing",
    body: "Average landed-cost savings versus domestic-only procurement. Our vetted Indian network delivers precision-engineered parts at direct manufacturing rates.",
  },
  {
    tag: "Vetted",
    title: "Double-verified quality",
    body: "Every factory in the network is vetted and ISO 9001:2015 certified. We supplement their checks with our own Indian engineering inspectors for a second pass.",
  },
  {
    tag: "100%",
    title: "Document traceability",
    body: "Mill test certificates, certificates of conformance and inspection logs ship digitally with every order. No exceptions.",
  },
  {
    tag: "US entity",
    title: "US contracts & support",
    body: "We are a registered US corporation: USD invoicing, local contracts, domestic liability protections and support in your time zone.",
  },
];

const STAGES = [
  {
    step: "01",
    title: "Submit RFQ & blueprints",
    body: "Send CAD drawings, standard specifications, quantities and target unit pricing. We take inquiries through the site, email or a direct call.",
  },
  {
    step: "02",
    title: "Sourcing & landed quote",
    body: "Our engineers match your blueprints against the vetted network and issue a transparent quote covering FOB, freight, insurance and duty within 24–48 hours.",
  },
  {
    step: "03",
    title: "Tooling, production & QC",
    body: "Production runs under ISO processes. Our Indian inspectors approve first articles and run dimensional assays at critical stages.",
  },
  {
    step: "04",
    title: "Delivered to loading dock",
    body: "We manage door-to-door freight forwarding, customs clearance and final trucking — parts and quality dossiers arrive together.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A US company with engineers on the factory floor."
        lede="We bridge American buyers and India’s manufacturing ecosystem — delivering industrial components with full traceability and real cost savings, without the risk that usually comes with importing."
      />

      {/* Who we are */}
      <section className="border-b border-ink bg-paper py-14 md:py-[100px]">
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[88px]">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-[18px] mb-[30px] text-[clamp(2rem,3.6vw,2.875rem)] text-ink">
              Built for American procurement teams, powered by Indian
              engineering
            </h2>
            <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-body">
              <p className="m-0">
                Aaron Technologies Inc. is a US-registered industrial supplier
                operating an active sourcing network across India’s leading
                industrial clusters — Rajkot, Ludhiana, Pune and Chennai.
              </p>
              <p className="m-0">
                We started the firm to solve a specific problem: American
                procurement teams want the cost advantage of importing from
                India, but hesitate because of quality control risk, time-zone
                disconnects and customs logistics.
              </p>
              <p className="m-0">
                Our engineering team in India solves the first by inspecting
                production on site. Our US entity solves the rest by holding the
                contracts, the invoicing and the freight. You get
                direct-from-foundry pricing with the security of a domestic
                supplier.
              </p>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-px border border-rule-strong bg-rule-strong">
            {FIGURES.map((figure) => (
              <div key={figure.label} className="bg-paper px-[26px] py-[34px]">
                <div className="text-[40px] leading-none font-bold tracking-[-0.04em] text-ink">
                  {figure.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {figure.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Advantage */}
      <section className="bg-ink py-14 md:py-[100px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              tone="ink"
              eyebrow="Why Aaron Technologies"
              title="The advantage, itemized"
              lede="We remove the standing overhead of international trade so the cost advantage actually reaches your unit price."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-px border border-ink-3 bg-ink-3 md:grid-cols-2">
              {ADVANTAGES.map((item) => (
                <div key={item.title} className="bg-ink px-[34px] py-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.21em] text-signal">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 mb-3 text-2xl text-white">{item.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.65] text-dim-2">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-ink bg-paper-2 py-14 md:py-[100px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="Process"
              title="How sourcing runs"
              lede="Four stages from blueprint to loading dock, each one producing a document your quality team can act on."
            />
          </Reveal>
          <Reveal className="border-t-2 border-ink">
            {STAGES.map((stage, i) => (
              <div
                key={stage.step}
                className={cn(
                  "grid items-baseline gap-x-10 gap-y-3 py-[34px] lg:grid-cols-[92px_minmax(0,1fr)_minmax(0,1.6fr)]",
                  i === STAGES.length - 1
                    ? "border-b-2 border-ink"
                    : "border-b border-rule-strong"
                )}
              >
                <span className="text-[40px] leading-none font-black tracking-[-0.04em] text-signal">
                  {stage.step}
                </span>
                <h3 className="m-0 text-2xl text-ink">{stage.title}</h3>
                <p className="m-0 text-[15px] leading-[1.65] text-body">
                  {stage.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Optimize your sourcing."
        body="Send drawing files, specs and quantities. Our engineering team returns a landed-cost quote you can put in front of finance."
        primary={{ label: "Request sourcing quote →", href: "/quote" }}
        secondary={{ label: "Contact the team", href: "/contact" }}
      />
    </>
  );
}
