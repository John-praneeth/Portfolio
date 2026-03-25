import { useEffect, useRef, useState } from "react";
import "./styles/TechStack.css";

type TechItem = {
  name: string;
  label?: string;
};

type TechCategory = {
  title: string;
  items: TechItem[];
};

const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", label: "UI Library" },
      { name: "Next.js", label: "React Framework" },
      { name: "JavaScript", label: "Core Language" },
      { name: "TypeScript", label: "Typed JavaScript" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", label: "Runtime" },
      { name: "Express", label: "Backend Framework" },
    ],
  },
  {
    title: "Data & Cloud",
    items: [
      { name: "MongoDB", label: "NoSQL Database" },
      { name: "MySQL", label: "Relational Database" },
    ],
  },
  {
    title: "Tools & Workflow",
    items: [
      { name: "Git & GitHub", label: "Version Control" },
      { name: "Vite", label: "Build Tool" },
    ],
  },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className={`techstack ${isVisible ? "techstack-visible" : ""}`}
    >
      <div className="techstack-inner">
        <header className="techstack-header">
          <h2 className="techstack-heading">TECH STACK</h2>
          <p className="techstack-subtitle">
            A focused set of tools I use to design, build, and ship modern web
            experiences.
          </p>
        </header>

        <div className="techstack-shell" aria-label="Technology stack">
          {techCategories.map((category) => (
            <section
              key={category.title}
              className="techstack-column"
              aria-label={category.title}
            >
              <h3 className="techstack-column-title">{category.title}</h3>
              <ul className="techstack-list">
                {category.items.map((item) => (
                  <li key={item.name} className="techstack-pill">
                    <span className="techstack-pill-name">{item.name}</span>
                    {item.label && (
                      <span className="techstack-pill-label">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;