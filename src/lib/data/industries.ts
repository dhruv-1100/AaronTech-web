import { Industry } from "@/types";

export const industries: Industry[] = [
  {
    id: "ind-1",
    name: "Industrial Distributors & MRO",
    slug: "distributors-mro",
    tier: 1,
    tierLabel: "Tier 1 — Fastest to Partner",
    description:
      "Bearing & power transmission distributors, fastener distributors, and pump & valve distributors actively diversifying their supplier base for cost advantage. High-volume, recurring orders with lower technical scrutiny — ideal first partners.",
    icon: "Warehouse",
    relatedCategories: [
      "fasteners",
      "bearings-bushings",
      "industrial-valves",
      "hydraulic-pneumatic",
    ],
    examples: [
      "Bearing & Power Transmission Distributors",
      "Fastener Distributors",
      "Pump & Valve Distributors",
      "MRO Supply Houses",
    ],
  },
  {
    id: "ind-2",
    name: "Machine Shops & Job Shops",
    slug: "machine-shops",
    tier: 1,
    tierLabel: "Tier 1 — Fastest to Partner",
    description:
      "Independent machine shops and job shops with fast decision cycles and strong price sensitivity. Excellent early partners for building case studies and proving supply chain reliability.",
    icon: "Factory",
    relatedCategories: [
      "precision-machined",
      "fasteners",
      "castings",
      "springs-wire-forms",
    ],
    examples: [
      "CNC Machine Shops",
      "Prototype Manufacturers",
      "Small-Batch Production Shops",
    ],
  },
  {
    id: "ind-3",
    name: "Contract Manufacturers",
    slug: "contract-manufacturers",
    tier: 1,
    tierLabel: "Tier 1 — Fastest to Partner",
    description:
      "Contract manufacturers always seeking cost-competitive component suppliers. They value reliable delivery, consistent quality, and competitive landed costs above all else.",
    icon: "Cog",
    relatedCategories: [
      "precision-machined",
      "sheet-metal-enclosures",
      "castings",
      "rubber-plastic-molded",
    ],
    examples: [
      "Electronics Contract Manufacturers",
      "Mechanical Assembly CMs",
      "Build-to-Print Manufacturers",
    ],
  },
  {
    id: "ind-4",
    name: "OEM Manufacturers",
    slug: "oem-manufacturers",
    tier: 2,
    tierLabel: "Tier 2 — Mid-Difficulty, Higher Value",
    description:
      "Original equipment manufacturers in machinery, pumps, HVAC, agricultural equipment, and packaging machinery. Longer sales cycles (3–9 months) but lead to recurring, larger purchase orders once qualified as an approved vendor.",
    icon: "Settings",
    relatedCategories: [
      "forged-components",
      "castings",
      "precision-machined",
      "pumps-pump-parts",
      "bearings-bushings",
    ],
    examples: [
      "Machinery Builders",
      "Pump & HVAC Manufacturers",
      "Agricultural Equipment OEMs",
      "Packaging Machinery OEMs",
    ],
  },
  {
    id: "ind-5",
    name: "EPC Firms",
    slug: "epc-firms",
    tier: 2,
    tierLabel: "Tier 2 — Mid-Difficulty, Higher Value",
    description:
      "Engineering, Procurement & Construction firms that buy components for infrastructure and plant construction projects. Strong fit for valves, flanges, structural steel, and piping components.",
    icon: "Building2",
    relatedCategories: [
      "forged-components",
      "industrial-valves",
      "fasteners",
      "sheet-metal-enclosures",
    ],
    examples: [
      "Infrastructure Builders",
      "Plant Construction Firms",
      "Piping Contractors",
      "System Integrators",
    ],
  },
  {
    id: "ind-6",
    name: "Automotive Suppliers",
    slug: "automotive",
    tier: 3,
    tierLabel: "Tier 3 — High Lifetime Value",
    description:
      "Tier 1 and Tier 2 automotive suppliers requiring rigorous qualification (PPAP, IATF 16949) but offering large, recurring volume commitments. Investment in qualification pays off with long-term contracts.",
    icon: "Car",
    relatedCategories: [
      "castings",
      "forged-components",
      "precision-machined",
      "fasteners",
      "rubber-plastic-molded",
    ],
    examples: [
      "Powertrain Component Suppliers",
      "Chassis & Suspension Parts Makers",
      "Interior Hardware Suppliers",
    ],
  },
  {
    id: "ind-7",
    name: "Aerospace & Defense",
    slug: "aerospace-defense",
    tier: 3,
    tierLabel: "Tier 3 — High Lifetime Value",
    description:
      "Aerospace component manufacturers with AS9100 requirements and long qualification cycles, but offering the highest margins in industrial supply. Precision machined parts and specialty fasteners are key entry points.",
    icon: "Plane",
    relatedCategories: [
      "precision-machined",
      "fasteners",
      "forged-components",
      "bearings-bushings",
    ],
    examples: [
      "Airframe Component Manufacturers",
      "MRO Service Providers",
      "Defense Subcontractors",
    ],
  },
  {
    id: "ind-8",
    name: "Energy & Oil/Gas",
    slug: "energy-oil-gas",
    tier: 3,
    tierLabel: "Tier 3 — High Lifetime Value",
    description:
      "Oil & gas operators and renewable energy companies requiring API-certified components for large project-based orders. Valves, flanges, and pipe fittings are primary demand drivers.",
    icon: "Fuel",
    relatedCategories: [
      "industrial-valves",
      "forged-components",
      "pumps-pump-parts",
      "hydraulic-pneumatic",
    ],
    examples: [
      "Upstream Oil & Gas Operators",
      "Refinery Equipment Suppliers",
      "Solar & Wind Component Buyers",
      "Pipeline Construction Firms",
    ],
  },
];
