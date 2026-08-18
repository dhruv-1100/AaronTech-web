import Link from "next/link";
import { mainNav } from "@/lib/data/site";

const PRODUCT_LINES = [
  { name: "Fasteners", slug: "fasteners" },
  { name: "Forged components", slug: "forged-components" },
  { name: "Castings", slug: "castings" },
  { name: "Bearings & bushings", slug: "bearings-bushings" },
  { name: "Industrial valves", slug: "industrial-valves" },
  { name: "Precision machined", slug: "precision-machined" },
];

const SILO_LINKS = [
  { name: "Hex Bolts & Studs", href: "/products/fasteners/hex-bolts" },
  {
    name: "Socket Head Cap Screws",
    href: "/products/fasteners/socket-head-cap-screws",
  },
  {
    name: "Flange Forgings",
    href: "/products/forged-components/flanges-weld-neck-slip-on-blind",
  },
  { name: "Investment Castings", href: "/products/castings/investment-castings" },
  {
    name: "CNC Machined Parts",
    href: "/products/precision-machined/cnc-turned-components",
  },
  { name: "Ball Valves", href: "/products/industrial-valves/ball-valves" },
  { name: "ISO 9001 Quality Standards", href: "/certifications" },
  {
    name: "ASTM A193 / A320 Guide",
    href: "/resources/astm-a193-vs-a320-fasteners",
  },
  { name: "Landed Cost Estimator", href: "/#calculator" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white">
      {children}
    </h2>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-16 md:pt-[84px]">
      <div className="shell grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-[60px]">
        <div>
          <div className="mb-[22px] flex items-baseline gap-[11px]">
            <span className="text-[21px] font-black leading-none tracking-[-0.035em] text-white">
              AARON
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim-2">
              Technologies
            </span>
          </div>
          <p className="mb-6 max-w-[32em] text-sm leading-[1.7] text-dim-3">
            US-based industrial component supplier sourcing precision-engineered
            parts from vetted Indian manufacturers. Competitive landed costs,
            full material traceability, US-based support.
          </p>
          <p className="border-l-[3px] border-signal pl-[13px] font-mono text-[11px] uppercase tracking-[0.1em] text-dim">
            ASTM / ASME · EN 10204 3.1 · RoHS
          </p>
        </div>

        <div>
          <ColumnHeading>Navigation</ColumnHeading>
          <ul className="flex flex-col gap-3 text-sm">
            {[...mainNav, { label: "Certifications", href: "/certifications" }]
              .filter((item) => item.href !== "/contact")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-dim-3 transition-colors hover:text-signal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>Product lines</ColumnHeading>
          <ul className="flex flex-col gap-3 text-sm">
            {PRODUCT_LINES.map((line) => (
              <li key={line.slug}>
                <Link
                  href={`/products/${line.slug}`}
                  className="text-dim-3 transition-colors hover:text-signal"
                >
                  {line.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>Contact</ColumnHeading>
          <div className="flex flex-col gap-[15px] text-sm">
            <a
              href="tel:+16402721906"
              className="font-mono text-[13px] text-dim transition-colors hover:text-signal"
            >
              +1 (640) 272-1906
            </a>
            <a
              href="mailto:kushal@aarontechno.com"
              className="font-mono text-[13px] text-dim transition-colors hover:text-signal"
            >
              kushal@aarontechno.com
            </a>
            <span className="leading-relaxed text-dim-3">
              Aaron Technologies Inc.
              <br />
              New Jersey, United States
            </span>
            <Link
              href="/contact"
              className="mt-1 border-b-2 border-signal pb-1 font-mono text-[11px] uppercase tracking-[0.13em] text-white transition-colors hover:text-signal"
            >
              Contact the desk →
            </Link>
          </div>
        </div>
      </div>

      {/* Internal link silo — kept from the previous build for SEO. */}
      <div className="mt-16 border-t border-ink-3">
        <div className="shell py-7">
          <h2 className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim-4">
            Popular component sourcing lines
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2.5 text-xs">
            {SILO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dim-3 underline decoration-ink-3 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-3">
        <div className="shell flex flex-col items-center justify-between gap-4 py-[22px] font-mono text-[11px] text-dim-4 sm:flex-row">
          <span>© {currentYear} Aaron Technologies Inc.</span>
          <span className="flex gap-[26px]">
            <Link href="/privacy" className="text-dim-4 hover:text-dim">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-dim-4 hover:text-dim">
              Terms of Service
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
