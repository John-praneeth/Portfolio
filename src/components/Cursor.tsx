import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);
    let magneticRect: DOMRect | null = null;
    let magneticTarget: HTMLElement | null = null;
    let frameId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      } else if (magneticRect && magneticTarget) {
        // magnetic parallax effect
        const targetCenterX = magneticRect.left + magneticRect.width / 2;
        const targetCenterY = magneticRect.top + magneticRect.height / 2;
        
        // pull cursor slightly towards mouse from center
        const pullX = (mousePos.x - targetCenterX) * 0.15;
        const pullY = (mousePos.y - targetCenterY) * 0.15;
        
        cursor.style.transform = `translate(${magneticRect.left + pullX}px, ${magneticRect.top + pullY}px)`;
        cursor.style.width = `${magneticRect.width}px`;
        cursor.style.height = `${magneticRect.height}px`;
        cursor.style.borderRadius = '12px';
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
        if (element.dataset.cursor === "magnetic") {
          cursor.classList.add("cursor-magnetic");
          magneticRect = rect;
          magneticTarget = target;
          hover = true;
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons", "cursor-magnetic");
        hover = false;
        magneticRect = null;
        magneticTarget = null;
        cursor.style.width = '';
        cursor.style.height = '';
        cursor.style.borderRadius = '';
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
