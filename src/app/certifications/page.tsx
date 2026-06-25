import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  FlaskConical,
  FileCheck,
  Fuel,
  Zap,
  ArrowRight,
  TestTube2,
  Search,
  FileText,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Certifications & Quality Assurance",
  description:
    "ISO 9001, ASTM/ASME, API, RoHS, REACH and UL certifications. Learn about Aaron Technologies' quality assurance process and material traceability.",
};

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Leaf,
  FlaskConical,
  FileCheck,
  Fuel,
  Zap,
};

const qualitySteps = [
  {
    icon: TestTube2,
    title: "Material Testing",
    description:
      "Raw material composition and mechanical properties verified against ASTM / ASME specifications. Mill test certificates reviewed before production begins.",
  },
  {
    icon: Search,
    title: "In-Process Inspection",
    description:
      "Dimensional checks, hardness testing, and visual inspection at every critical production stage. CMM and non-destructive testing where specified.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description:
      "Complete quality dossier compiled including MTCs, inspection reports, COC, RoHS/REACH declarations, and packing lists per customer requirements.",
  },
  {
    icon: Truck,
    title: "Shipment & Delivery",
    description:
      "Final pre-shipment audit, protective packaging, and door-to-door logistics with real-time tracking. Documentation shared digitally upon dispatch.",
  },
];

export default function CertificationsPage() {
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
              Quality First
            </p>
            <h1 className="max-w-4xl text-4xl sm:text-5xl font-heading font-bold leading-tight text-white mb-4">
              Certifications &amp; <span className="text-gradient">Quality</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-2xl">
              Every component we supply is backed by internationally recognized standards, documented material traceability, and a rigorous multi-stage quality control process.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications - Clean row list (No cards!) */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy-900 mb-3">
              Standards &amp; Accreditations
            </h2>
            <p className="text-steel-600 leading-relaxed">
              We partner exclusively with manufacturing facilities that maintain active accreditations and comply with global industrial specifications.
            </p>
          </div>

          {/* Unified Ledger Container */}
          <div className="bg-white border border-steel-300 rounded-none divide-y divide-steel-200 overflow-hidden">
            {certifications.map((cert) => {
              const Icon = iconMap[cert.icon] ?? ShieldCheck;
              return (
                <div
                  key={cert.id}
                  className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-start transition-colors hover:bg-steel-50/50"
                >
                  {/* Left block: Icon, Short Name, Issuing Body */}
                  <div className="md:w-1/3 flex gap-4 items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-navy-900/5 text-navy-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-bold text-navy-900 leading-snug">
                        {cert.name}
                      </h3>
                      <span className="inline-block rounded-none bg-navy-900/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-900 border border-navy-900/10">
                        {cert.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Right block: Description & Issuing Body Metadata */}
                  <div className="md:w-2/3 space-y-4">
                    <p className="text-sm leading-relaxed text-steel-600">
                      {cert.description}
                    </p>
                    <div className="text-xs text-steel-500 flex items-center gap-1.5 pt-1 border-t border-steel-100">
                      <span className="font-semibold text-steel-700">Issuing Body:</span>
                      <span>{cert.issuingBody}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Process — Timeline */}
      <section className="bg-white border-t border-steel-300">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="text-center mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-copper-500">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
              Quality Assurance at Every Step
            </h2>
            <p className="mx-auto max-w-2xl text-steel-600 leading-relaxed">
              Every Aaron Technologies shipment passes through a rigorous four-stage quality verification pipeline to guarantee compliance before dispatch.
            </p>
          </div>

          {/* Stepper Grid (No cards, just flat connected steps) */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div
              className="absolute left-0 right-0 top-[40px] hidden h-0.5 bg-steel-300 lg:block"
              aria-hidden="true"
            />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {qualitySteps.map((step, idx) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div
                    className={cn(
                      "relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white",
                      idx === qualitySteps.length - 1
                        ? "border-copper-500"
                        : "border-steel-300"
                    )}
                  >
                    <step.icon
                      className={cn(
                        "h-8 w-8",
                        idx === qualitySteps.length - 1
                          ? "text-copper-500"
                          : "text-navy-900"
                      )}
                    />
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 font-heading text-base font-bold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-steel-600 px-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Need Quality Documentation?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-steel-400 leading-relaxed">
            We compile full quality dossiers for every order — including mill test certificates, dimensional records, and chemical assays.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-none bg-copper-500 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-copper-600 cursor-pointer"
          >
            Request Sample Dossier
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
