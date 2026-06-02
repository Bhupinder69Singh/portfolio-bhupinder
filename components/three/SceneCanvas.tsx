"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
};

export default function SceneCanvas({
  children,
  className = "absolute inset-0 h-full w-full",
  camera = { position: [0, 0, 8], fov: 45, near: 0.1, far: 100 },
}: SceneCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={camera}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
