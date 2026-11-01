import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section via IntersectionObserver
    const sectionIds = ["about", "projects", "skills", "credentials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-display font-bold tracking-tighter text-lg sm:text-xl text-[#F5F1E8] group"
          >
            <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#2A2418] flex items-center justify-center text-[12px] text-[#C9A227] transition-all duration-300 group-hover:border-[#C9A227] group-hover:shadow-[0_0_12px_rgba(201,162,39,0.3)]">
              LI
            </div>
            <span className="hidden lg:inline-block text-[11px] tracking-[0.25em] text-[#A8A29E] group-hover:text-[#F5F1E8] transition-colors duration-300">
              LOGITH T
            </span>
          </a>

          {/* Center: Reference-Inspired Floating Pill Navigation */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-[#14120e]/80 border border-[#2A2418]/90 backdrop-blur-md shadow-2xl relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative z-10 px-3.5 py-1.5 rounded-full text-[10px] lg:text-[11px] font-sans tracking-[0.18em] font-semibold transition-all duration-300 uppercase ${
                    isActive
                      ? "text-[#0A0A0A] bg-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.35)]"
                      : "text-[#A8A29E] hover:text-[#F5F1E8]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right: Actions (Resume + Email Me CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}Logith_T_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] lg:text-[11px] font-sans tracking-[0.18em] font-medium text-[#A8A29E] hover:text-[#E5C76B] transition-colors duration-300 uppercase flex items-center gap-1 px-3 py-1.5"
            >
              RESUME <ArrowUpRight className="w-3 h-3 text-[#C9A227] arrow-micro" />
            </a>
            <a
              href="mailto:logithithiru@gmail.com"
              className="text-[10px] lg:text-[11px] font-sans tracking-[0.15em] font-bold text-[#0A0A0A] bg-[#C9A227] hover:bg-[#E5C76B] px-4 py-2 rounded-full transition-all duration-300 uppercase flex items-center gap-1.5 shadow-[0_2px_12px_rgba(201,162,39,0.25)] hover:shadow-[0_4px_16px_rgba(201,162,39,0.4)] hover:scale-105 active:scale-95"
            >
              GET IN TOUCH <ArrowUpRight className="w-3.5 h-3.5 arrow-micro" />
            </a>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[#161616] border border-[#2A2418] flex items-center justify-center text-[#F5F1E8] hover:border-[#C9A227] transition-all duration-300 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#C9A227]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0A] transition-all duration-500 flex flex-col justify-center px-10 ${
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
              className="text-3xl font-display font-bold tracking-tight text-[#F5F1E8] hover:text-[#E5C76B] transition-colors duration-300"
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
            href={`${import.meta.env.BASE_URL}Logith_T_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-display font-bold tracking-tight text-[#F5F1E8] hover:text-[#E5C76B] transition-colors duration-300 flex items-center gap-2"
            style={{
              transitionDelay: `${navLinks.length * 75}ms`,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            RESUME <ArrowUpRight className="w-5 h-5 text-[#C9A227]" />
          </a>
          <a
            href="mailto:logithithiru@gmail.com"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-lg font-display tracking-wider font-semibold text-[#C9A227] hover:text-[#E5C76B] flex items-center gap-1.5"
            style={{
              transitionDelay: `${(navLinks.length + 1) * 75}ms`,
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
