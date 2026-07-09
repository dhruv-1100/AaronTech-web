import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Get Pricing & Sourcing Support",
  description:
    "Get in touch with Aaron Technologies for pricing, product catalog questions, or quality assurance inquiries. Speak to our US-based support team today.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (640) 272-1906",
    description: "Mon-Fri, 8:00 AM – 6:00 PM EST",
    href: "tel:+16402721906",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "kushal@aarontechno.com",
    description: "We respond within 24 hours",
    href: "mailto:kushal@aarontechno.com",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    detail: "Aaron Technologies Inc.",
    description: "New Jersey, United States",
  },
];

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "ISO 9001 Vetted Suppliers",
    description: "Every order is sourced from certified manufacturers and double-inspected.",
  },
  {
    icon: Headphones,
    title: "US-Based Sourcing Support",
    description: "Contracts, invoicing, and support are entirely domestic to simplify procurement.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark relative overflow-hidden">
        {/* Subtle grid pattern */}
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
              Get In Touch
            </p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4 leading-[1.1]">
              Contact Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-2xl">
              Have questions about our sourcing capabilities, product specifications, or quality processes? Reach out to our US support team for rapid guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Form Column (Left, wider) */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info Sidebar (Right) */}
            <div className="space-y-8">
              {/* Direct Info Card */}
              <div className="bg-white rounded-2xl border border-steel-200/80 p-6 sm:p-8 shadow-sm">
                <h3 className="font-heading font-bold text-navy-900 text-lg mb-6 pb-3 border-b border-steel-200">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {CONTACT_INFO.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy-900/5 text-navy-700 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-navy-900 text-sm">
                            {item.title}
                          </h4>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-base text-steel-700 hover:text-copper-500 transition-colors font-semibold block mt-0.5"
                            >
                              {item.detail}
                            </a>
                          ) : (
                            <span className="text-base text-steel-700 font-semibold block mt-0.5">
                              {item.detail}
                            </span>
                          )}
                          <span className="text-xs text-steel-500 block mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sourcing Highlights Card */}
              <div className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden section-dark border border-navy-800">
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10 space-y-6">
                  <h3 className="font-heading font-bold text-white text-lg pb-3 border-b border-navy-700">
                    Why Partner With Us?
                  </h3>
                  <div className="space-y-5">
                    {HIGHLIGHTS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/10 text-copper-400 flex items-center justify-center">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-white text-sm">
                              {item.title}
                            </h4>
                            <p className="text-xs text-steel-400 leading-relaxed mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
