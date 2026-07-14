"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, ShieldCheck, Globe, Activity, Terminal, CheckCircle2, Server, Loader2, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "pipeline" | "diagnostics" | "logs";

interface LogLine {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARN";
  message: string;
}

const INITIAL_LOGS: LogLine[] = [
  { timestamp: "08:14:22", level: "INFO", message: "Connecting to Mumbai shipping hub API..." },
  { timestamp: "08:14:23", level: "SUCCESS", message: "Logistics connection established. Latency: 42ms" },
  { timestamp: "08:14:25", level: "INFO", message: "Validating ASTM A193 Grade B7 chemical trace blueprints..." },
  { timestamp: "08:14:26", level: "SUCCESS", message: "Material spec checklist matches ASTM constraints. [100% Trace]" },
  { timestamp: "08:14:29", level: "INFO", message: "Generating Landed Cost estimation models..." },
];

const LOG_TEMPLATES = [
  { level: "INFO" as const, message: "Fetching daily ocean freight spot rates [IN9034 Mumbai -> US East Coast]..." },
  { level: "SUCCESS" as const, message: "Freight spot index locked: $3,240/FEU. Models re-calculated." },
  { level: "INFO" as const, message: "Polling local inspection office in Rajkot for castings batch #12B..." },
  { level: "SUCCESS" as const, message: "Inspection report received: 0.00mm tolerance drift verified. [PASS]" },
  { level: "INFO" as const, message: "Updating HubSpot CRM contact pipeline stage -> RFQ Review..." },
  { level: "WARN" as const, message: "Minor port delay at JNPT detected. Rerouting buffer container #5..." },
  { level: "SUCCESS" as const, message: "Customs declaration dossier generated for ASTM fastener cargo." },
];

