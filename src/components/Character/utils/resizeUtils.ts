import * as THREE from "three";

/** Compute a camera zoom that keeps the character consistently framed
 *  across different desktop screen sizes and aspect ratios.
 *  The base zoom (1.1) is tuned for a ~16:9 aspect ratio (1.78).
 *  On wider screens the zoom increases slightly; on narrower ones it decreases. */
function getResponsiveZoom(aspect: number): number {
  const baseAspect = 1.78; // 16:9
  const baseZoom = 1.1;
  // Scale zoom proportionally, clamped to reasonable bounds
  const zoom = baseZoom * (aspect / baseAspect);
  return Math.max(0.75, Math.min(zoom, 1.6));
}

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>
) {
  if (!canvasDiv.current) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.zoom = getResponsiveZoom(camera.aspect);
  camera.updateProjectionMatrix();
  // GSAP natively handles resize via ScrollTrigger.refresh() internally.
  // DO NOT kill and rebuild timelines here, it permanently breaks animations!
}

export { getResponsiveZoom };

