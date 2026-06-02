"use client";

import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { journeyCurvePoints, journeyData } from "@/lib/journeyData";
import { getJourneyScrollState } from "@/lib/journeyScroll";
import type { ScrollOffsetRef } from "@/lib/scrollOffsetRef";

function PathGlow({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.14, 16, false),
    [curve]
  );

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#5eead4"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function PathCore({
  curve,
  scrollRef,
}: {
  curve: THREE.CatmullRomCurve3;
  scrollRef: ScrollOffsetRef;
}) {
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.05, 12, false),
    [curve]
  );
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (!materialRef.current) return;
    const t = scrollRef.current.offset;
    materialRef.current.emissiveIntensity = 0.6 + t * 0.8;
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color="#0f766e"
        emissive="#5eead4"
        emissiveIntensity={0.6}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

function ProgressBeacon({
  curve,
  scrollRef,
}: {
  curve: THREE.CatmullRomCurve3;
  scrollRef: ScrollOffsetRef;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = THREE.MathUtils.clamp(scrollRef.current.offset, 0, 1);
    const p = curve.getPointAt(t);
    ref.current.position.copy(p);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.15;
    ref.current.scale.setScalar(pulse);
    if (glowRef.current) {
      glowRef.current.position.copy(p);
      glowRef.current.scale.setScalar(pulse * 2.2);
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#fcd34d"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial
          color="#fef08a"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function TrailParticles({
  curve,
  scrollRef,
}: {
  curve: THREE.CatmullRomCurve3;
  scrollRef: ScrollOffsetRef;
}) {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const p = curve.getPointAt(t);
      arr[i * 3] = p.x + (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 1] = p.y + (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.4;
    }
    return arr;
  }, [curve]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = scrollRef.current.offset;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    ref.current.rotation.z = t * Math.PI * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#67e8f9"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MilestoneNode({
  position,
  emissive,
  ringColor,
  index,
  total,
  scrollRef,
}: {
  position: THREE.Vector3;
  emissive: string;
  ringColor: string;
  index: number;
  total: number;
  scrollRef: ScrollOffsetRef;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);
  const ringInnerRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current) return;
    const { snappedIndex, showOverlay } = getJourneyScrollState(
      scrollRef.current.offset
    );
    const isActive = showOverlay && index === snappedIndex;
    const pulse = isActive
      ? 1.35 + Math.sin(state.clock.elapsedTime * 4) * 0.1
      : 0.75;
    coreRef.current.scale.setScalar(pulse);

    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.x = state.clock.elapsedTime * 0.6;
      ringOuterRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      ringOuterRef.current.scale.setScalar(isActive ? 1.45 : 1);
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.y = state.clock.elapsedTime * 0.9;
      ringInnerRef.current.rotation.x = -state.clock.elapsedTime * 0.5;
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = isActive ? 2 : 0.35;
    }

    groupRef.current.position.y =
      position.y + (isActive ? Math.sin(state.clock.elapsedTime * 2) * 0.12 : 0);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={ringOuterRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.03, 16, 48]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringInnerRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.38, 0.02, 12, 32]} />
        <meshBasicMaterial
          color={emissive}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          color={emissive}
          emissive={emissive}
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function ScrollCamera({
  curve,
  scrollRef,
}: {
  curve: THREE.CatmullRomCurve3;
  scrollRef: ScrollOffsetRef;
}) {
  const lookAhead = 0.06;

  useFrame((state) => {
    const t = THREE.MathUtils.clamp(scrollRef.current.offset, 0, 1);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const lookPoint = curve.getPointAt(Math.min(t + lookAhead, 1));

    const camOffset = new THREE.Vector3(2.2, 1.8, 3.2);
    camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), t * 0.4);
    const targetPos = point.clone().add(camOffset);

    state.camera.position.lerp(targetPos, 0.06);
    state.camera.lookAt(lookPoint);

    const bank = tangent.x * 0.08;
    state.camera.rotation.z = THREE.MathUtils.lerp(
      state.camera.rotation.z,
      bank,
      0.05
    );
  });

  return null;
}

function GridFloor() {
  return (
    <gridHelper
      args={[24, 24, "#1e3a5f", "#0f172a"]}
      position={[0, -1.2, -4]}
    />
  );
}

type CareerPathSceneProps = {
  scrollRef: ScrollOffsetRef;
};

export default function CareerPathScene({ scrollRef }: CareerPathSceneProps) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        journeyCurvePoints.map((p) => new THREE.Vector3(...p)),
        false,
        "centripetal",
        0.6
      ),
    []
  );

  const milestonePositions = useMemo(() => {
    const n = journeyData.length;
    return journeyData.map((_, i) => curve.getPointAt(i / (n - 1)));
  }, [curve]);

  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 10, 28]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 10, 4]} intensity={1.5} color="#5eead4" />
      <pointLight position={[-6, 4, -2]} intensity={0.8} color="#67e8f9" />
      <pointLight position={[0, -2, 6]} intensity={0.4} color="#c4b5fd" />
      <Stars
        radius={40}
        depth={50}
        count={2500}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />
      <GridFloor />
      <PathGlow curve={curve} />
      <PathCore curve={curve} scrollRef={scrollRef} />
      <ProgressBeacon curve={curve} scrollRef={scrollRef} />
      <TrailParticles curve={curve} scrollRef={scrollRef} />
      {milestonePositions.map((pos, i) => (
        <MilestoneNode
          key={journeyData[i].id}
          position={pos}
          emissive={journeyData[i].emissive}
          ringColor={journeyData[i].ringColor}
          index={i}
          total={journeyData.length}
          scrollRef={scrollRef}
        />
      ))}
      <ScrollCamera curve={curve} scrollRef={scrollRef} />
    </>
  );
}
