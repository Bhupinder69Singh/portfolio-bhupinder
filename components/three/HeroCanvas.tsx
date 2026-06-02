"use client";

import dynamic from "next/dynamic";
import SceneCanvas from "./SceneCanvas";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroCanvas() {
  return (
    <SceneCanvas
      className="absolute inset-0 h-full w-full pointer-events-none"
      camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
    >
      <HeroScene />
    </SceneCanvas>
  );
}
