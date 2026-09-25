import { Environment } from '@react-three/drei';
import { CORE_CONFIG } from './coreConfig';

/**
 * Controlled studio lighting setup for Aeris Core.
 * Simplified into 5 cohesive components:
 * 1. Soft cool key light
 * 2. Soft cool rim lights
 * 3. Gentle fill light
 * 4. Low-intensity studio environment reflection
 * 5. Cavity illumination provided by CoreEnergy
 */
export default function CoreLighting() {
  const { lighting } = CORE_CONFIG;

  return (
    <group name="studio-lighting">
      {/* 1. Low-intensity environment reflection for satin metalness */}
      <Environment preset={lighting.envPreset} environmentIntensity={lighting.envIntensity} />

      {/* Ambient baseline preventing dark crevice clipping */}
      <ambientLight intensity={lighting.ambientIntensity} color={lighting.ambientColor} />

      {/* 2. Soft cool Key Light - reveals geometry planes without chrome blowouts */}
      <directionalLight
        position={lighting.keyLight.position}
        intensity={lighting.keyLight.intensity}
        color={lighting.keyLight.color}
      />

      {/* 3. Soft cool Rim Lights - crisp edge definition for silhouette & rings */}
      <directionalLight
        position={lighting.rimLight1.position}
        intensity={lighting.rimLight1.intensity}
        color={lighting.rimLight1.color}
      />
      <directionalLight
        position={lighting.rimLight2.position}
        intensity={lighting.rimLight2.intensity}
        color={lighting.rimLight2.color}
      />

      {/* 4. Gentle Fill Light - soft midtones on dark graphite surfaces */}
      <directionalLight
        position={lighting.fillLight.position}
        intensity={lighting.fillLight.intensity}
        color={lighting.fillLight.color}
      />
    </group>
  );
}
