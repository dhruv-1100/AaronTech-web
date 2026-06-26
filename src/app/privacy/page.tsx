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
      {/* Hero Section */}
      <section className="section-dark relative overflow-hidden border-b border-navy-850">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-steel-200 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-steel-400 text-sm">
              Last updated: June 25, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-steel-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 bg-white border border-steel-300 p-8 sm:p-12 md:p-16 space-y-10">
          <div className="flex items-center gap-3 pb-5 border-b border-steel-200">
            <ShieldCheck className="w-8 h-8 text-copper-500 shrink-0" />
            <p className="text-sm font-semibold text-navy-900 leading-relaxed">
              At Aaron Technologies Inc., we take the security and confidentiality of your engineering drawings, product specifications, and company details seriously.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              1. Information We Collect
            </h2>
            <p className="text-steel-700 text-sm sm:text-base leading-relaxed">
              We collect information you voluntarily provide to us when requesting quotes (RFQs) or contacting us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-steel-700 text-sm sm:text-base pl-4">
              <li><strong>Contact Details:</strong> Name, business email, phone number, and physical mailing address.</li>
              <li><strong>Business Details:</strong> Company name, registration details, industry sector, and job role.</li>
              <li><strong>Project Data:</strong> Technical drawings (CAD/PDFs), tolerance specs, target pricing, quantities, and material grades.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              2. How We Use Your Information
            </h2>
            <p className="text-steel-700 text-sm sm:text-base leading-relaxed">
              Your business and project information is used strictly to fulfill your requests:
            </p>
            <ul className="list-disc list-inside space-y-2 text-steel-700 text-sm sm:text-base pl-4">
              <li>Generating custom landed-cost quotes matching your specifications.</li>
              <li>Sharing technical drawings with vetted, ISO-certified Indian foundries/manufacturers under strict confidentiality agreements for quotation feasibility.</li>
              <li>Processing domestic shipments, invoices, and customs documentation.</li>
              <li>Syncing details with HubSpot CRM to maintain sourcing history.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              3. Data Protection & Security
            </h2>
            <p className="text-steel-700 text-sm sm:text-base leading-relaxed">
              We store and encrypt submitted details on secure server architectures. Technical drawings and CAD files are shared with manufacturing hubs solely through secure, access-controlled channels. We do not sell, rent, or distribute your email or project data to third-party marketing entities.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-navy-900">
              4. Contact Privacy Officer
            </h2>
            <p className="text-steel-700 text-sm sm:text-base leading-relaxed">
              For any questions regarding data removal, drawing confidentiality, or our data handling practices, please contact us at:
              <br />
              <a href="mailto:privacy@aarontechnologies.com" className="text-copper-600 hover:text-copper-500 font-semibold mt-1 inline-block">
                privacy@aarontechnologies.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
