import gsap from "gsap";

interface SplitGroup {
  chars: HTMLElement[];
}

function splitToChars(targets: string | string[]): SplitGroup {
  const selectors = Array.isArray(targets) ? targets : [targets];
  const chars: HTMLElement[] = [];

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((el) => {
      const originalText =
        el.dataset.originalText !== undefined
          ? el.dataset.originalText
          : el.textContent || "";
      el.dataset.originalText = originalText;
      el.textContent = "";

      for (const ch of originalText) {
        if (ch === " ") {
          el.appendChild(document.createTextNode(" "));
          continue;
        }
        if (ch === "\n" || ch === "\r") {
          el.appendChild(document.createElement("br"));
          continue;
        }
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.display = "inline-block";
        span.classList.add("split-char");
        el.appendChild(span);
        chars.push(span);
      }
    });
  });

  return { chars };
}

export function initialFX() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.body.style.overflowY = "auto";
  const main = document.getElementsByTagName("main")[0];
  main?.classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // For users who prefer reduced motion, skip the complex
  // staggered character-by-character animations and looping text.
  if (prefersReducedMotion) {
    gsap.set(
      [
        ".landing-info h3",
        ".landing-intro h2",
        ".landing-h2-info",
        ".landing-info-h2",
        ".landing-h2-info-1",
        ".landing-h2-1",
        ".landing-h2-2",
      ],
      { opacity: 1, y: 0, clearProps: "filter" }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
        delay: 0.1,
      }
    );
    return;
  }

  const landingText = splitToChars([
    ".landing-info h3",
    ".landing-intro h2",
  ]);
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const landingText2 = splitToChars(".landing-h2-info");
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = splitToChars(".landing-h2-info-1");
  const landingText4 = splitToChars(".landing-h2-1");
  const landingText5 = splitToChars(".landing-h2-2");

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitGroup, Text2: SplitGroup) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
