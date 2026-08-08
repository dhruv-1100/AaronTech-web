import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { mainNav } from "@/lib/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border">
      {/* Main Footer Grid */}
      <div className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 overflow-hidden relative rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Aaron Technologies Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain scale-[1.45] absolute"
                />
              </div>
              <span className="font-heading text-text-primary text-base tracking-tight font-medium leading-none">
                Aaron Technologies
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              US-based industrial component supplier sourcing precision-engineered
              products from vetted Indian manufacturers. Competitive pricing,
              full traceability, and US-based support.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:opacity-85 transition-opacity"
            >
              Request a Quote
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs uppercase tracking-tight text-text-tertiary mb-5 font-medium">
              Navigation
            </p>
            <ul className="space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Lines */}
          <div>
            <p className="font-mono text-xs uppercase tracking-tight text-text-tertiary mb-5 font-medium">
              Product Lines
            </p>
            <ul className="space-y-3">
              {[
                { name: "Fasteners", slug: "fasteners" },
                { name: "Forged Components", slug: "forged-components" },
                { name: "Castings", slug: "castings" },
                { name: "Bearings & Bushings", slug: "bearings-bushings" },
                { name: "Industrial Valves", slug: "industrial-valves" },
                { name: "Precision Machined", slug: "precision-machined" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs uppercase tracking-tight text-text-tertiary mb-5 font-medium">
              Contact
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+16402721906"
                  className="flex items-start gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-text-tertiary group-hover:text-text-primary" aria-hidden="true" />
                  <span>+1 (640) 272-1906</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kushal@aarontechno.com"
                  className="flex items-start gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-text-tertiary group-hover:text-text-primary" aria-hidden="true" />
                  <span>kushal@aarontechno.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 mt-0.5 text-text-tertiary" aria-hidden="true" />
                  <span>
                    Aaron Technologies Inc.
                    <br />
                    New Jersey, United States
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Internal Link Siloing Block */}
      <div className="border-t border-border bg-bg-subtle/50 py-6">
        <div className="max-w-[1360px] mx-auto px-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mb-3 font-medium">
            Popular Component Sourcing Lines
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
            {[
              { name: "Hex Bolts & Studs", href: "/products/fasteners/hex-bolts" },
              { name: "Socket Head Cap Screws", href: "/products/fasteners/socket-head-cap-screws" },
              { name: "Flange Forgings", href: "/products/forged-components/flanges-weld-neck-slip-on-blind" },
              { name: "Investment Castings", href: "/products/castings/investment-castings" },
              { name: "CNC Machined Parts", href: "/products/precision-machined/cnc-turned-components" },
              { name: "Ball Valves", href: "/products/industrial-valves/ball-valves" },
              { name: "ISO 9001 Quality Standards", href: "/certifications" },
              { name: "ASTM A193 / A320 Guide", href: "/resources/astm-a193-vs-a320-fasteners" },
              { name: "Landed Cost Calculator", href: "/#calculator" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text-primary underline decoration-border underline-offset-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1360px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[11px] uppercase text-text-tertiary tracking-tight">
            © {currentYear} Aaron Technologies Inc. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="font-mono text-[11px] uppercase text-text-tertiary hover:text-text-primary transition-colors tracking-tight">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-mono text-[11px] uppercase text-text-tertiary hover:text-text-primary transition-colors tracking-tight">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
