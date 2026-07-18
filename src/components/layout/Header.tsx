"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Wrench,
  Flame,
  FlaskConical,
  CircleDot,
  Gauge,
  Target,
  ToggleRight,
  Droplets,
  Layers,
  Zap,
  Spline,
  Circle,
  Package,
  BookOpen,
  Calculator,
  Info,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/data/site";
import { productCategories } from "@/lib/data/products";

// Icon map for products
const iconMap: Record<string, React.ElementType> = {
  Wrench, Flame, FlaskConical, CircleDot, Gauge, Target,
  ToggleRight, Droplets, Layers, Zap, Spline, Circle, Package,
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[padding] duration-300",
        scrolled
          ? "py-4 px-4 sm:px-6 pointer-events-none bg-transparent"
          : "py-0 border-b border-border bg-white"
      )}
    >
      {/* Navigation Bar container */}
      <div
        className={cn(
          "max-w-[1360px] mx-auto px-6 flex items-center justify-between transition-all duration-300 relative",
          scrolled
            ? "h-14 pointer-events-auto"
            : "h-16 bg-transparent"
        )}
      >
        {/* Sibling Glass Background (placed as sibling to prevent nesting backdrop-filter bugs) */}
        {scrolled && (
          <div
            className="absolute inset-0 -z-10 rounded-full border border-white/15 shadow-2xl"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(60px) saturate(180%)",
              WebkitBackdropFilter: "blur(60px) saturate(180%)"
            }}
          />
        )}

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 overflow-hidden relative rounded-lg flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="Aaron Technologies Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain scale-[1.45] absolute"
            />
          </div>
          <span
            className={cn(
              "font-heading text-[17px] tracking-tight leading-none font-medium transition-colors",
              scrolled
                ? "text-white group-hover:text-white/80"
                : "text-text-primary group-hover:text-primary"
            )}
          >
            Aaron Technologies
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 h-full">
          {mainNav.map((item) => {
            const hasDropdown = ["Products", "Resources"].includes(item.label);
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <div
                key={item.href}
                className="relative h-full flex items-center"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  {...(hasDropdown ? { "aria-haspopup": "true" as const, "aria-expanded": hoveredItem === item.label } : {})}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors flex items-center gap-1 cursor-pointer",
                    scrolled
                      ? isActive
                        ? "text-white font-medium"
                        : "text-white/70 hover:text-white"
                      : isActive
                        ? "text-text-primary font-medium"
                        : "text-text-tertiary hover:text-text-primary"
                  )}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "w-3 h-3 transition-transform duration-300",
                        scrolled ? "text-white/40" : "text-text-muted",
                        hoveredItem === item.label && "rotate-180"
                      )}
                    />
                  )}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-[1.5px]",
                        scrolled ? "bg-white" : "bg-text-primary"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdowns (Floating Glass Panels - CSS Transitions to bypass GPU transform isolation bugs) */}
                {hasDropdown && (
                  <div
                    className={cn(
                      "absolute top-full shadow-2xl p-5 z-50 rounded-2xl transition-all duration-200 origin-top",
                      hoveredItem === item.label
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none",
                      scrolled ? "text-white mt-3" : "text-text-primary mt-0",
                      item.label === "Products" && "w-[580px] left-1/2 -translate-x-1/2",
                      item.label === "Resources" && "w-[260px] left-1/2 -translate-x-1/2"
                    )}
                    style={scrolled ? {
                      backgroundColor: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(35px) saturate(180%)",
                      WebkitBackdropFilter: "blur(35px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)"
                    } : {
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(35px) saturate(180%)",
                      WebkitBackdropFilter: "blur(35px) saturate(180%)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)"
                    }}
                  >
                    {/* Products Dropdown */}
                    {item.label === "Products" && (
                      <>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {productCategories.slice(0, 6).map((cat) => {
                            const Icon = iconMap[cat.icon] || Package;
                            return (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.slug}`}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                  scrolled ? "hover:bg-white/10" : "hover:bg-bg-subtle"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                    scrolled
                                      ? "bg-white/5 text-white/50 group-hover:bg-white/15 group-hover:text-white"
                                      : "bg-bg-muted text-text-tertiary group-hover:bg-primary group-hover:text-white"
                                  )}
                                >
                                  <Icon className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <div>
                                  <div
                                    className={cn(
                                      "text-sm font-medium transition-colors leading-tight",
                                      scrolled
                                        ? "text-white/90 group-hover:text-white"
                                        : "text-text-primary group-hover:text-primary"
                                    )}
                                  >
                                    {cat.name}
                                  </div>
                                  <div
                                    className={cn(
                                      "text-[11px] mt-0.5 leading-tight",
                                      scrolled ? "text-white/50" : "text-text-tertiary"
                                    )}
                                  >
                                    {cat.shortDescription}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div
                          className={cn(
                            "border-t pt-3 mt-3 flex justify-between items-center",
                            scrolled ? "border-white/10" : "border-border"
                          )}
                        >
                          <span
                            className={cn(
                              "font-mono text-[10px] uppercase tracking-tight",
                              scrolled ? "text-white/40" : "text-text-muted"
                            )}
                          >
                            Vetted Supplier Network
                          </span>
                          <Link
                            href="/products"
                            className={cn(
                              "text-xs font-medium flex items-center gap-1 group/more transition-colors",
                              scrolled ? "text-white hover:text-white/80" : "text-text-primary hover:text-accent"
                            )}
                          >
                            <span>View All Categories</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover/more:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </>
                    )}

                    {/* Resources Dropdown */}
                    {item.label === "Resources" && (
                      <div className="flex flex-col gap-0.5">
                        {[
                          { label: "Sourcing Guides & News", href: "/resources", desc: "Technical publications", icon: BookOpen },
                          { label: "Landed Cost Calculator", href: "/#calculator", desc: "Estimate import costs", icon: Calculator },
                          { label: "About Our Company", href: "/about", desc: "Our operational network", icon: Info },
                        ].map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                scrolled ? "hover:bg-white/10" : "hover:bg-bg-subtle"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                  scrolled
                                    ? "bg-white/5 text-white/50 group-hover:bg-white/15 group-hover:text-white"
                                    : "bg-bg-muted text-text-tertiary group-hover:bg-primary group-hover:text-white"
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                              </div>
                              <div>
                                <div
                                  className={cn(
                                    "text-xs font-medium transition-colors leading-tight",
                                    scrolled
                                      ? "text-white/90 group-hover:text-white"
                                      : "text-text-primary group-hover:text-primary"
                                  )}
                                >
                                  {sub.label}
                                </div>
                                <div
                                  className={cn(
                                    "text-[10px] mt-0.5 leading-none",
                                    scrolled ? "text-white/50" : "text-text-tertiary"
                                  )}
                                >
                                  {sub.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 text-sm font-medium rounded-full transition-all shadow-md",
              scrolled
                ? "px-6 py-2 bg-white text-text-primary hover:bg-white/95"
                : "px-6 py-2.5 bg-primary text-white hover:opacity-85"
            )}
          >
            Request a Quote
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-white/70 hover:text-white" : "text-text-tertiary hover:text-text-primary"
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (CSS Transitions) */}
      <div
        className={cn(
          "lg:hidden overflow-hidden shadow-2xl pointer-events-auto transition-all duration-200 origin-top",
          mobileOpen ? "opacity-100 scale-100 h-auto" : "opacity-0 scale-95 h-0 pointer-events-none",
          scrolled ? "mt-2 rounded-2xl" : ""
        )}
        style={scrolled ? {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(35px) saturate(180%)",
          WebkitBackdropFilter: "blur(35px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        } : {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(35px) saturate(180%)",
          WebkitBackdropFilter: "blur(35px) saturate(180%)",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)"
        }}
      >
        <nav className="max-w-[1360px] mx-auto px-6 py-4 flex flex-col gap-0.5">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg text-sm transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? scrolled
                    ? "text-white font-medium bg-white/15"
                    : "text-text-primary font-medium bg-bg-subtle"
                  : scrolled
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-text-tertiary hover:text-text-primary hover:bg-bg-subtle"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "mt-3 flex items-center justify-center gap-2 font-medium text-sm rounded-full transition-colors",
              scrolled
                ? "px-5 py-3 bg-white text-text-primary hover:bg-white/95"
                : "px-5 py-3 bg-primary text-white hover:opacity-85"
            )}
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
