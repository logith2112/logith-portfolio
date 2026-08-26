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
      linkLabel: "Case study coming soon"
    },
    {
      id: 2,
      num: "02",
      title: "Human Activity Recognition System",
      category: "Machine Learning",
      desc: "A machine-learning system that classifies walking, sitting, standing, and running from sensor data through preprocessing, feature engineering, model training, and evaluation.",
      tags: ["Python", "ML", "Data Processing", "Feature Engineering"],
      link: null,
      linkLabel: "Case study coming soon"
    },
    {
      id: 3,
      num: "03",
      title: "Clinical Note Summarization & Coding Assistant",
      category: "AI / NLP",
      desc: "A clinical document-processing assistant that summarizes medical notes and supports medical coding recommendations using transformer-based NLP and Named Entity Recognition.",
      tags: ["NLP", "Transformers", "NER", "Healthcare AI"],
      link: null,
      linkLabel: "Case study coming soon"
    },
    {
      id: 4,
      num: "04",
      title: "Finance Market: Personal Finance Dashboard",
      category: "Web Application",
      desc: "A responsive finance dashboard for tracking income, expenses, budgets, and financial insights through interactive visualizations and expense categorization.",
      tags: ["React", "Data Visualization", "Finance", "UI/UX"],
      link: null,
      linkLabel: "Case study coming soon"
    },
    {
      id: 5,
      num: "05",
      title: "Radiusdia Studio",
      category: "Frontend Development",
      desc: "A professional architecture and interior design business website focused on brand identity, project discovery, responsive design, and client inquiry flow.",
      tags: ["Frontend", "Responsive Web Design", "UI/UX"],
      link: "https://rithik0808.github.io/radiusdia-studio",
      linkLabel: "View Live Site"
    }
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-white/[0.03] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Editorial Heading */}
        <div className="flex flex-col gap-4 text-left mb-16 sm:mb-24">
          <div className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
            PROJECTS // PORTFOLIO
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white uppercase max-w-2xl">
            SELECTED INTELLIGENT SYSTEMS
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-1 font-light">
            Scroll-driven editorial showcase of hardware integrations, machine learning systems, natural language processing, and responsive web platforms.
          </p>
        </div>

        {/* Project Case Studies List */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {projectList.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-left group"
            >
              
              {/* Left Column: Details */}
              <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
                
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span className="text-3xl sm:text-5xl font-display font-black text-stroke-white text-white/5 tracking-tighter">
                    {project.num}
                  </span>
                  
                  {/* Category */}
                  <div className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.05] text-[9px] font-display tracking-widest text-[#8f939e] uppercase font-medium">
                    {project.category}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-cyber-lime transition-colors duration-[450ms]">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {project.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-[10px] font-mono text-slate-500 bg-white/[0.01] border border-white/[0.03] px-2 py-0.5 rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Case Study Call to Action */}
                <div className="mt-4">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.15em] font-semibold text-cyber-lime hover:underline magnetic-btn uppercase"
                    >
                      {project.linkLabel} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-display tracking-[0.15em] text-[#5c606a] uppercase select-none">
                      {project.linkLabel}
                    </span>
                  )}
                </div>

              </div>

              {/* Right Column: Dynamic Interactive Canvas */}
              <div className="lg:col-span-6 order-1 lg:order-2 w-full">
                <div className="relative group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {/* Glowing halo behind visuals */}
                  <div className="absolute inset-0 bg-cyber-cyan/5 filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
