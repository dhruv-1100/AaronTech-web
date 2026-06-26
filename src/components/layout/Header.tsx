"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronRight,
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
  Factory,
  ShieldCheck,
  TrendingDown,
  Globe,
  BookOpen,
  Calculator,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/data/site";
import { productCategories } from "@/lib/data/products";
import { industries } from "@/lib/data/industries";

// Icon map for products
const iconMap: Record<string, React.ElementType> = {
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
  Factory,
  ShieldCheck,
  TrendingDown,
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-steel-200/80">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 overflow-hidden relative rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-steel-200">
              <img
                src="/logo.png"
                alt="Aaron Technologies Logo"
                className="w-10 h-10 object-contain scale-[1.45] absolute"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-navy-900 text-[19px] tracking-tight leading-none group-hover:text-copper-600 transition-colors">
                Aaron Technologies
              </span>
              <span className="text-[10px] text-steel-500 font-bold tracking-[0.16em] uppercase mt-1 leading-none">
                Industrial Components
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 h-full">
            {mainNav.map((item) => {
              const hasDropdown = ["Products", "Industries", "Resources"].includes(item.label);
              return (
                <div
                  key={item.href}
                  className="relative h-full flex items-center py-6"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-copper-600 bg-copper-500/10 font-bold"
                        : "text-steel-700 hover:text-navy-900 hover:bg-steel-100"
                    )}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300 text-steel-500",
                          hoveredItem === item.label && "rotate-180 text-copper-500"
                        )}
                      />
                    )}
                  </Link>

                  {/* Precoro-style Dropdowns */}
                  <AnimatePresence>
                    {hasDropdown && hoveredItem === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "absolute top-full bg-white rounded-2xl border border-steel-200/80 shadow-2xl p-6 z-50 mt-1.5 flex flex-col",
                          item.label === "Products" && "w-[660px] left-1/2 -translate-x-1/2",
                          item.label === "Industries" && "w-[440px] left-1/2 -translate-x-1/2",
                          item.label === "Resources" && "w-[290px] left-1/2 -translate-x-1/2"
                        )}
                      >
                        {/* Products Content */}
                        {item.label === "Products" && (
                          <>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              {productCategories.slice(0, 6).map((cat) => {
                                const Icon = iconMap[cat.icon] || Package;
                                return (
                                  <Link
                                    key={cat.id}
                                    href={`/products/${cat.slug}`}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-steel-50/80 transition-all group"
                                  >
                                    <div className="w-10 h-10 rounded-xl bg-copper-500/10 text-copper-600 flex items-center justify-center shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                                      <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-navy-900 group-hover:text-copper-600 transition-colors">
                                        {cat.name}
                                      </div>
                                      <div className="text-xs text-steel-500 mt-1 leading-relaxed">
                                        {cat.shortDescription}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="border-t border-steel-100 pt-4 mt-4 flex justify-between items-center text-xs">
                              <span className="text-steel-400 font-medium">ISO 9001 Audited Supplier Network</span>
                              <Link
                                href="/products"
                                className="text-copper-500 hover:text-copper-600 font-bold flex items-center gap-1 group/more"
                              >
                                <span>View All 12 Categories</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/more:translate-x-0.5" />
                              </Link>
                            </div>
                          </>
                        )}

                        {/* Industries Content */}
                        {item.label === "Industries" && (
                          <>
                            <div className="flex flex-col gap-3">
                              {industries.slice(0, 4).map((ind) => (
                                <Link
                                  key={ind.id}
                                  href="/industries"
                                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-steel-50/80 transition-all group"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-copper-500/10 text-copper-600 flex items-center justify-center shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                                    <Globe className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-navy-900 group-hover:text-copper-600 transition-colors">
                                      {ind.name}
                                    </div>
                                    <div className="text-xs text-steel-500 mt-1 leading-relaxed line-clamp-1">
                                      {ind.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-steel-100 pt-4 mt-4 flex justify-between items-center text-xs">
                              <span className="text-steel-400 font-medium">Custom Engineering Solutions</span>
                              <Link
                                href="/industries"
                                className="text-copper-500 hover:text-copper-600 font-bold flex items-center gap-1 group/more"
                              >
                                <span>All Industries</span>
                                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/more:translate-x-0.5" />
                              </Link>
                            </div>
                          </>
                        )}

                        {/* Resources Content */}
                        {item.label === "Resources" && (
                          <div className="flex flex-col gap-1.5">
                            {[
                              { label: "Sourcing Guides & News", href: "/resources", desc: "Latest technical publications", icon: BookOpen },
                              { label: "Landed Cost Calculator", href: "/#calculator", desc: "Estimate import unit rates", icon: Calculator },
                              { label: "Quality Certifications", href: "/certifications", desc: "ISO 9001 compliance logs", icon: ShieldCheck },
                              { label: "About Our Company", href: "/about", desc: "US-India operational network", icon: Info },
                            ].map((sub) => {
                              const Icon = sub.icon;
                              return (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-steel-50/80 transition-all group"
                                >
                                  <div className="w-9 h-9 rounded-xl bg-copper-500/10 text-copper-600 flex items-center justify-center shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                                    <Icon className="w-4.5 h-4.5" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-navy-900 group-hover:text-copper-600 transition-colors leading-tight">
                                      {sub.label}
                                    </div>
                                    <div className="text-[10px] text-steel-500 mt-1 leading-none">
                                      {sub.desc}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Request a Quote
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-steel-700 hover:bg-steel-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-steel-200 bg-white">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-copper-600 bg-copper-500/10"
                      : "text-steel-700 hover:text-navy-900 hover:bg-steel-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-5 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold rounded-full transition-colors"
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

