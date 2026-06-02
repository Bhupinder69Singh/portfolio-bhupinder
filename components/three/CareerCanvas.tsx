"use client";

import dynamic from "next/dynamic";
import SceneCanvas from "./SceneCanvas";
import type { ScrollOffsetRef } from "@/lib/scrollOffsetRef";

const CareerPathScene = dynamic(() => import("./CareerPathScene"), {
  ssr: false,
});

type CareerCanvasProps = {
  scrollRef: ScrollOffsetRef;
};

export default function CareerCanvas({ scrollRef }: CareerCanvasProps) {
  return (
    <SceneCanvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 1, 6], fov: 50, near: 0.1, far: 100 }}
    >
      <CareerPathScene scrollRef={scrollRef} />
    </SceneCanvas>
  );
}
