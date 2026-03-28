import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = [...containerRef.current];
    const handlers = new Map<HTMLDivElement, () => void>();

    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          handlers.set(container, handler);
          container.addEventListener("click", handler);
        }
      });
    }

    const skillsOrbit = gsap.context(() => {
      gsap.to(".orbit-wrapper", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-skill-inner", {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      skillsOrbit.revert();
      handlers.forEach((handler, container) => {
        container.removeEventListener("click", handler);
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <div className="what-heading">
          <h2 className="what-heading-title">WHAT I DO</h2>
          <div className="skills-orbit">
            {[
              "React", "Node.js", "Python", "MongoDB", 
              "PostgreSQL", "Next.js", "Docker", "AWS"
            ].map((skill, index, arr) => {
              const angle = (index / arr.length) * 360;
              const radius = index % 2 === 0 ? 150 : 210;
              return (
                <div
                  key={index}
                  className="orbit-wrapper"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="orbit-skill"
                    style={{ transform: `translateX(${radius}px)` }}
                  >
                    <div className="orbit-skill-inner">
                      {skill}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI / ML</h3>
              <h4>Building Intelligent Systems</h4>
              <p>
                Crafting ML pipelines, NLP models, and AI-powered applications.
                From hackathon prototypes to production-ready intelligent tools.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Langchain</div>
                <div className="what-tags">NumPy</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">Streamlit</div>
                <div className="what-tags">NLP</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEB DEV</h3>
              <h4>Full-Stack Development</h4>
              <p>
                Designing and building responsive web apps end-to-end. From
                interactive UIs to REST APIs, databases, and cloud deployment.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Flutter</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">Flask</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Firebase</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
