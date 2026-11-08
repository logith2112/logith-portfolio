import { useState, useEffect, useRef } from "react";
import { Search, Navigation as NavIcon, ArrowUpRight, X } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  const items = [
    { name: "ABOUT", category: "SECTION", href: "#about" },
    { name: "PROJECTS", category: "SECTION", href: "#projects" },
    { name: "SKILLS", category: "SECTION", href: "#skills" },
    { name: "LAB", category: "SECTION", href: "#lab" },
    { name: "CREDENTIALS", category: "SECTION", href: "#credentials" },
    { name: "CONTACT", category: "SECTION", href: "#contact" },
    {
      name: "VIEW RESUME",
      category: "ACTION",
      href: `${import.meta.env.BASE_URL}Logith_T_Resume.pdf`,
      external: true,
    },
    {
      name: "EMAIL LOGITH",
      category: "ACTION",
      href: "mailto:logithithiru@gmail.com",
      external: true,
    },
    {
      name: "GITHUB PROFILE",
      category: "LINK",
      href: "https://github.com/logith2112",
      external: true,
    },
    {
      name: "LINKEDIN PROFILE",
      category: "LINK",
      href: "https://linkedin.com/in/logith-t",
      external: true,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.href.toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = () => {
    previousActiveElementRef.current = document.activeElement;
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const closePalette = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
    if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === "function") {
      previousActiveElementRef.current.focus();
    }
  };

  const selectItem = (item) => {
    closePalette();
    if (item.external) {
      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
      } else {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    const target = document.querySelector(item.href);
    if (target) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (window.history.pushState) window.history.pushState(null, "", item.href);
      else window.location.hash = item.href;
    }
  };

  // Keyboard shortcut listener: Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (isOpen) closePalette();
        else openPalette();
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        selectItem(filteredItems[activeIndex]);
      }
    }
  };

  return (
    <>
      {/* Floating Bottom-Left Trigger Pill */}
      <button
        type="button"
        onClick={openPalette}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14120e]/90 border border-[#2A2418] text-[#A8A29E] hover:text-[#F5F1E8] hover:border-[#C9A227] shadow-xl backdrop-blur-md transition-all duration-300 text-xs font-sans tracking-wider"
        aria-label="Open command palette"
      >
        <NavIcon className="w-3.5 h-3.5 text-[#C9A227]" />
        <span className="font-semibold uppercase text-[11px]">NAV</span>
        <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#161616] text-[#C9A227] border border-[#2A2418]">
          ⌘K
        </kbd>
      </button>

      {/* Palette Modal Backdrop */}
      <div
        className={`lab-palette-backdrop ${isOpen ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePalette();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Quick Command Navigation"
      >
        <div className="lab-palette-dialog">
          {/* Header & Search Input */}
          <div className="relative flex items-center border-b border-[#2A2418] px-4 py-3 bg-[#111111]/80">
            <Search className="w-4 h-4 text-[#C9A227] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search sections, projects, or quick links..."
              className="w-full bg-transparent text-[#F5F1E8] text-sm outline-none placeholder-[#A8A29E]/50 font-sans"
              role="combobox"
              aria-expanded={filteredItems.length > 0}
              aria-autocomplete="list"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#A8A29E] hover:text-[#F5F1E8] p-1"
                aria-label="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results List */}
          <ul
            className="max-h-72 overflow-y-auto p-2 flex flex-col gap-1"
            role="listbox"
          >
            {filteredItems.length === 0 ? (
              <li className="py-8 text-center text-xs text-[#A8A29E] font-sans">
                No matching destinations found.
              </li>
            ) : (
              filteredItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={item.name}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectItem(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-full cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "text-[#0A0A0A] bg-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.35)] font-semibold"
                        : "text-[#A8A29E] hover:text-[#F5F1E8] hover:bg-[#161616]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-sans tracking-[0.18em] uppercase font-semibold">
                        {item.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          isActive
                            ? "bg-[#0A0A0A]/20 text-[#0A0A0A]"
                            : "bg-[#111111] text-[#A8A29E]"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono opacity-80">
                      <span>{item.href.replace(/^mailto:/, "")}</span>
                      {item.external && <ArrowUpRight className="w-3 h-3" />}
                    </div>
                  </li>
                );
              })
            )}
          </ul>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0E0E0E] border-t border-[#2A2418] text-[10px] font-mono text-[#A8A29E]/70">
            <span>Navigation: ↑ ↓ to select, Enter to jump</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </>
  );
}
