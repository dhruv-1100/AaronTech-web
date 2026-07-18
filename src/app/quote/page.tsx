"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  ClipboardList,
  Search,
  PackageCheck,
  ShieldCheck,
  Boxes,
  Clock,
  ChevronDown,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import type { RFQSubmission, RFQFormErrors } from "@/types";

const INITIAL_FORM: RFQSubmission = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  productCategory: "",
  productDetails: "",
  quantity: "",
  targetPrice: "",
  message: "",
};

const PROCESS_STEPS = [
  {
    step: 1,
    icon: ClipboardList,
    title: "We Review Your Requirements",
    description:
      "Our engineering team reviews your specifications, drawings, and material requirements to identify the best sourcing approach.",
  },
  {
    step: 2,
    icon: Search,
    title: "We Source & Quote in 24–48 Hours",
    description:
      "We match your requirements to our vetted supplier network and deliver a detailed quote with landed-cost pricing.",
  },
  {
    step: 3,
    icon: PackageCheck,
    title: "Sample Order or Production Begins",
    description:
      "Once approved, we arrange samples or kick off production with full QC inspection, material certs, and shipment tracking.",
  },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: "Vetted Supplier Network" },
  { icon: Boxes, label: "500+ SKUs Available" },
  { icon: Clock, label: "24–48 Hour Quote Turnaround" },
];

function validateForm(data: RFQSubmission): RFQFormErrors {
  const errors: RFQFormErrors = {};

  if (!data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }
  if (!data.contactName.trim()) {
    errors.contactName = "Contact name is required";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  }
  if (!data.productCategory) {
    errors.productCategory = "Please select a product category";
  }
  if (!data.productDetails.trim()) {
    errors.productDetails = "Please describe the parts or specs you need";
  }
  if (!data.quantity.trim()) {
    errors.quantity = "Estimated quantity is required";
  }

  return errors;
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-text-tertiary animate-spin" />
      </div>
    }>
      <QuotePageContent />
    </Suspense>
  );
}

