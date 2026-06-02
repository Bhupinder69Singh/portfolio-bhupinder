"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import CareerJourneyFallback from "./CareerJourneyFallback";
import JourneyMilestoneOverlay from "./JourneyMilestoneOverlay";
import JourneyNav from "./JourneyNav";
import SectionHeader from "./SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMobileViewport } from "@/hooks/useMobileViewport";
import {
  getJourneyScrollState,
  getScrollTopForNode,
  JOURNEY_SCROLL_HEIGHT_VH,
} from "@/lib/journeyScroll";
import type { ScrollOffsetRef } from "@/lib/scrollOffsetRef";

const CareerCanvas = dynamic(() => import("@/components/three/CareerCanvas"), {
  ssr: false,
});

export default function CareerJourney() {
  const reducedMotion = useReducedMotion();
  const mobile = useMobileViewport();
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollOffsetRef = useRef({ offset: 0 }) as ScrollOffsetRef;
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const state = getJourneyScrollState(value);
    scrollOffsetRef.current.offset = state.progress;
    setScrollProgress(state.progress);

    if (state.showOverlay && state.snappedIndex >= 0) {
      setActiveIndex(state.snappedIndex);
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  });

  const scrollToMilestone = useCallback((index: number) => {
    const el = scrollSectionRef.current;
    if (!el) return;
    window.scrollTo({
      top: getScrollTopForNode(el, index),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const el = scrollSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion || mobile) {
    return <CareerJourneyFallback />;
  }

  return (
    <section id="journey" className="w-full bg-[#030712] text-white relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-6 relative z-10">
        <SectionHeader
          label="03 // Career Path"
          title="Professional Growth"
          description="Each portal is a career stop — scroll between them or use the controls below. Details appear when you reach a node."
          align="center"
          className="max-w-2xl"
        />
      </div>

      <div
        ref={scrollSectionRef}
        className="relative"
        style={{ height: `${JOURNEY_SCROLL_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-slate-700/30">
          {inView ? (
            <CareerCanvas scrollRef={scrollOffsetRef} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#030712]">
              <div className="h-10 w-10 animate-pulse rounded-full bg-teal-400/40 ring-4 ring-teal-400/20" />
            </div>
          )}
          {inView && (
            <>
              <JourneyMilestoneOverlay
                activeIndex={activeIndex}
                visible={showOverlay}
              />
              <JourneyNav
                activeIndex={activeIndex}
                showOverlay={showOverlay}
                scrollProgress={scrollProgress}
                onGoTo={scrollToMilestone}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
