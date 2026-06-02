export type JourneyIconKey =
  | "brain"
  | "building"
  | "briefcase"
  | "rocket";

export type JourneyMilestone = {
  id: string;
  type: "start" | "work" | "current" | "end";
  title: string;
  company: string;
  date: string;
  description: string;
  iconKey: JourneyIconKey;
  position: [number, number, number];
  accent: string;
  accentMuted: string;
  emissive: string;
  ringColor: string;
};

/** Spiral-like control points for a more dynamic 3D path */
export const journeyData: JourneyMilestone[] = [
  {
    id: "education",
    type: "start",
    title: "Engineering Journey Began",
    company: "DY Patil College of Engineering",
    date: "June 2023 (Graduation)",
    description:
      "Completed Bachelor's in Computer Engineering (CGPA 8.72), focusing on foundational software concepts and system design.",
    iconKey: "brain",
    position: [0, 0, 0],
    accent: "text-teal-300",
    accentMuted: "text-teal-200/90",
    emissive: "#5eead4",
    ringColor: "#2dd4bf",
  },
  {
    id: "etl-hive",
    type: "work",
    title: "Solution Success Engineer",
    company: "ETL HIVE",
    date: "Sept 2023 – April 2024",
    description:
      "Built foundational expertise in backend troubleshooting, analyzing enterprise SaaS product logs, and writing complex database queries for data extraction.",
    iconKey: "building",
    position: [3.5, 1.8, -2.5],
    accent: "text-cyan-300",
    accentMuted: "text-cyan-200/90",
    emissive: "#67e8f9",
    ringColor: "#22d3ee",
  },
  {
    id: "softcell",
    type: "current",
    title: "Python Developer",
    company: "Softcell Technologies",
    date: "March 2025 – Present",
    description:
      "Leading development on cloud modules. Specialized in building scalable REST APIs with Flask/AWS, Redis optimization, and automated Docker deployments.",
    iconKey: "briefcase",
    position: [0.5, 3.8, -5.5],
    accent: "text-violet-300",
    accentMuted: "text-violet-200/90",
    emissive: "#c4b5fd",
    ringColor: "#a78bfa",
  },
  {
    id: "future",
    type: "end",
    title: "Future Focused",
    company: "Scaling & AI",
    date: "Forward",
    description:
      "Continuously architecting performance-optimized systems and integrating intelligence into core architectures.",
    iconKey: "rocket",
    position: [-3.5, 5.5, -8.5],
    accent: "text-amber-300",
    accentMuted: "text-amber-200/90",
    emissive: "#fcd34d",
    ringColor: "#fbbf24",
  },
];

export const journeyCurvePoints = journeyData.map((m) => m.position);
