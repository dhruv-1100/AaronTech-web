import { productCategories } from "./products";

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

export const detailedProducts: Record<string, Record<string, Partial<DetailedProduct>>> = {
  "fasteners": {
    "hex-bolts": {
      description: "Heavy-duty hex bolts designed for structural steel connections, pipeline flanging, and heavy machinery assemblies. Manufactured to ASTM A193, ASME B18.2.1, and ISO 4014 standards with full material traceability.",
      material: "Carbon Steel (Grade 5, Grade 8), Alloy Steel (ASTM A193 B7/B7M), Stainless Steel (304, 316, A2-70, A4-80), Titanium (Grade 2, Grade 5)",
      standards: ["ASTM A193 / A320", "ASME B18.2.1", "SAE J429 Grade 5 / 8", "ISO 4014"],
      sizes: "Metric: M6 to M64 | Imperial: 1/4\" to 2-1/2\" (UNC/UNF)",
      finishes: ["Zinc Plating (Clear/Yellow)", "Hot-Dip Galvanized (HDG)", "PTFE (Teflon) Coating", "Black Oxide", "Dacromet"],
      moq: "1,000 units or $2,500 minimum value",
      leadTime: "8–10 weeks (production + sea transit)",
      keyFeatures: [
        "Full material test certificates (MTC per EN 10204 3.1) provided with every batch.",
        "Thread tolerance: Class 6g for metric, Class 2A for imperial threads.",
        "Zero-defect assurance via automated optical sorting systems.",
        "Tensile strength and hardness testing reports included.",
      ],
      applications: [
        "Structural steel building connections",
        "Oil & gas pipeline flanged assemblies",
        "Heavy manufacturing machinery foundation anchoring",
        "Automotive and marine structural assemblies",
      ],
      tolerances: "ASME Y14.5 GD&T compliant; dimensional check reports for all critical dimensions.",
      certifications: ["ISO 9001:2015 Manufacturer Certification", "RoHS Compliance Certificate", "REACH Declaration"],
    },
    "socket-head-cap-screws": {
      description: "Precision socket head cap screws ideal for applications with limited clearance. Offers high tensile strength and sleek appearance for precision machinery, tooling, and automotive assemblies.",
      material: "Alloy Steel (Class 12.9), Stainless Steel 304/316, Titanium (Grade 5)",
      standards: ["ASME B18.3", "ISO 4762", "DIN 912"],
      sizes: "Metric: M3 to M36 | Imperial: #4 to 1-1/2\"",
      finishes: ["Black Oxide", "Zinc Plating", "Plain / Oil Protective Coating", "Dacromet"],
      moq: "2,000 units",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "Class 12.9 high-tensile alloy steel for maximum shear strength.",
        "Deep, precision-broached hex socket prevents cam-out and head stripping.",
        "MTC EN 10204 3.1 and chemical analysis reports provided.",
      ],
      applications: [
        "Injection molding dies and machining jigs",
        "Automotive engine and transmission assemblies",
        "Robotics and high-precision motion controls",
        "Aerospace and defence structural fixtures",
      ],
      tolerances: "ISO 4762 standard tolerance class 6g/5g fit.",
      certifications: ["ISO 9001:2015 Quality Management", "RoHS Compliant"],
    }
  },
  "forged-components": {
    "weld-neck-flanges": {
      description: "High-integrity weld-neck flanges designed for critical high-pressure and extreme temperature piping systems. Features a tapered hub that transfers stress to the pipe, reducing stress concentration at the base of the flange.",
      material: "Carbon Steel (ASTM A105), Low-Temp Carbon Steel (ASTM A350 LF2), Stainless Steel (ASTM A182 F304/F316), Duplex/Super Duplex Steel",
      standards: ["ASME B16.5 (Class 150 to 2500)", "ASME B16.47 Series A/B", "EN 1092-1"],
      sizes: "1/2\" to 60\" Nominal Pipe Size (NPS)",
      finishes: ["Anti-rust Oil Coating", "Yellow/Black Protective Paint", "Zinc Plated", "Galvanized"],
      moq: "50 pieces or $3,000 minimum value",
      leadTime: "10–12 weeks (requires forging, machining, and NDT)",
      keyFeatures: [
        "Forged structure ensures high impact strength and resistance to thermal shock.",
        "Ultrasonic testing (UT) and magnetic particle testing (MT) performed per ASME Sec. VIII.",
        "Positive Material Identification (PMI) verified for stainless and duplex alloys.",
        "Smooth, concentric or spiral serrated gasket face finish (125-250 AARH).",
      ],
      applications: [
        "Petrochemical refineries and chemical process plants",
        "High-pressure steam pipelines and power generation plants",
        "Cryogenic piping networks and LNG terminals",
        "Offshore oil drilling platforms and marine installations",
      ],
      tolerances: "ASME B16.5 dimensional tolerances strictly verified via CMM.",
      certifications: ["ISO 9001:2015 Manufacturer", "PED 2014/68/EU (Pressure Equipment Directive)", "NACE MR0175/ISO 15156 Compliance"],
    }
  },
  "castings": {
    "gray-iron-castings": {
      description: "Gray iron castings offering excellent machinability, vibration dampening, and high thermal conductivity. Ideal for pump housings, electric motor frames, gearboxes, and structural machinery bases.",
      material: "Gray Iron (ASTM A48 Class 20, 30, 35, 40 | EN-GJL-150, 200, 250)",
      standards: ["ASTM A48", "ASTM A278", "EN 1561"],
      sizes: "Weight range: 0.5 kg to 1,500 kg per piece",
      finishes: ["Shot Blasted", "Primer Paint Coating", "Powder Coating", "Rust-preventative Oil"],
      moq: "500 kg total lot weight",
      leadTime: "10–12 weeks (includes pattern tooling preparation)",
      keyFeatures: [
        "Excellent casting fluidness allowing for highly intricate geometries.",
        "Foundry spectrometer chemical composition testing for every heat.",
        "Tensile test bars cast and pulled per ASTM A48 guidelines.",
        "Microstructure analysis confirming uniform graphite distribution.",
      ],
      applications: [
        "Centrifugal pump housings and impeller casings",
        "Electric motor stator frames and end-shields",
        "Gearbox housings and automotive engine blocks",
        "Machine tool beds and heavy vibration-damping foundations",
      ],
      tolerances: "ISO 8062 Castings Tolerances Class DCTG 8 to DCTG 10.",
      certifications: ["ISO 9001:2015 Quality Management", "Material Test Report (EN 10204 3.1)"],
    }
  },
  "bearings-bushings": {
    "deep-groove-ball-bearings": {
      description: "High-precision deep groove ball bearings engineered for high speed, low friction, and low noise operations. Sourced from ISO-certified precision grinding shops, benchmarking performance with SKF/NSK standards.",
      material: "High-Carbon Chromium Steel (GCr15 / AISI 52100), Stainless Steel (AISI 440C)",
      standards: ["ISO 15:2017", "ABMA Standard 20", "DIN 625"],
      sizes: "Inner Diameter: 4mm to 120mm | Custom sizes available",
      finishes: ["Precision Ground", "Superfinished Raceways", "Pre-lubricated with synthetic grease"],
      moq: "1,000 units",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "Precision class options: ISO Normal, P6 (ABEC-3), or P5 (ABEC-5) for high-accuracy assemblies.",
        "Dual-lip rubber seals (2RS) or metal shields (ZZ) for debris protection.",
        "Noise and vibration tested using V1/V2/V3 Anderometer standards.",
        "Full hardness testing report (HRC 60-64 for rings and balls).",
      ],
      applications: [
        "Electric motors and household appliances",
        "Conveyor idler rollers and materials handling",
        "Automotive alternators and auxiliary pulleys",
        "Agricultural machinery and industrial gear drives",
      ],
      tolerances: "ISO 492 precision tolerances; radial runout limits strictly inspected.",
      certifications: ["ISO 9001:2015 Quality Management", "RoHS Compliance"],
    }
  },
  "hydraulic-pneumatic": {
    "hydraulic-cylinders": {
      description: "Custom-engineered double-acting hydraulic cylinders built for rugged industrial and mobile equipment applications. Designed to handle operating pressures up to 6,000 PSI with reliable seals and precision honed tubes.",
      material: "Piston Rod: Hard Chrome Plated Carbon Steel (C45/1045, chrome thickness min 25 micron, min hardness 850 HV). Honed Tube: ASTM A513 Grade 1026 DOM steel.",
      standards: ["ISO 6020/2", "NFPA Standard", "SAE J1453"],
      sizes: "Bore sizes: 1.5\" to 12\" | Stroke lengths up to 120\"",
      finishes: ["Industrial Epoxy Primer + Polyurethane Topcoat", "Custom Color Brand-matching"],
      moq: "20 pieces (custom drawings required)",
      leadTime: "10–12 weeks (includes engineering drawing review & signoff)",
      keyFeatures: [
        "100% pressure tested at 1.5x working pressure before shipping.",
        "Premium sealing system (Hallite or equivalent) for leak-free long service life.",
        "Induction hardened piston rod option for severe impact environments.",
        "Weld joints tested by dye penetrant inspection.",
      ],
      applications: [
        "Construction equipment (excavators, loaders, dump trucks)",
        "Agricultural machinery (harvesters, tractors, sprayers)",
        "Industrial manufacturing equipment (presses, shears, compactors)",
        "Marine steering systems and deck machinery",
      ],
      tolerances: "Honed tube ID tolerance: ISO H8. Piston rod OD tolerance: ISO f7.",
      certifications: ["ISO 9001:2015 Quality Management", "Weld certifications (AWS D1.1)", "MTC EN 10204 3.1"],
    }
  },
  "precision-machined": {
    "cnc-turned-parts": {
      description: "High-precision CNC turned parts manufactured using multi-axis lathes. Suitable for shafts, bushings, pins, and custom mechanical elements requiring tight concentricity and smooth surface finishes.",
      material: "Carbon Steel (12L14, 1018, 1045), Stainless Steel (303, 304, 316), Aluminum (6061-T6, 7075-T6), Brass (C360), Titanium",
      standards: ["ASME Y14.5 (GD&T)", "ISO 2768-m (General Tolerances)"],
      sizes: "Diameter: 2mm to 250mm | Length: up to 600mm",
      finishes: ["Anodizing (Type II & III)", "Passivation (Stainless)", "Nickel/Chrome Plating", "Plain/Polished"],
      moq: "500 pieces",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "CMM (Coordinate Measuring Machine) dimensional reports provided for all critical features.",
        "Surface roughness capabilities down to Ra 0.4 microns (16 micro-inches).",
        "Bar feeder automation for highly competitive mass production pricing.",
        "First-article inspection report (FAIR) provided before full production.",
      ],
      applications: [
        "Hydraulic valve spools and piston connectors",
        "Automotive transmission shafts and engine sensors",
        "Medical device instrument bodies and pins",
        "Electrical connector bodies and housing pins",
      ],
      tolerances: "Strict dimensional tolerances down to +/- 0.005 mm (+/- 0.0002 inches).",
      certifications: ["ISO 9001:2015 Quality Management", "AS9100D (For Aerospace orders)", "RoHS Compliance"],
    }
  },
  "industrial-valves": {
    "ball-valves": {
      description: "Industrial-grade ball valves in floating and trunnion-mounted designs, engineered for reliable flow control and bubble-tight shutoff. Manufactured to ASME B16.34 and API 6D specifications for oil & gas, chemical, and general processing pipelines.",
      material: "Cast Steel (ASTM A216 WCB), Stainless Steel (ASTM A351 CF8/CF8M), Forged Carbon/Stainless (A105/A182)",
      standards: ["ASME B16.34", "API 6D", "API 598 (Testing)", "ASME B16.10 (Face-to-Face)"],
      sizes: "1/2\" to 24\" Nominal Size (Class 150 to 1500)",
      finishes: ["Epoxy Coating (Carbon Steel)", "Pickled & Passivated (Stainless Steel)"],
      moq: "20 pieces",
      leadTime: "10–12 weeks",
      keyFeatures: [
        "Fire-safe design certified to API 607 / ISO 10497 standards.",
        "Anti-static device and blowout-proof stem design standard.",
        "100% hydrostatically shell and seat tested per API 598.",
        "ISO 5211 mounting pad for easy pneumatic/electrical actuator integration.",
      ],
      applications: [
        "Natural gas pipelines and chemical distribution manifolds",
        "Industrial water treatment plants and cooling loops",
        "Food & beverage process piping (Sanitary clamp connections)",
        "Power plant boilers and fluid control utilities",
      ],
      tolerances: "ASME B16.34 shell thickness compliance; API 6D dimensional criteria.",
      certifications: ["ISO 9001:2015 Manufacturer", "CE-PED Certified", "API 6D Monogram Licensee"],
    }
  },
  "pumps-pump-parts": {
    "impellers": {
      description: "Precision-cast centrifugal pump impellers in open, semi-open, and closed designs. Sourced from specialized foundries in India, featuring dynamic balancing to ensure smooth, vibration-free operation in industrial pumps.",
      material: "Cast Iron (ASTM A48), Stainless Steel 316 (ASTM A351 CF8M), Duplex Stainless Steel (CD4MCu / ASTM A890), Bronze",
      standards: ["ANSI/ASME B73.1", "ISO 1940 (Balancing)"],
      sizes: "Diameter: 3\" to 24\" | Weight up to 150 kg",
      finishes: ["Precision machined hubs", "Polished vanes", "Balancing correction spots"],
      moq: "50 pieces (pattern tooling required for custom designs)",
      leadTime: "10–12 weeks",
      keyFeatures: [
        "Dynamic balancing to ISO 1940 Grade G2.5 prevents pump shaft vibration.",
        "Precision investment casting (lost wax) for optimal fluid flow efficiency.",
        "Spectrometer chemistry reports and hardness check for every melt.",
      ],
      applications: [
        "Centrifugal water pumps and sewage pumps",
        "Chemical process pumps (ANSI standard replacements)",
        "Slurry and dredging pumps (high-chrome wear-resistant alloys)",
        "Food processing pumps (hygienic, highly polished surfaces)",
      ],
      tolerances: "Dimensional check via 3D scanning or CMM comparison to CAD.",
      certifications: ["ISO 9001:2015 Quality Management", "EN 10204 3.1 Material Certificate", "Dynamic Balancing Report"],
    }
  },
  "sheet-metal-enclosures": {
    "electrical-enclosures": {
      description: "Custom sheet metal electrical enclosures and control panel boxes. Fabricated using high-accuracy laser cutting, CNC bending, and robotically welded seams. Rated for NEMA / IP classifications.",
      material: "Cold Rolled Steel (CRCA, 1.2mm to 2.5mm thickness), Stainless Steel (304, 316L), Aluminum (5052-H32)",
      standards: ["NEMA Ratings (Type 1, 3R, 4, 4X, 12)", "IP Ratings (IP54, IP56, IP65, IP66)", "AWS D1.1 / D1.3 (Welding)"],
      sizes: "Custom dimensions based on CAD drawings (up to 2000mm height)",
      finishes: ["TGIC Polyester Powder Coating (RAL colors, typical 70-90 micron thickness)", "Anodizing", "Brush Finish (Stainless Steel)"],
      moq: "100 units",
      leadTime: "10–12 weeks",
      keyFeatures: [
        "Polyurethane liquid foam-in-place (FIP) gasket for superior IP66 weather sealing.",
        "Salt spray test reports (ASTM B117, up to 1000 hours) for powder coatings.",
        "Integrated grounding studs on door and body.",
        "Ground smooth welded seams for a clean, premium appearance.",
      ],
      applications: [
        "Outdoor telecom junction boxes and power supply cabinets",
        "Factory automation control panels and PLC racks",
        "Marine electrical panels (Stainless 316 with IP66 seals)",
        "Solar inverter boxes and battery rack housings",
      ],
      tolerances: "General fabrication tolerances to ISO 2768-c.",
      certifications: ["ISO 9001:2015 Quality Management", "IP66 / NEMA Type 4X Laboratory Test Reports", "UL 508A Manufacturing Compliance Capability"],
    }
  },
  "electrical-components": {
    "connectors": {
      description: "Industrial electrical connectors and terminal pins designed for power transmission and signal connectivity. Precision machined copper and brass contacts with UL-approved insulating housings.",
      material: "Contacts: Copper Alloy (C11000), Brass (C36000), silver/gold plated. Insulator: Polyamide (PA66, UL 94 V-0 flame-retardant).",
      standards: ["UL 1059", "IEC 60947-7-1", "CE Compliance"],
      sizes: "Current ratings: 5A to 150A | Custom wire gauges",
      finishes: ["Silver Plated Contacts", "Gold Plated Contacts", "Tin Plated Contacts"],
      moq: "5,000 units",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "UL 94 V-0 flame retardant housing ensures maximum electrical safety.",
        "Contact resistance under 2 milliohms for high efficiency.",
        "Dielectric strength testing performed at 2,500V AC.",
      ],
      applications: [
        "Factory automation control panel wiring boards",
        "Heavy machinery power supplies and cabinet links",
        "Renewable energy solar combiner board connectors",
        "Automotive wire harnesses and relay links",
      ],
      tolerances: "Tight plastic molding and metal stamping tolerances (+/- 0.02 mm).",
      certifications: ["ISO 9001:2015 Quality Management", "UL Listed / Certified", "RoHS Compliance"],
    }
  },
  "springs-wire-forms": {
    "compression-springs": {
      description: "Precision-wound helical compression springs designed to resist applied compressive forces. Sourced from high-speed CNC spring coiling machinery, featuring uniform pitch and load characteristics.",
      material: "Music Wire (ASTM A228), Stainless Steel Wire (ASTM A313 Type 302/316), Chrome Silicon Alloy (ASTM A401)",
      standards: ["ASTM A228", "ASTM A313", "DIN 2095 Class 2"],
      sizes: "Wire diameter: 0.2mm to 12.0mm | Outer Diameter: 2mm to 100mm",
      finishes: ["Rust preventative oil", "Zinc Plated", "Black Oxide", "Passivated (Stainless)", "Color Coded Painting"],
      moq: "5,000 units",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "Dynamic load and rate testing reports provided.",
        "Closed and ground ends (for wire >1.0mm) for flat seating surface.",
        "Stress-relief heat treatment performed on all springs.",
        "Fatigue testing capability to simulate millions of cycles.",
      ],
      applications: [
        "Valves and hydraulic actuator assemblies",
        "Automotive suspension components and throttle linkages",
        "Consumer products, switches, and lock assemblies",
        "Industrial machinery solenoids and dampers",
      ],
      tolerances: "Spring rate tolerances to DIN 2095 Grade 2 standards.",
      certifications: ["ISO 9001:2015 Quality Management", "EN 10204 3.1 Material Certificate", "Spring Test Report"],
    }
  },
  "rubber-plastic-molded": {
    "o-rings-as568-sizes": {
      description: "High-grade elastomeric O-rings manufactured in standard AS568 sizes. Sourced from advanced vacuum compression molding systems, offering excellent sealing performance in chemical, fuel, and water networks.",
      material: "Nitrile Rubber (NBR / Buna-N, 70/90 Shore A), Fluorocarbon (Viton / FKM, 75/90 Shore A), EPDM, Silicone, PTFE",
      standards: ["AS568 (O-Ring Dimensions)", "ISO 3601", "ASTM D2000"],
      sizes: "Standard AS568 sizes (dash numbers -001 to -475) | Custom cross-sections",
      finishes: ["Plain / Non-sticky silicone coating", "Talcum powder coated"],
      moq: "10,000 units (packaged in lots of 100 or 1000)",
      leadTime: "8–10 weeks",
      keyFeatures: [
        "Elastomer compound tested per ASTM D2000 for temperature and chemical resistance.",
        "Precision flashless compression molding ensures zero parting line leaks.",
        "Durometer / hardness checks on every batch.",
      ],
      applications: [
        "Pipes, valves, and fluid connection seals",
        "Hydraulic cylinders and pneumatic fittings",
        "Automotive fuel lines and oil filters",
        "Chemical processing pumps and pharmaceutical gear",
      ],
      tolerances: "AS568 standard dimensional and cross-sectional tolerances.",
      certifications: ["ISO 9001:2015 Quality Management", "FDA compliant materials (Silicone/EPDM) on request", "RoHS Compliance"],
    }
  }
};

