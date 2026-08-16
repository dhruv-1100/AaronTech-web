import Link from "next/link";
import { Eyebrow } from "@/components/ui/Page";

const DESTINATIONS = [
  { label: "Homepage", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFoundContent() {
  return (
    <div className="shell flex min-h-[70vh] items-center py-20">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center gap-3.5">
          <span className="rule-tab" aria-hidden="true" />
          <Eyebrow>Error 404</Eyebrow>
        </div>

        <h1 className="mb-7 text-ink">Page not found.</h1>

        <p className="m-0 mb-12 max-w-[38em] text-[19px] leading-[1.6] text-body">
          The requested resource could not be found. It may have been moved,
          renamed, or is currently undergoing maintenance.
        </p>

        <div className="border-t-2 border-ink">
          <div className="border-b border-ink py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Where to go next
          </div>
          {DESTINATIONS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`catalog-row grid-cols-[minmax(0,1fr)_30px] gap-7 py-5 ${
                i === DESTINATIONS.length - 1
                  ? "border-b-2 border-ink"
                  : "border-b border-rule"
              }`}
            >
              <span className="text-[19px] font-medium tracking-[-0.015em] text-ink">
                {link.label}
              </span>
              <span
                aria-hidden="true"
                className="row-arrow justify-self-end text-sm text-ink"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="m-0 text-sm text-muted">
            Need a custom quote? Skip navigation and submit an RFQ.
          </p>
          <Link href="/quote" className="btn-primary shrink-0">
            Request a Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
