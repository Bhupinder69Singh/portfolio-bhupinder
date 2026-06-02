"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full py-28 px-4 md:px-8 bg-[#030712] text-white flex justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-4"
        >
          <p className="text-teal-300 font-mono text-sm tracking-[0.2em] uppercase">
            01 // Introduction
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-8"
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-slate-100 mb-8">
            I engineer{" "}
            <span className="font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              high-performance backend systems
            </span>{" "}
            and bridge the gap between complex data and scalable architecture.
          </h3>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed max-w-2xl border-l-2 border-teal-400/50 pl-6">
            <p>
              With a foundation in data science and deep expertise in backend
              development, I specialize in building robust REST APIs,
              multi-cloud platforms, and automated data pipelines.
            </p>
            <p>
              Whether it is optimizing database queries with Redis caching,
              containerizing microservices, or developing predictive machine
              learning models, my focus is always on delivering production-grade,
              secure, and highly efficient solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
