import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import SplitHeading from "../components/SplitHeading";
import { ArrowUpRight, Beaker } from "lucide-react";

/**
 * Work Section
 * 
 * Implements Phase 4 requirements:
 * - Section heading: "Work Worth Exploring."
 * - Supporting text: "A collection of intelligent applications, interactive experiences and creative development projects."
 * - Confirmed real projects:
 *   1. AI-Enabled Buoy for Early Pollution & Algal Bloom Detection
 *   2. Lifetrace Metrics — Human Activity Recognition System
 *   3. Clinical Note Summarization & Coding Assistant
 *   4. Personal Finance Dashboard
 *   5. Radiusdia Studio — Architectural Design Showcase
 *   6. Portfolio Website — Interactive 3D Experience
 */
export default function Work() {
  const [filter, setFilter] = useState("all");

  const projectList = [
    {
      id: 1,
      num: "01",
      title: "AI-Enabled Buoy for Early Pollution & Algal Bloom Detection",
      category: "AI + IoT",
      filterCategory: "ai",
      desc: "An intelligent water-monitoring system that uses real-time environmental sensor data and machine learning to detect pollution levels and predict algal bloom formation, enabling early alerts for water-quality management.",
      tags: ["Python", "Machine Learning", "IoT", "Sensors", "Environmental AI"],
      link: null,
      github: "https://github.com/logith2112",
      wip: false,
    },
    {
      id: 2,
      num: "02",
      title: "Lifetrace Metrics — Human Activity Recognition System",
      category: "Machine Learning",
      filterCategory: "ai",
      desc: "A machine-learning classification pipeline that detects physical activities (walking, sitting, standing, running) from motion and accelerometer sensor data through feature extraction, neural model training, and performance validation.",
      tags: ["Python", "Machine Learning", "Data Processing", "Feature Engineering"],
      link: null,
      github: "https://github.com/logith2112",
      wip: false,
    },
    {
      id: 3,
      num: "03",
      title: "Clinical Note Summarization & Coding Assistant",
      category: "Healthcare AI / NLP",
      filterCategory: "ai",
      desc: "A clinical document-processing assistant that summarizes medical notes and supports ICD-10 medical coding recommendations using transformer-based NLP and Named Entity Recognition.",
      tags: ["Python", "NLP", "Transformers", "NER", "Healthcare AI"],
      link: null,
      github: "https://github.com/logith2112",
      wip: false,
    },
    {
      id: 4,
      num: "04",
      title: "Personal Finance Dashboard",
      category: "Web Application",
      filterCategory: "web",
      desc: "A responsive financial analytics dashboard for tracking income, expenses, category budgets, and financial projections through interactive data visualizations and automated budgeting formulas.",
      tags: ["React", "Data Visualization", "Tailwind CSS", "Financial Analytics"],
      link: null,
      github: "https://github.com/logith2112",
      wip: true,
    },
    {
      id: 5,
      num: "05",
      title: "Radiusdia Studio",
      category: "Frontend Development",
      filterCategory: "web",
      desc: "A professional architecture and interior design business website focused on brand identity, project showcase galleries, fluid responsive layouts, and interactive client inquiry workflow.",
      tags: ["Frontend", "Responsive Design", "UI/UX", "Web Performance"],
      link: "https://rithik0808.github.io/radiusdia-studio",
      github: null,
      wip: false,
    },
    {
      id: 6,
      num: "06",
      title: "Logith T Portfolio — 3D Interactive Web Experience",
      category: "Creative Development",
      filterCategory: "web",
      desc: "An editorial, high-performance personal portfolio featuring a procedural 3D Three.js robot assistant, interactive client-side ML lab, particle simulation, and luxury typography.",
      tags: ["React", "Three.js", "WebGL", "GSAP", "Tailwind CSS"],
      link: "https://logith2112.github.io/logith-portfolio/",
      github: "https://github.com/logith2112/logith-portfolio",
      wip: false,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectList
      : projectList.filter((p) => p.filterCategory === filter);

  return (
    <section
      id="work"
      className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#080808] relative overflow-hidden"
    >
      {/* Anchor for backward compatibility with previous #projects links */}
      <span id="projects" className="absolute -top-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 text-left">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="reveal-up flex items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#E8C77A] uppercase font-bold px-3 py-1 rounded-full bg-[#141414] border border-[#2A2418]">
                SELECTED PORTFOLIO // 2026
              </span>
            </div>

            <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
              <SplitHeading
                as="h2"
                text="Work Worth Exploring."
                className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F2EA] leading-tight"
              />
            </div>

            <p
              className="reveal-up text-[#A6A6A6] text-sm sm:text-base font-light leading-relaxed mt-1"
              style={{ transitionDelay: "200ms" }}
            >
              A collection of intelligent applications, interactive experiences and creative development projects.
            </p>
          </div>

          {/* Interactive Filters & Lab Shortcut */}
          <div className="reveal-up flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <div className="flex items-center p-1 rounded-full bg-[#111111] border border-[#2A2418]">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all ${
                  filter === "all"
                    ? "bg-[#E8C77A] text-[#080808] font-semibold shadow-md"
                    : "text-[#A6A6A6] hover:text-[#F5F2EA]"
                }`}
              >
                All ({projectList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("ai")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all ${
                  filter === "ai"
                    ? "bg-[#E8C77A] text-[#080808] font-semibold shadow-md"
                    : "text-[#A6A6A6] hover:text-[#F5F2EA]"
                }`}
              >
                AI & Systems
              </button>
              <button
                type="button"
                onClick={() => setFilter("web")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all ${
                  filter === "web"
                    ? "bg-[#E8C77A] text-[#080808] font-semibold shadow-md"
                    : "text-[#A6A6A6] hover:text-[#F5F2EA]"
                }`}
              >
                Web & UI
              </button>
            </div>

            <a
              href="#lab"
              className="px-4 py-2 rounded-full text-xs font-sans tracking-wider font-medium text-[#E8C77A] bg-[#141414] border border-[#2A2418] hover:border-[#E8C77A] transition-colors flex items-center gap-1.5"
            >
              <Beaker className="w-3.5 h-3.5" /> Interactive Lab <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* Lab Feature Banner Callout */}
        <div className="mt-28 p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[#2A2418] text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8C77A]/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-xl">
            <div className="text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase mb-2 flex items-center gap-2">
              <Beaker className="w-3.5 h-3.5" /> Client-Side Testing
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EA]">
              Try Real-Time ML & IoT in the Interactive Lab
            </h3>
            <p className="text-xs sm:text-sm text-[#A6A6A6] mt-2 font-light leading-relaxed">
              Test the browser-based sentiment classifier, inject simulated faults into a live IoT temperature stream, and explore interactive skill-project mappings.
            </p>
          </div>

          <a
            href="#lab"
            className="px-6 py-3 rounded-full text-xs font-sans tracking-wider font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] transition-colors shrink-0 flex items-center gap-2"
          >
            Launch Interactive Lab <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

