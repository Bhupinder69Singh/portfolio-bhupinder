"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, BarChart3, Truck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const earlyProjects = [
  {
    title: "Truck Tracking Dashboard",
    role: "Flutter Developer Intern",
    description:
      "Single-handedly developed a comprehensive truck tracking application using Flutter. Built out the complete frontend architecture utilizing custom widgets, state management, and modern Flutter UI concepts to deliver a seamless mobile experience.",
    techStack: ["Flutter", "Dart", "Mobile UI", "State Management"],
    link: "",
    github: "https://github.com/shamiit/truck_tracking/tree/bhupinder",
    icon: Truck,
    iconClass: "text-cyan-300",
    accent: "hover:border-cyan-400/50",
  },
  {
    title: "Olympics Data Dashboard",
    role: "Data Analyst Intern",
    description:
      "Performed comprehensive Exploratory Data Analysis (EDA) on historical Olympics data. Designed and published an interactive Tableau dashboard featuring complex charts and visual storytelling to surface deep analytical insights.",
    techStack: ["Tableau", "EDA", "Data Visualization", "Analytics"],
    link: "https://public.tableau.com/app/profile/bhupinder.singh.sahmey/viz/TheHistoryOfOlympics/Story1",
    github: "",
    icon: BarChart3,
    iconClass: "text-amber-300",
    accent: "hover:border-amber-400/50",
  },
];

export default function EarlyProjects() {
  return (
    <section className="w-full py-28 px-4 md:px-8 bg-[#030712] text-white relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="05 // Foundations"
          title="Early Career & Internships"
          description="Foundational projects exploring mobile architecture and data visualization."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {earlyProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-slate-900/80 border border-slate-600/50 p-8 rounded-3xl ${project.accent} transition-all flex flex-col h-full shadow-lg shadow-black/20 hover:shadow-teal-500/5`}
              >
                <div className="mb-6 bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-600/40">
                  <Icon className={`w-8 h-8 ${project.iconClass}`} />
                </div>

                <h3 className="text-xl font-bold mb-1 text-white">
                  {project.title}
                </h3>
                <p className="text-teal-300 text-sm font-semibold mb-4">
                  {project.role}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-950 border border-slate-600/40 rounded-full text-xs font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors text-sm font-medium"
                    >
                      <Code className="w-4 h-4" />
                      Source
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Dashboard
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
