import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { PageHero } from "@/components/ui/Page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us — Get Pricing & Sourcing Support",
  description:
    "Get in touch with Aaron Technologies for pricing, product catalog questions, or quality assurance inquiries. Speak to our US-based support team today.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — Get Pricing & Sourcing Support",
    description:
      "Get in touch with Aaron Technologies for pricing, product catalog questions, or quality assurance inquiries.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aaron Technologies",
  },
};

const CHANNELS = [
  {
    label: "Phone",
    value: "+1 (640) 272-1906",
    href: "tel:+16402721906",
    note: "Mon–Fri, 8am–6pm ET",
  },
  {
    label: "Email",
    value: "kushal@aarontechno.com",
    href: "mailto:kushal@aarontechno.com",
    note: "Replies within one business day",
  },
  {
    label: "Office",
    value: "Aaron Technologies Inc.",
    note: "New Jersey, United States",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the sourcing desk."
        lede="One US-based team handles quoting, quality and logistics. No call centre, no routing — you get the person who will run your order."
      />

      <section className="border-b border-ink bg-paper pt-16 pb-20 md:pt-[88px] md:pb-[100px]">
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <div className="border-t-2 border-ink">
              {CHANNELS.map((channel, i) => (
                <div
                  key={channel.label}
                  className={cn(
                    "py-7",
                    i === CHANNELS.length - 1
                      ? "border-b-2 border-ink"
                      : "border-b border-rule"
                  )}
                >
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {channel.label}
                  </span>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="block text-2xl font-bold tracking-[-0.02em] text-ink transition-colors hover:text-muted"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <span className="block text-2xl font-bold tracking-[-0.02em] text-ink">
                      {channel.value}
                    </span>
                  )}
                  <span className="mt-2.5 block font-mono text-xs text-muted">
                    {channel.note}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 bg-ink p-8">
              <h2 className="m-0 mb-3.5 text-xl text-white">
                Have a drawing ready?
              </h2>
              <p className="m-0 mb-[22px] text-sm leading-[1.6] text-dim-2">
                The RFQ form captures the specification detail we need to quote
                properly — it is faster than a back-and-forth thread.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-white"
              >
                Request a quote →
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
