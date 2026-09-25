import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import AerisCore from './AerisCore';
import CoreEnergy from './CoreEnergy';
import CoreEffects from './CoreEffects';
import CoreLighting from './CoreLighting';
import { CORE_CONFIG } from './coreConfig';
import { useMousePosition } from '../../hooks/useMousePosition';
import './CoreScene.css';

interface TransformedCoreProps {
  reducedMotion: boolean;
  scrollYRef: React.RefObject<number>;
}

/**
 * Three-tier transform hierarchy separating responsibilities:
 * 1. scrollGroup   -> position + scale driven by scroll progress
 * 2. parallaxGroup -> mouse parallax rotation
 * 3. modelGroup    -> slow technical idle rotation
 *
 * Avoids any competing rotations or property overwriting.
 */
function TransformedCore({ reducedMotion, scrollYRef }: TransformedCoreProps) {
  const scrollGroupRef = useRef<THREE.Group>(null);
  const parallaxGroupRef = useRef<THREE.Group>(null);
  const modelGroupRef = useRef<THREE.Group>(null);

  const mouse = useMousePosition();
  const { scroll, parallax, animation, reducedMotionRotation } = CORE_CONFIG;

  useFrame(({ clock }) => {
    // 1. Scroll-driven position and scale (Tier 1)
    if (scrollGroupRef.current) {
      if (reducedMotion) {
        scrollGroupRef.current.position.set(0, 0, 0);
        scrollGroupRef.current.scale.set(1, 1, 1);
      } else {
        const scrollY = scrollYRef.current ?? 0;
        const scrollFactor = Math.min(scrollY / scroll.maxDistance, 1);

        const targetPosX = scrollFactor * scroll.targetShiftX;
        const targetPosY = scrollFactor * scroll.targetShiftY;
        const targetScale = 1 - scrollFactor * scroll.scaleFactor;

        scrollGroupRef.current.position.x = THREE.MathUtils.lerp(
          scrollGroupRef.current.position.x,
          targetPosX,
          scroll.lerpSpeed
        );
        scrollGroupRef.current.position.y = THREE.MathUtils.lerp(
          scrollGroupRef.current.position.y,
          targetPosY,
          scroll.lerpSpeed
        );
        scrollGroupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(scrollGroupRef.current.scale.x, targetScale, scroll.lerpSpeed)
        );
      }
    }

    // 2. Mouse Parallax Rotation (Tier 2)
    if (parallaxGroupRef.current) {
      if (reducedMotion) {
        parallaxGroupRef.current.rotation.set(0, 0, 0);
      } else {
        const targetRotY = mouse.current.x * parallax.factorX;
        const targetRotX = mouse.current.y * parallax.factorY;

        parallaxGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          parallaxGroupRef.current.rotation.y,
          targetRotY,
          parallax.lerpSpeed
        );
        parallaxGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          parallaxGroupRef.current.rotation.x,
          targetRotX,
          parallax.lerpSpeed
        );
      }
    }

    // 3. Technical Idle Rotation (Tier 3)
    if (modelGroupRef.current) {
      if (reducedMotion) {
        modelGroupRef.current.rotation.set(...reducedMotionRotation);
      } else {
        const t = clock.getElapsedTime();
        modelGroupRef.current.rotation.y = t * animation.idleRotY;
        modelGroupRef.current.rotation.x = Math.sin(t * animation.idleBobSpeed) * animation.idleBobX;
      }
    }
  });

  return (
    <group ref={scrollGroupRef} name="scroll-transform-tier">
      <group ref={parallaxGroupRef} name="parallax-transform-tier">
        <group ref={modelGroupRef} name="model-rotation-tier">
          {/* Meshy 3D Model */}
          <AerisCore />

          {/* Embedded Procedural Energy Kernel */}
          <CoreEnergy reducedMotion={reducedMotion} />

          {/* Internal Cavity Particles */}
          <CoreEffects reducedMotion={reducedMotion} />
        </group>
      </group>
    </group>
  );
}

/**
 * Technical blueprint poster fallback for WebGL-unavailable / loading states.
 */
function CoreFallbackPoster() {
  return (
    <div className="core-fallback-container" role="img" aria-label="Aeris Core Computational Machine Silhouette">
      <div className="core-fallback-rings">
        <div className="core-fallback-ring core-fallback-ring--outer" />
        <div className="core-fallback-ring core-fallback-ring--mid" />
        <div className="core-fallback-ring core-fallback-ring--inner" />
        <div className="core-fallback-dot" />
      </div>
      <div className="core-fallback-status">
        <span className="core-status-badge">AERIS_CORE // V3.8</span>
        <span className="core-status-text">INITIALIZING MACHINE TELEMETRY...</span>
      </div>
    </div>
  );
}

/**
 * Main 3D Scene Root:
 * Configures Canvas, camera, studio lighting, DPR capping, and accessibility checks.
 * Uses ref-based scroll tracking without causing React component re-renders.
 */
export default function CoreScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ref-based scroll position: zero React state updates on scroll ticks
  const scrollYRef = useRef(0);

  useEffect(() => {
    // 1. WebGL verification
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // 2. Reduced motion detection
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    // 3. Mobile viewport detection for DPR cap
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // 4. Passive scroll tracking into ref
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!hasWebGL) {
    return <CoreFallbackPoster />;
  }

  const maxDpr = isMobile ? CORE_CONFIG.dpr.mobileMax : CORE_CONFIG.dpr.desktopMax;

  return (
    <div className="core-scene-wrapper" aria-label="Aeris 3D Computational Machine Core">
      <Canvas
        camera={CORE_CONFIG.camera}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, maxDpr)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <CoreLighting />
          <TransformedCore reducedMotion={reducedMotion} scrollYRef={scrollYRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
