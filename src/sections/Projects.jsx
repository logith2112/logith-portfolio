import ProjectCard from "../components/ProjectCard";
import SplitHeading from "../components/SplitHeading";

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
    <section id="projects" className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-left mb-20 sm:mb-28">
          <div className="reveal-up text-[10px] tracking-[0.3em] font-sans text-[#C9A227] uppercase font-semibold">
            Projects // Portfolio
          </div>
          <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
            <SplitHeading
              as="h2"
              text="SELECTED INTELLIGENT SYSTEMS"
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] uppercase max-w-3xl leading-none"
            />
          </div>
          <p className="reveal-up text-[#A8A29E] text-xs sm:text-sm max-w-md mt-1 font-light leading-relaxed" style={{ transitionDelay: "200ms" }}>
            Hardware integrations, machine learning systems, natural language processing, and responsive web platforms.
          </p>
        </div>

        {/* Project List: One-by-one progressive reveal with 3D Tilt & Local Gold Spotlight */}
        <div className="flex flex-col gap-28 sm:gap-36">
          {projectList.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
