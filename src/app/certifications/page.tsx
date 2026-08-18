import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ShowMore from "@/components/ui/ShowMore";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Page";
import { certifications } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quality Certifications & Compliance Standards",
  description:
    "Aaron Technologies suppliers maintain ISO 9001, RoHS, REACH, ASTM/ASME, API, and UL certifications. Full compliance documentation provided with every shipment.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Quality Certifications & Compliance | Aaron Technologies",
    description:
      "ISO 9001, RoHS, REACH, ASTM/ASME, API, and UL certified supplier network. Full compliance documentation on every shipment.",
    url: "/certifications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | Aaron Technologies",
  },
};

const DOSSIER = [
  {
    code: "MTC",
    title: "Mill test certificate",
    body: "EN 10204 3.1 — chemical composition, mechanical properties, heat treatment, heat number.",
  },
  {
    code: "CoC",
    title: "Certificate of conformance",
    body: "Signed statement tying the lot to the purchase order specification and revision.",
  },
  {
    code: "FAI",
    title: "First-article inspection",
    body: "Dimensional verification against your drawing, approved before the batch runs.",
  },
  {
    code: "CMM",
    title: "Dimensional report",
    body: "Coordinate-measuring output on precision machined work, per feature and tolerance.",
  },
  {
    code: "NDT",
    title: "Non-destructive testing",
    body: "Radiographic or ultrasonic examination on critical forgings, castings and valve bodies.",
  },
  {
    code: "DEC",
    title: "Compliance declarations",
    body: "RoHS and REACH declarations, UL listings and CE marking documentation as applicable.",
  },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & compliance"
        title="Certifications & standards."
        lede="Every component sourced through Aaron Technologies is backed by internationally recognized certification. Compliance documentation ships with the parts, not weeks later on request."
        stats={[
          {
            value: String(certifications.length),
            label: "Active certifications",
          },
          { value: "100%", label: "Documentation rate" },
          { value: "30+", label: "Audited facilities" },
        ]}
      />

      {/* Standards held */}
      <section className="border-b border-ink bg-paper py-14 md:py-[100px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="Standards held"
              title="What the network is certified to"
              lede="Certification is a floor, not a finish line. We audit against these standards and keep the evidence on file for every lot we ship."
            />
          </Reveal>
          <Reveal>
            <ShowMore
              visible={3}
              total={certifications.length}
              label="certifications"
              className="grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2 lg:grid-cols-3"
            >
              {certifications.map((cert, i) => (
                <div
                  key={cert.id}
                  className="flex flex-col bg-paper px-8 py-[38px]"
                >
                  <div className="mb-[22px] flex items-baseline justify-between gap-4">
                    <span className="text-[26px] font-black tracking-[-0.035em] text-ink">
                      {cert.shortName}
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="mb-[22px] h-1.5 w-11 bg-signal"
                    aria-hidden="true"
                  />
                  <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {cert.issuingBody}
                  </span>
                  <h3 className="m-0 mb-3 text-lg text-ink">{cert.name}</h3>
                  <p className="m-0 text-sm leading-[1.65] text-body">
                    {cert.description}
                  </p>
                </div>
              ))}
            </ShowMore>
          </Reveal>
        </div>
      </section>

      {/* Document set */}
      <section className="bg-ink py-14 md:py-[100px]">
        <div className="shell">
          <Reveal>
            <SectionHead
              tone="ink"
              eyebrow="Document set"
              title="Paperwork per shipment"
              lede="The dossier your quality team receives with each container. Anything additional your process requires, name it on the RFQ and we will confirm it upfront."
            />
          </Reveal>
          <Reveal className="border-t border-signal">
            {DOSSIER.map((doc, i) => (
              <div
                key={doc.code}
                className={cn(
                  "grid items-baseline gap-x-9 gap-y-3 py-[26px] lg:grid-cols-[90px_minmax(0,1fr)_minmax(0,2fr)]",
                  i < DOSSIER.length - 1 && "border-b border-ink-3",
                )}
              >
                <span className="justify-self-start bg-signal px-2.5 py-[5px] font-mono text-xs text-ink">
                  {doc.code}
                </span>
                <h3 className="m-0 text-lg text-white">{doc.title}</h3>
                <p className="m-0 text-sm leading-[1.65] text-dim-2">
                  {doc.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need specific compliance documentation?"
        body="Tell us what your quality system requires — MTCs, CoCs, RoHS declarations, PPAP levels — and we will confirm availability before you commit."
        primary={{ label: "Request a quote →", href: "/quote" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
