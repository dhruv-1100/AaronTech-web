"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

const INITIAL_FORM: ContactSubmission = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  function validateField(field: keyof ContactSubmission, value: string): string | undefined {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required";
        break;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        break;
      case "company":
        if (!value.trim()) return "Company name is required";
        break;
      case "phone":
        if (!value.trim()) return "Phone number is required";
        break;
      case "message":
        if (!value.trim()) return "Please enter your message";
        break;
    }
    return undefined;
  }

  // Handle Input Changes
  function handleChange(field: keyof ContactSubmission, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error on input (non-intrusive)
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  // Handle Blur Events (validate when user is "done" with a field)
  function handleBlur(field: keyof ContactSubmission) {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate all fields
    const formErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof ContactSubmission;
      const error = validateField(field, formData[field]);
      if (error) {
        formErrors[field] = error;
      }
    });

    setErrors(formErrors);

    // If there are errors, block submission
    if (Object.keys(formErrors).length > 0) {
      // Focus on the first invalid field
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `General Sourcing Inquiry - ${formData.company}`,
          message: `Company: ${formData.company}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-steel-200/85 p-8 sm:p-12 text-center shadow-lg"
        >
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="font-heading font-bold text-navy-900 text-2xl sm:text-3xl mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-steel-600 text-base leading-relaxed max-w-md mx-auto mb-8">
            Thank you for reaching out. A sourcing expert from our US office will review your message and contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setFormData(INITIAL_FORM);
              setIsSubmitted(false);
            }}
            className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-steel-200/85 overflow-hidden shadow-sm"
        >
          <div className="px-6 py-5 sm:px-8 border-b border-steel-200">
            <h2 className="font-heading font-bold text-navy-900 text-xl">
              Send Us a Message
            </h2>
            <p className="text-steel-600 text-sm mt-1">
              Fill out the form below and we will get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
            {/* Name & Email Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-semibold text-navy-900">
                  Full Name <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-steel-50/30 focus:bg-white min-h-[48px]",
                    errors.name
                      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                      : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
                  )}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-navy-900">
                  Email Address <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-steel-50/30 focus:bg-white min-h-[48px]",
                    errors.email
                      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                      : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
                  )}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Company & Phone Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-sm font-semibold text-navy-900">
                  Company Name <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-steel-50/30 focus:bg-white min-h-[48px]",
                    errors.company
                      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                      : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
                  )}
                />
                {errors.company && (
                  <p id="company-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-semibold text-navy-900">
                  Phone Number <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-steel-50/30 focus:bg-white min-h-[48px]",
                    errors.phone
                      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                      : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
                  )}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-semibold text-navy-900">
                Message <span className="text-error" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                required
                className={cn(
                  "w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-steel-50/30 focus:bg-white min-h-[120px] resize-y",
                  errors.message
                    ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                    : "border-steel-200/80 focus:border-navy-900/50 hover:border-steel-300 focus:ring-1 focus:ring-navy-900/50"
                )}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg",
                "bg-copper-500 hover:bg-copper-600 active:scale-[0.99]",
                "disabled:bg-copper-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
