import { Brain, Cpu, Database, Network, GraduationCap, Award, ExternalLink, ArrowUpRight } from "lucide-react";
import SplitHeading from "../components/SplitHeading";
import profileImg from "../assets/profile.jpg";

/**
 * About Section ("Who are we?")
 * 
 * Implements Phase 6 requirements:
 * - Navigation label: "Who are we?"
 * - Heading: "The Developer Behind the Experience."
 * - Content: "I'm Logith T, a B.Tech Artificial Intelligence and Machine Learning student at SRM Institute, Trichy. I enjoy combining software development, intelligent systems and creative design to build useful digital products."
 * - Verified details: Education profile, core specializations, technical capabilities, GitHub, LinkedIn.
 */
export default function About() {
  const focuses = [
    {
      icon: <Brain className="w-5 h-5 text-[#E8C77A]" />,
      title: "AI & Machine Learning",
      desc: "Architecting supervised and unsupervised models, neural architectures, data preprocessing, and predictive systems for real-world tasks.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#E8C77A]" />,
      title: "IoT & Hardware Integration",
      desc: "Interfacing environmental sensors and microcontrollers with cloud and edge ML models for anomaly detection and telemetry.",
    },
    {
      icon: <Network className="w-5 h-5 text-[#E8C77A]" />,
      title: "Natural Language Processing",
      desc: "Transformer pipelines, named entity recognition, sentiment classification, and clinical text summarization.",
    },
    {
      icon: <Database className="w-5 h-5 text-[#E8C77A]" />,
      title: "Full-Stack System Engineering",
      desc: "Building high-performance React web interfaces, REST APIs, database models (SQL & NoSQL), and WebGL/Three.js 3D elements.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#080808] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#E8C77A]/[0.025] filter blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-4 text-left max-w-3xl mb-16 sm:mb-20">
          <div className="reveal-up flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#E8C77A] uppercase font-bold px-3 py-1 rounded-full bg-[#141414] border border-[#2A2418]">
              WHO ARE WE? // THE DEVELOPER
            </span>
          </div>

          <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
            <SplitHeading
              as="h2"
              text="The Developer Behind the Experience."
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] leading-tight"
            />
          </div>

          <p
            className="reveal-up text-[#A6A6A6] text-base sm:text-lg font-light leading-relaxed mt-2"
            style={{ transitionDelay: "200ms" }}
          >
            I'm <strong className="text-[#F5F2EA] font-semibold">Logith T</strong>, a B.Tech Artificial Intelligence and Machine Learning student at SRM Institute, Trichy. I enjoy combining software development, intelligent systems and creative design to build useful digital products.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Education Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Visual Portrait Card */}
            <div className="reveal-left p-6 rounded-2xl bg-[#111111] border border-[#2A2418] shadow-2xl relative overflow-hidden group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#2A2418] relative">
                <img
                  src={profileImg}
                  alt="Logith T — SRM Institute Trichy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xl font-serif font-bold text-[#F5F2EA]">Logith T</div>
                  <div className="text-xs font-mono text-[#E8C77A] mt-0.5">B.Tech AI & ML Engineering</div>
                </div>
              </div>

              {/* Social and Profile links */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#2A2418] text-xs font-sans">
                <a
                  href="https://github.com/logith2112"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A6A6A6] hover:text-[#E8C77A] transition-colors flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://www.linkedin.com/in/logith-t-635294378/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A6A6A6] hover:text-[#E8C77A] transition-colors flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}Logith_T_Resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8C77A] hover:underline flex items-center gap-1 font-medium"
                >
                  Resume PDF <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Verified Education Card */}
            <div className="reveal-left p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#2A2418] shadow-xl" style={{ transitionDelay: "150ms" }}>
              <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase mb-4">
                <GraduationCap className="w-4 h-4 text-[#E8C77A]" />
                Academic Credential
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#F5F2EA]">
                  B.Tech Computer Science & Engineering
                </h3>
                <div className="text-xs text-[#E8C77A] font-medium mt-1">
                  Specialization: Artificial Intelligence & Machine Learning
                </div>
                <p className="text-xs text-[#A6A6A6] mt-2 font-light">
                  SRM Institute of Science and Technology, Tiruchirappalli (Trichy), Tamil Nadu
                </p>
              </div>

              <div className="flex items-center gap-10 border-t border-[#2A2418] pt-4 mt-5">
                <div>
                  <div className="text-[9px] font-mono tracking-widest text-[#A6A6A6]/60 uppercase">Cumulative GPA</div>
                  <div className="text-2xl font-bold font-sans text-[#F5F2EA] mt-0.5">7.15</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-widest text-[#A6A6A6]/60 uppercase">Enrollment Status</div>
                  <div className="text-xs font-bold font-sans text-[#E8C77A] mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8C77A] animate-pulse" />
                    Active Student
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Focus Areas & Technical Specializations */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#A6A6A6] uppercase">
              Core Technical Competencies
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focuses.map((item, idx) => (
                <div
                  key={item.title}
                  className="reveal-right p-6 rounded-xl bg-[#111111] border border-[#2A2418] hover:border-[#E8C77A]/40 transition-all duration-300 flex flex-col justify-between gap-4"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#161616] border border-[#2A2418] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#F5F2EA]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A6A6A6] mt-2 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications Snapshot */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#2A2418] text-left mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono tracking-widest text-[#E8C77A] uppercase flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E8C77A]" />
                  Verified Certifications
                </div>
                <a
                  href="#credentials"
                  className="text-xs font-sans text-[#A6A6A6] hover:text-[#E8C77A] transition-colors flex items-center gap-1"
                >
                  View Details <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#141414] border border-[#2A2418]">
                  <div className="text-xs font-semibold text-[#F5F2EA]">IBM Professional Certificate</div>
                  <div className="text-[11px] text-[#A6A6A6] mt-0.5">Artificial Intelligence & Deep Learning</div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#141414] border border-[#2A2418]">
                  <div className="text-xs font-semibold text-[#F5F2EA]">Google Cloud Platform Training</div>
                  <div className="text-[11px] text-[#A6A6A6] mt-0.5">Infrastructure & Cloud Workloads</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
