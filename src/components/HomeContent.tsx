import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ShowMore from "@/components/ui/ShowMore";
import LandedCostEstimator from "@/components/LandedCostEstimator";
import { Eyebrow, SectionHead, CtaBand } from "@/components/ui/Page";
import { productCategories } from "@/lib/data/products";
import { catalogIndex } from "@/lib/data/catalog-index";
import { cn } from "@/lib/utils";

const HERO_TILES = [
  {
    href: "/products/fasteners",
    label: "Fasteners",
    standard: "ASTM A193 / A320",
    src: "/images/showcase/fasteners.jpg",
    alt: "High-strength hex bolts, nuts and studs",
  },
  {
    href: "/products/forged-components",
    label: "Forgings & flanges",
    standard: "ASME B16.5",
    src: "/images/showcase/forged-flanges.jpg",
    alt: "Forged pipe flanges and fittings",
  },
  {
    href: "/products/precision-machined",
    label: "Precision machined",
    standard: "ASME Y14.5 GD&T",
    src: "/images/showcase/cnc-machined.jpg",
    alt: "Precision CNC turned and milled components",
  },
];

const METRICS = [
  { value: 500, suffix: "+", label: "Product SKUs available" },
  { value: 30, suffix: "+", label: "Audited supplier facilities" },
  { value: 50, suffix: "+", label: "Standards quoted against" },
  { value: 25, suffix: "%", label: "Avg. landed cost savings" },
];

const PROCESS = [
  {
    step: "01",
    title: "Submit requirements",
    body: "Send drawings, standards, quantities and target pricing. Custom parts and catalog SKUs go through the same intake.",
    output: "Output — reviewed spec sheet",
  },
  {
    step: "02",
    title: "Source, verify, quote",
    body: "We match your specs to the best-fit factory in the network, validate certifications and capacity, and return an itemized landed-cost quote in 24–48 hours.",
    output: "Output — line-item landed cost",
  },
  {
    step: "03",
    title: "Produce & inspect",
    body: "First articles are approved before the batch runs. Our engineers in India carry out dimensional, chemical and mechanical checks pre-shipment.",
    output: "Output — FAI + inspection report",
  },
  {
    step: "04",
    title: "Deliver duty-paid",
    body: "We consolidate freight, clear customs and deliver to your dock. Reorders draw on US safety stock for JIT schedules.",
    output: "Output — MTC dossier + one USD invoice",
  },
];

const COMPARISON = [
  {
    metric: "Communication & invoices",
    fragmented: "Dozens of email threads and separate foreign invoices.",
    consolidated: "One US point of contact, one monthly USD invoice.",
  },
  {
    metric: "Quality control",
    fragmented: "Defects surface after the container lands in the US.",
    consolidated:
      "Pre-shipment inspection with dimensional and material assays.",
  },
  {
    metric: "Freight cost",
    fragmented: "LCL rates per vendor plus duplicated port handling fees.",
    consolidated: "Consolidated container shipping at bulk freight pricing.",
  },
  {
    metric: "Traceability",
    fragmented: "Inconsistent; mill test certificates often missing.",
    consolidated: "EN 10204 3.1 certs and heat codes on every shipment.",
  },
  {
    metric: "Supply continuity",
    fragmented: "No buffer; a shipping delay stops your line.",
    consolidated: "US safety stocking programs for JIT release.",
  },
];

const SEGMENTS = [
  {
    tier: "Tier 1",
    slug: "distributors-mro",
    title: "Distributors & MRO",
    body: "Bearing, fastener, pump and valve distributors diversifying their supplier base for cost advantage.",
  },
  {
    tier: "Tier 1",
    slug: "machine-shops",
    title: "Machine & job shops",
    body: "Fast decision cycles and price sensitivity, with flexible MOQs for small-batch and prototype work.",
  },
  {
    tier: "Tier 1",
    slug: "contract-manufacturers",
    title: "Contract manufacturers",
    body: "Reliable delivery, consistent quality and competitive landed costs above all else.",
  },
  {
    tier: "Tier 2",
    slug: "oem-manufacturers",
    title: "OEM manufacturers",
    body: "Machinery, pump, HVAC, agricultural and packaging equipment builders qualifying approved vendors.",
  },
  {
    tier: "Tier 2",
    slug: "epc-firms",
    title: "EPC firms",
    body: "Valves, flanges, structural steel and piping for infrastructure and plant construction projects.",
  },
  {
    tier: "Tier 3",
    slug: "energy-oil-gas",
    title: "Energy & oil/gas",
    body: "API-certified valves, flanges and pipe fittings for large project-based orders.",
  },
];

