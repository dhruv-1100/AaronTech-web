"use client";

import Link from "next/link";
import { ArrowRight, Home, Wrench, FileText, Phone } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-xl w-full text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-7xl sm:text-8xl text-text-primary tracking-tighter mb-2">
            404
          </h1>
          <span className="font-mono text-xs uppercase text-primary-muted tracking-tight">
            Page Not Found
          </span>
        </div>

        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
          The requested resource could not be found. It may have been moved,
          renamed, or is currently undergoing maintenance.
        </p>

        <div className="border-t border-border pt-8 text-left">
          <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-4">
            Where to go next
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "Homepage", href: "/", icon: Home },
              { label: "Products", href: "/products", icon: Wrench },
              { label: "Resources", href: "/resources", icon: FileText },
              { label: "Contact Us", href: "/contact", icon: Phone },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-lg border border-border-strong hover:border-primary/30 hover:bg-bg-subtle transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-text-tertiary group-hover:text-text-primary" aria-hidden="true" />
                    <span className="text-sm font-medium text-text-primary">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary text-left">
            Need a custom quote? Skip navigation and submit an RFQ.
          </p>
          <Link
            href="/quote"
            className="btn-primary text-sm shrink-0"
          >
            Request a Quote
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
