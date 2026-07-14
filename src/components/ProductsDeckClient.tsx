"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Filter, Eye, ListFilter, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";
import { resolveIcon } from "@/lib/icons";

interface ProductsDeckClientProps {
  categories: ProductCategory[];
}

type SectorFilter = "all" | "fasteners" | "forgings-castings" | "mechanicals-fluid";

export default function ProductsDeckClient({ categories }: ProductsDeckClientProps) {
  const [activeSector, setActiveSector] = useState<SectorFilter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sector groups matching categories
  const sectors = [
    { id: "all" as const, label: "All Components" },
    { id: "fasteners" as const, label: "Fasteners & Threaded" },
    { id: "forgings-castings" as const, label: "Forgings & Castings" },
    { id: "mechanicals-fluid" as const, label: "Mechanicals & Fluid Controls" },
  ];

  // Map category to sectors
  const filteredCategories = categories.filter((cat) => {
    if (activeSector === "all") return true;
    if (activeSector === "fasteners") {
      return cat.slug === "fasteners";
    }
    if (activeSector === "forgings-castings") {
      return cat.slug === "forged-components" || cat.slug === "castings" || cat.slug === "stamped-parts";
    }
    if (activeSector === "mechanicals-fluid") {
      return cat.slug !== "fasteners" && cat.slug !== "forged-components" && cat.slug !== "castings" && cat.slug !== "stamped-parts";
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* 🧭 Deck Sector Navigation (Swap-style tabs) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-steel-200 pb-6">
        <div className="flex items-center gap-2 text-navy-900">
          <ListFilter className="w-5 h-5 text-copper-500" />
          <span className="font-heading font-bold text-lg">Filter Sourcing Lines</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 bg-steel-200/50 p-1 rounded-xl border border-steel-200/80">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveSector(sector.id)}
              className={cn(
                "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer",
                activeSector === sector.id
                  ? "bg-white text-copper-600 shadow-sm border border-steel-200/20"
                  : "text-steel-600 hover:text-navy-900"
              )}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🎴 Product Deck Cards Grid (Clay-style Spec Overlays) */}
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category) => {
            const Icon = resolveIcon(category.icon);
            const isHovered = hoveredId === category.id;

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col rounded-2xl border border-steel-200/85 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Cover Layer */}
                <div className="relative h-48 w-full bg-steel-50 overflow-hidden border-b border-steel-200/80">
                  <Image
                    src={category.heroImage}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  
                  {/* Glassmorphic Top Bar Tag (Clay style) */}
                  <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-steel-700/60 flex items-center gap-1.5 text-[9px] font-bold font-mono tracking-widest text-copper-400">
                    <Icon className="w-3 h-3" />
                    <span>{category.name.toUpperCase()}</span>
                  </div>

                  {/* Vetted Status Indicator */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md border border-steel-200/80 flex items-center gap-1 text-[9px] font-bold text-success">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <span>VETTED</span>
                  </div>

                  {/* Clay-style Hover Quick Spec Overlay Deck */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 bg-navy-950/95 backdrop-blur-sm p-5 flex flex-col justify-between text-left text-white z-20"
                      >
                        <div className="space-y-3">
                          <span className="text-[9px] font-bold font-mono text-copper-400 uppercase tracking-widest block leading-none">
                            Technical Data
                          </span>
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] text-steel-500 font-bold block leading-none mb-0.5">SIZE RANGE:</span>
                              <span className="text-xs text-steel-200">{category.sizes}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-steel-500 font-bold block leading-none mb-0.5">MATERIALS:</span>
                              <span className="text-xs text-steel-200 line-clamp-1">{category.materials.join(", ")}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-steel-500 font-bold block leading-none mb-0.5">FINISHES:</span>
                              <span className="text-xs text-steel-200 line-clamp-1">{category.finishes?.join(", ") || "Self-colored"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct specification link indicator */}
                        <div className="flex items-center gap-1.5 text-xs text-copper-400 font-semibold border-t border-navy-800 pt-2">
                          <ClipboardCheck className="w-3.5 h-3.5" />
                          <span>MTC files stored digitally</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Base Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-steel-600 leading-relaxed line-clamp-2 mb-4">
                      {category.shortDescription}
                    </p>
                  </div>

                  {/* Standards Badges & Nav Link */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {category.standards.slice(0, 2).map((std) => (
                        <span
                          key={std}
                          className="bg-steel-100 border border-steel-200/50 rounded-md px-2 py-0.5 text-[9px] font-bold text-steel-600 font-mono"
                        >
                          {std}
                        </span>
                      ))}
                      {category.standards.length > 2 && (
                        <span className="bg-steel-100 border border-steel-200/50 rounded-md px-2 py-0.5 text-[9px] font-bold text-steel-500 font-mono">
                          +{category.standards.length - 2} Standard{category.standards.length - 2 > 1 && "s"}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${category.slug}`}
                      className="inline-flex items-center justify-between w-full p-2.5 rounded-xl border border-steel-200 hover:border-copper-500/40 hover:bg-copper-500/5 text-xs font-bold text-navy-900 group/link transition-all"
                    >
                      <span className="flex items-center gap-1.5 text-steel-700 group-hover/link:text-copper-600">
                        <Eye className="w-3.5 h-3.5 text-steel-400 group-hover/link:text-copper-600" />
                        Explore Components
                      </span>
                      <ArrowRight className="w-4 h-4 text-steel-400 group-hover/link:text-copper-600 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
