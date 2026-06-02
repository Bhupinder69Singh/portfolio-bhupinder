"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code, ExternalLink, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";

const projectThemes = [
  "from-violet-500/30 via-teal-500/20 to-cyan-500/10",
  "from-cyan-500/30 via-sky-500/20 to-teal-500/10",
  "from-amber-500/25 via-orange-500/15 to-rose-500/10",
];

type ImageFit = "cover" | "contain";

const projects: Array<{
  title: string;
  description: string;
  techStack: string[];
  link: string;
  github: string;
  image: string;
  imageAlt: string;
  imageFit: ImageFit;
}> = [
  {
    title: "Conversational BI Agent",
    description:
      "Built a full-stack AI application that translates natural language queries into executable DuckDB SQL. Engineered a FastAPI backend with automated SQL error repair and a React (Vite) frontend for dynamic Plotly visualizations. Implemented multi-LLM support, allowing seamless switching between local Ollama models, Grok, and OpenAI.",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "DuckDB",
      "Pandas",
      "Plotly",
      "Ollama/OpenAI",
    ],
    link: "https://github.com/Bhupinder69Singh/i2E-Conversational-BI-Agent/tree/dev",
    github: "https://github.com/Bhupinder69Singh/i2E-Conversational-BI-Agent",
    image: "/projects/conversational-bi.png",
    imageAlt: "Conversational BI Agent — natural language to SQL and charts",
    imageFit: "contain",
  },
  {
    title: "CloudProtect - MultiCloud Platform",
    description:
      "Architected a tenant-aware reporting system providing consolidated visibility across AWS and Azure. Integrated AWS services via boto3 for programmatic data collection from EC2, IAM, DynamoDB, and ECS. Optimized performance with Redis-based caching and implemented automated reporting pipelines stored in MongoDB.",
    techStack: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
    ],
    link: "#",
    github: "#",
    image: "/projects/cloudprotect-2.png",
    imageAlt: "CloudProtect multi-cloud reporting architecture",
    imageFit: "contain",
  },
  {
    title: "Predictive Analytics Pipeline",
    description:
      "Engineered a complete end-to-end data analytics pipeline. Automated data extraction using Selenium and BeautifulSoup, processing over 10,000 records with Pandas. Developed and optimized Linear, Ridge, and Lasso regression models to deliver business insights via an interactive Tableau dashboard.",
    techStack: ["Python", "Pandas", "Scikit-learn", "Selenium", "Tableau"],
    link: "#",
    github: "#",
    image: "/projects/analytics-pipeline-2.png",
    imageAlt: "Predictive analytics pipeline from scrape to Tableau",
    imageFit: "contain",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full py-32 px-4 md:px-8 bg-[#030712] text-white relative"
    >
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="04 // Featured Work"
          title="Featured Work"
          description="Complex systems and data pipelines I've built."
        />

        <div className="flex flex-col gap-28">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`lg:col-span-7 aspect-video rounded-2xl border border-slate-600/50 overflow-hidden relative bg-slate-950 group-hover:border-teal-400/40 transition-colors shadow-xl shadow-black/30 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className={
                      project.imageFit === "contain"
                        ? "object-contain object-center p-3 md:p-5"
                        : "object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    }
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={index === 0}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${projectThemes[index % projectThemes.length]} mix-blend-overlay pointer-events-none ${
                      project.imageFit === "contain"
                        ? "opacity-30 group-hover:opacity-20"
                        : "opacity-70 group-hover:opacity-50"
                    } transition-opacity`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-slate-950/85 border border-slate-600/50 px-3 py-1 text-xs font-mono text-slate-200 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    reversed ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {project.title}
                  </h3>
                  <div className="bg-slate-900/90 border border-slate-600/40 p-6 rounded-2xl mb-6 backdrop-blur-sm">
                    <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-slate-950 border border-slate-600/50 rounded-full text-xs font-medium text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors font-medium"
                    >
                      <Code className="w-5 h-5" />
                      Code
                    </a>
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
