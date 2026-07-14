"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, ClipboardCheck, ArrowUpRight, Wrench, Flame, FlaskConical, CircleDot, Settings, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";
import { resolveIcon } from "@/lib/icons";

interface ProductsDeckClientProps {
  categories: ProductCategory[];
}

export default function ProductsDeckClient({ categories }: ProductsDeckClientProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeCategory = categories[selectedIdx];
  const Icon = resolveIcon(activeCategory.icon);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
      
      {/* 🧭 Left Column: Deck Navigation Sidebar (T1 Energy Style) */}
      <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
        <div className="pb-4 border-b border-steel-200 mb-4">
          <span className="text-[10px] font-bold text-copper-500 uppercase tracking-widest block mb-1">
            Sourcing Portfolio
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-navy-900">
            Product Categories
          </h2>
        </div>

        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-1.5 scrollbar-thin">
          {categories.map((cat, idx) => {
            const CatIcon = resolveIcon(cat.icon);
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3.5 rounded-xl border text-left transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink",
                  isSelected
                    ? "bg-navy-900 border-navy-900 text-white shadow-lg translate-x-1"
                    : "bg-white border-steel-200/80 text-steel-600 hover:border-steel-300 hover:text-navy-900 hover:bg-steel-50/50"
                )}
              >
                <span className={cn(
                  "text-[10px] font-mono font-bold shrink-0",
                  isSelected ? "text-copper-400" : "text-steel-400"
                )}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <CatIcon className={cn("w-4 h-4 shrink-0", isSelected ? "text-copper-400" : "text-steel-400")} />
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎴 Right Column: Showcase Card Deck (T1 Energy Style) */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white border border-steel-200/90 rounded-2xl shadow-xl overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[520px]"
          >
            {/* Left Section: Technical Specs Panel (md:col-span-7) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-900/5 text-navy-900 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-copper-500 uppercase tracking-widest">
                    SYSTEM CATEGORY {String(selectedIdx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-navy-900 tracking-tight leading-none mb-3">
                  {activeCategory.name}
                </h3>
                <p className="text-sm leading-relaxed text-steel-600">
                  {activeCategory.description || activeCategory.shortDescription}
                </p>
              </div>

              {/* Technical Specifications Grid (T1 style) */}
              <div className="border-t border-b border-steel-100 py-5 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div>
                    <span className="text-[9px] font-bold text-steel-400 uppercase tracking-wider block mb-1">
                      Size Capabilities
                    </span>
                    <span className="font-semibold text-navy-900">{activeCategory.sizes}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-steel-400 uppercase tracking-wider block mb-1">
                      Standards Met
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {activeCategory.standards.map((std) => (
                        <span key={std} className="bg-steel-100 border border-steel-200/50 rounded px-1.5 py-0.5 text-[9px] font-bold font-mono text-steel-600">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed pt-2">
                  <div>
                    <span className="text-[9px] font-bold text-steel-400 uppercase tracking-wider block mb-1">
                      Available Materials
                    </span>
                    <span className="font-semibold text-navy-900 line-clamp-2">{activeCategory.materials.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-steel-400 uppercase tracking-wider block mb-1">
                      Surface Finishes
                    </span>
                    <span className="font-semibold text-navy-900 line-clamp-2">
                      {activeCategory.finishes?.join(", ") || "Self-colored / Plain"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href={`/products/${activeCategory.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md text-xs tracking-wide"
                >
                  Explore Subcategories
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-steel-250 hover:border-steel-300 text-navy-900 font-bold rounded-xl transition-all hover:bg-steel-50/50 text-xs"
                >
                  Request RFQ Sourcing
                  <ArrowUpRight className="w-4 h-4 text-steel-400" />
                </Link>
              </div>

            </div>

            {/* Right Section: Large Image Cover (md:col-span-5) */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full bg-steel-50 border-l border-steel-100/50 overflow-hidden">
              <Image
                src={activeCategory.heroImage}
                alt={activeCategory.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
              
              {/* Tech Mesh Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />
              
              {/* Floating Conformance Badge */}
              <div className="absolute bottom-4 right-4 bg-navy-950/90 backdrop-blur-sm border border-steel-750 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-copper-400 shrink-0" />
                <div className="text-left">
                  <span className="text-[8px] font-mono text-steel-400 uppercase tracking-widest block leading-none">Inspections</span>
                  <span className="text-[10px] font-bold text-white leading-none">100% Traceable</span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
