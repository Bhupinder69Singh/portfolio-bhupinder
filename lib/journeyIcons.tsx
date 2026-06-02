import {
  BrainCircuit,
  Building2,
  Briefcase,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { JourneyIconKey } from "./journeyData";

const iconMap: Record<JourneyIconKey, LucideIcon> = {
  brain: BrainCircuit,
  building: Building2,
  briefcase: Briefcase,
  rocket: Rocket,
};

export function JourneyIcon({
  iconKey,
  className,
}: {
  iconKey: JourneyIconKey;
  className?: string;
}) {
  const Icon = iconMap[iconKey];
  return <Icon className={className} />;
}