function QuotePageContent() {
  const [formData, setFormData] = useState<RFQSubmission>(INITIAL_FORM);
  const [errors, setErrors] = useState<RFQFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");
  const prodParam = searchParams.get("product");

  useEffect(() => {
    if (catParam || prodParam) {
      const matchedCat = productCategories.find(
        (c) => c.id === catParam || c.slug === catParam
      );
      setFormData((prev) => ({
        ...prev,
        productCategory: matchedCat ? matchedCat.id : prev.productCategory,
        productDetails: prodParam 
          ? `Sourcing request for: ${prodParam}\nSpecs: ` 
          : prev.productDetails,
      }));
    }
  }, [catParam, prodParam]);

  function updateField(field: keyof RFQSubmission, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof RFQFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof RFQFormErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="font-mono text-xs uppercase text-text-tertiary tracking-tight block mb-3">
            Request for Quote
          </span>
          <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-5 max-w-2xl">
            Request a <strong>Quote</strong>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
            Tell us what you need and our engineering team will deliver a
            detailed quote with transparent landed-cost pricing within{" "}
            <span className="font-medium text-text-primary">24–48 hours</span>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-xl border border-border-strong overflow-hidden">
                      <div className="px-6 py-5 sm:px-8 border-b border-border">
                        <h2 className="text-lg font-medium text-text-primary">
                          Your Requirements
                        </h2>
                        <p className="text-text-tertiary text-sm mt-1">
                          Fields marked with{" "}
                          <span className="text-error">*</span> are required
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="p-6 sm:p-8 space-y-6"
                      >
                        {/* Company & Contact */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="Company Name"
                            required
                            error={errors.companyName}
                            htmlFor="companyName"
                          >
                            <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              value={formData.companyName}
                              onChange={(e) =>
                                updateField("companyName", e.target.value)
                              }
                              placeholder="Acme Manufacturing Inc."
                              autoComplete="organization"
                              aria-invalid={!!errors.companyName}
                              className={inputClasses(errors.companyName)}
                            />
                          </FormField>
                          <FormField
                            label="Contact Name"
                            required
                            error={errors.contactName}
                            htmlFor="contactName"
                          >
                            <input
                              id="contactName"
                              name="contactName"
                              type="text"
                              value={formData.contactName}
                              onChange={(e) =>
                                updateField("contactName", e.target.value)
                              }
                              placeholder="John Smith"
                              autoComplete="name"
                              aria-invalid={!!errors.contactName}
                              className={inputClasses(errors.contactName)}
                            />
                          </FormField>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="Email"
                            required
                            error={errors.email}
                            htmlFor="email"
                          >
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                updateField("email", e.target.value)
                              }
                              placeholder="john@acmemfg.com"
                              autoComplete="email"
                              aria-invalid={!!errors.email}
                              className={inputClasses(errors.email)}
                            />
                          </FormField>
                          <FormField
                            label="Phone"
                            required
                            error={errors.phone}
                            htmlFor="phone"
                          >
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                updateField("phone", e.target.value)
                              }
                              placeholder="+1 (555) 000-0000"
                              autoComplete="tel"
                              aria-invalid={!!errors.phone}
                              className={inputClasses(errors.phone)}
                            />
                          </FormField>
                        </div>

                        {/* Product Category */}
                        <FormField
                          label="Product Category"
                          required
                          error={errors.productCategory}
                          htmlFor="productCategory"
                        >
                          <div className="relative">
                            <select
                              id="productCategory"
                              name="productCategory"
                              value={formData.productCategory}
                              onChange={(e) =>
                                updateField("productCategory", e.target.value)
                              }
                              aria-invalid={!!errors.productCategory}
                              className={cn(
                                inputClasses(errors.productCategory),
                                "appearance-none pr-10"
                              )}
                            >
                              <option value="">
                                Select a product category…
                              </option>
                              {productCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" aria-hidden="true" />
                          </div>
                        </FormField>

                        {/* Product Details */}
                        <FormField
                          label="Product Details"
                          required
                          error={errors.productDetails}
                          htmlFor="productDetails"
                        >
                          <textarea
                            id="productDetails"
                            name="productDetails"
                            value={formData.productDetails}
                            onChange={(e) =>
                              updateField("productDetails", e.target.value)
                            }
                            rows={4}
                            placeholder="Describe the parts you need — include material specs, dimensions, standards, drawings references, and any special requirements."
                            aria-invalid={!!errors.productDetails}
                            className={cn(
                              inputClasses(errors.productDetails),
                              "resize-y min-h-[100px]"
                            )}
                          />
                        </FormField>

                        {/* Quantity & Target Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="Estimated Quantity"
                            required
                            error={errors.quantity}
                            htmlFor="quantity"
                          >
                            <input
                              id="quantity"
                              name="quantity"
                              type="text"
                              value={formData.quantity}
                              onChange={(e) =>
                                updateField("quantity", e.target.value)
                              }
                              placeholder="e.g. 5,000 pcs"
                              aria-invalid={!!errors.quantity}
                              className={inputClasses(errors.quantity)}
                            />
                          </FormField>
                          <FormField label="Target Unit Price" required={false} htmlFor="targetPrice">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                                $
                              </span>
                              <input
                                id="targetPrice"
                                name="targetPrice"
                                type="text"
                                value={formData.targetPrice}
                                onChange={(e) =>
                                  updateField("targetPrice", e.target.value)
                                }
                                placeholder="Optional"
                                className={cn(inputClasses(), "pl-7")}
                              />
                            </div>
                          </FormField>
                        </div>

                        {/* Additional Message */}
                        <FormField
                          label="Additional Message"
                          required={false}
                          htmlFor="message"
                        >
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={(e) =>
                              updateField("message", e.target.value)
                            }
                            rows={3}
                            placeholder="Any additional context, timeline expectations, or questions…"
                            className={cn(
                              inputClasses(),
                              "resize-y min-h-[80px]"
                            )}
                          />
                        </FormField>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                              "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all",
                              isSubmitting
                                ? "bg-primary/70 text-white cursor-wait"
                                : "bg-primary hover:opacity-85 text-white"
                            )}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                Submitting…
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" aria-hidden="true" />
                                Submit Quote Request
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What Happens Next */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-[15px] font-medium text-text-primary">
                    What Happens Next?
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {PROCESS_STEPS.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="flex gap-4">
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center">
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase text-primary-muted tracking-tight block mb-1">
                            Step {step.step}
                          </span>
                          <h4 className="text-sm font-medium text-text-primary mb-1">
                            {step.title}
                          </h4>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-mono text-[10px] uppercase text-text-tertiary tracking-tight mb-4">
                  Why Aaron Technologies?
                </h3>
                <div className="space-y-3">
                  {TRUST_SIGNALS.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div
                        key={signal.label}
                        className="flex items-center gap-3"
                      >
                        <div className="w-7 h-7 rounded-lg bg-bg-muted text-text-tertiary flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <span className="text-sm text-text-secondary">
                          {signal.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-text-primary hover:text-primary text-sm font-medium transition-colors"
                  >
                    Learn more about us
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  Prefer to Talk?
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  Our sales team is available Monday–Friday, 8AM–6PM EST.
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href="tel:+16402721906"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span className="font-medium">Phone:</span>{" "}
                    +1 (640) 272-1906
                  </a>
                  <a
                    href="mailto:kushal@aarontechno.com"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span className="font-medium">Email:</span>{" "}
                    kushal@aarontechno.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Helper Components ─── */

function FormField({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required: boolean;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-error">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClasses(error?: string) {
  return cn(
    "w-full px-4 py-2.5 min-h-[48px] rounded-lg border text-text-primary text-sm bg-white placeholder:text-text-muted transition-all duration-200 outline-none",
    error
      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
      : "border-border-strong focus:border-primary/50 hover:border-text-muted focus:ring-1 focus:ring-primary/50"
  );
}

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-border-strong overflow-hidden"
    >
      <div className="px-6 py-16 sm:px-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.15,
          }}
          className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 12,
              delay: 0.3,
            }}
          >
            <CheckCircle2 className="w-8 h-8 text-success" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl text-text-primary mb-3">
            Quote Request <strong>Received!</strong>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto leading-relaxed mb-2">
            Thank you for your interest in Aaron Technologies. Our engineering
            team will review your requirements and respond with a detailed quote
            within <span className="font-medium text-text-primary">24–48 hours</span>.
          </p>
          <p className="text-text-tertiary text-sm mb-8">
            A confirmation email has been sent to your address.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-primary px-8 py-3.5"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="btn-secondary px-8 py-3.5"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
