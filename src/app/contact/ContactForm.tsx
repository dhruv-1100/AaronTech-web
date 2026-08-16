"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactSubmission, string>>;

const TOPICS = [
  "New sourcing inquiry",
  "Existing order or shipment",
  "Quality documentation request",
  "Supplier partnership",
  "Something else",
];

const INITIAL_FORM: ContactSubmission = {
  name: "",
  email: "",
  company: "",
  phone: "",
  topic: TOPICS[0],
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validateField(
    field: keyof ContactSubmission,
    value: string
  ): string | undefined {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required";
        break;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        break;
      case "company":
        if (!value.trim()) return "Company name is required";
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
    for (const key of Object.keys(formData) as (keyof ContactSubmission)[]) {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      document.getElementById(Object.keys(formErrors)[0])?.focus();
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
          subject: `${formData.topic} — ${formData.company}`,
          message: `Company: ${formData.company}\nPhone: ${
            formData.phone || "Not provided"
          }\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`,
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

  if (isSubmitted) {
    return (
      <div className="border-t-2 border-ink pt-10">
        <div className="bg-signal p-11">
          <h2 className="m-0 mb-3 text-[clamp(1.625rem,3vw,1.875rem)] text-ink">
            Message sent.
          </h2>
          <p className="m-0 text-base leading-[1.6] text-[#2B2F2A]">
            We reply within one business day. If it is urgent, call +1 (640)
            272-1906 and ask for the sourcing desk.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormData(INITIAL_FORM);
            setIsSubmitted(false);
          }}
          className="btn-secondary mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form onSubmit={handleSubmit} noValidate className="border-t-2 border-ink">
      <div className="grid grid-cols-1 gap-[26px] pt-10 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h2 className="m-0 text-[clamp(1.75rem,3.4vw,2.125rem)] text-ink">
            Send a message
          </h2>
        </div>

        <TextField
          id="name"
          label="Your name"
          required
          placeholder="Jane Doe"
          autoComplete="name"
          value={formData.name}
          error={errors.name}
          onChange={(v) => handleChange("name", v)}
          onBlur={() => handleBlur("name")}
        />
        <TextField
          id="company"
          label="Company"
          required
          placeholder="Acme Manufacturing Inc."
          autoComplete="organization"
          value={formData.company}
          error={errors.company}
          onChange={(v) => handleChange("company", v)}
          onBlur={() => handleBlur("company")}
        />
        <TextField
          id="email"
          type="email"
          label="Work email"
          required
          placeholder="jane@acme.com"
          autoComplete="email"
          value={formData.email}
          error={errors.email}
          onChange={(v) => handleChange("email", v)}
          onBlur={() => handleBlur("email")}
        />
        <TextField
          id="phone"
          type="tel"
          label="Phone (optional)"
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          value={formData.phone}
          onChange={(v) => handleChange("phone", v)}
        />

        <div className="sm:col-span-2">
          <label htmlFor="topic" className="field-label">
            What is this about
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            className="field"
          >
            {TOPICS.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Message{" "}
            <span className="text-alert" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us what you are sourcing, the volumes involved, and any certification requirements."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn("field resize-y", errors.message && "field-error")}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-2 font-mono text-[11px] text-alert"
            >
              {errors.message}
            </p>
          )}
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
                Sending…
              </>
            ) : (
              "Send message →"
            )}
          </button>
          {hasErrors && (
            <span role="alert" className="text-xs text-alert">
              Complete the required fields marked with an asterisk.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
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
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}{" "}
        {required && (
          <span className="text-alert" aria-hidden="true">
            *
          </span>
        )}
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
        onBlur={onBlur}
        className={cn("field", error && "field-error")}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 font-mono text-[11px] text-alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
