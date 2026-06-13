"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function CameraRig({ x, y }: { x: number; y: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (x * 0.8 - camera.position.x) * 0.025;
    camera.position.y += (y * 0.5 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function DustParticles() {
  const count = 1400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 4;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.003;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.09) * 0.15;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.038} color="#8b5cf6" transparent opacity={0.28} sizeAttenuation />
    </points>
  );
}

function FloatingMotes() {
  const count = 280;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = -3 + Math.random() * 5;
      arr[i * 3 + 2] = -2 - Math.random() * 12;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(s.clock.elapsedTime * 0.06) * 0.3;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.11) * 0.18;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.065} color="#c4b0f5" transparent opacity={0.16} sizeAttenuation />
    </points>
  );
}

export function HeroCanvas({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Stars radius={130} depth={60} count={4800} factor={4} saturation={0.2} fade speed={0.25} />
      <DustParticles />
      <FloatingMotes />
      <CameraRig x={x} y={y} />
    </Canvas>
  );
}
