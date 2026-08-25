import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      name: "LINKEDIN",
      href: "https://www.linkedin.com/in/logith-t-635294378/",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/30"
    },
    {
      name: "GITHUB",
      href: "https://github.com/logith2112",
      icon: <Github className="w-5 h-5" />,
      color: "hover:text-cyber-lime hover:border-cyber-lime/30"
    },
    {
      name: "EMAIL ME",
      href: "mailto:logithithiru@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-purple-400 hover:border-purple-400/30"
    }
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/[0.03] relative bg-[#07080a]">
      
      {/* Background radial highlight */}
      <div className="absolute bottom-0 inset-x-0 h-96 glow-orb bg-cyber-lime/5 opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
          
          <div className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
            CONTACT // INQUIRIES
          </div>

          <h2 className="text-4xl sm:text-7xl font-display font-bold tracking-tighter text-white uppercase leading-none">
            LET'S BUILD SOMETHING INTELLIGENT.
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            Open to collaborations, internships, AI/ML projects, and opportunities to create meaningful technology.
          </p>

          {/* Social Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-8 max-w-xl">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`noise-card flex flex-col items-center gap-3 py-6 rounded-lg border border-white/5 transition-all duration-300 ${link.color} group magnetic-btn`}
              >
                <div className="w-10 h-10 rounded-full bg-[#111215] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </div>
                <span className="text-[10px] tracking-[0.2em] font-display font-semibold text-slate-400 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                <span className="text-[9px] font-mono text-[#5c606a] group-hover:text-cyber-lime flex items-center gap-0.5 mt-1">
                  CONNECT <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </a>
            ))}
          </div>

          {/* Footer content */}
          <div className="w-full mt-24 border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#5c606a] text-[10px] sm:text-xs tracking-wider">
            <div>
              © 2026 LOGITH T. ALL RIGHTS RESERVED.
            </div>
            <div className="font-display font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <span>DESIGNED FOR CURIOUS SYSTEMS</span>
              <span className="w-1 h-1 rounded-full bg-cyber-lime"></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
