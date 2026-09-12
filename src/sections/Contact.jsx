import { Linkedin, Github, Mail, Phone, FileText, ArrowUpRight } from "lucide-react";
import SplitHeading from "../components/SplitHeading";

export default function Contact() {
  const contactLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/logith-t-635294378/",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-cyber-cyan hover:border-cyber-cyan/20",
      action: "Connect",
    },
    {
      name: "GitHub",
      href: "https://github.com/logith2112",
      icon: <Github className="w-5 h-5" />,
      color: "hover:text-cyber-lime hover:border-cyber-lime/20",
      action: "Connect",
    },
    {
      name: "Resume PDF",
      href: `${import.meta.env.BASE_URL}Logith_T_Resume.pdf`,
      icon: <FileText className="w-5 h-5" />,
      color: "hover:text-cyber-lime hover:border-cyber-lime/20",
      action: "View PDF",
    },
    {
      name: "Email",
      href: "mailto:logithithiru@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-purple-400 hover:border-purple-400/20",
      action: "Connect",
    },
    {
      name: "Phone",
      href: "tel:+919962295921",
      icon: <Phone className="w-5 h-5" />,
      color: "hover:text-cyber-lime hover:border-cyber-lime/20",
      action: "Connect",
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/[0.03] relative bg-[#07080a] overflow-hidden">

      {/* Subtle background radial — reduced opacity */}
      <div className="absolute bottom-0 inset-x-0 h-72 glow-orb bg-cyber-lime/4 opacity-40 z-0 rounded-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">

          {/* 1. Badge */}
          <div className="reveal-up text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
            Contact // Inquiries
          </div>

          {/* 2. Heading */}
          <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
            <SplitHeading
              as="h2"
              text="LET'S BUILD SOMETHING INTELLIGENT."
              className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white uppercase leading-none"
            />
          </div>

          {/* 3. Description */}
          <p className="reveal-up text-slate-400 text-sm sm:text-base leading-relaxed max-w-md font-light" style={{ transitionDelay: "200ms" }}>
            Open to collaborations, internships, AI/ML projects, and opportunities to create meaningful technology.
          </p>

          {/* 4. Contact Cards: Sequential entrance one after another */}
          <div className="stagger-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-6 max-w-4xl">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`stagger-item reveal-up noise-card flex flex-col items-center gap-3 py-7 rounded-lg border border-white/[0.05] transition-all duration-[350ms] ${link.color} group magnetic-btn last:col-span-2 sm:last:col-span-1`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0e0f12] border border-white/[0.06] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-[350ms]">
                  {link.icon}
                </div>
                <span className="text-[10px] tracking-[0.2em] font-display font-semibold text-slate-400 group-hover:text-white transition-colors duration-[350ms]">
                  {link.name}
                </span>
                <span className="text-[9px] font-mono text-slate-600 group-hover:text-cyber-lime flex items-center gap-0.5 transition-colors duration-[350ms]">
                  {link.action || "Connect"} <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </a>
            ))}
          </div>

          {/* 5. Footer */}
          <div className="reveal-up w-full mt-20 border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] sm:text-xs tracking-wider" style={{ transitionDelay: "150ms" }}>
            <div>© 2026 Logith T. All rights reserved.</div>
            <div className="font-display font-semibold text-slate-600 uppercase flex items-center gap-1.5">
              <span>Designed for curious systems</span>
              <span className="w-1 h-1 rounded-full bg-cyber-lime opacity-70" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