const FAQS = [
  {
    question: "How do you ensure quality on components made 8,000 miles away?",
    answer:
      "Every manufacturing partner in the network is ISO 9001:2015 certified. Our engineers in India approve first articles before a batch runs, then carry out dimensional, chemical and mechanical checks pre-shipment. EN 10204 3.1 mill test certificates and lot traceability ship with every order.",
  },
  {
    question: "What are typical lead times and minimum order quantities?",
    answer:
      "Production runs 4 to 8 weeks depending on complexity and volume, plus ocean transit. MOQs are flexible and set per part rather than per catalog rule, and US safety stocking programs cover JIT release on repeat lines.",
  },
  {
    question: "How are freight, customs duties and landed cost handled?",
    answer:
      "We quote DDP — delivered duty paid. Export and import documentation, HTS classification, customs clearance, tariffs and freight are all handled on our side, and you receive one transparent US invoice with no port fees arriving later.",
  },
  {
    question: "Which materials and standards does the network cover?",
    answer:
      "Carbon steel, alloy steel, stainless (304, 316, duplex), brass and aluminum, produced to ASTM, ASME, DIN, ISO, BS and API standards. Component-specific standards are listed against each line in the catalog index above.",
  },
  {
    question: "Can you manufacture to our own engineering drawings?",
    answer:
      "Yes — a significant share of what we ship is custom, built to customer-supplied 2D/3D CAD and proprietary tolerance specifications. Send the drawing package with your RFQ and we will confirm manufacturability before quoting.",
  },
];

const ROW_GRID =
  "grid-cols-[36px_minmax(0,1fr)_28px] gap-x-5 md:grid-cols-[44px_minmax(0,1.5fr)_minmax(0,2.3fr)_minmax(0,1.7fr)_30px] md:gap-7";

