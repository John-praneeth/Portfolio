import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import "./styles/SocialIcons.css";
import { useEffect } from "react";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement | null;
    if (!social) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip fancy hover animation for motion-sensitive users
    if (prefersReducedMotion) {
      return;
    }

    const spans = Array.from(social.querySelectorAll("span")) as HTMLElement[];
    const items = spans.map((elem) => {
      const link = elem.querySelector("a") as HTMLElement;
      const rect = elem.getBoundingClientRect();
      return {
        elem,
        link,
        rect,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: 0,
        currentY: 0,
      };
    });

    let frameId: number;

    const updatePosition = () => {
      items.forEach((item) => {
        item.currentX += (item.mouseX - item.currentX) * 0.1;
        item.currentY += (item.mouseY - item.currentY) * 0.1;

        item.link.style.setProperty("--siLeft", `${item.currentX}px`);
        item.link.style.setProperty("--siTop", `${item.currentY}px`);
      });

      frameId = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      items.forEach((item) => {
        const rect = item.rect;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          item.mouseX = x;
          item.mouseY = y;
        } else {
          item.mouseX = rect.width / 2;
          item.mouseY = rect.height / 2;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/John-praneeth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open John Praneeth's GitHub profile in a new tab"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/john-praneeth/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open John Praneeth's LinkedIn profile in a new tab"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:johnpraneeth@outlook.com"
            aria-label="Send an email to johnpraneeth@outlook.com"
          >
            <MdOutlineEmail />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/john__praneeth/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open John Praneeth's Instagram profile in a new tab"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
