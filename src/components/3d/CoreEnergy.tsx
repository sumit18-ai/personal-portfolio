import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CORE_CONFIG } from './coreConfig';

interface CoreEnergyProps {
  reducedMotion?: boolean;
}

/**
 * Aeris Procedural Internal Energy Core: The computational heart.
 * Embedded deep inside the central cavity, providing layered depth:
 * armor → cavity → internal energy kernel.
 * Softly washes internal walls with deep violet and electric blue light
 * without overpowering the dark aerospace aesthetic.
 */
export default function CoreEnergy({ reducedMotion = false }: CoreEnergyProps) {
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const cavityVioletLightRef = useRef<THREE.PointLight>(null);
  const cavityBlueLightRef = useRef<THREE.PointLight>(null);
  const interiorWashRef1 = useRef<THREE.PointLight>(null);
  const interiorWashRef2 = useRef<THREE.PointLight>(null);

  const { energy, animation } = CORE_CONFIG;

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    // Counter-rotating internal faceted energy kernel
    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.y = t * animation.energyKernelRotY;
      outerCoreRef.current.rotation.x = Math.sin(t * 0.22) * animation.energyKernelRotX;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = t * animation.energyKernelCounterY;
      innerCoreRef.current.rotation.z = Math.cos(t * 0.26) * 0.2;
    }

    // Calibrated gentle internal pulse
    const pulse = 0.92 + Math.sin(t * animation.energyPulseSpeed) * 0.16;
    if (cavityVioletLightRef.current) {
      cavityVioletLightRef.current.intensity = energy.lights.violetIntensity * pulse;
    }
    if (cavityBlueLightRef.current) {
      cavityBlueLightRef.current.intensity = energy.lights.blueIntensity * pulse;
    }
    if (interiorWashRef1.current) {
      interiorWashRef1.current.intensity = energy.lights.washIntensity * pulse;
    }
    if (interiorWashRef2.current) {
      interiorWashRef2.current.intensity = energy.lights.washIntensity * pulse;
    }
  });

  return (
    <group position={[0, 0, 0]} name="internal-energy-source">
      {/* Primary Deep Violet internal PointLight - reveals inner cavity surfaces */}
      <pointLight
        ref={cavityVioletLightRef}
        position={[0, 0, 0]}
        intensity={energy.lights.violetIntensity}
        distance={2.8}
        decay={energy.lights.decay}
        color={energy.violetColor}
      />

      {/* Secondary Electric Blue internal PointLight */}
      <pointLight
        ref={cavityBlueLightRef}
        position={[0, 0.06, 0]}
        intensity={energy.lights.blueIntensity}
        distance={2.2}
        decay={energy.lights.decay}
        color={energy.blueColor}
      />

      {/* Internal wash lights positioned to softly illuminate inner cavity bevels */}
      <pointLight
        ref={interiorWashRef1}
        position={[0.16, 0.10, 0.10]}
        intensity={energy.lights.washIntensity}
        distance={1.9}
        decay={energy.lights.decay}
        color={energy.violetColor}
      />
      <pointLight
        ref={interiorWashRef2}
        position={[-0.16, -0.08, -0.10]}
        intensity={energy.lights.washIntensity}
        distance={1.9}
        decay={energy.lights.decay}
        color={energy.blueColor}
      />

      {/* Faceted embedded icosahedron core */}
      <mesh ref={outerCoreRef} position={[0, 0, 0]} scale={0.24}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={energy.facetColor}
          emissive={energy.facetEmissive}
          emissiveIntensity={energy.facetIntensity}
          roughness={0.2}
          metalness={0.8}
          flatShading
        />
      </mesh>

      {/* Counter-rotating electric blue inner kernel */}
      <mesh ref={innerCoreRef} position={[0, 0, 0]} scale={0.12}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={energy.innerKernelColor}
          emissive={energy.innerKernelEmissive}
          emissiveIntensity={energy.innerKernelIntensity}
          roughness={0.1}
          metalness={0.9}
          flatShading
        />
      </mesh>

      {/* Subtle interior cavity aura - softens the transition: armor -> cavity -> energy */}
      <mesh position={[0, 0, 0]} scale={0.32}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={energy.facetEmissive}
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
