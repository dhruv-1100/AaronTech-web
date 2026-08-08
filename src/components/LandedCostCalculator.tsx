"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Ship,
  Plane,
  Zap,
  ChevronDown,
  TrendingUp,
  Info,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import type { LandedCostInput, LandedCostBreakdown } from "@/types";

const SHIPPING_METHODS = [
  {
    id: "sea" as const,
    label: "Sea Freight",
    icon: Ship,
    ratePerKg: 0.15,
    minCharge: 200,
    estimate: "25–35 days",
  },
  {
    id: "air" as const,
    label: "Air Freight",
    icon: Plane,
    ratePerKg: 3.5,
    minCharge: 150,
    estimate: "5–7 days",
  },
  {
    id: "express" as const,
    label: "Express",
    icon: Zap,
    ratePerKg: 8.0,
    minCharge: 100,
    estimate: "3–5 days",
  },
];

const DUTY_RATE = 0.18;
const INSURANCE_RATE = 0.005;
const HANDLING_FEE = 150;

function calculateLandedCost(input: LandedCostInput): LandedCostBreakdown {
  const fobTotal = input.fobPrice * input.quantity;
  const totalWeight = input.weight * input.quantity;

  const method = SHIPPING_METHODS.find((m) => m.id === input.shippingMethod)!;
  const freight = Math.max(totalWeight * method.ratePerKg, method.minCharge);

  const insurance = fobTotal * INSURANCE_RATE;
  const customsDuty = fobTotal * DUTY_RATE;
  const handlingFees = HANDLING_FEE;

  const totalLandedCost =
    fobTotal + freight + insurance + customsDuty + handlingFees;
  const perUnitCost = input.quantity > 0 ? totalLandedCost / input.quantity : 0;

  return {
    fobTotal,
    freight,
    insurance,
    customsDuty,
    dutyRate: DUTY_RATE,
    handlingFees,
    totalLandedCost,
    perUnitCost,
  };
}

