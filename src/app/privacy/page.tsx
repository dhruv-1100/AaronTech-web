import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Aaron Technologies",
  description: "Learn how Aaron Technologies Inc. collects, processes, and protects your business and RFQ data.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl leading-tight mb-2">
            Privacy <strong>Policy</strong>
          </h1>
          <p className="text-sm text-text-tertiary">
            Last updated: June 25, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          <div className="flex items-center gap-3 pb-5 border-b border-border">
            <ShieldCheck className="w-6 h-6 text-primary-muted shrink-0" />
            <p className="text-sm font-medium text-text-primary leading-relaxed">
              At Aaron Technologies Inc., we take the security and confidentiality of your engineering drawings, product specifications, and company details seriously.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl text-text-primary">
              1. Information We Collect
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We collect information you voluntarily provide to us when requesting quotes (RFQs) or contacting us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm pl-4">
              <li><strong className="text-text-primary">Contact Details:</strong> Name, business email, phone number, and physical mailing address.</li>
              <li><strong className="text-text-primary">Business Details:</strong> Company name, registration details, industry sector, and job role.</li>
              <li><strong className="text-text-primary">Project Data:</strong> Technical drawings (CAD/PDFs), tolerance specs, target pricing, quantities, and material grades.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl text-text-primary">
              2. How We Use Your Information
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your business and project information is used strictly to fulfill your requests:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm pl-4">
              <li>Generating custom landed-cost quotes matching your specifications.</li>
              <li>Sharing technical drawings with vetted, ISO-certified Indian foundries/manufacturers under strict confidentiality agreements for quotation feasibility.</li>
              <li>Processing domestic shipments, invoices, and customs documentation.</li>
              <li>Syncing details with secure customer relationship management systems to maintain sourcing history.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl text-text-primary">
              3. Data Protection & Security
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We store and encrypt submitted details on secure server architectures. Technical drawings and CAD files are shared with manufacturing hubs solely through secure, access-controlled channels. We do not sell, rent, or distribute your email or project data to third-party marketing entities.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl text-text-primary">
              4. Data Retention &amp; Deletion
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We retain your submitted information for as long as necessary to fulfill the purposes outlined in this policy, typically for the duration of any active business relationship plus a reasonable period thereafter. To request access to, correction of, or deletion of your personal data, please contact us at{" "}
              <a href="mailto:kushal@aarontechno.com" className="text-text-primary hover:text-primary font-medium">kushal@aarontechno.com</a>.
              We will respond to all legitimate requests within 30 business days.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl text-text-primary">
              5. Contact Privacy Officer
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              For any questions regarding data removal, drawing confidentiality, or our data handling practices, please contact us at:
              <br />
              <a href="mailto:kushal@aarontechno.com" className="text-text-primary hover:text-primary font-medium mt-1 inline-block">
                kushal@aarontechno.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
