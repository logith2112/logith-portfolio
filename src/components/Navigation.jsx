import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Calendar } from "lucide-react";

/**
 * Navigation
 * 
 * Implements EXACT navigation items specified in Phase 2:
 * - Home -> #home
 * - Work -> #work
 * - Process -> #process
 * - Who are we? -> #about
 * - Contact -> #contact
 * - Book a call -> working booking or enquiry flow
 */
export default function Navigation({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section via IntersectionObserver
    const sectionIds = ["home", "work", "process", "about", "contact", "lab"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.25 }
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
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Who are we?", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) window.history.pushState(null, "", href);
    }
  };

  const handleBookClick = () => {
    setIsOpen(false);
    if (onOpenBooking) onOpenBooking();
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3.5 bg-[#080808]/85 backdrop-blur-md border-b border-[#2A2418]/60 shadow-xl" : "py-4 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Brand Monogram / Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-3 font-serif font-bold text-lg sm:text-xl text-[#F5F2EA] group"
          >
            <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#2A2418] flex items-center justify-center text-[12px] font-sans font-bold text-[#E8C77A] transition-all duration-300 group-hover:border-[#E8C77A] group-hover:shadow-[0_0_12px_rgba(232,199,122,0.3)]">
              LT
            </div>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-sans text-[#A6A6A6] group-hover:text-[#F5F2EA] transition-colors duration-300 uppercase">
              LOGITH T
            </span>
          </a>

          {/* Center: Editorial Floating Pill Navigation */}
          <div className="hidden lg:flex items-center p-1 rounded-full bg-[#111111]/90 border border-[#2A2418] backdrop-blur-md shadow-2xl relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-[11px] font-sans tracking-[0.14em] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#080808] bg-[#E8C77A] font-semibold shadow-[0_2px_12px_rgba(232,199,122,0.35)]"
                      : "text-[#A6A6A6] hover:text-[#F5F2EA]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right: Actions ("Book a call" + Resume) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}Logith_T_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-sans tracking-[0.14em] font-medium text-[#A6A6A6] hover:text-[#E8C77A] transition-colors duration-300 uppercase flex items-center gap-1 px-3 py-1.5"
            >
              Resume <ArrowUpRight className="w-3 h-3 text-[#E8C77A]" />
            </a>

            {/* Exact Navigation Item: "Book a call" */}
            <button
              type="button"
              onClick={handleBookClick}
              className="text-[11px] font-sans tracking-[0.14em] font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] px-4 py-2 rounded-full transition-all duration-300 uppercase flex items-center gap-1.5 shadow-[0_2px_14px_rgba(232,199,122,0.25)] hover:shadow-[0_4px_18px_rgba(232,199,122,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" /> Book a call
            </button>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#141414] border border-[#2A2418] flex items-center justify-center text-[#F5F2EA] hover:border-[#E8C77A] transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#E8C77A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer / Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center px-8 sm:px-12 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-5 pointer-events-none" />

        <div className="flex flex-col gap-6 text-left relative z-10 max-w-md mx-auto w-full">
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#E8C77A] uppercase mb-1">
            Navigation Menu
          </div>

          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#F5F2EA] hover:text-[#E8C77A] transition-colors duration-300 flex items-center justify-between group"
              style={{
                transitionDelay: `${idx * 60}ms`,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <span>{link.name}</span>
              <span className="text-xs font-mono text-[#A6A6A6] opacity-0 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </span>
            </a>
          ))}

          {/* Mobile "Book a call" Button */}
          <button
            type="button"
            onClick={handleBookClick}
            className="mt-4 w-full py-3.5 px-6 rounded-full font-sans text-xs tracking-widest font-semibold uppercase text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] shadow-[0_2px_14px_rgba(232,199,122,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            style={{
              transitionDelay: `${navLinks.length * 60}ms`,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <Calendar className="w-4 h-4" /> Book a call
          </button>

          {/* Quick links footer */}
          <div
            className="flex items-center justify-between pt-6 border-t border-[#2A2418] text-xs font-sans text-[#A6A6A6]"
            style={{
              transitionDelay: `${(navLinks.length + 1) * 60}ms`,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <a
              href={`${import.meta.env.BASE_URL}Logith_T_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8C77A] flex items-center gap-1 uppercase tracking-wider"
            >
              Resume PDF <ArrowUpRight className="w-3 h-3 text-[#E8C77A]" />
            </a>
            <a
              href="mailto:logiththiru@gmail.com"
              className="text-[#E8C77A] hover:underline"
            >
              logiththiru@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
