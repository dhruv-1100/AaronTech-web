"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Ruler, Settings, CheckCircle2, Warehouse } from "lucide-react";
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
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
              Materials &amp; Grades
            </span>
            <p className="whitespace-pre-line text-text-primary">{product.material}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                Size Capabilities
              </span>
              <p className="text-text-primary">{product.sizes}</p>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
                Available Finishes
              </span>
              <p className="text-text-primary">{product.finishes.join(", ")}</p>
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
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-2">
              Applicable Standards
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.standards.map((std) => (
                <span
                  key={std}
                  className="font-mono text-[9px] uppercase bg-bg-subtle border border-border rounded px-2 py-1 text-text-tertiary tracking-tight"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
              Machining Tolerances
            </span>
            <p className="text-text-primary">{product.tolerances}</p>
          </div>
        </div>
      ),
    },
    {
      id: "quality",
      title: "Quality Assurance & Conformance",
      icon: Shield,
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-2">
              Quality Certifications
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[9px] uppercase bg-bg-subtle border border-border rounded px-2 py-1 text-text-tertiary tracking-tight"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-1">
              Traceability Documentation
            </span>
            <p className="text-text-primary">
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
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-tight block mb-2">
              Typical Integration Environments
            </span>
            <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {product.applications.map((app) => (
                <li key={app} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-muted flex-shrink-0" />
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
    <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedId === section.id;

        return (
          <div key={section.id} className="w-full">
            <button
              onClick={() => setExpandedId(isExpanded ? null : section.id)}
              className={cn(
                "w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer",
                isExpanded ? "bg-bg-subtle" : "hover:bg-bg-subtle/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isExpanded ? "bg-primary text-white" : "bg-bg-muted text-text-tertiary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[15px] font-medium text-text-primary">
                  {section.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-text-muted transition-transform duration-300",
                  isExpanded && "rotate-180 text-primary"
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
                  <div className="p-5 border-t border-border bg-white">
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
