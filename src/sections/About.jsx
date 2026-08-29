import { Brain, Cpu, Database, Network } from "lucide-react";

export default function About() {
  const focuses = [
    {
      icon: <Brain className="w-5 h-5 text-cyber-lime" />,
      title: "AI / ML Systems",
      desc: "Specialized in model architecture, training loops, neural networks, and pattern classification.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyber-cyan" />,
      title: "IoT & Hardware Integration",
      desc: "Connecting edge sensors and microcontrollers with real-time ML pipelines for environmental analytics.",
    },
    {
      icon: <Network className="w-5 h-5 text-purple-400" />,
      title: "Natural Language Processing",
      desc: "Text extraction, entity recognition, classification, and summary pipelines using transformers.",
    },
    {
      icon: <Database className="w-5 h-5 text-slate-400" />,
      title: "Full-Stack Development",
      desc: "Developing responsive frontend architectures, structured REST APIs, and relational databases.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-white/[0.03] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Story */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="text-[10px] tracking-[0.3em] font-display text-cyber-cyan uppercase font-semibold">
              About // Mission
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-white leading-tight uppercase">
              Engineering ideas into intelligent experiences.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2 font-light">
              I am Logith T, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy turning complex real-world problems into useful digital products through machine learning, IoT, NLP, and modern web development.
            </p>

            {/* Education card */}
            <div className="noise-card p-6 sm:p-8 rounded-lg mt-4">
              <div className="text-[9px] text-slate-600 tracking-widest uppercase mb-5">Education Profile</div>
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-display font-semibold text-white">
                    B.Tech Computer Science and Engineering
                  </h4>
                  <div className="text-xs text-cyber-lime mt-1.5 font-medium">
                    Specialization in Artificial Intelligence & Machine Learning
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 font-light">
                    SRM Institute of Science and Technology, Tiruchirappalli
                  </p>
                </div>
                <div className="flex items-center gap-12 border-t border-white/[0.04] pt-4 mt-1">
                  <div>
                    <div className="text-[8px] text-slate-600 tracking-widest uppercase">CGPA</div>
                    <div className="text-2xl font-bold font-display text-white mt-1">7.15</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-600 tracking-widest uppercase">Status</div>
                    <div className="text-xs font-bold font-display text-cyber-cyan mt-1">Active Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Focus Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="text-[10px] tracking-[0.3em] font-display text-slate-500 uppercase font-semibold">
              Core Specialization
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {focuses.map((focus) => (
                <div
                  key={focus.title}
                  className="noise-card p-5 rounded-lg flex flex-col gap-4 justify-between"
                >
                  <div className="w-9 h-9 rounded-md bg-[#0e0f12] flex items-center justify-center border border-white/[0.06]">
                    {focus.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white tracking-wide">
                      {focus.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-light">
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
