import { useRef } from "react";
import "./styles/Work.css";
import { MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "IoT Health Monitor",
    category: "Smart Healthcare — Wearable Patient Monitoring System",
    tools: "ESP32, MAX30102, ECG Sensor, Blood Pressure Sensor, DS18B20, WiFi, HTTP, IoT Cloud",
    description:
      "Developed an IoT-based wearable system for continuous patient monitoring of ECG, heart rate, SpO₂, blood pressure, and temperature. Implemented a real-time alert mechanism that notifies doctors and nurses during abnormal conditions, with automated escalation to all hospital staff if no response is received.",
    image: "/images/Solidx.png",
  },
  {
    title: "FinSight",
    category: "National Level Hackathon 2025 — Top 3 / 110 Teams",
    tools: "AI/ML, Langchain, Google Gemini API, Vapi.ai, GPT-4o",
    description:
      "Built an AI platform for personalized stock recommendations and an AI calling assistant using Langchain (Google Gemini API) and Vapi.ai with GPT-4o.",
    image: "/images/radix.png",
  },
  {
    title: "AI-powered Post Office Locator",
    category: "Smart India Hackathon 2024 — 95%+ Accuracy",
    tools: "Python, Geopy, SpaCy, ML, Geocoding",
    description:
      "AI app for finding the nearest post office. Used Geopy for geocoding, optimized distance algorithms, and integrated SpaCy for location entity extraction.",
    image: "/images/bond.png",
  },
];

const Work = () => {
  const trackContainerRef = useRef<HTMLDivElement | null>(null);

  const handleArrowClick = (direction: "left" | "right") => {
    const container = trackContainerRef.current;
    if (!container) return;

    const firstSlide = container.querySelector(
      ".carousel-slide"
    ) as HTMLDivElement | null;

    const slideWidth = firstSlide?.offsetWidth || container.clientWidth * 0.8;
    const gap = 24; // matches CSS gap between slides
    const offset = (slideWidth + gap) * (direction === "left" ? -1 : 1);

    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous project"
            onClick={() => handleArrowClick("left")}
          >
            <MdArrowForward />
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            aria-label="Next project"
            onClick={() => handleArrowClick("right")}
          >
            <MdArrowForward />
          </button>
          <div
            className="carousel-scroll-hint"
            aria-hidden="true"
            data-cursor="disable"
          >
            <span>Scroll</span>
            <MdArrowForward />
          </div>
          <div className="carousel-track-container" ref={trackContainerRef}>
            <div className="carousel-track">
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools &amp; Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <p className="carousel-description">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