export default function LandedCostCalculator() {
  const [fobPrice, setFobPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [shippingMethod, setShippingMethod] =
    useState<LandedCostInput["shippingMethod"]>("sea");
  const [productCategory, setProductCategory] = useState("");
  const [showResults, setShowResults] = useState(false);

  const isValid =
    Number(fobPrice) > 0 && Number(quantity) > 0 && Number(weight) > 0;

  const breakdown = useMemo<LandedCostBreakdown | null>(() => {
    if (!isValid) return null;
    return calculateLandedCost({
      fobPrice: Number(fobPrice),
      quantity: Number(quantity),
      weight: Number(weight),
      shippingMethod,
      productCategory,
    });
  }, [fobPrice, quantity, weight, shippingMethod, productCategory, isValid]);

  function handleCalculate() {
    if (isValid) setShowResults(true);
  }

  function handleReset() {
    setFobPrice("");
    setQuantity("");
    setWeight("");
    setShippingMethod("sea");
    setProductCategory("");
    setShowResults(false);
  }

  return (
    <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-copper-500/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-copper-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-lg">
              Landed Cost Calculator
            </h3>
            <p className="text-steel-400 text-sm">
              Estimate your total import cost from India to the US
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Price, Quantity, Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fob-price" className="block text-sm font-medium text-navy-900 mb-1.5">
              FOB Unit Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-700 text-sm">
                $
              </span>
              <input
                id="fob-price"
                type="number"
                min="0"
                step="0.01"
                value={fobPrice}
                onChange={(e) => {
                  setFobPrice(e.target.value);
                  setShowResults(false);
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-steel-250 text-navy-900 text-sm placeholder:text-steel-400 bg-white focus:border-copper-500 focus:ring-1 focus:ring-copper-500/20 transition-all outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-navy-900 mb-1.5">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setShowResults(false);
              }}
              placeholder="e.g. 1000"
              className="w-full px-4 py-2.5 rounded-xl border border-steel-250 text-navy-900 text-sm placeholder:text-steel-400 bg-white focus:border-copper-500 focus:ring-1 focus:ring-copper-500/20 transition-all outline-none"
            />
          </div>
          <div>
            <label htmlFor="weight-per-unit" className="block text-sm font-medium text-navy-900 mb-1.5">
              Weight per Unit (kg)
            </label>
            <input
              id="weight-per-unit"
              type="number"
              min="0"
              step="0.01"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setShowResults(false);
              }}
              placeholder="e.g. 0.5"
              className="w-full px-4 py-2.5 rounded-xl border border-steel-250 text-navy-900 text-sm placeholder:text-steel-400 bg-white focus:border-copper-500 focus:ring-1 focus:ring-copper-500/20 transition-all outline-none"
            />
          </div>
        </div>

        {/* Shipping Method */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Shipping Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Shipping method">
            {SHIPPING_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = shippingMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  role="radio"
                  aria-checked={method.id === shippingMethod}
                  onClick={() => {
                    setShippingMethod(method.id);
                    setShowResults(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                    isSelected
                      ? "border-copper-500 bg-copper-500/5 ring-1 ring-copper-500/20"
                      : "border-steel-250 hover:border-steel-450 bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                      isSelected
                        ? "bg-copper-500 text-white"
                        : "bg-steel-200 text-steel-600"
                    )}
                  >
                    <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className={cn(
                        "text-sm font-semibold",
                        isSelected ? "text-copper-600" : "text-navy-900"
                      )}
                    >
                      {method.label}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-medium",
                        isSelected ? "text-copper-700 font-semibold" : "text-steel-800"
                      )}
                    >
                      {method.estimate}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Category */}
        <div>
            <label htmlFor="product-category" className="block text-sm font-medium text-navy-900 mb-1.5">
              Product Category (optional)
          </label>
          <div className="relative">
            <select
              id="product-category"
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
                setShowResults(false);
              }}
              className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-steel-250 text-navy-900 text-sm bg-white focus:border-copper-500 focus:ring-1 focus:ring-copper-500/20 transition-all outline-none cursor-pointer"
            >
              <option value="">Select a category…</option>
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-700 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {/* Duty Rate Note */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-navy-900/5 border border-navy-700/10">
          <Info className="w-4 h-4 text-navy-700 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-xs text-steel-700 leading-relaxed">
            Customs duty is calculated at{" "}
            <span className="font-bold text-navy-900">18%</span> based on the{" "}
            <span className="font-semibold">
              US-India Trade Agreement 2026
            </span>{" "}
            rate. Actual rates may vary by HS code and product classification.
            This calculator provides estimates only.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!isValid}
            className={cn(
              "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer",
              isValid
                ? "bg-copper-500 hover:bg-copper-600 text-white"
                : "bg-steel-200 text-steel-500 cursor-not-allowed"
            )}
          >
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Calculate Landed Cost
          </button>
          {showResults && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-steel-600 hover:text-navy-900 font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && breakdown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-steel-300">
              {/* Results Header */}
              <div className="bg-bg-subtle/50 px-6 py-4 sm:px-8 border-b border-border">
                <p className="font-heading font-bold text-navy-900 text-base">
                  Cost Breakdown
                </p>
              </div>

              {/* Breakdown Table */}
              <div className="px-6 sm:px-8 pb-6">
                <div className="divide-y divide-steel-200">
                  <BreakdownRow
                    label="FOB Total"
                    sublabel={`${formatCurrency(Number(fobPrice))} × ${quantity} units`}
                    value={breakdown.fobTotal}
                    delay={0}
                  />
                  <BreakdownRow
                    label="Freight Cost"
                    sublabel={`${SHIPPING_METHODS.find((m) => m.id === shippingMethod)!.label} — ${(Number(weight) * Number(quantity)).toFixed(1)} kg total`}
                    value={breakdown.freight}
                    delay={0.05}
                  />
                  <BreakdownRow
                    label="Insurance"
                    sublabel="0.5% of FOB total"
                    value={breakdown.insurance}
                    delay={0.1}
                  />
                  <BreakdownRow
                    label="Customs Duty"
                    sublabel="18% — US-India Trade Agreement 2026"
                    value={breakdown.customsDuty}
                    delay={0.15}
                    highlight
                    tooltipContent="Calculated at 18% based on the US-India Bilateral Trade Agreement 2026 guidelines. Actual duty rates are determined by the specific HS Code classification of your products."
                  />
                  <BreakdownRow
                    label="Handling & Brokerage"
                    sublabel="Flat fee"
                    value={breakdown.handlingFees}
                    delay={0.2}
                    tooltipContent="Covers standard documentation, customs entry filing, ISF filing, and port processing charges. This flat-rate benchmark is typical for our consolidated shipping services."
                  />
                </div>

                {/* Totals */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 p-4 rounded-xl bg-navy-900 text-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-base">
                      Total Landed Cost
                    </span>
                    <span className="font-heading font-bold text-xl text-copper-400">
                      {formatCurrency(breakdown.totalLandedCost)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-steel-400 text-sm">
                      Per-Unit Landed Cost
                    </span>
                    <span className="font-heading font-semibold text-steel-200">
                      {formatCurrency(breakdown.perUnitCost)}
                    </span>
                  </div>
                </motion.div>

                <p className="mt-3 text-xs text-steel-700 text-center font-medium">
                  This is an estimate. Actual costs may vary based on HS code
                  classification, origin port, and current freight rates.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BreakdownRow({
  label,
  sublabel,
  value,
  delay = 0,
  highlight = false,
  tooltipContent,
}: {
  label: string;
  sublabel: string;
  value: number;
  delay?: number;
  highlight?: boolean;
  tooltipContent?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between py-3 relative"
    >
      <div>
        <span
          className={cn(
            "text-sm font-medium inline-flex items-center gap-1.5",
            highlight ? "text-copper-600" : "text-navy-900"
          )}
        >
          {label}
          {tooltipContent && (
            <div 
              className="relative inline-block"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="w-3.5 h-3.5 text-steel-400 hover:text-navy-900 cursor-pointer transition-colors" aria-hidden="true" />
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-50 left-1/2 bottom-full mb-2 w-64 -translate-x-1/2 p-3 bg-navy-900 text-white text-xs font-normal normal-case leading-relaxed border border-navy-800 shadow-xl rounded-xl text-left"
                  >
                    {tooltipContent}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </span>
        <span className="block text-xs text-steel-700">{sublabel}</span>
      </div>
      <span
        className={cn(
          "text-sm font-semibold tabular-nums",
          highlight ? "text-copper-600" : "text-navy-900"
        )}
      >
        {formatCurrency(value)}
      </span>
    </motion.div>
  );
}
