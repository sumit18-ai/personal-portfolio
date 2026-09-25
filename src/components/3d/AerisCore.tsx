import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CORE_CONFIG } from './coreConfig';

// Preload the Meshy GLB asset
useGLTF.preload(CORE_CONFIG.modelPath, CORE_CONFIG.dracoPath);

/**
 * AerisCore: Renders the optimized Meshy mechanical 3D model.
 * Applies the aerospace satin gunmetal PBR material (#252A33, metalness 0.82, roughness 0.44).
 * Transform responsibilities (idle rotation, mouse parallax, scroll scaling)
 * are managed exclusively by parent transform groups in CoreScene to prevent property fighting.
 */
export default function AerisCore() {
  const gltf = useGLTF(CORE_CONFIG.modelPath, CORE_CONFIG.dracoPath);
  const { material } = CORE_CONFIG;

  // Aerospace satin gunmetal PBR material (non-chrome, non-silver)
  const gunmetalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      roughness: material.roughness,
      metalness: material.metalness,
      envMapIntensity: material.envMapIntensity,
    });
  }, [material]);

  // Clone and configure model scene
  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = gunmetalMaterial;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;

        // Preserve existing normals; only compute if missing
        if (!mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }
      }
    });

    return scene;
  }, [gltf.scene, gunmetalMaterial]);

  // Clean up material on unmount
  useEffect(() => {
    return () => {
      gunmetalMaterial.dispose();
    };
  }, [gunmetalMaterial]);

  return (
    <group name="aeris-core-mesh" scale={CORE_CONFIG.scale} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
