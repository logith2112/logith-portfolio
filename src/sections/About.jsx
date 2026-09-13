import { Brain, Cpu, Database, Network } from "lucide-react";
import SplitHeading from "../components/SplitHeading";

export default function About() {
  const focuses = [
    {
      icon: <Brain className="w-5 h-5 text-[#C9A227]" />,
      title: "AI / ML Systems",
      desc: "Specialized in model architecture, training loops, neural networks, and pattern classification.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#E5C76B]" />,
      title: "IoT & Hardware Integration",
      desc: "Connecting edge sensors and microcontrollers with real-time ML pipelines for environmental analytics.",
    },
    {
      icon: <Network className="w-5 h-5 text-[#C9A227]" />,
      title: "Natural Language Processing",
      desc: "Text extraction, entity recognition, classification, and summary pipelines using transformers.",
    },
    {
      icon: <Database className="w-5 h-5 text-[#E5C76B]" />,
      title: "Full-Stack Development",
      desc: "Developing responsive frontend architectures, structured REST APIs, and relational databases.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Story & Education (slides from left, heading fades upward) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="reveal-up text-[10px] tracking-[0.3em] font-sans text-[#C9A227] uppercase font-semibold">
              About // Mission
            </div>

            <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
              <SplitHeading
                as="h2"
                text="ENGINEERING IDEAS INTO INTELLIGENT EXPERIENCES."
                className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] leading-tight uppercase"
              />
            </div>

            <p className="reveal-left text-[#A8A29E] text-sm sm:text-base leading-relaxed mt-2 font-light" style={{ transitionDelay: "200ms" }}>
              I am Logith T, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy turning complex real-world problems into useful digital products through machine learning, IoT, NLP, and modern web development.
            </p>

            {/* Education card — slides in from left */}
            <div className="reveal-left noise-card p-6 sm:p-8 rounded-lg mt-4 border border-[#2A2418]" style={{ transitionDelay: "320ms" }}>
              <div className="text-[9px] text-[#A8A29E]/60 tracking-widest uppercase mb-5">Education Profile</div>
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-sans font-semibold text-[#F5F1E8]">
                    B.Tech Computer Science and Engineering
                  </h4>
                  <div className="text-xs text-[#E5C76B] mt-1.5 font-medium">
                    Specialization in Artificial Intelligence & Machine Learning
                  </div>
                  <p className="text-xs text-[#A8A29E] mt-1.5 font-light">
                    SRM Institute of Science and Technology, Tiruchirappalli
                  </p>
                </div>
                <div className="flex items-center gap-12 border-t border-[#2A2418] pt-4 mt-1">
                  <div>
                    <div className="text-[8px] text-[#A8A29E]/60 tracking-widest uppercase">CGPA</div>
                    <div className="text-2xl font-bold font-sans text-[#F5F1E8] mt-1">7.15</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-[#A8A29E]/60 tracking-widest uppercase">Status</div>
                    <div className="text-xs font-bold font-sans text-[#C9A227] mt-1">Active Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Focus Grid (slides from right, items enter one by one) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="reveal-right text-[10px] tracking-[0.3em] font-sans text-[#A8A29E]/70 uppercase font-semibold">
              Core Specialization
            </div>

            <div className="stagger-container grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focuses.map((focus) => (
                <div
                  key={focus.title}
                  className="stagger-item reveal-right noise-card p-5 rounded-lg flex flex-col gap-4 justify-between border border-[#2A2418] hover:border-[#C9A227]/40"
                >
                  <div className="w-9 h-9 rounded-md bg-[#111111] flex items-center justify-center border border-[#2A2418]">
                    {focus.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-semibold text-[#F5F1E8] tracking-wide">
                      {focus.title}
                    </h3>
                    <p className="text-[11px] text-[#A8A29E] mt-2 leading-relaxed font-light">
                      {focus.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
