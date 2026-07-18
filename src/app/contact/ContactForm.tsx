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

function inputClasses(error?: string) {
  return cn(
    "w-full px-4 py-2.5 rounded-lg border text-text-primary text-sm bg-white placeholder:text-text-muted transition-all duration-200 outline-none min-h-[48px]",
    error
      ? "border-error focus:border-error focus:ring-1 focus:ring-error"
      : "border-border-strong focus:border-primary/50 hover:border-text-muted focus:ring-1 focus:ring-primary/50"
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  function handleChange(field: keyof ContactSubmission, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleBlur(field: keyof ContactSubmission) {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof ContactSubmission;
      const error = validateField(field, formData[field]);
      if (error) {
        formErrors[field] = error;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-12 text-center"
        >
          <div className="w-14 h-14 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl text-text-primary mb-4">
            Message <strong>Sent!</strong>
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-8">
            Thank you for reaching out. A sourcing expert from our US office
            will review your message and contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setFormData(INITIAL_FORM);
              setIsSubmitted(false);
            }}
            className="btn-primary px-8 py-3 cursor-pointer"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-5 sm:px-8 border-b border-border">
            <h2 className="text-lg font-medium text-text-primary">
              Send Us a Message
            </h2>
            <p className="text-text-tertiary text-sm mt-1">
              Fill out the form below and we will get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-text-primary">
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
                  className={inputClasses(errors.name)}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-text-primary">
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
                  className={inputClasses(errors.email)}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-sm font-medium text-text-primary">
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
                  className={inputClasses(errors.company)}
                />
                {errors.company && (
                  <p id="company-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
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
                  className={inputClasses(errors.phone)}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-medium text-text-primary">
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
                className={cn(inputClasses(errors.message), "min-h-[120px] resize-y")}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-error flex items-center gap-1 mt-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer",
                isSubmitting
                  ? "bg-primary/70 text-white cursor-wait"
                  : "bg-primary hover:opacity-85 text-white"
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