export function getProductDetails(categorySlug: string, productSlug: string): DetailedProduct | null {
  const category = productCategories.find((c) => c.slug === categorySlug);
  if (!category) return null;

  // Determine the display name from the types list
  const typeName = category.types.find(
    (t) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') === productSlug
  );

  if (!typeName) return null;

  // Find if we have a hand-crafted version
  const categoryMap = detailedProducts[categorySlug];
  const handCrafted = categoryMap ? categoryMap[productSlug] : null;

  // Generate dynamic professional B2B details, blending hand-crafted fields with fallbacks
  return {
    id: handCrafted?.id || `prod-${category.id}-${productSlug}`,
    categoryId: handCrafted?.categoryId || category.id,
    categorySlug: category.slug,
    name: handCrafted?.name || typeName,
    slug: productSlug,
    description: handCrafted?.description || `High-quality industrial ${typeName.toLowerCase()} manufactured in compliance with international engineering standards. Sourced from our ISO 9001:2015 certified partner factories in India. Features full material traceability, custom testing reports, and competitive landed B2B pricing.`,
    material: handCrafted?.material || category.materials.join(", "),
    standards: handCrafted?.standards || category.standards,
    sizes: handCrafted?.sizes || category.sizes || "Custom sizes to client specification / drawing",
    finishes: handCrafted?.finishes || category.finishes || ["Zinc Plating", "Hot-Dip Galvanized", "Self-Color / Plain"],
    imageUrl: handCrafted?.imageUrl || category.heroImage,
    moq: handCrafted?.moq || "1,000 units or $2,500 minimum value",
    leadTime: handCrafted?.leadTime || "8–10 weeks (production + sea transit)",
    keyFeatures: handCrafted?.keyFeatures || [
      "Full material test reports (EN 10204 3.1 certificate) provided with every batch.",
      "Strict dimensional tolerance checks per client technical drawings.",
      "Corrosion-resistant packaging for maritime transit and port holding.",
    ],
    applications: handCrafted?.applications || category.applications || ["Industrial equipment assembly", "Steel structure framing"],
    tolerances: handCrafted?.tolerances || "ASME Y14.5 compliant (or standard ISO equivalent)",
    certifications: handCrafted?.certifications || category.requiredDocs || ["ISO 9001:2015 Mill Certification", "RoHS Compliance Statement"],
  };
}
