"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">

      {/* Left Column: Sidebar Navigation */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 lg:border-r lg:border-border lg:pr-0">
        <div className="pb-4 mb-4">
          <span className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight block mb-1">
            Sourcing Portfolio
          </span>
          <h2 className="text-xl text-text-primary font-medium">
            Product Categories
          </h2>
        </div>

        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-0 scrollbar-thin">
          {categories.map((cat, idx) => {
            const CatIcon = resolveIcon(cat.icon);
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink relative",
                  isSelected
                    ? "text-text-primary bg-bg-subtle"
                    : "text-text-tertiary hover:text-text-primary hover:bg-bg-subtle"
                )}
              >
                {/* Active indicator */}
                {isSelected && (
                  <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-primary rounded-full hidden lg:block" />
                )}
                <span className={cn(
                  "font-mono text-[10px] shrink-0 tracking-tight",
                  isSelected ? "text-primary-muted" : "text-text-muted"
                )}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <CatIcon className={cn("w-4 h-4 shrink-0", isSelected ? "text-text-primary" : "text-text-muted")} aria-hidden="true" />
                <span className="text-sm font-medium tracking-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Showcase Card */}
      <div className="lg:col-span-8 lg:pl-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white border border-border-strong rounded-xl overflow-hidden flex flex-col md:grid md:grid-cols-12"
          >
            {/* Specs Panel */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">

              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight">
                    Category {String(selectedIdx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl text-text-primary font-medium tracking-tight leading-tight mb-3">
                  {activeCategory.name}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {activeCategory.description || activeCategory.shortDescription}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="border-t border-b border-border py-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                      Size Capabilities
                    </span>
                    <span className="text-sm text-text-primary font-medium">{activeCategory.sizes}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                      Standards Met
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {activeCategory.standards.map((std) => (
                        <span key={std} className="bg-bg-subtle border border-border rounded px-1.5 py-0.5 text-[9px] font-mono text-text-tertiary">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                      Available Materials
                    </span>
                    <span className="text-sm text-text-primary font-medium line-clamp-2">{activeCategory.materials.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                      Surface Finishes
                    </span>
                    <span className="text-sm text-text-primary font-medium line-clamp-2">
                      {activeCategory.finishes?.join(", ") || "Self-colored / Plain"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href={`/products/${activeCategory.slug}`}
                  className="w-full sm:w-auto btn-primary text-sm"
                >
                  Explore Subcategories
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/quote"
                  className="w-full sm:w-auto btn-secondary text-sm"
                >
                  Request RFQ
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Image Panel */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full bg-bg-subtle border-l border-border overflow-hidden">
              <Image
                src={activeCategory.heroImage}
                alt={activeCategory.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
