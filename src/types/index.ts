// ============================================================
// Aaron Technologies Inc. — Shared TypeScript Types
// ============================================================

// --- Product Catalog ---

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  icon: string; // Lucide icon name
  types: string[];
  standards: string[];
  materials: string[];
  finishes?: string[];
  sizes?: string;
  requiredDocs: string[];
  applications?: string[];
}

export interface DetailedProduct {
  id: string;
  categoryId: string;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  material: string;
  standards: string[];
  sizes: string;
  finishes: string[];
  imageUrl: string;
  moq: string;
  leadTime: string;
  keyFeatures: string[];
  applications: string[];
  tolerances: string;
  certifications: string[];
}

// --- Industries ---

export interface Industry {
  id: string;
  name: string;
  slug: string;
  tier: 1 | 2 | 3;
  tierLabel: string;
  description: string;
  icon: string;
  relatedCategories: string[]; // category slugs
  examples: string[];
}

// --- Certifications ---

export interface Certification {
  id: string;
  name: string;
  shortName: string;
  description: string;
  issuingBody: string;
  documentUrl?: string;
  icon: string;
}

// --- RFQ (Request for Quote) ---

export interface RFQSubmission {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productCategory: string;
  productDetails: string;
  quantity: string;
  targetPrice?: string;
  message?: string;
  files?: { name: string; size: number; type: string; base64: string }[];
}

export interface RFQFormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  productCategory?: string;
  productDetails?: string;
  quantity?: string;
}

// --- Landed Cost Calculator ---

export interface LandedCostInput {
  fobPrice: number;
  quantity: number;
  weight: number; // kg
  shippingMethod: 'sea' | 'air' | 'express';
  productCategory: string;
  hsCode?: string;
}

export interface LandedCostBreakdown {
  fobTotal: number;
  freight: number;
  insurance: number;
  customsDuty: number;
  dutyRate: number;
  handlingFees: number;
  totalLandedCost: number;
  perUnitCost: number;
}

// --- Blog / Resources ---

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
}

// --- Navigation ---

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// --- Stats / Trust Metrics ---

export interface TrustMetric {
  label: string;
  value: string;
  suffix?: string;
  icon: string;
}
