"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, ArrowRight, Home, Wrench, FileText, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-steel-100 flex items-center justify-center py-16 px-6">
      <div className="max-w-xl w-full bg-white border border-steel-300 p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(199,91,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,91,42,0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated Gears Icon */}
        <div className="relative flex justify-center items-center h-28 mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute text-copper-500"
          >
            <Settings className="w-20 h-20 stroke-[1.25]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute ml-14 -mt-10 text-navy-900"
          >
            <Settings className="w-12 h-12 stroke-[1.5]" />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-900 tracking-tight mb-2">
          404
        </h1>
        <h2 className="font-heading font-semibold text-lg text-copper-600 uppercase tracking-widest mb-4">
          Specified Address Offline
        </h2>

        {/* Description */}
        <p className="text-steel-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The requested coordinate or resource identifier could not be retrieved from our servers. It may have been moved, renamed, or is currently undergoing routine maintenance.
        </p>

        <div className="w-full h-[1px] bg-steel-200 mb-8" />

        {/* Navigation Quick Links */}
        <div className="text-left">
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-4">
            System Navigation Redirects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center justify-between p-3 border border-steel-200 hover:border-copper-500 hover:bg-copper-500/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-navy-900 group-hover:text-copper-600" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">
                  Control Dashboard (Home)
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/products"
              className="flex items-center justify-between p-3 border border-steel-200 hover:border-copper-500 hover:bg-copper-500/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-navy-900 group-hover:text-copper-600" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">
                  Component Products
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/resources"
              className="flex items-center justify-between p-3 border border-steel-200 hover:border-copper-500 hover:bg-copper-500/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-navy-900 group-hover:text-copper-600" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">
                  Technical Resources
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between p-3 border border-steel-200 hover:border-copper-500 hover:bg-copper-500/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-navy-900 group-hover:text-copper-600" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">
                  Contact Engineering
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-steel-400 group-hover:text-copper-600 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* RFQ CTA Footer */}
        <div className="mt-8 pt-6 border-t border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-steel-500 text-left">
            Need a custom quote? Skip navigation and submit an RFQ.
          </p>
          <Link
            href="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs transition-colors shrink-0"
          >
            Request a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