export default function HomeContent() {
  return (
    <>
      {/* ---------------------------------------------- Hero */}
      <section className="border-b border-ink">
        <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-[72px] lg:min-h-[640px]">
          <div className="pt-12 pb-12 md:pt-[104px] md:pb-24">
            <div className="animate-rise mb-9 flex items-center gap-3.5">
              <span className="rule-tab" aria-hidden="true" />
              <Eyebrow>US-based industrial sourcing</Eyebrow>
            </div>
            <h1 className="animate-rise m-0 mb-8 text-ink [animation-delay:0.08s]">
              Your BOM,
              <br />
              one <span className="font-light italic">partner,</span>
              <br />
              30+ factories.
            </h1>
            <p className="animate-rise m-0 mb-11 max-w-[30em] text-xl leading-[1.55] text-body [animation-delay:0.16s]">
              We source fasteners, forgings, castings and machined parts from
              vetted Indian manufacturers — inspected before they ship,
              delivered duty-paid, with full material traceability.
            </p>
            <div className="animate-rise flex flex-wrap items-center gap-x-8 gap-y-5 [animation-delay:0.24s]">
              <Link href="/quote" className="btn-primary">
                Request a Quote →
              </Link>
              <a
                href="#calculator"
                className="border-b-2 border-signal pb-1 font-mono text-[13px] uppercase tracking-[0.06em] text-ink transition-colors hover:text-muted"
              >
                Estimate landed cost
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] self-stretch lg:min-h-[640px] lg:-mr-[44px]">
            <div className="animate-wipe absolute inset-0 overflow-hidden bg-ink">
              <Image
                src="/images/showcase/forged-flanges.jpg"
                alt="Forged weld-neck pipe flanges stacked at an ISO 9001 certified facility"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover brightness-[0.8] contrast-[1.06] grayscale-[0.3]"
              />
            </div>
            <div className="absolute bottom-11 -left-px border-l-4 border-signal bg-ink px-6 py-[18px]">
              <div className="mb-[7px] font-mono text-[11px] uppercase tracking-[0.15em] text-signal">
                ASME B16.5 · Class 150–2500
              </div>
              <div className="font-mono text-xs text-dim">
                Weld-neck flanges · A105 / A182 F316
              </div>
            </div>
            <div className="absolute top-10 right-[26px] hidden flex-col items-center gap-3 lg:flex">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper [writing-mode:vertical-rl]"
                aria-hidden="true"
              >
                Scroll
              </span>
              <span
                className="animate-scroll-hint block h-[46px] w-px bg-paper/50"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Metrics */}
      <section className="bg-ink">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className={cn(
                "border-ink-3 py-10 md:py-[46px]",
                i === 0 ? "pr-8 lg:pr-[34px]" : "pl-5 pr-8 md:px-[34px]",
                i === METRICS.length - 1 && "lg:pr-0",
                i % 2 === 0 && "border-r lg:border-r",
                i < 2 && "border-b lg:border-b-0",
                i !== METRICS.length - 1 && "lg:border-r",
              )}
            >
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-bold tracking-[-0.045em] text-white tabular-nums">
                <StatCounter value={metric.value} />
                <span className="text-signal">{metric.suffix}</span>
              </div>
              <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-dim-2">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- Positioning */}
      <section className="border-b border-ink-3 bg-ink py-24 md:py-[124px]">
        <Reveal className="shell">
          <Eyebrow tone="ink">Positioning</Eyebrow>
          <p className="mt-7 mb-0 max-w-[26em] text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.16] font-light tracking-[-0.032em] text-white">
            Direct-from-foundry pricing is worth 25% of your component spend.
            Managing it from 8,000 miles away is worth a full-time team.{" "}
            <span className="font-bold">We are that team</span> — a US
            corporation, invoicing in USD, with engineers on the factory floor
            in India.
          </p>
          <div className="mt-13 flex flex-wrap gap-x-11 gap-y-4 font-mono text-xs uppercase tracking-[0.09em] text-dim-2">
            <span className="border-l-[3px] border-signal pl-[13px]">
              Aaron Technologies Inc. · New Jersey
            </span>
            <span className="border-l-[3px] border-ink-3 pl-[13px]">
              EN 10204 3.1 certs on every shipment
            </span>
            <span className="border-l-[3px] border-ink-3 pl-[13px]">
              DDP delivered duty paid
            </span>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------- Catalog */}
      <section id="catalog" className="bg-paper">
        <div className="grid border-b border-ink sm:grid-cols-3">
          {HERO_TILES.map((tile, i) => (
            <Reveal key={tile.href}>
              <Link
                href={tile.href}
                className={cn(
                  "zoom-tile relative block h-[280px] overflow-hidden bg-ink md:h-[340px]",
                  i < HERO_TILES.length - 1 && "border-r border-ink",
                )}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-[26px] left-0 bg-signal px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink">
                  {tile.label}
                </span>
                <span className="absolute top-[22px] right-[22px] font-mono text-[11px] text-paper/75">
                  {tile.standard}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="shell py-14 md:py-[116px]">
          <Reveal>
            <SectionHead
              eyebrow="Product lines / 12"
              title="Catalog index"
              lede="Standards listed are the governing specifications we quote and inspect against. Custom parts to your drawings are quoted the same way."
              className="lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
            />
          </Reveal>

          <Reveal>
            <div className="border-t-2 border-ink">
              <div
                className={cn(
                  "hidden border-b border-ink py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:grid",
                  ROW_GRID,
                )}
              >
                <span>#</span>
                <span>Category</span>
                <span>Description</span>
                <span>Governing standards</span>
                <span />
              </div>

              <ShowMore
                visible={5}
                total={productCategories.length}
                label="lines"
                ruled
              >
                {productCategories.map((category, i) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className={cn(
                      "catalog-row",
                      ROW_GRID,
                      "py-6",
                      i === productCategories.length - 1
                        ? "border-b-2 border-ink"
                        : "border-b border-rule",
                    )}
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[19px] font-medium tracking-[-0.015em] text-ink">
                      {category.name}
                    </span>
                    <span className="col-start-2 text-sm leading-[1.55] text-body md:col-start-auto">
                      {category.shortDescription}
                    </span>
                    <span className="col-start-2 font-mono text-xs leading-[1.6] text-muted md:col-start-auto">
                      {catalogIndex[category.slug]?.standardsShort}
                    </span>
                    <span
                      aria-hidden="true"
                      className="row-arrow col-start-3 row-start-1 justify-self-end text-sm text-ink md:col-start-auto md:row-start-auto"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </ShowMore>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- Process */}
      <section
        id="process"
        className="border-y border-ink bg-paper-2 py-14 md:py-[116px]"
      >
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-[88px]">
          <div className="lg:sticky lg:top-[132px]">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-5 mb-6 text-ink">
              RFQ to
              <br />
              loading dock
            </h2>
            <p className="mt-0 mb-9 text-base leading-[1.65] text-body">
              Four stages, each producing documentation you can hand straight to
              your quality team.
            </p>
            <Link
              href="/quote"
              className="btn-secondary !py-3.5 !px-6 !text-[15px]"
            >
              Start an RFQ →
            </Link>
          </div>

          <div>
            {PROCESS.map((stage, i) => (
              <Reveal key={stage.step}>
                <div
                  className={cn(
                    "grid items-start gap-x-9 gap-y-3 py-9 sm:grid-cols-[92px_minmax(0,1fr)]",
                    i === 0
                      ? "border-t-2 border-ink"
                      : "border-t border-rule-strong",
                    i === PROCESS.length - 1 && "border-b-2 border-ink",
                  )}
                >
                  <span className="text-[44px] leading-[0.9] font-black tracking-[-0.04em] text-signal">
                    {stage.step}
                  </span>
                  <div>
                    <h3 className="m-0 mb-3 text-ink">{stage.title}</h3>
                    <p className="m-0 mb-4 max-w-[40em] text-base leading-[1.65] text-body">
                      {stage.body}
                    </p>
                    <span className="border-l-[3px] border-rule-strong pl-3 font-mono text-[11px] uppercase tracking-[0.11em] text-muted">
                      {stage.output}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Estimator */}
      <section id="calculator" className="bg-ink py-14 md:py-[116px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              tone="ink"
              eyebrow="Landed cost estimator"
              title="See the real number"
              lede="FOB is not your cost. Pick a part and a volume to see freight, duty, insurance and brokerage resolved per unit — the same breakdown your quote arrives in."
            />
          </Reveal>
          <Reveal>
            <LandedCostEstimator />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- Comparison */}
      <section className="border-b border-ink bg-paper py-14 md:py-[116px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="Comparison"
              title="Fragmented vs. consolidated"
              lede="What changes operationally when one US partner owns the whole chain instead of five overseas vendors."
            />
          </Reveal>
          <Reveal>
            <div className="border-t-2 border-ink">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-ink md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)]">
                <div className="hidden py-4 pr-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:block">
                  Metric
                </div>
                <div className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:px-6">
                  Fragmented sourcing
                </div>
                <div className="bg-signal px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink md:px-6">
                  With Aaron Technologies
                </div>
              </div>
              <ShowMore
                visible={3}
                total={COMPARISON.length}
                label="rows"
                ruled
              >
                {COMPARISON.map((row, i) => (
                  <div
                    key={row.metric}
                    className={cn(
                      "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)]",
                      i === COMPARISON.length - 1
                        ? "border-b-2 border-ink"
                        : "border-b border-rule",
                    )}
                  >
                    <div className="col-span-2 pt-5 pb-2 text-base font-bold text-ink md:col-span-1 md:py-[22px] md:pr-6">
                      {row.metric}
                    </div>
                    <div className="px-4 pb-5 text-sm leading-[1.6] text-soft md:px-6 md:py-[22px]">
                      {row.fragmented}
                    </div>
                    <div className="bg-signal-wash px-4 pb-5 pt-5 text-sm leading-[1.6] text-ink md:px-6 md:py-[22px]">
                      {row.consolidated}
                    </div>
                  </div>
                ))}
              </ShowMore>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- Industries */}
      <section id="industries" className="bg-paper py-14 md:py-[116px]">
        <div className="shell">
          <Reveal>
            <div className="mb-[54px] flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
              <div>
                <Eyebrow>Industries</Eyebrow>
                <h2 className="mt-5 mb-0 text-ink">Who we supply</h2>
              </div>
              <Link
                href="/industries"
                className="btn-secondary !py-3.5 !px-6 !text-[15px]"
              >
                All industries →
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <ShowMore
              visible={3}
              total={SEGMENTS.length}
              label="segments"
              className="grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2 lg:grid-cols-3"
            >
              {SEGMENTS.map((segment, i) => (
                <Link
                  key={segment.slug}
                  href={`/industries#${segment.slug}`}
                  className="bg-paper px-[30px] pt-[34px] pb-[30px] transition-colors hover:bg-paper-2"
                >
                  <div className="mb-4 flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.11em]",
                        segment.tier === "Tier 1"
                          ? "bg-signal px-2.5 py-1 text-ink"
                          : "border border-rule-strong px-2.5 py-1 text-muted",
                      )}
                    >
                      {segment.tier}
                    </span>
                  </div>
                  <h3 className="m-0 mb-2.5 text-[21px] text-ink">
                    {segment.title}
                  </h3>
                  <p className="m-0 text-sm leading-[1.6] text-body">
                    {segment.body}
                  </p>
                </Link>
              ))}
            </ShowMore>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- FAQ */}
      <section
        id="faq"
        className="border-t border-ink bg-paper-2 py-14 md:py-[116px]"
      >
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-[88px]">
          <div className="lg:sticky lg:top-[132px]">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 mb-[22px] text-ink">Questions buyers ask</h2>
            <p className="m-0 text-base leading-[1.65] text-body">
              Anything not covered here, ask us directly —{" "}
              <a
                href="mailto:kushal@aarontechno.com"
                className="border-b-2 border-signal"
              >
                kushal@aarontechno.com
              </a>
              .
            </p>
          </div>
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- CTA */}
      <CtaBand
        eyebrow="Next step"
        title={
          <>
            Send us a drawing.
            <br />
            Get a real number.
          </>
        }
        body="Itemized landed-cost quotes in 24–48 hours. No obligation, no retainer."
        primary={{ label: "Request a Quote →", href: "/quote" }}
        secondary={{ label: "Email us", href: "mailto:kushal@aarontechno.com" }}
      />
    </>
  );
}
