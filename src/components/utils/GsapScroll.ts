import * as THREE from "three";
import gsap from "gsap";

let charInterval: number;

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let intensity: number = 0;
  if (charInterval) clearInterval(charInterval);
  if (!prefersReducedMotion) {
    charInterval = setInterval(() => {
      intensity = Math.random();
    }, 200) as unknown as number;
  }

  const tl1 = !prefersReducedMotion
    ? gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })
    : null;
  const tl2 = !prefersReducedMotion
    ? gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "center 55%",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })
    : null;
  const tl3 = !prefersReducedMotion
    ? gsap.timeline({
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })
    : null;
  let screenLight: THREE.Mesh | null = null;
  let monitor: THREE.Mesh | null = null;
  character?.children.forEach((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const material = child.material as
          | (THREE.Material & { transparent?: boolean; opacity?: number; name?: string; color?: { set: (value: string) => void } })
          | THREE.Material[];

        if (Array.isArray(material)) {
          material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 0;
          });
        } else {
          material.transparent = true;
          material.opacity = 0;
          if (material.name === "Material.018") {
            monitor = child;
            material.color?.set?.("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight" && object instanceof THREE.Mesh) {
      const material = object.material as THREE.Material & {
        transparent?: boolean;
        opacity?: number;
        emissive?: { set: (value: string) => void };
      };

      material.transparent = true;
      material.opacity = prefersReducedMotion ? 1 : 0;
      material.emissive?.set?.("#B0F5EA");
      if (!prefersReducedMotion) {
        gsap
          .timeline({ repeat: -1, repeatRefresh: true })
          .to(material, {
            emissiveIntensity: () => intensity * 8,
            duration: () => Math.random() * 0.6,
            delay: () => Math.random() * 0.1,
          });
      }
      screenLight = object;
    }
  });
  const neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    const monitorTarget: any = monitor;
    const screenLightTarget: any = screenLight;
    if (character && !prefersReducedMotion && tl1 && tl2 && tl3) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone?.rotation || {}, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to((monitorTarget && monitorTarget.material) || {}, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to((screenLightTarget && screenLightTarget.material) || {}, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          (monitorTarget && monitorTarget.position) || {},
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character && !prefersReducedMotion) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(".career-timeline", { maxHeight: "100%", opacity: 1 });
    gsap.set(".career-info-box", { opacity: 1 });
    gsap.set(".career-dot", { animationIterationCount: "1" });
    return;
  }

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
