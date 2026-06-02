"use client";

import { AnimatePresence, motion } from "framer-motion";
import { journeyData } from "@/lib/journeyData";
import { JourneyIcon } from "@/lib/journeyIcons";

type JourneyMilestoneOverlayProps = {
  activeIndex: number;
  visible: boolean;
};

export default function JourneyMilestoneOverlay({
  activeIndex,
  visible,
}: JourneyMilestoneOverlayProps) {
  const item = journeyData[activeIndex];
  if (!item) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 md:px-12">
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/60 pointer-events-none"
        aria-hidden
      />
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-lg w-full rounded-3xl border border-slate-500/50 bg-slate-900/95 p-8 shadow-2xl shadow-black/50 pointer-events-auto backdrop-blur-xl"
            style={{
              boxShadow: `0 0 40px ${item.emissive}22, 0 25px 50px -12px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal-400/80 to-transparent"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-4 mb-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-500/60 bg-slate-950"
                style={{ boxShadow: `0 0 20px ${item.emissive}33` }}
              >
                <JourneyIcon
                  iconKey={item.iconKey}
                  className={`h-7 w-7 ${item.accent}`}
                />
              </div>
              <span className="shrink-0 rounded-full border border-slate-500/50 bg-slate-950 px-3 py-1 font-mono text-xs text-slate-200">
                {item.date}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
            <p className={`text-base font-semibold mb-4 ${item.accentMuted}`}>
              {item.company}
            </p>
            <p className="text-slate-200 text-base leading-relaxed">
              {item.description}
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-600/40">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                Milestone {activeIndex + 1} of {journeyData.length}
              </p>
              <div className="flex gap-1.5">
                {journeyData.map((m, i) => (
                  <span
                    key={m.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-7 bg-teal-400" : "w-2 bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
