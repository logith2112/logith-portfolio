import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisuals";
import GraphGlowWrapper from "./GraphGlowWrapper";

/**
 * ProjectCard
 * 
 * Implements:
 * - Interactive 3D Tilt (perspective 900px, max ~5deg rotateX/rotateY, translateY -6px)
 * - Local Gold Spotlight tracking cursor inside the card
 * - Image Micro-Zoom (scale 1.02, overflow hidden)
 * - Luxury Gold Border & Shadow on hover
 * - Micro-interaction arrow glide
 * - Mobile & prefers-reduced-motion safety
 */
export default function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: -500, y: -500, opacity: 0 });

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update local card spotlight position
    setSpotlight({ x, y, opacity: 1 });

    // Interactive 3D Tilt (Desktop only, respect reduced motion)
    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isDesktop && !prefersReducedMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Max 5 degrees rotation
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Fade out spotlight
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));

    // Reset 3D tilt smoothly
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="reveal-up project-card-interactive grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-left group p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      style={{
        transitionDelay: `${(idx % 2) * 120}ms`,
      }}
    >
      {/* 7. Local Project Card Golden Spotlight Layer */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 380px at ${spotlight.x}px ${spotlight.y}px, rgba(229,199,107,0.14) 0%, rgba(201,162,39,0.06) 35%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Left: Details */}
      <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 order-2 lg:order-1 relative z-10">

        {/* Number + Category */}
        <div className="flex items-center gap-4">
          <span className="text-3xl sm:text-4xl font-serif font-bold text-stroke-gold tracking-tighter select-none">
            {project.num}
          </span>
          <div className="px-2.5 py-1 rounded bg-[#0E0E0E] border border-[#2A2418] text-[9px] font-sans tracking-widest text-[#E5C76B] uppercase font-medium">
            {project.category}
          </div>
        </div>

        {/* Title — primary focal point */}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-snug group-hover:text-[#E5C76B] transition-colors duration-[400ms]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#A8A29E] text-sm leading-relaxed font-light">
          {project.desc}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] sm:text-[10px] font-mono text-[#A8A29E] bg-[#0E0E0E] border border-[#2A2418] px-2.5 py-0.5 rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Compact CTA with shine sweep & micro-arrow */}
        <div className="mt-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta project-cta-live magnetic-btn"
            >
              View Live Site <ArrowUpRight className="w-3 h-3 arrow-micro" />
            </a>
          ) : project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta project-cta-github magnetic-btn"
            >
              View on GitHub <ArrowUpRight className="w-3 h-3 arrow-micro" />
            </a>
          ) : project.wip ? (
            <span className="project-cta project-cta-wip">
              In Development
            </span>
          ) : (
            <span className="project-cta project-cta-wip">
              Case Study Coming Soon
            </span>
          )}
        </div>

      </div>

      {/* Right: Canvas Visual — 9. Project Image Micro-Zoom (scale 1.02 over 0.4s) */}
      <div className="lg:col-span-6 order-1 lg:order-2 w-full relative z-10">
        <div className="project-visual-frame relative">
          {/* Soft gold halo — only on hover */}
          <div className="absolute inset-0 bg-[#C9A227]/[0.05] filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" />
          <div className="project-visual-zoom">
            <GraphGlowWrapper>
              <ProjectVisual index={project.id} />
            </GraphGlowWrapper>
          </div>
        </div>
      </div>

    </div>
  );
}
