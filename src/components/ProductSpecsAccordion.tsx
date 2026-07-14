"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Ruler, Settings, FileText, CheckCircle2, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DetailedProduct } from "@/types";

interface ProductSpecsAccordionProps {
  product: DetailedProduct;
}

interface AccordionSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

export default function ProductSpecsAccordion({ product }: ProductSpecsAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>("specs");

  const sections: AccordionSection[] = [
    {
      id: "specs",
      title: "Material & Physical Specifications",
      icon: Ruler,
      content: (
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-steel-700">
          <div>
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-1">
              Materials &amp; Grades
            </span>
            <p className="whitespace-pre-line">{product.material}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-1">
                Size Capabilities
              </span>
              <p>{product.sizes}</p>
            </div>
            <div>
              <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-1">
                Available Finishes
              </span>
              <p>{product.finishes.join(", ")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "standards",
      title: "Regulatory Standards & Tolerances",
      icon: Settings,
      content: (
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-steel-700">
          <div>
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-2">
              Applicable Engineering Standards
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.standards.map((std) => (
                <span
                  key={std}
                  className="inline-block bg-steel-200 text-steel-800 text-xs px-2.5 py-1 rounded-md font-semibold"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-1">
              Machining Tolerances
            </span>
            <p>{product.tolerances}</p>
          </div>
        </div>
      ),
    },
    {
      id: "quality",
      title: "Quality Assurance & Conformance",
      icon: Shield,
      content: (
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-steel-700">
          <div>
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-2">
              Quality Certifications Included
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-block bg-copper-500/10 text-copper-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-copper-500/20"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-1">
              Traceability Documentation
            </span>
            <p>
              Every shipment matches full trace log standards. Mill test reports (MTCs) per EN 10204 3.1 and compliance conformance certificates are stored digitally and shipped with the shipment container.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "applications",
      title: "Target Applications & Fields",
      icon: Warehouse,
      content: (
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-steel-700">
          <div>
            <span className="font-heading font-bold text-navy-900 block text-xs uppercase tracking-wider mb-2">
              Typical Integration Environments
            </span>
            <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {product.applications.map((app) => (
                <li key={app} className="flex items-center gap-2 text-sm text-steel-700">
                  <CheckCircle2 className="w-4 h-4 text-copper-500 flex-shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="border border-steel-200/80 rounded-2xl bg-white shadow-sm overflow-hidden divide-y divide-steel-200/60">
      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedId === section.id;

        return (
          <div key={section.id} className="w-full">
            <button
              onClick={() => setExpandedId(isExpanded ? null : section.id)}
              className={cn(
                "w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer",
                isExpanded ? "bg-steel-50/50" : "hover:bg-steel-50/20"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                    isExpanded ? "bg-copper-500 text-white" : "bg-navy-900/5 text-navy-900"
                  )}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="font-heading font-bold text-navy-900 text-base sm:text-lg">
                  {section.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-steel-500 transition-transform duration-300",
                  isExpanded && "rotate-180 text-copper-500"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 border-t border-steel-100 bg-white">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
