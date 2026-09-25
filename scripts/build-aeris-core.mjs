import fs from 'fs';
import path from 'path';
import { NodeIO } from '@gltf-transform/core';
import { simplify, weld, normals, draco } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3dgltf';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';

/**
 * Deliberate asset-generation script for the Aeris Core 3D model.
 * Preserves source normals if already present; only computes normals if missing.
 * Generates both Draco-compressed production GLB and raw fallback GLB.
 */
async function main() {
  const sourcePath = 'Meshy_AI_Neon_Singularity_Core_0925175314_generate.glb';
  const outDir = 'public/models/aeris-core';
  const dracoOutDir = 'public/draco';

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source model not found at ${sourcePath}`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(dracoOutDir, { recursive: true });

  // 1. Copy local Three.js draco decoder files to public/draco
  const threeDracoPath = 'node_modules/three/examples/jsm/libs/draco/gltf/';
  if (fs.existsSync(threeDracoPath)) {
    for (const file of fs.readdirSync(threeDracoPath)) {
      fs.copyFileSync(path.join(threeDracoPath, file), path.join(dracoOutDir, file));
    }
    console.log('✓ Draco decoders copied to public/draco/');
  }

  // 2. Initialize GLTF Transform
  await MeshoptSimplifier.ready;
  const dracoEncoder = await draco3d.createEncoderModule();
  const io = new NodeIO()
    .registerExtensions([KHRDracoMeshCompression])
    .registerDependencies({ 'draco3d.encoder': dracoEncoder });

  console.log('Loading source Meshy model:', sourcePath);
  const doc = await io.read(sourcePath);
  const root = doc.getRoot();

  let initialTris = 0;
  let hasSourceNormals = true;
  for (const mesh of root.listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      initialTris += prim.getIndices().getCount() / 3;
      if (!prim.getAttribute('NORMAL')) {
        hasSourceNormals = false;
      }
    }
  }
  console.log(`Source triangles: ${initialTris.toLocaleString()}`);
  console.log(`Source normals present: ${hasSourceNormals}`);

  // Weld duplicate vertices
  console.log('Welding vertices...');
  await doc.transform(weld({ tolerance: 0.0001 }));

  // Simplify targeting ~160k triangles
  console.log('Simplifying mesh (target: ~160k triangles, error bound: 0.001)...');
  await doc.transform(simplify({
    simplifier: MeshoptSimplifier,
    ratio: 0.22,
    error: 0.001
  }));

  let optimizedTris = 0;
  for (const mesh of root.listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      optimizedTris += prim.getIndices().getCount() / 3;
    }
  }
  console.log(`Optimized triangles: ${optimizedTris.toLocaleString()}`);

  // Only generate normals if source lacked them; preserve existing normals otherwise
  if (!hasSourceNormals) {
    console.log('Source lacked normals: generating smooth vertex normals...');
    await doc.transform(normals({ overwrite: false }));
  } else {
    console.log('Preserving existing source normals.');
  }

  // Write uncompressed version as raw fallback
  const rawTarget = path.join(outDir, 'aeris_core_raw.glb');
  const uncompressedBuffer = await io.writeBinary(doc);
  fs.writeFileSync(rawTarget, Buffer.from(uncompressedBuffer));
  console.log(`✓ Saved uncompressed optimized model: ${rawTarget} (${(uncompressedBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);

  // Apply Draco compression for final production model
  console.log('Applying Draco mesh compression...');
  await doc.transform(draco({
    method: 'edgebreaker',
    quantizationVolume: 'mesh',
    quantizePosition: 14,
    quantizeNormal: 10
  }));

  const dracoTarget = path.join(outDir, 'aeris_core.glb');
  const dracoBuffer = await io.writeBinary(doc);
  fs.writeFileSync(dracoTarget, Buffer.from(dracoBuffer));
  console.log(`✓ Saved Draco compressed model: ${dracoTarget} (${(dracoBuffer.byteLength / 1024).toFixed(1)} KB)`);

  console.log('Optimization script completed successfully.');
}

main().catch(err => {
  console.error('Error generating Aeris core:', err);
  process.exit(1);
});
