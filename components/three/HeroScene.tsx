"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_POSITIONS: [number, number, number][] = [
  [-4, 1, -2],
  [4, -0.5, -3],
  [0, 2, -4],
  [-2.5, -1.5, -1],
  [3, 1.5, -2],
  [1, -2, -3],
];

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1400;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const teal = new THREE.Color("#5eead4");
    const cyan = new THREE.Color("#67e8f9");
    const violet = new THREE.Color("#c4b5fd");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;

      const r = Math.random();
      const c = r < 0.5 ? teal.clone().lerp(cyan, r * 2) : cyan.clone().lerp(violet, (r - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NetworkNode({
  position,
  delay,
  color,
}: {
  position: [number, number, number];
  delay: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.38, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.1}
        metalness={0.7}
        roughness={0.15}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_POSITIONS.length; i++) {
      for (let j = i + 1; j < NODE_POSITIONS.length; j++) {
        if (Math.random() > 0.4) continue;
        points.push(
          new THREE.Vector3(...NODE_POSITIONS[i]),
          new THREE.Vector3(...NODE_POSITIONS[j])
        );
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#67e8f9" transparent opacity={0.45} />
    </lineSegments>
  );
}

function MouseParallax() {
  const { camera, pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.x * 0.5, 0.05);
    target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.y * 0.35, 0.05);
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, -4);
  });

  return null;
}

const NODE_COLORS = ["#5eead4", "#67e8f9", "#5eead4", "#c4b5fd", "#67e8f9", "#5eead4"];

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 10, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#5eead4" />
      <pointLight position={[-5, -3, 2]} intensity={0.9} color="#67e8f9" />
      <pointLight position={[0, 4, -6]} intensity={0.5} color="#c4b5fd" />
      <ParticleField />
      <ConnectionLines />
      {NODE_POSITIONS.map((pos, i) => (
        <NetworkNode
          key={i}
          position={pos}
          delay={i * 0.7}
          color={NODE_COLORS[i % NODE_COLORS.length]}
        />
      ))}
      <MouseParallax />
    </>
  );
}
