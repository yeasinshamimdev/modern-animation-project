"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += dt * 0.15;
    m.rotation.x = THREE.MathUtils.damp(m.rotation.x, pointer.y * 0.4, 3, dt);
    m.rotation.z = THREE.MathUtils.damp(m.rotation.z, -pointer.x * 0.4, 3, dt);
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    m.scale.setScalar(s);
  });
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, 64]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#2a1a7a"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.42}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.z += dt * speed;
  });
  return (
    <group ref={g} rotation={[tilt, 0.4, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.012, 16, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function Particles({ count = 400 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rnd = seeded(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rnd() * 6;
      const t = rnd() * Math.PI * 2;
      const p = Math.acos(2 * rnd() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#c9c2ff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, pointer }, dt) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.4, 2, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-5, -3, -2]} intensity={6} color="#19e6c1" />
      <pointLight position={[5, -2, 3]} intensity={4} color="#ff7a59" />
      <Blob />
      <Ring radius={2.4} tilt={1.2} speed={0.25} color="#19e6c1" />
      <Ring radius={2.9} tilt={-0.7} speed={-0.18} color="#ff7a59" />
      <Particles />
      <Sparkles count={60} scale={8} size={2} speed={0.3} color="#ffffff" opacity={0.5} />
      <Environment preset="city" />
      <Rig />
    </Canvas>
  );
}
