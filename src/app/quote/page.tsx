"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/data/products";
import { RuleTab } from "@/components/ui/Page";
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
  needBy: "",
  message: "",
};

const TIMELINE = [
  { when: "24–48 hrs", what: "Engineering review and factory match" },
  { when: "Day 3–5", what: "Itemized landed-cost quote issued" },
  { when: "On approval", what: "First-article sample or FAI plan agreed" },
  { when: "4–8 weeks", what: "Production, inspection, consolidated shipping" },
];

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function validateForm(data: RFQSubmission): RFQFormErrors {
  const errors: RFQFormErrors = {};

  if (!data.companyName.trim()) errors.companyName = "Company name is required";
  if (!data.contactName.trim()) errors.contactName = "Contact name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.productCategory) errors.productCategory = "Please select a product line";
  if (!data.productDetails.trim())
    errors.productDetails = "Please describe the parts or specs you need";
  if (!data.quantity.trim()) errors.quantity = "Estimated quantity is required";

  return errors;
}

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted" />
        </div>
      }
    >
      <QuotePageContent />
    </Suspense>
  );
}

function StepChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-signal px-2.5 py-[5px] font-mono text-[11px] uppercase tracking-[0.15em] text-ink">
      {children}
    </span>
  );
}

function QuotePageContent() {
  const searchParams = useSearchParams();

  // Deep links from a catalog row or product page arrive with the line
  // already chosen, so the buyer does not re-pick what they just clicked.
  // Seeded at initialization rather than in an effect so the prefilled
  // values are present on first paint and can never clobber typed input.
  const [formData, setFormData] = useState<RFQSubmission>(() => {
    const categoryParam = searchParams.get("category");
    const productParam = searchParams.get("product");
    const matched = productCategories.find(
      (c) => c.id === categoryParam || c.slug === categoryParam
    );

    return {
      ...INITIAL_FORM,
      productCategory: matched?.name ?? INITIAL_FORM.productCategory,
      productDetails: productParam
        ? `Sourcing request for: ${productParam}\nSpecs: `
        : INITIAL_FORM.productDetails,
    };
  });
  const [errors, setErrors] = useState<RFQFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<
    { name: string; size: number; type: string; base64: string }[]
  >([]);
  const [fileNotice, setFileNotice] = useState<string | null>(null);

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

  function handleFileAdd(incoming: File[]) {
    setFileNotice(null);

    if (files.length + incoming.length > MAX_FILES) {
      setFileNotice(`Attach up to ${MAX_FILES} files.`);
      return;
    }

    for (const file of incoming) {
      if (file.size > MAX_FILE_BYTES) {
        setFileNotice(`“${file.name}” is over the 5 MB limit.`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles((prev) =>
          prev.some((f) => f.name === file.name && f.size === file.size)
            ? prev
            : [
                ...prev,
                {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  base64: e.target?.result as string,
                },
              ]
        );
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      document.getElementById(Object.keys(validationErrors)[0])?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, files }),
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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink">
        <div className="shell pt-16 pb-[76px] md:pt-[88px]">
          <div className="animate-rise">
            <RuleTab label="Request for quote" />
          </div>
          <h1 className="animate-rise mb-7 max-w-[17em] text-ink [animation-delay:0.08s]">
            Send a drawing. Get a real number.
          </h1>
          <p className="animate-rise m-0 max-w-[42em] text-[19px] leading-[1.6] text-body [animation-delay:0.16s]">
            Give us the specification, the volume and the target price. Our
            engineers match it against the vetted network and return an itemized
            landed cost — FOB, freight, insurance, duty, brokerage and inland —
            within 24 to 48 hours.
          </p>
        </div>
      </section>

      <section className="border-b border-ink bg-paper pt-16 pb-20 md:pt-[88px] md:pb-[100px]">
        <div className="shell grid items-start gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          {isSubmitted ? (
            <div className="border-t-2 border-ink pt-10">
              <div className="bg-signal p-11">
                <h2 className="m-0 mb-3 text-[clamp(1.75rem,3.4vw,2rem)] text-ink">
                  RFQ received.
                </h2>
                <p className="m-0 text-base leading-[1.6] text-[#2B2F2A]">
                  Our engineering desk reviews every submission by hand. Expect
                  an itemized landed-cost quote within 24–48 hours, or a call if
                  the drawing needs clarification first.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setFiles([]);
                  setIsSubmitted(false);
                }}
                className="btn-secondary mt-8"
              >
                Submit another RFQ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border-t-2 border-ink">
              <div className="grid grid-cols-1 gap-[26px] pt-10 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <StepChip>01 — Who you are</StepChip>
                </div>

                <Field
                  id="companyName"
                  label="Company name"
                  required
                  placeholder="Acme Manufacturing Inc."
                  autoComplete="organization"
                  value={formData.companyName}
                  error={errors.companyName}
                  onChange={(v) => updateField("companyName", v)}
                />
                <Field
                  id="contactName"
                  label="Your name"
                  required
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={formData.contactName}
                  error={errors.contactName}
                  onChange={(v) => updateField("contactName", v)}
                />
                <Field
                  id="email"
                  type="email"
                  label="Work email"
                  required
                  placeholder="jane@acme.com"
                  autoComplete="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={(v) => updateField("email", v)}
                />
                <Field
                  id="phone"
                  type="tel"
                  label="Phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={(v) => updateField("phone", v)}
                />

                <div className="mt-3 border-t border-rule pt-[34px] sm:col-span-2">
                  <StepChip>02 — What you need</StepChip>
                </div>

                <div>
                  <label htmlFor="productCategory" className="field-label">
                    Product line <Required />
                  </label>
                  <select
                    id="productCategory"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={(e) => updateField("productCategory", e.target.value)}
                    aria-invalid={!!errors.productCategory}
                    className={cn("field", errors.productCategory && "field-error")}
                  >
                    <option value="">Select a line…</option>
                    {productCategories.map((category) => (
                      <option key={category.slug} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                    <option value="Custom / multiple lines">
                      Custom / multiple lines
                    </option>
                  </select>
                  <FieldError message={errors.productCategory} />
                </div>

                <Field
                  id="quantity"
                  label="Annual quantity"
                  required
                  placeholder="5,000 pcs"
                  value={formData.quantity}
                  error={errors.quantity}
                  onChange={(v) => updateField("quantity", v)}
                />

                <div className="sm:col-span-2">
                  <label htmlFor="productDetails" className="field-label">
                    Specification details <Required />
                  </label>
                  <textarea
                    id="productDetails"
                    name="productDetails"
                    rows={5}
                    placeholder="Grade, size, standard, tolerance, finish — e.g. ASTM A193 B7 stud, M20 × 150 mm, hot-dip galvanized, EN 10204 3.1 required."
                    value={formData.productDetails}
                    onChange={(e) => updateField("productDetails", e.target.value)}
                    aria-invalid={!!errors.productDetails}
                    className={cn(
                      "field resize-y",
                      errors.productDetails && "field-error"
                    )}
                  />
                  <FieldError message={errors.productDetails} />
                </div>

                <Field
                  id="targetPrice"
                  label="Target price (optional)"
                  placeholder="$2.40 / unit landed"
                  value={formData.targetPrice ?? ""}
                  onChange={(v) => updateField("targetPrice", v)}
                />
                <Field
                  id="needBy"
                  label="Need by (optional)"
                  placeholder="Q4 2026"
                  value={formData.needBy ?? ""}
                  onChange={(v) => updateField("needBy", v)}
                />

                <div className="sm:col-span-2">
                  <label htmlFor="files" className="field-label">
                    Drawings &amp; specs (optional)
                  </label>
                  <div className="flex flex-wrap items-center justify-between gap-5 border border-dashed border-rule-strong bg-white p-[26px]">
                    <div>
                      <div className="text-[15px] text-ink">
                        Attach 2D/3D CAD, PDF drawings or spec sheets
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] text-muted">
                        PDF · DWG · DXF · STEP · IGES — up to 5 MB each, {MAX_FILES} max
                      </div>
                    </div>
                    <input
                      id="files"
                      name="files"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileAdd(Array.from(e.target.files ?? []))
                      }
                      className="font-mono text-xs text-body file:mr-3 file:cursor-pointer file:border file:border-ink file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.13em] file:text-ink hover:file:bg-ink hover:file:text-signal"
                    />
                  </div>
                  {fileNotice && (
                    <p className="mt-2.5 font-mono text-[11px] text-alert">
                      {fileNotice}
                    </p>
                  )}
                  {files.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {files.map((file) => (
                        <li
                          key={`${file.name}-${file.size}`}
                          className="flex items-center justify-between gap-4 border border-rule-strong bg-white px-4 py-2.5"
                        >
                          <span className="truncate font-mono text-xs text-ink">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setFiles((prev) =>
                                prev.filter((f) => f.name !== file.name)
                              )
                            }
                            aria-label={`Remove ${file.name}`}
                            className="shrink-0 cursor-pointer text-muted hover:text-ink"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="field-label">
                    Anything else
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Existing supplier situation, certification requirements, PPAP level, packaging or labelling needs."
                    value={formData.message ?? ""}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="field resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-rule pt-[30px] sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-2.5 border-0 px-[34px] py-[18px] text-base font-bold transition-colors",
                      isSubmitting
                        ? "cursor-wait bg-ink-3 text-dim"
                        : "bg-ink text-signal hover:bg-signal hover:text-ink"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      "Submit RFQ →"
                    )}
                  </button>
                  {hasErrors && (
                    <span role="alert" className="text-xs text-alert">
                      Complete the required fields marked with an asterisk.
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-muted">
                    Your drawings stay confidential. We do not share
                    specifications outside the quoting factory.
                  </span>
                </div>
              </div>
            </form>
          )}

          <aside className="flex flex-col gap-7 lg:sticky lg:top-[132px]">
            <div className="border-2 border-ink p-8">
              <h2 className="m-0 mb-[22px] text-[22px] text-ink">
                What happens next
              </h2>
              {TIMELINE.map((row, i) => (
                <div
                  key={row.when}
                  className={cn(
                    "grid items-baseline gap-4 py-4 sm:grid-cols-[96px_minmax(0,1fr)]",
                    i === 0 ? "border-t border-ink" : "border-t border-rule"
                  )}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-ink">
                    {row.when}
                  </span>
                  <span className="text-sm text-body">{row.what}</span>
                </div>
              ))}
            </div>

            <div className="bg-ink p-8">
              <h2 className="m-0 mb-4 text-[19px] text-white">
                Rather talk it through?
              </h2>
              <p className="m-0 mb-5 text-sm leading-[1.6] text-dim-2">
                Complex assemblies and multi-line schedules are usually faster
                on a call.
              </p>
              <a
                href="tel:+16402721906"
                className="mb-2.5 block font-mono text-[15px] text-signal hover:text-white"
              >
                +1 (640) 272-1906
              </a>
              <a
                href="mailto:kushal@aarontechno.com"
                className="block font-mono text-[13px] text-dim hover:text-signal"
              >
                kushal@aarontechno.com
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Required() {
  return (
    <span className="text-alert" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 font-mono text-[11px] text-alert">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <Required />}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn("field", error && "field-error")}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 font-mono text-[11px] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}
