/**
 * Aeris Core 3D Configuration Constants
 * Centralizes all visual, material, lighting, performance, and interaction settings.
 */
export const CORE_CONFIG = {
  // Asset Paths
  modelPath: '/models/aeris-core/aeris_core.glb',
  dracoPath: '/draco/',
  fallbackRawPath: '/models/aeris-core/aeris_core_raw.glb',

  // Geometry & Scale
  scale: 1.39,
  reducedMotionRotation: [0.12, 0.45, 0] as [number, number, number],

  // Camera Settings
  camera: {
    position: [0, 0, 4.4] as [number, number, number],
    fov: 40,
    near: 0.1,
    far: 25,
  },

  // Performance & DPR Caps
  dpr: {
    desktopMax: 1.75,
    mobileMax: 1.35,
  },

  // Material: Aerospace Satin Gunmetal (PBR)
  material: {
    color: '#252a33',
    roughness: 0.44,
    metalness: 0.82,
    envMapIntensity: 0.14,
  },

  // Studio Lighting Configuration (Simplified 5-component setup)
  lighting: {
    envPreset: 'studio' as const,
    envIntensity: 0.12,
    ambientColor: '#121620',
    ambientIntensity: 0.65,
    keyLight: {
      position: [4.0, 4.5, 3.5] as [number, number, number],
      color: '#a4c0e8',
      intensity: 1.45,
    },
    rimLight1: {
      position: [-4.5, 3.5, -4.0] as [number, number, number],
      color: '#6e92cb',
      intensity: 2.2,
    },
    rimLight2: {
      position: [3.0, 4.0, -3.5] as [number, number, number],
      color: '#5878ab',
      intensity: 1.5,
    },
    fillLight: {
      position: [-3.5, -0.5, 3.0] as [number, number, number],
      color: '#405268',
      intensity: 1.0,
    },
  },

  // Internal Procedural Energy Core (Faceted kernel + cavity illumination)
  energy: {
    violetColor: '#6b46ff',
    blueColor: '#3273ff',
    facetColor: '#1a1433',
    facetEmissive: '#653eed',
    facetIntensity: 2.6,
    innerKernelColor: '#162c55',
    innerKernelEmissive: '#3b82f6',
    innerKernelIntensity: 2.8,
    lights: {
      violetIntensity: 4.8, // Calibrated down from 8.5 to prevent cavity burnout
      blueIntensity: 3.2,   // Calibrated down from 5.5
      washIntensity: 1.8,   // Calibrated down from 3.2
      decay: 1.8,
    },
  },

  // Internal Particles (Strictly internal to core cavity)
  particles: {
    count: 42,
    size: 0.035,
    color: '#7b68ff',
    opacity: 0.6,
    innerRadiusMin: 0.28,
    innerRadiusMax: 0.65,
  },

  // Idle Animation Speeds
  animation: {
    idleRotY: 0.12,
    idleBobX: 0.04,
    idleBobSpeed: 0.25,
    energyKernelRotY: 0.28,
    energyKernelRotX: 0.16,
    energyKernelCounterY: -0.38,
    energyPulseSpeed: 2.0,
    particleDriftY: 0.05,
  },

  // Mouse Parallax (Damped physics-based response)
  parallax: {
    factorX: 0.24,
    factorY: -0.14,
    lerpSpeed: 0.04,
  },

  // Scroll Progression Parameters
  scroll: {
    maxDistance: 900,
    targetShiftX: 0.35,
    targetShiftY: -0.25,
    scaleFactor: 0.15,
    lerpSpeed: 0.05,
  },
} as const;
