import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CORE_CONFIG } from './coreConfig';

interface CoreEffectsProps {
  reducedMotion?: boolean;
}

/**
 * Procedural internal energy particle field.
 * Confined strictly within the fragmented interior cavity of the core.
 * Features tiny, high-tech energy sparks that drift slowly.
 * Fully static when reducedMotion is enabled.
 */
export default function CoreEffects({ reducedMotion = false }: CoreEffectsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { particles, animation } = CORE_CONFIG;

  // Generate particle positions strictly inside inner sphere volume
  const positions = useMemo(() => {
    const pos = new Float32Array(particles.count * 3);

    for (let i = 0; i < particles.count; i++) {
      // Golden spiral distribution on sphere volume
      const phi = Math.acos(-1 + (2 * i) / particles.count);
      const theta = Math.sqrt(particles.count * Math.PI) * phi;
      const radius = particles.innerRadiusMin + (i % 7) * 0.052;

      pos[i * 3]     = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    return pos;
  }, [particles]);

  useFrame(({ clock }) => {
    if (reducedMotion || !pointsRef.current) return;
    const t = clock.getElapsedTime();

    // Very subtle orbital drift of interior micro-particles
    pointsRef.current.rotation.y = t * animation.particleDriftY;
    pointsRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
  });

  return (
    <points ref={pointsRef} name="internal-energy-particles">
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particles.size}
        color={particles.color}
        transparent
        opacity={particles.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
