import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "SKILLS", href: "#skills" },
    { name: "CREDENTIALS", href: "#credentials" },
    { name: "CONTACT", href: "#contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#090A0C]/80 border-b border-white/[0.03] backdrop-blur-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 font-display font-bold tracking-tighter text-xl text-white group magnetic-btn"
          >
            <div className="w-8 h-8 rounded-md bg-[#111215] border border-white/10 flex items-center justify-center text-[13px] text-cyber-lime transition-all duration-300 group-hover:border-cyber-lime group-hover:shadow-[0_0_10px_rgba(181,255,26,0.1)]">
              LI
            </div>
            <span className="hidden sm:inline-block text-[11px] tracking-[0.25em] text-[#8f939e] group-hover:text-white transition-colors duration-300">
              LOGITH T
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-medium text-[#8f939e] hover:text-cyber-lime transition-colors duration-300 uppercase magnetic-btn"
              >
                {link.name}
              </a>
            ))}
            <a
              href="mailto:logithithiru@gmail.com"
              className="text-[10px] sm:text-xs font-display tracking-[0.15em] font-medium text-black bg-cyber-lime hover:bg-cyber-lime/90 px-4 py-2 rounded-sm transition-colors duration-300 uppercase flex items-center gap-1.5 magnetic-btn"
            >
              EMAIL ME <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[#111215] border border-white/10 flex items-center justify-center text-white hover:border-cyber-lime transition-all duration-300 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#090A0C] transition-all duration-500 flex flex-col justify-center px-10 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-5 pointer-events-none" />

        <div className="flex flex-col gap-6 text-left relative z-10">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-display font-bold tracking-tight text-white hover:text-cyber-lime transition-colors duration-300"
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="mailto:logithithiru@gmail.com"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-lg font-display tracking-wider font-semibold text-cyber-lime hover:underline flex items-center gap-1.5"
            style={{
              transitionDelay: `${navLinks.length * 75}ms`,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            EMAIL ME <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
