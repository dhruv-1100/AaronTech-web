import { Certification, BlogPost, NavItem, TrustMetric } from "@/types";

// --- Certifications ---

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "ISO 9001:2015 Quality Management",
    shortName: "ISO 9001",
    description:
      "All Aaron Technologies supplier facilities are ISO 9001:2015 certified, ensuring consistent quality management systems across every product line. This certification demonstrates our commitment to documented processes, continuous improvement, and customer satisfaction.",
    issuingBody: "International Organization for Standardization",
    icon: "ShieldCheck",
  },
  {
    id: "cert-2",
    name: "RoHS Compliance (Restriction of Hazardous Substances)",
    shortName: "RoHS",
    description:
      "Our products comply with RoHS directives restricting hazardous substances including lead, mercury, cadmium, and hexavalent chromium. RoHS declarations are provided with every shipment for regulatory compliance.",
    issuingBody: "European Union Directive",
    icon: "Leaf",
  },
  {
    id: "cert-3",
    name: "REACH Compliance",
    shortName: "REACH",
    description:
      "Full compliance with REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) regulations. Material Safety Data Sheets and compliance documentation available on request.",
    issuingBody: "European Chemicals Agency (ECHA)",
    icon: "FlaskConical",
  },
  {
    id: "cert-4",
    name: "ASTM / ASME Material Standards",
    shortName: "ASTM/ASME",
    description:
      "All metallic products are manufactured to applicable ASTM and ASME material specifications. Mill test certificates (MTCs) are provided with every shipment, verifying chemical composition, mechanical properties, and heat treatment per the relevant standard.",
    issuingBody: "ASTM International / ASME",
    icon: "FileCheck",
  },
  {
    id: "cert-5",
    name: "API Standards (Oil & Gas)",
    shortName: "API",
    description:
      "Valves, flanges, and piping components manufactured to API standards including API 6D, API 598, and API 600. Pressure testing and documentation per API requirements for oil & gas applications.",
    issuingBody: "American Petroleum Institute",
    icon: "Fuel",
  },
  {
    id: "cert-6",
    name: "UL Listing (Electrical Components)",
    shortName: "UL Listed",
    description:
      "Electrical components including connectors, terminal blocks, and switchgear parts carry UL listings where required for the US market. UL certification ensures product safety compliance for North American installations.",
    issuingBody: "Underwriters Laboratories",
    icon: "Zap",
  },
];

// --- Navigation ---

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

// --- Trust Metrics ---

export const trustMetrics: TrustMetric[] = [
  { label: "Product SKUs Available", value: "500", suffix: "+", icon: "Package" },
  { label: "Certified Supplier Facilities", value: "30", suffix: "+", icon: "Factory" },
  { label: "Industry Standards Met", value: "50", suffix: "+", icon: "ShieldCheck" },
  { label: "Avg. Landed Cost Savings", value: "25", suffix: "%", icon: "TrendingDown" },
];

// --- Blog Posts (placeholder) ---

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding ASTM A193 vs. A320 Fastener Specifications",
    slug: "astm-a193-vs-a320-fasteners",
    excerpt:
      "A technical comparison of ASTM A193 and A320 bolt specifications — materials, temperature ranges, and application guidance for procurement engineers.",
    category: "Technical Guides",
    publishedAt: "2026-06-15",
    readTime: "8 min read",
    imageUrl: "/images/blog/fastener-specs.jpg",
  },
  {
    id: "post-2",
    title: "How the 2026 US-India Trade Deal Impacts Industrial Component Pricing",
    slug: "us-india-trade-deal-2026-impact",
    excerpt:
      "With tariffs dropping from 50% to 18%, procurement teams are rethinking their India sourcing strategy. Here's what the numbers look like.",
    category: "Industry News",
    publishedAt: "2026-06-10",
    readTime: "6 min read",
    imageUrl: "/images/blog/trade-deal.jpg",
  },
  {
    id: "post-3",
    title: "Calculating Landed Costs: A Step-by-Step Guide for US Importers",
    slug: "landed-cost-calculation-guide",
    excerpt:
      "FOB price is only the beginning. Learn how to accurately calculate freight, duty, insurance, and handling to compare true supplier costs.",
    category: "Sourcing Guides",
    publishedAt: "2026-06-05",
    readTime: "10 min read",
    imageUrl: "/images/blog/landed-cost.jpg",
  },
  {
    id: "post-4",
    title: "Material Test Certificates Explained: What to Look For",
    slug: "material-test-certificates-guide",
    excerpt:
      "Mill test certs are essential for qualifying imported components. This guide explains EN 10204 types, key data points, and common red flags.",
    category: "Technical Guides",
    publishedAt: "2026-05-28",
    readTime: "7 min read",
    imageUrl: "/images/blog/mtc-guide.jpg",
  },
  {
    id: "post-5",
    title: "5 Questions to Ask Before Switching to an India-Based Supplier",
    slug: "switching-india-supplier-checklist",
    excerpt:
      "Thinking about diversifying your supply chain? Here are the five critical questions every procurement manager should ask.",
    category: "Sourcing Guides",
    publishedAt: "2026-05-20",
    readTime: "5 min read",
    imageUrl: "/images/blog/supplier-switch.jpg",
  },
];
