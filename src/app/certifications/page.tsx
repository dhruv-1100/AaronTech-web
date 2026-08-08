import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { certifications } from "@/lib/data/site";
import { resolveIcon } from "@/lib/icons";

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

export default function CertificationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Quality & Compliance
          </span>
          <h1 className="text-4xl md:text-5xl leading-[1.1] mb-5">
            Certifications & <strong>Standards</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Every component sourced through Aaron Technologies is backed by
            internationally recognized certifications. Full compliance
            documentation is provided with every shipment.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 border-t border-border pt-8">
            {[
              { value: "6", label: "Active Certifications" },
              { value: "100%", label: "Documentation Rate" },
              { value: "30+", label: "Audited Facilities" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`${i < 2 ? "border-r border-border" : ""} ${i > 0 ? "pl-6" : ""} py-2`}
              >
                <p className="text-2xl md:text-3xl text-text-primary tracking-tight">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase text-text-tertiary mt-1 tracking-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => {
              const Icon = resolveIcon(cert.icon);
              return (
                <div
                  key={cert.id}
                  className="glass-card rounded-xl p-6 md:p-8 space-y-4 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-text-primary leading-tight">
                        {cert.shortName}
                      </h2>
                      <p className="font-mono text-[9px] uppercase text-text-tertiary tracking-tight">
                        {cert.issuingBody}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-text-primary">
                    {cert.name}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-xl border border-border-strong p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl leading-tight mb-3">
              Need specific <strong>compliance documentation?</strong>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              We provide mill test certificates (MTCs), certificates of
              conformity (CoCs), RoHS declarations, and all applicable
              compliance documentation with every shipment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote" className="btn-primary px-8 py-3.5">
                Request a Quote
                <Send className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
