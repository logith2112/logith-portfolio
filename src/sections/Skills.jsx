import SplitHeading from "../components/SplitHeading";

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
    <section id="skills" className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#111111] overflow-hidden relative">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-orb w-[500px] h-[500px] bg-[#C9A227]/[0.03] opacity-60 pointer-events-none" />

      {/* Marquee Ticker 1: Areas of Interest */}
      <div className="reveal w-full border-y border-[#2A2418] py-4 bg-[#0A0A0A] mb-20 relative z-10 select-none overflow-hidden flex whitespace-nowrap">
        <div className="flex gap-16 animate-[marquee_38s_linear_infinite] shrink-0 text-stroke-gold uppercase font-serif font-bold text-2xl tracking-[0.2em]">
          <span>ARTIFICIAL INTELLIGENCE</span>
          <span>MACHINE LEARNING</span>
          <span>INTERNET OF THINGS</span>
          <span>NATURAL LANGUAGE PROCESSING</span>
          <span>BLOCKCHAIN TECHNOLOGY</span>
          <span>FULL STACK SYSTEM DESIGN</span>
        </div>
        <div className="flex gap-16 animate-[marquee_38s_linear_infinite] shrink-0 text-stroke-gold uppercase font-serif font-bold text-2xl tracking-[0.2em] ml-16" aria-hidden="true">
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
          <div className="reveal-up text-[10px] tracking-[0.3em] font-sans text-[#C9A227] uppercase font-semibold">
            SKILLS // TOOLKIT
          </div>
          <div className="reveal-up" style={{ transitionDelay: "120ms" }}>
            <SplitHeading
              as="h2"
              text="TECHNICAL TOOLKIT & FOCUS"
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] uppercase"
            />
          </div>
        </div>

        {/* Skills Grid: Sequential one-by-one card entrance */}
        <div className="stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="stagger-item noise-card p-6 sm:p-8 rounded-lg border border-[#2A2418] bg-[#161616] flex flex-col justify-between"
            >
              <div>
                <div className="text-[9px] font-sans tracking-[0.25em] text-[#C9A227] uppercase font-semibold mb-6">
                  {group.category}
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-2 text-xs sm:text-sm font-sans font-medium text-[#F5F1E8] bg-[#0E0E0E] border border-[#2A2418] rounded-sm hover:border-[#C9A227] hover:text-[#E5C76B] hover:shadow-[0_2px_12px_rgba(201,162,39,0.1)] transition-all duration-300"
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
