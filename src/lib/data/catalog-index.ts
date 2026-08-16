/**
 * Display strings for the catalog index tables.
 *
 * The homepage lists a condensed set of governing standards; the products
 * index has room for the fuller list plus a materials column. Both read from
 * here so a standard is only ever corrected in one place.
 */
export interface CatalogIndexEntry {
  /** Condensed standards line — homepage catalog index. */
  standardsShort: string;
  /** Fuller standards line — /products catalog index. */
  standards: string;
  /** Materials line — /products catalog index. */
  materials: string;
  /** Description override where the products index differs from the SKU blurb. */
  description?: string;
}

export const catalogIndex: Record<string, CatalogIndexEntry> = {
  fasteners: {
    standardsShort: "ASTM A193 · A320 · DIN 933",
    standards: "ASTM A193 / A320 · SAE J429 · ISO 898-1",
    materials: "Carbon & alloy steel, stainless 304/316, titanium",
  },
  "forged-components": {
    standardsShort: "ASME B16.5 · A105 · A182",
    standards: "ASME B16.5 · ASTM A105 · ASTM A182",
    materials: "Carbon, alloy, stainless & duplex steel",
  },
  castings: {
    standardsShort: "ASTM A216 · A536 · A48",
    standards: "ASTM A48 · A536 · A216/A217",
    materials: "Gray iron, ductile iron, cast steel, aluminum",
  },
  "bearings-bushings": {
    standardsShort: "ABMA · ISO 15:2017",
    standards: "ABMA Standards · ISO 15:2017",
    materials: "Chrome steel GCr15, stainless, bronze, polymer",
  },
  "hydraulic-pneumatic": {
    standardsShort: "SAE J514 · ISO 6162 · J1453",
    standards: "SAE J514 · ISO 6162 · SAE J1453",
    materials: "Carbon steel, stainless, hard chrome bar, honed tube",
    description: "Cylinders, valves, fittings & hoses for demanding duty",
  },
  "precision-machined": {
    standardsShort: "ASME Y14.5 (GD&T)",
    standards: "ASME Y14.5 (GD&T)",
    materials: "Steel, stainless, aluminum, brass, titanium",
    description: "CNC turned & milled parts built to your drawings",
  },
  "industrial-valves": {
    standardsShort: "ASME B16.34 · API 6D · 598",
    standards: "ASME B16.34 · API 6D · API 598",
    materials: "Cast steel, stainless, bronze, ductile iron",
    description: "Ball, gate, globe, butterfly & check valves",
  },
  "pumps-pump-parts": {
    standardsShort: "ANSI/ASME B73.1",
    standards: "ANSI/ASME B73.1",
    materials: "Cast iron, stainless 316, duplex, bronze",
    description: "Impellers, seals, casings, shafts & wear rings",
  },
  "sheet-metal-enclosures": {
    standardsShort: "AWS D1.1 · NEMA ratings",
    standards: "AWS D1.1 · NEMA enclosure ratings",
    materials: "Mild steel, stainless, aluminum, galvanized",
    description: "Laser-cut, bent & welded fabrication with finishing",
  },
  "electrical-components": {
    standardsShort: "UL Listed · CE · IEC 60947",
    standards: "UL Listed · CE Marked · IEC 60947",
    materials: "Copper, brass, stainless, engineering plastics",
    description: "Connectors, terminal blocks, glands & switchgear parts",
  },
  "springs-wire-forms": {
    standardsShort: "ASTM A228 · A313",
    standards: "ASTM A228 · ASTM A313",
    materials: "Music wire, stainless 302/316, phosphor bronze, Inconel",
    description: "Compression, extension & torsion springs, wire forms",
  },
  "rubber-plastic-molded": {
    standardsShort: "AS568 · ASTM D2000",
    standards: "AS568 · ASTM D2000",
    materials: "NBR, Viton (FKM), EPDM, silicone, PTFE",
    description: "O-rings, gaskets, seals & custom molded parts",
  },
};
