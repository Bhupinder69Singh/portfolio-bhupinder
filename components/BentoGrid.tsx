"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, LineChart, Cpu } from "lucide-react";
import SectionHeader from "./SectionHeader";

const cards = [
  {
    span: "md:col-span-2",
    icon: Server,
    iconClass: "text-teal-300",
    hoverBorder: "hover:border-teal-400/60",
    glow: "from-teal-500/10",
    title: "Backend Architecture",
    titleSize: "text-2xl",
    body: "IBM Certified Python Developer. Specialized in designing scalable RESTful APIs using Flask within microservices architectures. Focus on production-grade performance and security.",
    bodySize: "",
  },
  {
    span: "",
    icon: Database,
    iconClass: "text-cyan-300",
    hoverBorder: "hover:border-cyan-400/60",
    glow: "from-cyan-500/10",
    title: "Data Engineering",
    titleSize: "text-xl",
    body: "Managing complex data workflows using PostgreSQL, MongoDB, and optimizing queries with Redis caching.",
    bodySize: "text-sm",
  },
  {
    span: "",
    icon: Cloud,
    iconClass: "text-amber-300",
    hoverBorder: "hover:border-amber-400/60",
    glow: "from-amber-500/10",
    title: "Cloud Infrastructure",
    titleSize: "text-xl",
    body: "Deploying containerized services with Docker and integrating AWS services (EC2, IAM, DynamoDB) via boto3.",
    bodySize: "text-sm",
  },
  {
    span: "md:col-span-2",
    icon: Cpu,
    iconClass: "text-violet-300",
    hoverBorder: "hover:border-violet-400/60",
    glow: "from-violet-500/10",
    title: "Predictive Analytics",
    titleSize: "text-2xl",
    body: "Bridging backend development with data science. Experienced in building ML regression models with Scikit-learn, processing data with Pandas/NumPy, and creating actionable dashboards in Power BI and Tableau.",
    bodySize: "",
    decorative: LineChart,
  },
] as const;

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 60, damping: 20 },
    },
  };

  const cardTilt = {
    rotateX: -4,
    rotateY: 4,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  };

  return (
    <section className="w-full py-28 px-4 md:px-8 bg-[#030712] text-white flex justify-center relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl w-full relative z-10">
        <SectionHeader
          label="02 // Expertise"
          title="Technical Arsenal"
          description="Architecting robust systems for enterprise environments."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 auto-rows-[260px]"
          style={{ perspective: 1200 }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            const Decorative = "decorative" in card ? card.decorative : null;

            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={cardTilt}
                style={{ transformStyle: "preserve-3d" }}
                className={`${card.span} relative overflow-hidden bg-slate-900/80 border border-slate-600/50 rounded-3xl p-8 flex flex-col justify-between group ${card.hoverBorder} transition-colors shadow-lg shadow-black/20`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                {Decorative && (
                  <div className="absolute -right-10 -bottom-10 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity">
                    <Decorative className="w-64 h-64 text-cyan-400" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-xl bg-slate-950/80 border border-slate-600/40 p-2.5">
                    <Icon className={`w-8 h-8 ${card.iconClass}`} />
                  </div>
                  <h3 className={`${card.titleSize} font-semibold mb-2 text-white`}>
                    {card.title}
                  </h3>
                  <p className={`text-slate-300 leading-relaxed ${card.bodySize}`}>
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
