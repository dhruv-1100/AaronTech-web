export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface FullArticle {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  introduction: string;
  sections: ArticleSection[];
}

export const blogArticleContents: Record<string, FullArticle> = {
  "astm-a193-vs-a320-fasteners": {
    slug: "astm-a193-vs-a320-fasteners",
    title: "Understanding ASTM A193 vs. A320 Fastener Specifications",
    category: "Technical Guides",
    publishedAt: "2026-06-15",
    readTime: "8 min read",
    introduction:
      "When specifying high-strength fasteners for critical piping, pressure vessels, and structural connections, selecting the correct ASTM standard is vital for safety, structural integrity, and regulatory compliance. Two of the most commonly encountered specifications in industrial engineering are ASTM A193 and ASTM A320. While they share several metallurgical similarities, their application environments are diametrically opposed.",
    sections: [
      {
        heading: "1. Core Temperature Services",
        paragraphs: [
          "The fundamental difference between these two standards lies in their intended operating temperature ranges. In short, ASTM A193 is designed for high-temperature and high-pressure service, whereas ASTM A320 is designed for low-temperature (cryogenic) service.",
          "ASTM A193 fasteners are commonly used in boilers, steam lines, turbines, and petrochemical reactors where operating temperatures routinely exceed 400°F (204°C) and can reach up to 1100°F (593°C) depending on the grade.",
          "ASTM A320 fasteners are specified for low-temperature environments—such as liquefied natural gas (LNG) piping, refrigeration systems, and arctic pipelines—where operating temperatures drop below -50°F (-46°C) and down to -325°F (-198°C) for stainless grades.",
        ],
      },
      {
        heading: "2. Key Metallurgical Grades Compared",
        paragraphs: [
          "Both standards define alloy steel and stainless steel grades, often sharing chemical compositions but undergoing different heat treatments to optimize performance for their respective temperature limits.",
          "For high-temperature (A193), the most common grades are:",
          "For low-temperature (A320), the primary counterparts are:",
        ],
        list: [
          "Grade B7: Chromium-molybdenum alloy steel, heat-treated for high strength up to 800°F (427°C).",
          "Grade B8 / B8M: AISI 304 and 316 stainless steels, providing excellent corrosion resistance and creep resistance at elevated temperatures.",
          "Grade L7: Liquid-quenched and tempered chromium-molybdenum alloy steel, chemically identical to B7 but heat-treated differently to maintain impact toughness at temperatures down to -150°F (-101°C).",
          "Grade L8 / L8M: AISI 304/316 stainless steels, optimized with charpy impact testing to handle temperatures down to -325°F (-198°C).",
        ],
      },
      {
        heading: "3. The Critical Difference: Charpy Impact Testing",
        paragraphs: [
          "To qualify an alloy steel bolt for low-temperature service under ASTM A320, it must undergo Charpy V-notch impact testing. As metals get colder, they transition from ductile behavior (where they bend under stress) to brittle behavior (where they shatter without warning).",
          "ASTM A320 requires that alloy steel fasteners (like Grade L7) demonstrate a minimum impact energy absorption (typically 20 ft-lbs at -150°F) to ensure they will not suffer brittle fracture in cryogenic services.",
          "ASTM A193 does not require impact testing because high temperatures keep the steel in a ductile state, rendering brittle fracture a non-issue. Using an A193 B7 bolt in place of an A320 L7 bolt in an LNG pipeline is a critical failure risk.",
        ],
      },
      {
        heading: "Summary Checklist for Procurement Teams",
        paragraphs: [
          "When purchasing these components from Indian suppliers, ensure your Mill Test Certificate (MTC) details the following properties depending on the specification:",
        ],
        list: [
          "For A193 B7: Tensile strength, yield strength, hardness testing, and heat-treatment certification.",
          "For A320 L7: All A193 properties PLUS Charpy V-notch impact testing values, impact test temperature (-150°F), and grain size certification.",
          "For Stainless Grades (B8/L8): Solution annealing certification and corrosion testing results.",
        ],
      },
    ],
  },
  "us-india-trade-deal-2026-impact": {
    slug: "us-india-trade-deal-2026-impact",
    title: "How the 2026 US-India Trade Deal Impacts Industrial Component Pricing",
    category: "Industry News",
    publishedAt: "2026-06-10",
    readTime: "6 min read",
    introduction:
      "The newly enacted 2026 US-India Bilateral Trade Agreement has sent positive shockwaves through the manufacturing and procurement sectors. By systematically lowering trade barriers and slashing customs duties on critical engineering goods, the deal has positioned India as the primary alternative to traditional East Asian manufacturing hubs. For US procurement managers, this represents a massive opportunity to diversify supply chains and lower total cost of ownership (TCO).",
    sections: [
      {
        heading: "1. The Tariff Drop: Analyzing the Numbers",
        paragraphs: [
          "Prior to this trade agreement, import duties on specialty industrial components from India—including high-strength fasteners, heavy forged pipe flanges, and custom iron castings—were subject to general customs rates and anti-dumping protections that could push total duties up to 50%.",
          "Under the new framework, bilateral tariffs on qualifying industrial goods have been capped at a flat 18% duty rate. This immediate reduction directly lowers the Landed Cost of imported components, making Indian suppliers highly competitive against domestic and regional alternatives.",
        ],
      },
      {
        heading: "2. Strategic Supply Chain Diversification",
        paragraphs: [
          "With growing geopolitical shifts and domestic tariff changes affecting East Asian imports, US companies have been seeking 'China+1' sourcing strategies. The 2026 trade deal makes India the most financially viable partner for high-precision components.",
          "Vast networks of ISO-9001 certified facilities in manufacturing corridors like Rajkot, Coimbatore, and Pune are already geared to meet Western technical specifications, including ASME, ASTM, and DIN standards.",
        ],
      },
      {
        heading: "3. Direct-to-Dock (DDP) Sourcing Simplification",
        paragraphs: [
          "While tariff reductions lower raw costs, logistics administration has historically been a bottleneck for US companies importing from the Indian subcontinent. Navigating ocean freight, customs clearances, and local port handling fees can neutralize initial savings.",
          "Aaron Technologies acts as the domestic US entity, managing the entire import process. We handle the 18% duty, ocean freight, custom clearances, and local trucking, delivering directly to your US warehouse under DDP (Delivered Duty Paid) terms. You receive a single, domestic invoice in US dollars with no shipping surprises.",
        ],
      },
    ],
  },
  "landed-cost-calculation-guide": {
    slug: "landed-cost-calculation-guide",
    title: "Calculating Landed Costs: A Step-by-Step Guide for US Importers",
    category: "Sourcing Guides",
    publishedAt: "2026-06-05",
    readTime: "10 min read",
    introduction:
      "When sourcing engineering components internationally, comparing suppliers on FOB (Free on Board) unit price alone is a common procurement pitfall. An international shipment incurs a series of logistics, duty, and administrative costs before it arrives at your warehouse door. To evaluate the true cost of sourcing, you must calculate the Landed Cost. This guide provides a step-by-step breakdown of how to calculate it accurately.",
    sections: [
      {
        heading: "Step 1: Determine the FOB (Free on Board) Total",
        paragraphs: [
          "The FOB price is the raw price of the goods loaded onto the cargo ship at the port of origin (e.g., Port of Mumbai/Nhava Sheva). It includes the manufacturer's production cost and local transport to the port, but excludes international shipping, duty, and US port handling.",
          "FOB Total = FOB Unit Price × Total Quantity.",
        ],
      },
      {
        heading: "Step 2: Add International Ocean or Air Freight",
        paragraphs: [
          "International freight is calculated based on the weight or volume of the shipment, the mode of transport (Sea vs. Air), and current fuel surcharges.",
          "Sea freight is cost-effective for heavy loads (castings, flanges) but takes 25-35 days. Air freight is fast (5-7 days) but expensive. Your freight cost calculation should factor in the total weight of the shipment in kilograms.",
        ],
      },
      {
        heading: "Step 3: Calculate Customs Duties and Tariffs",
        paragraphs: [
          "Customs duty is a percentage tax levied by US Customs and Border Protection based on the HTS (Harmonized Tariff Schedule) code of the product.",
          "Following the 2026 US-India Trade Agreement, most engineering components qualify for a preferential duty rate of 18% of the FOB value.",
          "Customs Duty = FOB Total × 18% (0.18).",
        ],
      },
      {
        heading: "Step 4: Factor in Insurance, Port Handling, and Local Delivery",
        paragraphs: [
          "To complete the calculation, you must factor in:",
          "Landed Cost = FOB Total + Freight + Insurance + Customs Duty + Handling & Delivery.",
        ],
        list: [
          "Marine Cargo Insurance: Standard benchmark is roughly 0.5% of the FOB value to cover damage or loss at sea.",
          "Customs Brokerage & Port Handling: A flat fee (usually $150 - $250) for filing entry paperwork and unloading at the US port.",
          "Local trucking: Freight delivery from the US port (e.g., Newark or Los Angeles) to your receiving dock.",
        ],
      },
    ],
  },
  "material-test-certificates-guide": {
    slug: "material-test-certificates-guide",
    title: "Material Test Certificates Explained: What to Look For",
    category: "Technical Guides",
    publishedAt: "2026-05-28",
    readTime: "7 min read",
    introduction:
      "In industrial procurement, a part is only as good as the metal it is made of. When importing high-stress components like forged flanges, high-strength fasteners, or valve bodies, possessing the correct material certification is mandatory. This certification—documented as a Mill Test Certificate (MTC) or Material Test Report (MTR)—proves that the components conform to the chemical and physical limits specified in their ASTM/ASME standards.",
    sections: [
      {
        heading: "1. EN 10204 Certification Types",
        paragraphs: [
          "Material certifications are globally standardized under the European standard EN 10204. The two most common certification types required by US buyers are:",
          "EN 10204 Type 3.1 (Declaration of Compliance): Issued by the manufacturer's independent quality control department (separate from production). The manufacturer conducts the tests on the production lot and certifies compliance.",
          "EN 10204 Type 3.2 (Independent Third-Party Certification): Required for high-risk applications (such as offshore pipelines or nuclear installations). The manufacturer and an independent, third-party inspector (e.g., TUV, Lloyd's Register) jointly inspect the production run, witness the mechanical tests, and co-sign the certificate.",
        ],
      },
      {
        heading: "2. Key Data Points to Verify on an MTC",
        paragraphs: [
          "When reviewing an MTC from an Indian foundry or fastener manufacturer, your quality assurance team should systematically verify the following details:",
        ],
        list: [
          "Heat Number: A unique ID linking the finished parts back to the specific batch of molten steel. The heat number must be stamped on both the physical parts and the certificate.",
          "Chemical Composition: A complete ladle analysis listing the exact percentage of elements (Carbon, Manganese, Silicon, Chromium, Molybdenum, etc.) compared to ASTM tolerances.",
          "Mechanical Properties: Actual values for Tensile Strength (PSI/MPa), Yield Strength, Elongation (ductility), and Hardness.",
          "Heat Treatment Log: Verification of normalizing, quenching, tempering, or solution annealing, including temperatures and soak times.",
        ],
      },
      {
        heading: "3. Red Flags in Import QA Documents",
        paragraphs: [
          "Beware of certificates that contain hand-written alterations, missing heat numbers, mismatching weight tallies, or fail to state the specific test standards used. Aaron Technologies inspects all supplier MTCs at the foundry gate to ensure complete traceability before the cargo leaves India.",
        ],
      },
    ],
  },
  "switching-india-supplier-checklist": {
    slug: "switching-india-supplier-checklist",
    title: "5 Questions to Ask Before Switching to an India-Based Supplier",
    category: "Sourcing Guides",
    publishedAt: "2026-05-20",
    readTime: "5 min read",
    introduction:
      "Diversifying your industrial supply chain by sourcing from India is an excellent strategy to lower costs and mitigate geopolitical supply risks. However, transitioning from a domestic supplier or a regional partner to a new Indian manufacturer requires careful vetting to prevent project delays. Before signing a supply agreement, your procurement team should ask these five critical questions.",
    sections: [
      {
        heading: "1. Is the foundry/facility ISO 9001 certified?",
        paragraphs: [
          "ISO 9001 is the global baseline for quality management systems. Vetting a manufacturer starts by verifying their certification status and check audits. Never source critical engineering parts from a facility without current ISO credentials.",
        ],
      },
      {
        heading: "2. How are first-article inspections and QA handled?",
        paragraphs: [
          "What processes do they use to qualify custom-to-drawing parts? A professional supplier should offer First-Article Inspection Reports (FAIR) and coordinate CMM (Coordinate Measuring Machine) dimensional reports alongside raw material certificates before commencing volume production.",
        ],
      },
      {
        heading: "3. What is the true lead time from production to shipping dock?",
        paragraphs: [
          "Indian manufacturing processes are highly efficient, but ocean transit adds 25-35 days to the schedule. You must ask: What is the factory lead time, and what port will they ship from (typically Mumbai/Nhava Sheva or Mundra)? Sourcing partners like Aaron Technologies maintain buffer stocks in the US to eliminate this transit delay for contract buyers.",
        ],
      },
      {
        heading: "4. Are there export/import tariffs and who manages them?",
        paragraphs: [
          "Under the 2026 US-India Trade Agreement, duties are reduced, but import paperwork, tariffs, customs clearance, and port fees must still be managed. Sourcing under DDP (Delivered Duty Paid) terms with a partner like Aaron Technologies shifts all import logistics and duty administration away from your team.",
        ],
      },
      {
        heading: "5. How is communication and contract jurisdiction structured?",
        paragraphs: [
          "Resolving drawing clarifications or schedule changes across time zones can be difficult. Buying from a US-registered corporation like Aaron Technologies ensures domestic contract jurisdiction, US-based support, and payment in US dollars, removing international legal complexities.",
        ],
      },
    ],
  },
};
