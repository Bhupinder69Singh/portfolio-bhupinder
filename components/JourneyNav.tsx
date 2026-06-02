"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { journeyData } from "@/lib/journeyData";
import {
  getNextNodeIndex,
  getPrevNodeIndex,
  JOURNEY_NODE_COUNT,
} from "@/lib/journeyScroll";

type JourneyNavProps = {
  activeIndex: number;
  showOverlay: boolean;
  scrollProgress: number;
  onGoTo: (index: number) => void;
};

export default function JourneyNav({
  activeIndex,
  showOverlay,
  scrollProgress,
  onGoTo,
}: JourneyNavProps) {
  const prevTarget = getPrevNodeIndex(scrollProgress);
  const nextTarget = getNextNodeIndex(scrollProgress);
  const canPrev = prevTarget < activeIndex || !showOverlay;
  const canNext =
    nextTarget > activeIndex ||
    (showOverlay && activeIndex < JOURNEY_NODE_COUNT - 1);

  const goPrev = () => {
    if (showOverlay && activeIndex > 0) {
      onGoTo(activeIndex - 1);
    } else {
      onGoTo(prevTarget);
    }
  };

  const goNext = () => {
    if (showOverlay && activeIndex < JOURNEY_NODE_COUNT - 1) {
      onGoTo(activeIndex + 1);
    } else {
      onGoTo(nextTarget);
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-auto">
      <div className="flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-950/90 px-3 py-2 backdrop-blur-md shadow-lg">
        <button
          type="button"
          aria-label="Previous milestone"
          disabled={!canPrev && activeIndex === 0}
          onClick={goPrev}
          className="p-1.5 rounded-full text-slate-300 hover:text-teal-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-1">
          {journeyData.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={`Go to ${m.title}`}
              aria-current={showOverlay && i === activeIndex ? "step" : undefined}
              onClick={() => onGoTo(i)}
              className={`rounded-full transition-all duration-300 ${
                showOverlay && i === activeIndex
                  ? "h-2.5 w-8 bg-teal-400"
                  : "h-2.5 w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next milestone"
          disabled={
            !canNext && activeIndex === JOURNEY_NODE_COUNT - 1 && showOverlay
          }
          onClick={goNext}
          className="p-1.5 rounded-full text-slate-300 hover:text-teal-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {!showOverlay && (
        <p className="text-xs text-slate-400 font-mono tracking-wide">
          Traveling to next portal — keep scrolling or tap a dot
        </p>
      )}
    </div>
  );
}
