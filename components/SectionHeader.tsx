"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 max-w-3xl ${alignClass} ${className}`}
    >
      {label && (
        <p className="text-teal-300 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>
      <p className="text-slate-300 text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
}
