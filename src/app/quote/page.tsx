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
      <div className="min-h-[70vh] bg-steel-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-copper-500 animate-spin" />
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
    // Clear error for field on change
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
      {/* Hero Section */}
      <section className="bg-navy-900 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-copper-400 text-sm font-semibold uppercase tracking-wider mb-4">
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Request for Quote</span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4 leading-[1.1]">
              Request a{" "}
              <span className="text-gradient">Quote</span>
            </h1>
            <p className="text-steel-400 text-lg leading-relaxed max-w-xl">
              Tell us what you need and our engineering team will deliver a
              detailed quote with transparent landed-cost pricing within{" "}
              <span className="text-white font-semibold">24–48 hours</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-steel-100">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Form Column (wider) */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="bg-white rounded-2xl border border-steel-200/85 overflow-hidden shadow-sm">
                      <div className="px-6 py-5 sm:px-8 border-b border-steel-200">
                        <h2 className="font-heading font-bold text-navy-900 text-xl">
                          Your Requirements
                        </h2>
                        <p className="text-steel-600 text-sm mt-1">
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
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500 pointer-events-none" aria-hidden="true" />
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
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500 text-sm">
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
                              "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg",
                              isSubmitting
                                ? "bg-copper-400 text-white cursor-wait"
                                : "bg-copper-500 hover:bg-copper-600 text-white"
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-steel-200/85 overflow-hidden shadow-sm"
              >
                <div className="px-6 py-5 border-b border-steel-200">
                  <h3 className="font-heading font-bold text-navy-900 text-lg">
                    What Happens Next?
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {PROCESS_STEPS.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="flex gap-4">
                        <div className="shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-copper-400" aria-hidden="true" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-copper-500 uppercase tracking-wider">
                              Step {step.step}
                            </span>
                          </div>
                          <h4 className="font-heading font-semibold text-navy-900 text-sm mb-1">
                            {step.title}
                          </h4>
                          <p className="text-xs text-steel-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

               {/* Trust Signals */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.25 }}
                 className="bg-navy-900 rounded-2xl border border-navy-800/80 overflow-hidden section-dark shadow-sm"
               >
                 <div className="p-6 space-y-4">
                  <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
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
                          <div className="w-8 h-8 rounded-xl bg-navy-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-copper-400" aria-hidden="true" />
                          </div>
                          <span className="text-sm text-steel-300 font-medium">
                            {signal.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-3 border-t border-navy-700">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1.5 text-copper-400 hover:text-copper-300 text-sm font-medium transition-colors"
                    >
                      Learn more about us
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Direct Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-white rounded-2xl border border-steel-200/80 p-6 shadow-sm"
              >
                <h3 className="font-heading font-bold text-navy-900 text-sm mb-3">
                  Prefer to Talk?
                </h3>
                <p className="text-sm text-steel-600 mb-4 leading-relaxed">
                  Our sales team is available Monday–Friday, 8AM–6PM EST.
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href="tel:+16402721906"
                    className="flex items-center gap-2 text-steel-700 hover:text-copper-600 transition-colors"
                  >
                    <span className="font-semibold">Phone:</span>{" "}
                    +1 (640) 272-1906
                  </a>
                  <a
                    href="mailto:kushal@aarontechno.com"
                    className="flex items-center gap-2 text-steel-700 hover:text-copper-600 transition-colors"
                  >
                    <span className="font-semibold">Email:</span>{" "}
                    kushal@aarontechno.com
                  </a>
                </div>
              </motion.div>
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
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy-900 mb-1.5">
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
    "w-full px-4 py-2.5 min-h-[48px] rounded-xl border text-navy-900 text-sm bg-steel-50/30 focus:bg-white placeholder:text-steel-400 transition-all duration-200 outline-none",
    error
      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
      : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
  );
}

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-steel-200/85 overflow-hidden shadow-lg"
    >
      <div className="px-6 py-16 sm:px-12 text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.15,
          }}
          className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
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
            <CheckCircle2 className="w-10 h-10 text-success" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-heading font-bold text-navy-900 text-2xl sm:text-3xl mb-3">
            Quote Request Received!
          </h2>
          <p className="text-steel-600 max-w-md mx-auto leading-relaxed mb-2">
            Thank you for your interest in Aaron Technologies. Our engineering
            team will review your requirements and respond with a detailed quote
            within <span className="font-semibold text-navy-900">24–48 hours</span>.
          </p>
          <p className="text-steel-500 text-sm mb-8">
            A confirmation email has been sent to your address.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm rounded-full transition-colors shadow-sm hover:shadow-md"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-steel-300 hover:bg-steel-100 text-navy-900 font-semibold text-sm rounded-full transition-colors bg-white shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
