import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Phone, Calculator, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Get Pricing & Sourcing Support",
  description:
    "Get in touch with Aaron Technologies for pricing, product catalog questions, or quality assurance inquiries. Speak to our US-based support team today.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Direct Access
          </span>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-5 max-w-2xl">
            Chat with our <strong>sales team</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
            Fill out your sourcing requirements and our team will reach out to
            you within 24 hours. Get help with pricing, logistics reviews, or
            custom component specifications.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column: Sidebar Info */}
            <div className="lg:col-span-5 flex flex-col gap-8">

              {/* Quick links */}
              <div>
                <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-4">
                  Other ways to connect
                </span>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+16402721906"
                    className="flex items-center justify-between p-4 rounded-xl border border-border-strong hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-primary block leading-tight">
                          Call Sourcing Office
                        </span>
                        <span className="text-[11px] text-text-tertiary mt-0.5 block">
                          +1 (640) 272-1906 · Mon-Fri, 8AM–6PM EST
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>

                  <Link
                    href="/#calculator"
                    className="flex items-center justify-between p-4 rounded-xl border border-border-strong hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                        <Calculator className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-primary block leading-tight">
                          Landed Cost Calculator
                        </span>
                        <span className="text-[11px] text-text-tertiary mt-0.5 block">
                          Estimate import duty &amp; ocean rates instantly
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/privacy"
                    className="flex items-center justify-between p-4 rounded-xl border border-border-strong hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-primary block leading-tight">
                          Compliance &amp; Data Deletion
                        </span>
                        <span className="text-[11px] text-text-tertiary mt-0.5 block">
                          Learn about our drawing NDA and retention policy
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Testimonial */}
              <div className="glass-card rounded-xl p-6">
                <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                  &ldquo;Aaron Tech consolidated our fastener and casting supply chain.
                  Having a single US contract point and unified logistics support
                  reduced our administrative overhead and shipping delays by 40%.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-[2px] h-8 bg-primary-muted rounded-full" />
                  <div>
                    <span className="text-sm font-medium text-text-primary block leading-tight">
                      Director of Procurement
                    </span>
                    <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight">
                      Apex Automotive Group
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-xl overflow-hidden">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
