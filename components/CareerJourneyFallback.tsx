"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { journeyData } from "@/lib/journeyData";
import { JourneyIcon } from "@/lib/journeyIcons";

const ROW_CLASSES = [
  "md:row-start-1",
  "md:row-start-2",
  "md:row-start-3",
  "md:row-start-4",
] as const;

export default function CareerJourneyFallback() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const characterY = useTransform(smoothedProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(smoothedProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="journey"
      className="w-full py-32 px-4 md:px-8 bg-[#030712] text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Professional Growth
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            A visual timeline of my engineering progression.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-x-12 items-start">
          <div className="hidden md:block col-start-2 row-start-1 row-end-[100] w-[2px] bg-slate-600 h-full relative my-10">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal-400 to-cyan-400 origin-top rounded-full shadow-[0_0_20px_4px_rgba(94,234,212,0.4)]"
            />
          </div>

          <div className="hidden md:block col-start-2 row-start-1 row-end-1 sticky top-1/2 -translate-y-1/2 z-30">
            <motion.div
              style={{ y: characterY }}
              className="w-9 h-9 rounded-full border-4 border-[#030712] flex items-center justify-center relative origin-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 shadow-[0_0_30px_6px_rgba(94,234,212,0.55)]"
              />
            </motion.div>
          </div>

          {journeyData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const cardColumn = isLeft ? "col-start-1" : "col-start-3";
            const rowClass = ROW_CLASSES[index] ?? "md:row-start-1";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col mb-16 md:mb-24 ${cardColumn} ${rowClass} relative`}
              >
                <div className="md:hidden flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-600 flex items-center justify-center shadow-lg">
                    <JourneyIcon
                      iconKey={item.iconKey}
                      className={`w-6 h-6 ${item.accent}`}
                    />
                  </div>
                  <div className="flex-1 h-px bg-slate-600" />
                </div>

                <div className="bg-slate-900/90 border border-slate-600/50 p-8 rounded-3xl backdrop-blur-sm group hover:border-teal-400/40 transition-colors relative shadow-lg">
                  <div className="absolute top-6 right-6 px-3 py-1 bg-slate-950 border border-slate-600/50 rounded-full text-xs font-mono text-slate-300">
                    {item.date}
                  </div>

                  <div className="hidden md:flex mb-6 bg-slate-950 w-14 h-14 rounded-2xl items-center justify-center border border-slate-600/50 shadow-inner">
                    <JourneyIcon
                      iconKey={item.iconKey}
                      className={`w-6 h-6 ${item.accent}`}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <p
                    className={`text-base font-semibold mb-5 tracking-tight ${item.accent}`}
                  >
                    {item.company}
                  </p>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
