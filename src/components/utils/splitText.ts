import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

function splitElementToWords(element: HTMLElement): HTMLElement[] {
  const originalText =
    element.dataset.originalText !== undefined
      ? element.dataset.originalText
      : element.textContent || "";
  element.dataset.originalText = originalText;
  element.textContent = "";

  const words: HTMLElement[] = [];
  const parts = originalText.split(/(\s+)/);

  parts.forEach((part) => {
    if (part.trim().length === 0) {
      element.appendChild(document.createTextNode(part));
      return;
    }
    const span = document.createElement("span");
    span.textContent = part;
    span.style.display = "inline-block";
    span.classList.add("split-word");
    element.appendChild(span);
    words.push(span);
  });

  return words;
}

function splitElementToChars(element: HTMLElement): HTMLElement[] {
  const originalText =
    element.dataset.originalText !== undefined
      ? element.dataset.originalText
      : element.textContent || "";
  element.dataset.originalText = originalText;
  element.textContent = "";

  const chars: HTMLElement[] = [];

  for (const ch of originalText) {
    if (ch === " ") {
      element.appendChild(document.createTextNode(" "));
      continue;
    }
    if (ch === "\n" || ch === "\r") {
      element.appendChild(document.createElement("br"));
      continue;
    }
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.display = "inline-block";
    span.classList.add("split-char");
    element.appendChild(span);
    chars.push(span);
  }

  return chars;
}

let listenerAttached = false;

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (!listenerAttached) {
    ScrollTrigger.addEventListener("refresh", () => setSplitText());
    listenerAttached = true;
  }
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }
    const words = splitElementToWords(para);
    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    const chars = splitElementToChars(title);
    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
