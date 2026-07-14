import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, Phone, Calculator, ShieldCheck, FileText, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Get Pricing & Sourcing Support",
  description:
    "Get in touch with Aaron Technologies for pricing, product catalog questions, or quality assurance inquiries. Speak to our US-based support team today.",
};

const LOGOS = [
  { name: "Apex Auto" },
  { name: "Texas Valve" },
  { name: "EnergyGrid" },
  { name: "Precision Parts" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Header Section (PayPal-style partial bleed) */}
      <section className="section-dark relative overflow-hidden pb-16 pt-20 lg:pb-36 lg:pt-24">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Ambient floating glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-copper-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-copper-400">
              Direct Access
            </p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-5 leading-[1.1] tracking-tight">
              Chat with our <span className="text-gradient">sales team</span>
            </h1>
            <p className="text-steel-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Fill out your sourcing requirements and our team will reach out to you within 24 hours. Get help with pricing, schedule a logistics review, or explore custom component specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (Grid layout with Form overlapping) */}
      <section className="bg-steel-100 relative z-10">
        {/* Subtle grid pattern background matching Reducto */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.2) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Testimonials & Info (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10 lg:space-y-0">
              
              {/* Other Ways to Connect (PayPal style) */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-widest">
                  Some other ways to connect with us
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:+16402721906"
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-steel-200 hover:border-copper-500/40 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-900/5 text-navy-900 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-navy-900 block leading-tight">Call Sourcing Office</span>
                        <span className="text-[11px] text-steel-500 mt-0.5 block">+1 (640) 272-1906 · Mon-Fri, 8AM–6PM EST</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
                  </a>

                  <Link
                    href="/#calculator"
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-steel-200 hover:border-copper-500/40 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-900/5 text-navy-900 flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-navy-900 block leading-tight">Landed Cost Calculator</span>
                        <span className="text-[11px] text-steel-500 mt-0.5 block">Estimate import duty &amp; ocean rates instantly</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/privacy"
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-steel-200 hover:border-copper-500/40 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-900/5 text-navy-900 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-navy-900 block leading-tight">Compliance &amp; Data Deletion</span>
                        <span className="text-[11px] text-steel-500 mt-0.5 block">Learn about our drawing NDA and retention policy</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Trusted Logos (Reducto style) */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-steel-500 uppercase tracking-wider block">
                  Trusted by buyers in manufacturing &amp; distribution
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 opacity-65 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  {LOGOS.map((logo) => (
                    <span
                      key={logo.name}
                      className="font-heading font-bold text-base tracking-tight text-navy-900"
                    >
                      {logo.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote Card (Reducto style) */}
              <div className="bg-white border border-steel-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <Quote className="w-8 h-8 text-copper-500/10 absolute top-4 right-4" />
                <p className="text-sm text-steel-700 leading-relaxed italic relative z-10">
                  "Aaron Tech consolidated our fastener and casting supply chain. Having a single US contract point and unified logistics support reduced our administrative overhead and shipping delays by 40%."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-copper-500 rounded-full" />
                  <div>
                    <span className="text-xs font-bold text-navy-900 block">Director of Procurement</span>
                    <span className="text-[10px] text-steel-500 uppercase font-semibold">Apex Automotive Group</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Form (lg:col-span-7) with PayPal-style overlap */}
            <div className="lg:col-span-7 lg:-mt-24 relative z-20">
              <div className="shadow-2xl rounded-2xl bg-white p-1">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
