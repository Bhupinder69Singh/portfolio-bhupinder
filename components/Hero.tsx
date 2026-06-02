"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMobileViewport } from "@/hooks/useMobileViewport";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const mobile = useMobileViewport();
  const show3D = !reducedMotion && !mobile;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 50, damping: 15 },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center bg-[#030712] text-white overflow-hidden">
      {show3D ? (
        <HeroCanvas />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/70 to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_75%)] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 text-center px-4 max-w-5xl"
      >
        <motion.p
          variants={item}
          className="text-teal-300 font-semibold tracking-[0.25em] uppercase text-sm mb-4 drop-shadow-sm"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
        >
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-300">
            Bhupinder Singh Sahmey
          </span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          A Software Developer specializing in building scalable REST APIs,
          multi-cloud reporting systems, and performance-optimized backend
          architectures.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-teal-400 text-slate-950 font-bold rounded-full hover:bg-teal-300 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-teal-500/25"
          >
            Explore My Work
          </button>
          <button
            onClick={() =>
              document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border-2 border-slate-400/60 text-white font-semibold rounded-full hover:border-teal-300 hover:text-teal-200 transition-all duration-300 cursor-pointer backdrop-blur-sm bg-slate-900/40"
          >
            Career Journey
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-slate-400 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
