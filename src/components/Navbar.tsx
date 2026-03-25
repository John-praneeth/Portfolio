import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import "./styles/Navbar.css";
import { AiFillHome } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [showResume, setShowResume] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleResumeOpen = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e?.preventDefault();
    setShowResume(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenisOptions: any = {
      // shorter duration = less "drag" feeling
      duration: prefersReducedMotion ? 0.06 : 0.09,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: prefersReducedMotion ? 1 : 1.05,
      touchMultiplier: prefersReducedMotion ? 1 : 1.02,
      autoRaf: false,
    };

    const lenis = new Lenis(lenisOptions);

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    lenis.scrollTo(0, { immediate: true });

    // Without the old loading screen, run the intro FX immediately
    // and enable smooth scrolling.
    import("./utils/initialFX").then((module) => {
      if (module.initialFX) {
        module.initialFX();
      }
    });

    const links = document.querySelectorAll(".header ul a");
    const clickHandler = (e: Event) => {
      if (window.innerWidth > 1024) {
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section) {
          e.preventDefault();
          lenis.scrollTo(section, { offset: 0 });
        }
      }
    };

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", clickHandler);
    });

    return () => {
      links.forEach((elem) => {
        const element = elem as HTMLAnchorElement;
        element.removeEventListener("click", clickHandler);
      });
      cancelAnimationFrame(frameId);
      // Lenis has an optional destroy method; guard in case of version differences.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenis as any).destroy?.();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a
          href="/#"
          className="navbar-title"
          data-cursor="disable"
          aria-label="Home"
        >
          <AiFillHome />
        </a>
        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          <FiMenu className="navbar-menu-icon" />
          <span className="navbar-menu-label">Menu</span>
        </button>
        <a
          href="mailto:johnpraneeth3030@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          johnpraneeth3030@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href="#resume"
              onClick={handleResumeOpen}
              data-cursor="disable"
            >
              <HoverLinks text="RESUME" />
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile side navigation */}
      <div
        className={`mobile-nav ${isMobileNavOpen ? "mobile-nav-open" : ""}`}
      >
        <ul>
          <li>
            <a
              href="#landingDiv"
              data-href="#landingDiv"
              onClick={() => setIsMobileNavOpen(false)}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="#about"
              data-href="#about"
              onClick={() => setIsMobileNavOpen(false)}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#work"
              data-href="#work"
              onClick={() => setIsMobileNavOpen(false)}
            >
              PROJECTS
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-href="#contact"
              onClick={() => setIsMobileNavOpen(false)}
            >
              CONTACT
            </a>
          </li>
          <li>
            <button
              type="button"
              className="mobile-resume-button"
              onClick={() => {
                setIsMobileNavOpen(false);
                handleResumeOpen();
              }}
            >
              RESUME
            </button>
          </li>
        </ul>
      </div>
      {isMobileNavOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>

      {showResume && (
        <div
          className="resume-overlay"
          onClick={() => setShowResume(false)}
        >
          <div
            className="resume-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="resume-close"
              type="button"
              onClick={() => setShowResume(false)}
            >
              Close
            </button>
            {typeof window !== "undefined" && window.innerWidth <= 899 ? (
              <img
                className="resume-image"
                src="/images/resume-mobile.png"
                alt="John Praneeth Resume"
              />
            ) : (
              <iframe
                className="resume-frame"
                src="/resume.pdf#toolbar=0&navpanes=0"
                title="John Praneeth Resume"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
