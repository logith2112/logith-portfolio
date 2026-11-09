import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

/**
 * Footer
 * 
 * Luxury editorial footer inspired by Incroy.
 * Includes exact navigation links, verified social links, and smooth back-to-top.
 */
export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Who are we?", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) window.history.pushState(null, "", href);
    }
  };

  return (
    <footer className="border-t border-[#2A2418] bg-[#080808] text-[#F5F2EA] relative overflow-hidden py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-[#2A2418]">
          
          <div className="md:col-span-6 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#141414] border border-[#2A2418] flex items-center justify-center text-[11px] font-sans font-bold text-[#E8C77A]">
                LT
              </div>
              <span className="text-sm font-serif font-bold tracking-tight text-[#F5F2EA]">
                LOGITH T
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-serif text-[#F5F2EA] max-w-md mt-1 leading-snug">
              Turning Ideas Into Extraordinary Digital Experiences.
            </p>
            <p className="text-xs text-[#A6A6A6] font-light max-w-sm mt-1">
              AI & Machine Learning student at SRM Institute, Trichy. Building intelligent applications and responsive web platforms.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase mb-1">
              Navigation
            </span>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-xs font-sans text-[#A6A6A6] hover:text-[#E8C77A] transition-colors py-0.5"
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-left text-xs font-sans text-[#E8C77A] hover:underline transition-colors py-0.5 font-medium cursor-pointer"
            >
              Book a call
            </button>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase mb-1">
              Connect
            </span>
            <a
              href="mailto:logiththiru@gmail.com"
              className="text-xs font-sans text-[#A6A6A6] hover:text-[#E8C77A] transition-colors py-0.5 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#E8C77A]" /> logiththiru@gmail.com
            </a>
            <a
              href="https://github.com/logith2112"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans text-[#A6A6A6] hover:text-[#E8C77A] transition-colors py-0.5 flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-[#E8C77A]" /> GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/logith-t-635294378/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans text-[#A6A6A6] hover:text-[#E8C77A] transition-colors py-0.5 flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#E8C77A]" /> LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A6A6A6]/70">
          <div>
            © 2026 Logith T. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C77A]" />
              Designed for curious systems
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#141414] border border-[#2A2418] hover:border-[#E8C77A] text-[#A6A6A6] hover:text-[#E8C77A] transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

