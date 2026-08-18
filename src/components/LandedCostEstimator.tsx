"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Indicative landed-cost model.
 *
 * fob — FOB unit price in USD
 * frt — ocean freight per unit at the 1k reference volume
 * inl — inland freight per unit at the 1k reference volume
 * dom — US domestic benchmark unit price, for the savings comparison
 */
const PARTS = [
  {
    kind: "Fastener",
    name: "A193 B7 stud",
    spec: "M20 × 150 mm",
    fob: 1.84,
    frt: 0.34,
    inl: 0.09,
    dom: 3.95,
    lead: "6–8 wks",
  },
  {
    kind: "Forging",
    name: "B16.5 WN flange",
    spec: '4" · Class 150 · A105',
    fob: 12.4,
    frt: 1.95,
    inl: 0.52,
    dom: 23.4,
    lead: "7–9 wks",
  },
  {
    kind: "Casting",
    name: "Ductile iron housing",
    spec: "A536 65-45-12 · 8 kg",
    fob: 9.8,
    frt: 2.4,
    inl: 0.62,
    dom: 20.6,
    lead: "8–10 wks",
  },
  {
    kind: "Machined",
    name: "Turned shaft",
    spec: "1045 · ⌀40 × 300 mm",
    fob: 6.25,
    frt: 0.72,
    inl: 0.21,
    dom: 11.6,
    lead: "5–7 wks",
  },
];

const QUANTITIES = [
  { value: 1000, label: "1K" },
  { value: 5000, label: "5K" },
  { value: 10000, label: "10K" },
  { value: 25000, label: "25K" },
];

const DUTY_RATE = 0.18;

function breakdown(partIndex: number, qty: number) {
  const part = PARTS[partIndex];
  // Freight and brokerage both dilute with volume, but not linearly.
  const scale = Math.pow(5000 / qty, 0.42);
  const freight = part.frt * scale;
  const insurance = part.fob * 0.016;
  const duty = part.fob * DUTY_RATE;
  const handling = 1400 / qty + 0.012;
  const inland = part.inl * (0.55 + 0.45 * scale);
  const total = part.fob + freight + insurance + duty + handling + inland;

  return {
    part,
    freight,
    insurance,
    duty,
    handling,
    inland,
    total,
    savings: Math.round((1 - total / part.dom) * 100),
  };
}

export default function LandedCostEstimator() {
  const [partIndex, setPartIndex] = useState(0);
  const [qty, setQty] = useState(5000);

  const result = breakdown(partIndex, qty);
  const { part } = result;
  const decimals = result.total < 10 ? 3 : 2;
  const saving = result.savings;

  const lines = [
    { label: "FOB unit price (Mumbai)", value: part.fob },
    { label: "Ocean freight, consolidated FCL", value: result.freight },
    { label: "Marine insurance", value: result.insurance },
    { label: "Customs duty", value: result.duty, note: "@ 18%" },
    { label: "Port handling & brokerage", value: result.handling },
    { label: "Inland freight to your dock", value: result.inland },
  ];

  return (
    <div className="border border-ink-3">
      {/* Part selector */}
      <div
        role="tablist"
        aria-label="Sample part"
        className="grid grid-cols-2 border-b border-ink-3 lg:grid-cols-4"
      >
        {PARTS.map((option, i) => {
          const active = i === partIndex;
          return (
            <button
              key={option.name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPartIndex(i)}
              className={cn(
                "cursor-pointer border-ink-3 px-6 py-[22px] text-left transition-colors",
                i % 2 === 0 && "border-r lg:border-r",
                i < 2 && "border-b lg:border-b-0",
                i === 1 && "lg:border-r",
                i === 2 && "lg:border-r",
                active ? "bg-signal" : "bg-transparent hover:bg-ink-2"
              )}
            >
              <span
                className={cn(
                  "block font-mono text-[10px] uppercase tracking-[0.14em]",
                  active ? "text-ink/70" : "text-dim-2"
                )}
              >
                {option.kind}
              </span>
              <span
                className={cn(
                  "mt-2 block text-base font-bold",
                  active ? "text-ink" : "text-white"
                )}
              >
                {option.name}
              </span>
              <span
                className={cn(
                  "mt-[5px] block font-mono text-[11px]",
                  active ? "text-ink/70" : "text-dim-2"
                )}
              >
                {option.spec}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Cost build-up */}
        <div className="border-b border-ink-3 lg:border-r lg:border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-ink-3 px-7 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim-2">
              Order quantity
            </span>
            <div className="flex gap-2">
              {QUANTITIES.map((option) => {
                const active = option.value === qty;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setQty(option.value)}
                    className={cn(
                      "cursor-pointer border px-3.5 py-2 font-mono text-xs transition-colors",
                      active
                        ? "border-signal bg-signal text-ink"
                        : "border-ink-4 bg-transparent text-dim hover:border-dim-2"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {lines.map((line, i) => (
            <div
              key={line.label}
              className={cn(
                "flex items-baseline justify-between gap-4 px-7 py-[17px] text-sm text-dim",
                i < lines.length - 1 && "border-b border-ink-2"
              )}
            >
              <span>
                {line.label}
                {line.note && (
                  <span className="ml-1.5 font-mono text-dim-2">
                    {line.note}
                  </span>
                )}
              </span>
              <span className="font-mono text-white tabular-nums">
                {line.value.toFixed(3)}
              </span>
            </div>
          ))}
        </div>

        {/* Result */}
        <div className="flex flex-col">
          <div className="border-b border-ink-3 px-8 py-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim-2">
              Landed cost per unit
            </span>
            <div
              className="mt-3.5 text-[clamp(3.25rem,7vw,4.75rem)] leading-[0.9] font-bold tracking-[-0.045em] text-signal tabular-nums"
              aria-live="polite"
            >
              ${result.total.toFixed(decimals)}
            </div>
            <div className="mt-[26px] flex flex-wrap gap-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim-2">
                  Order total
                </div>
                <div className="mt-[7px] font-mono text-[17px] text-white tabular-nums">
                  $
                  {(result.total * qty).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim-2">
                  {saving >= 0 ? "vs. US domestic" : "premium vs. domestic"}
                </div>
                <div
                  className={cn(
                    "mt-[7px] font-mono text-[17px] tabular-nums",
                    saving >= 0 ? "text-signal" : "text-dim-2"
                  )}
                >
                  {saving >= 0 ? "−" : "+"}
                  {Math.abs(saving)}%
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim-2">
                  Est. lead time
                </div>
                <div className="mt-[7px] font-mono text-[17px] text-white">
                  {part.lead}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-[18px] px-8 py-7">
            <p className="m-0 font-mono text-[11px] leading-[1.7] tracking-[0.03em] text-dim-4">
              Indicative model for comparison only. Duty rate, HTS
              classification and freight are confirmed per shipment on your
              formal quote.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2.5 bg-signal px-7 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-white"
            >
              Get this quoted properly →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
