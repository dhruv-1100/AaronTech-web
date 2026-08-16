"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Reading-progress rule sitting on the header's bottom edge.
  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-ink">
        <div className="shell flex items-center justify-between gap-6 py-2.5 font-mono text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+16402721906"
              className="text-dim hover:text-signal transition-colors"
            >
              +1 (640) 272-1906
            </a>
            <a
              href="mailto:kushal@aarontechno.com"
              className="hidden text-dim hover:text-signal transition-colors sm:inline"
            >
              kushal@aarontechno.com
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="block h-1.5 w-1.5 bg-signal" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.13em] text-dim-2">
              Quoting in 24–48 hrs
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-60 border-b border-ink bg-paper/92 backdrop-blur-[10px]">
        <div className="shell flex h-[78px] items-center gap-10">
          <Link
            href="/"
            className="mr-auto flex items-baseline gap-[11px]"
            aria-label="Aaron Technologies — home"
          >
            <span className="text-[23px] font-black leading-none tracking-[-0.035em] text-ink">
              AARON
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Technologies
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-paper-3 hover:text-ink",
                  isActive(item.href)
                    ? "text-ink shadow-[inset_0_-3px_0_0_var(--color-signal)]"
                    : "text-body"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/quote"
            className="hidden shrink-0 items-center gap-2 bg-ink px-[22px] py-3 text-sm font-bold text-signal transition-colors hover:bg-signal hover:text-ink sm:inline-flex"
          >
            Request a Quote
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="-mr-2 p-2 text-ink lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="h-0.5">
          <div
            className="h-0.5 bg-signal"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="border-t border-ink bg-paper lg:hidden"
          >
            <div className="shell flex flex-col py-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-rule py-4 text-lg font-medium",
                    isActive(item.href) ? "text-ink" : "text-body"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/quote"
                className="my-4 inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-base font-bold text-signal"
              >
                Request a Quote →
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
