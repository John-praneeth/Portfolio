import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize, { getResponsiveZoom } from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (canvasDiv.current) {
      const canvasElement = canvasDiv.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const rect = canvasElement.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      // Some environments (notably headless / software rendering) may not be able
      // to create a WebGL context. Avoid throwing and breaking the whole app.
      const webglProbe = document.createElement("canvas");
      const webglContext =
        webglProbe.getContext("webgl") ||
        webglProbe.getContext("experimental-webgl");
      if (!webglContext) {
        return;
      }

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          // turn off expensive MSAA, rely on post AA from the display
          antialias: false,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }
      renderer.setSize(container.width, container.height);
      // cap pixel ratio to avoid overworking the GPU on high-DPI screens;
      // use a lower cap on small screens to improve performance.
      const pixelRatioCap = window.innerWidth < 900 ? 1 : 1.25;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      try {
        canvasElement.appendChild(renderer.domElement);
      } catch {
        renderer.dispose();
        return;
      }

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = getResponsiveZoom(aspect);
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      const onResize = () => {
        handleResize(renderer, camera, canvasDiv);
      };
      window.addEventListener("resize", onResize);

      loadCharacter().then((gltf) => {
        if (!mounted) return;

        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          if (!mounted) return;
          light.turnOnLights();
          animations.startIntro();
          setIsLoaded(true);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchMoveEvent = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };

      const onTouchStart = () => {
        debounce = window.setTimeout(() => {
          landingDiv?.addEventListener("touchmove", onTouchMoveEvent);
        }, 200);
      };

      const onTouchEnd = () => {
        landingDiv?.removeEventListener("touchmove", onTouchMoveEvent);
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let frameId: number;
      let isDocumentVisible = !document.hidden;

      const onVisibilityChange = () => {
        isDocumentVisible = !document.hidden;
      };

      document.addEventListener("visibilitychange", onVisibilityChange);
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!mounted || !isDocumentVisible) {
          return;
        }

        if (!prefersReducedMotion && headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        mounted = false;
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (canvasElement.contains(renderer.domElement)) {
          canvasElement.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
          landingDiv.removeEventListener("touchmove", onTouchMoveEvent);
        }
      };
    }
  }, []);

  return (
    <>
      <div
        className={`character-container ${
          isLoaded ? "character-loaded" : "character-loading"
        }`}
      >
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