export default function SourcingDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("pipeline");
  const [selectedNode, setSelectedNode] = useState<number>(0);
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Scroll logs to bottom
  useEffect(() => {
    if (activeTab === "logs") {
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeTab]);

  // Simulate scrolling logs
  useEffect(() => {
    const timer = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const now = new Date();
      const timestamp = now.toTimeString().split(" ")[0];
      setLogs((prev) => [...prev.slice(-30), { timestamp, ...template }]);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const pipelineStages = [
    {
      id: 0,
      stage: "Stage 01",
      icon: Factory,
      title: "Vetted Sourcing Hubs",
      desc: "Direct coordination with qualified forging, casting & fastener hubs in India.",
      details: {
        location: "Rajkot, Pune, Chennai",
        suppliers: "34 Partner Facilities",
        leadTime: "6-8 Weeks average",
      },
    },
    {
      id: 1,
      stage: "Stage 02",
      icon: ShieldCheck,
      title: "Inspection & Compliance",
      desc: "Dimensional audits, chemical assays, and complete trace documentation checks.",
      details: {
        accuracy: "±0.02mm tolerance",
        certificates: "EN 10204 3.1 & MTCs",
        rejections: "0.2% baseline rate",
      },
    },
    {
      id: 2,
      stage: "Stage 03",
      icon: Globe,
      title: "Landed Customs Shipping",
      desc: "US domestic delivery, handling ocean freight, duties, and trucking logistics.",
      details: {
        ports: "Mumbai (JNPT) -> Newark",
        incoterms: "DDP (Duty Paid)",
        tracking: "24/7 GPS Container Logs",
      },
    },
  ];

  return (
    <div className="relative border border-navy-800 bg-navy-950/80 backdrop-blur-md p-6 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[380px] font-sans">
      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header & Tabs Selection */}
      <div className="flex items-center justify-between pb-3 border-b border-navy-900 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-copper-400 animate-pulse" />
          <span className="text-[11px] font-bold text-white uppercase tracking-wider font-heading">
            Aaron Sourcing Telemetry
          </span>
        </div>
        
        {/* Navigation Tabs (Clay/Swap style) */}
        <div className="flex gap-1 bg-navy-900 p-0.5 rounded-lg border border-navy-800">
          {(
            [
              { id: "pipeline", label: "Pipeline", icon: Factory },
              { id: "diagnostics", label: "Stats", icon: Activity },
              { id: "logs", label: "Logs", icon: Terminal },
            ] as const
          ).map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer",
                  isActive
                    ? "bg-navy-950 text-copper-400 border border-navy-800/80 shadow-sm"
                    : "text-steel-500 hover:text-steel-300"
                )}
              >
                <TabIcon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full"
            >
              {/* Nodes Column */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                {pipelineStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isSelected = selectedNode === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedNode(stage.id)}
                      className={cn(
                        "flex items-start gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                        isSelected
                          ? "bg-navy-900 border-navy-800 shadow-md scale-[1.01] z-10"
                          : "bg-transparent border-transparent hover:bg-navy-900/30"
                      )}
                    >
                      {/* Vertical line connection */}
                      {idx < 2 && (
                        <div className="absolute left-[29px] top-11 bottom-[-16px] w-[1.5px] bg-gradient-to-b from-copper-500/80 to-navy-900/20 pointer-events-none" />
                      )}
                      
                      <div className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        isSelected
                          ? "bg-copper-500 text-white border-copper-400"
                          : "bg-navy-900/50 text-steel-500 border-navy-800"
                      )}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold font-mono text-copper-400/80 uppercase tracking-widest block leading-none mb-0.5">
                          {stage.stage}
                        </span>
                        <h4 className="text-xs font-bold text-white font-heading leading-tight">
                          {stage.title}
                        </h4>
                        <p className="text-[10px] text-steel-400 mt-1 leading-snug max-w-sm">
                          {stage.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Node Details Box (Clay style) */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <div className="bg-navy-900/80 border border-navy-800 rounded-xl p-4 space-y-3">
                  <h5 className="text-[10px] font-bold font-mono text-copper-400 uppercase tracking-widest leading-none border-b border-navy-800 pb-2">
                    Telemetry Details
                  </h5>
                  <div className="space-y-2.5 text-[11px] text-steel-300">
                    {Object.entries(pipelineStages[selectedNode].details).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-steel-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800/60 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-copper-500 flex-shrink-0 animate-pulse" />
                    <span className="text-[9px] font-mono text-steel-400 leading-none">
                      Active: JNPT Mumbai Port Sync
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "diagnostics" && (
            <motion.div
              key="diagnostics"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-4 h-full py-2"
            >
              {[
                { label: "Material Conformance", val: "99.8%", desc: "Blueprints audit compliance rate", icon: CheckCircle2, color: "text-success" },
                { label: "Bilateral Tariff Match", val: "18.0%", desc: "US-India treaty duty baseline", icon: FileText, color: "text-copper-400" },
                { label: "Traceability Rating", val: "100%", desc: "Verified EN 10204 3.1 MTC logs", icon: ShieldCheck, color: "text-success" },
                { label: "Average Shipping Buffer", val: "8.4 Wks", desc: "Production to door loading dock", icon: Globe, color: "text-copper-400" },
              ].map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-steel-500 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <StatIcon className={cn("w-4 h-4", stat.color)} />
                    </div>
                    <div className="mt-2.5">
                      <span className="text-2xl font-bold text-white tracking-tight font-heading">
                        {stat.val}
                      </span>
                      <p className="text-[9px] text-steel-400 mt-1 leading-snug">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full bg-navy-900 border border-navy-800 rounded-xl p-3"
            >
              <div className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1.5 pr-2 custom-scrollbar text-left">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-steel-600 shrink-0">[{log.timestamp}]</span>
                    <span className={cn(
                      "font-bold shrink-0",
                      log.level === "SUCCESS" && "text-success",
                      log.level === "INFO" && "text-copper-400",
                      log.level === "WARN" && "text-error"
                    )}>
                      {log.level}:
                    </span>
                    <span className="text-steel-300">{log.message}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer live tracker indicator */}
      <div className="mt-4 pt-3 border-t border-navy-900 flex items-center justify-between text-[10px] text-steel-500 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span>B2B Pipeline Status: Active</span>
        </div>
        <span className="font-mono text-[9px] text-copper-400/70">Trace Logs Online</span>
      </div>
    </div>
  );
}
