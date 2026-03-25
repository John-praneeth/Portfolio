import type { ScrollSmoother } from "gsap-trial/ScrollSmoother";

export let smoother: ScrollSmoother;

export function setSmoother(instance: ScrollSmoother) {
  smoother = instance;
}
