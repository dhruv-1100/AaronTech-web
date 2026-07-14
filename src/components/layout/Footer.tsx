import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { mainNav } from "@/lib/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-steel-400">
      {/* CTA Banner */}
      <div className="border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              Ready to Source Smarter?
            </h3>
            <p className="text-steel-400 max-w-lg">
              Get a competitive quote on industrial components with transparent
              landed-cost pricing. No obligation, fast turnaround.
            </p>
          </div>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full transition-colors shrink-0"
          >
            Request a Quote
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 overflow-hidden relative rounded flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Aaron Technologies Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain scale-[1.45] absolute"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-base leading-none">
                  Aaron Technologies
                </span>
                <span className="text-[9px] text-steel-400 font-bold tracking-[0.16em] uppercase mt-1.5 leading-none">
                  Industrial Components
                </span>
              </div>
            </div>
            <p className="text-sm text-steel-500 leading-relaxed mb-6">
              US-based industrial component supplier sourcing precision-engineered
              products from vetted Indian manufacturers. Competitive pricing,
              full material traceability, and US-based support.
            </p>
            <div className="flex items-center gap-2 text-xs text-steel-500">
              <ShieldCheck className="w-4 h-4 text-copper-500" aria-hidden="true" />
              <span>Vetted Suppliers · Quality Checked</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-copper-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories (top 6) */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Product Lines
            </h4>
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
                    className="text-sm text-steel-400 hover:text-copper-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+16402721906"
                  className="flex items-start gap-3 text-sm hover:text-copper-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-steel-600 group-hover:text-copper-400" aria-hidden="true" />
                  <span>+1 (640) 272-1906</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kushal@aarontechno.com"
                  className="flex items-start gap-3 text-sm hover:text-copper-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-steel-600 group-hover:text-copper-400" aria-hidden="true" />
                  <span>kushal@aarontechno.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-steel-600" aria-hidden="true" />
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

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-steel-600">
          <span>© {currentYear} Aaron Technologies Inc. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-steel-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-steel-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
