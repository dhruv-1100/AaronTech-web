"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy-900 text-steel-400 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+1-555-0100"
              className="flex items-center gap-1.5 hover:text-steel-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+1 (555) 010-0100</span>
            </a>
            <a
              href="mailto:sales@aarontechnologies.com"
              className="flex items-center gap-1.5 hover:text-steel-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>sales@aarontechnologies.com</span>
            </a>
          </div>
          <span className="text-steel-500">
            US-Based · India-Sourced · ISO 9001 Certified Suppliers
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-steel-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 overflow-hidden relative rounded flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Aaron Technologies Logo"
                className="w-10 h-10 object-contain scale-[1.45] absolute"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-navy-900 text-[19px] tracking-tight leading-none">
                Aaron Technologies
              </span>
              <span className="text-[10px] text-steel-500 font-bold tracking-[0.16em] uppercase mt-1 leading-none">
                Industrial Components
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-none text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-copper-600 bg-copper-500/10"
                    : "text-steel-700 hover:text-navy-900 hover:bg-steel-200/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-none transition-colors"
            >
              Request a Quote
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-none text-steel-700 hover:bg-steel-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-steel-300 bg-white">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-none text-base font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-copper-600 bg-copper-500/10"
                      : "text-steel-700 hover:text-navy-900 hover:bg-steel-200/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-5 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-none transition-colors"
              >
                Request a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
