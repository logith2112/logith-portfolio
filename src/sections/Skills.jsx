export default function Skills() {
  const skillGroups = [
    {
      category: "LANGUAGES",
      skills: ["Python", "SQL"]
    },
    {
      category: "FRAMEWORKS & LIBS",
      skills: ["React", "Spring", "Spring Boot", "Angular"]
    },
    {
      category: "DATABASES",
      skills: ["PostgreSQL", "MongoDB"]
    },
    {
      category: "CLOUD PROVIDERS",
      skills: ["AWS", "Azure", "Google Cloud"]
    },
    {
      category: "TOOLS & ANALYTICS",
      skills: ["Tableau", "Microsoft Office"]
    },
    {
      category: "AREAS OF INTEREST",
      skills: ["Machine Learning", "Blockchain Technology", "Open Source Contribution"]
    }
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-white/[0.03] overflow-hidden relative">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-orb w-[500px] h-[500px] bg-cyber-lime/5 opacity-50" />

      {/* Marquee Ticker 1: Areas of Interest */}
      <div className="w-full border-y border-white/[0.03] py-4 bg-[#0c0d10] mb-20 relative z-10 select-none overflow-hidden flex whitespace-nowrap">
        <div className="flex gap-16 animate-[marquee_38s_linear_infinite] shrink-0 text-stroke-lime uppercase font-display font-black text-2xl tracking-[0.2em]">
          <span>ARTIFICIAL INTELLIGENCE</span>
          <span>MACHINE LEARNING</span>
          <span>INTERNET OF THINGS</span>
          <span>NATURAL LANGUAGE PROCESSING</span>
          <span>BLOCKCHAIN TECHNOLOGY</span>
          <span>FULL STACK SYSTEM DESIGN</span>
        </div>
        <div className="flex gap-16 animate-[marquee_38s_linear_infinite] shrink-0 text-stroke-lime uppercase font-display font-black text-2xl tracking-[0.2em] ml-16" aria-hidden="true">
          <span>ARTIFICIAL INTELLIGENCE</span>
          <span>MACHINE LEARNING</span>
          <span>INTERNET OF THINGS</span>
          <span>NATURAL LANGUAGE PROCESSING</span>
          <span>BLOCKCHAIN TECHNOLOGY</span>
          <span>FULL STACK SYSTEM DESIGN</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Editorial Title */}
        <div className="flex flex-col gap-4 text-left mb-16">
          <div className="text-[10px] tracking-[0.3em] font-display text-cyber-cyan uppercase font-semibold">
            SKILLS // TOOLKIT
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white uppercase">
            TECHNICAL TOOLKIT & FOCUS
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="noise-card p-6 sm:p-8 rounded-lg border border-white/[0.02] flex flex-col justify-between"
            >
              <div>
                <div className="text-[9px] font-display tracking-[0.25em] text-[#6b7280] uppercase font-bold mb-6">
                  {group.category}
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-2 text-xs sm:text-sm font-sans font-medium text-white bg-[#111215] border border-white/5 rounded-sm hover:border-cyber-lime hover:text-cyber-lime transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Marquee animation styles inside inline style block since Tailwind default doesn't have marquee keyframe */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
