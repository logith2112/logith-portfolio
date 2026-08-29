import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "../components/ProjectVisuals";

export default function Projects() {
  const projectList = [
    {
      id: 1,
      num: "01",
      title: "AI-Enabled Buoy for Early Pollution & Algal Bloom Detection",
      category: "AI + IoT",
      desc: "An intelligent water-monitoring system that uses real-time environmental sensor data and machine learning to detect pollution levels and predict algal bloom formation, enabling early alerts for water-quality management.",
      tags: ["Python", "Machine Learning", "IoT", "Sensors", "Environmental AI"],
      link: null,
      github: null,
      wip: false,
    },
    {
      id: 2,
      num: "02",
      title: "Human Activity Recognition System",
      category: "Machine Learning",
      desc: "A machine-learning system that classifies walking, sitting, standing, and running from sensor data through preprocessing, feature engineering, model training, and evaluation.",
      tags: ["Python", "ML", "Data Processing", "Feature Engineering"],
      link: null,
      github: null,
      wip: false,
    },
    {
      id: 3,
      num: "03",
      title: "Clinical Note Summarization & Coding Assistant",
      category: "AI / NLP",
      desc: "A clinical document-processing assistant that summarizes medical notes and supports medical coding recommendations using transformer-based NLP and Named Entity Recognition.",
      tags: ["NLP", "Transformers", "NER", "Healthcare AI"],
      link: null,
      github: null,
      wip: false,
    },
    {
      id: 4,
      num: "04",
      title: "Finance Market: Personal Finance Dashboard",
      category: "Web Application",
      desc: "A responsive finance dashboard for tracking income, expenses, budgets, and financial insights through interactive visualizations and expense categorization.",
      tags: ["React", "Data Visualization", "Finance", "UI/UX"],
      link: null,
      github: null,
      wip: true,
    },
    {
      id: 5,
      num: "05",
      title: "Radiusdia Studio",
      category: "Frontend Development",
      desc: "A professional architecture and interior design business website focused on brand identity, project discovery, responsive design, and client inquiry flow.",
      tags: ["Frontend", "Responsive Web Design", "UI/UX"],
      link: "https://rithik0808.github.io/radiusdia-studio",
      github: null,
      wip: false,
    },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-white/[0.03] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left mb-20 sm:mb-28">
          <div className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
            Projects // Portfolio
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white uppercase max-w-2xl leading-none">
            Selected Intelligent Systems
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-1 font-light leading-relaxed">
            Hardware integrations, machine learning systems, natural language processing, and responsive web platforms.
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-28 sm:gap-36">
          {projectList.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-left group"
            >

              {/* Left: Details */}
              <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">

                {/* Number + Category */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl font-display font-black text-stroke-white tracking-tighter select-none">
                    {project.num}
                  </span>
                  <div className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-[9px] font-display tracking-widest text-slate-500 uppercase font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Title — primary focal point */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-cyber-lime transition-colors duration-[450ms]">
                  {project.title}
                </h3>

                {/* Description — slightly higher contrast than before */}
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {project.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-[10px] font-mono text-slate-500 bg-white/[0.02] border border-white/[0.04] px-2.5 py-0.5 rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Compact CTA — editorial, no invented links */}
                <div className="mt-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta project-cta-live magnetic-btn"
                    >
                      View Live Site <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta project-cta-github magnetic-btn"
                    >
                      View on GitHub <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : project.wip ? (
                    <span className="project-cta project-cta-wip">
                      In Development
                    </span>
                  ) : (
                    <span className="project-cta project-cta-wip">
                      Case Study Coming Soon
                    </span>
                  )}
                </div>

              </div>

              {/* Right: Canvas Visual — secondary, subtle */}
              <div className="lg:col-span-6 order-1 lg:order-2 w-full">
                <div className="relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
                  {/* Soft cyan halo — only on hover, very subtle */}
                  <div className="absolute inset-0 bg-cyber-cyan/[0.03] filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" />
                  <ProjectVisual index={project.id} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
