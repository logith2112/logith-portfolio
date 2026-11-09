import { useEffect, useRef } from "react";
import gsap from "gsap";
import profileImg from "../assets/profile.jpg";
import GraphGlowWrapper from "../components/GraphGlowWrapper";
import { Sparkles, ArrowUpRight, Compass, MessageSquare } from "lucide-react";

/**
 * Home Section (Hero)
 * 
 * Implements Phase 3 requirements:
 * - Headline: "Turning Ideas Into Extraordinary Digital Experiences."
 * - Supporting text: "I'm Logith T, an AI & Machine Learning student and developer passionate about building intelligent applications, interactive websites and meaningful digital experiences."
 * - Primary CTA: "Let's go exploring" (scrolls to #work)
 * - Secondary CTA: "Let's talk" (scrolls to #contact)
 * - Staggered text reveals, masked headline transitions, subtle parallax, interactive particle canvas.
 */
export default function Home({ onOpenBooking }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const badgeRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const photoCardRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const telemetryRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [
      badgeRef.current,
      titleLine1Ref.current,
      titleLine2Ref.current,
      descRef.current,
      buttonsRef.current,
      photoCardRef.current,
      canvasContainerRef.current,
      telemetryRef.current,
      scrollIndicatorRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
    } else {
      const isMobile = window.innerWidth < 768;
      const yDist = isMobile ? 18 : 28;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered sequence
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.65 }, 0.0);
      }
      if (titleLine1Ref.current) {
        tl.fromTo(titleLine1Ref.current, { opacity: 0, y: yDist + 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1);
      }
      if (titleLine2Ref.current) {
        tl.fromTo(titleLine2Ref.current, { opacity: 0, y: yDist + 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.22);
      }
      if (descRef.current) {
        tl.fromTo(descRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.7 }, 0.35);
      }
      if (buttonsRef.current) {
        tl.fromTo(buttonsRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.7 }, 0.48);
      }
      if (photoCardRef.current) {
        tl.fromTo(photoCardRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.85 }, 0.25);
      }
      if (canvasContainerRef.current) {
        tl.fromTo(canvasContainerRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.85 }, 0.35);
      }
      if (telemetryRef.current) {
        tl.fromTo(telemetryRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 0.6);
      }
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7);
      }
    }

    // Interactive Particle Canvas with 30fps throttle
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;

    let width = 300;
    let height = 480;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 36;
    const connectDistance = isMobile ? 80 : 110;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const rect = canvas.getBoundingClientRect();
        width = rect.width || 300;
        height = rect.height || 480;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.6 + 0.8,
      });
    }

    const draw = (timestamp) => {
      if (!isVisible || document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      if (elapsed >= fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.fillStyle = "rgba(232, 199, 122, 0.45)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.lineWidth = 0.5;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.18;
              ctx.strokeStyle = `rgba(232, 199, 122, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { isVisible = e.isIntersecting; }),
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-16 overflow-hidden"
    >
      {/* Background glow orb */}
      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full bg-[#E8C77A]/[0.035] filter blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 my-auto">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Status Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E8C77A] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#E8C77A] uppercase font-semibold">
              AI & Machine Learning Developer
            </span>
          </div>

          {/* Incroy-Inspired Editorial Headline */}
          <div className="overflow-hidden">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#F5F2EA] leading-[1.08] uppercase">
              <span ref={titleLine1Ref} className="block">
                Turning Ideas Into
              </span>
              <span ref={titleLine2Ref} className="block text-[#E8C77A] italic font-serif mt-1">
                Extraordinary
              </span>
              <span className="block text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#F5F2EA] font-sans font-light normal-case mt-2">
                Digital Experiences.
              </span>
            </h1>
          </div>

          {/* Requested Exact Supporting Text */}
          <p
            ref={descRef}
            className="text-[#A6A6A6] text-base sm:text-lg leading-relaxed max-w-2xl font-light mt-1"
          >
            I'm <strong className="text-[#F5F2EA] font-semibold">Logith T</strong>, an AI & Machine Learning student and developer passionate about building intelligent applications, interactive websites and meaningful digital experiences.
          </p>

          {/* Exact Requested CTAs: Primary "Let's go exploring", Secondary "Let's talk" */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 mt-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("work");
              }}
              className="px-7 py-3.5 rounded-full text-xs font-sans tracking-widest font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] uppercase shadow-[0_4px_24px_rgba(232,199,122,0.3)] hover:shadow-[0_6px_28px_rgba(232,199,122,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
              Let's go exploring
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="px-6 py-3.5 rounded-full text-xs font-sans tracking-widest font-semibold text-[#F5F2EA] border border-[#2A2418] hover:border-[#E8C77A] hover:bg-[#141414] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E8C77A]" />
              Let's talk
            </a>

            {/* Direct Booking Shortcut */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-xs font-sans tracking-wider text-[#A6A6A6] hover:text-[#E8C77A] underline underline-offset-4 transition-colors flex items-center gap-1 ml-1 cursor-pointer"
            >
              Or book a call <ArrowUpRight className="w-3 h-3 text-[#E8C77A]" />
            </button>
          </div>

          {/* Telemetry & Verified Location HUD */}
          <div
            ref={telemetryRef}
            className="flex flex-wrap items-center gap-8 mt-6 pt-6 border-t border-[#2A2418] max-w-lg"
          >
            <div>
              <div className="text-[9px] font-mono tracking-widest text-[#A6A6A6]/60 uppercase mb-1">
                ACADEMIC AFFILIATION
              </div>
              <div className="text-xs font-sans font-medium text-[#F5F2EA]">
                SRM Institute of Science & Technology
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-widest text-[#A6A6A6]/60 uppercase mb-1">
                BASE LOCATION
              </div>
              <div className="text-xs font-sans font-medium text-[#F5F2EA]">
                Tamil Nadu, India (11.01° N, 77.93° E)
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Mesh & Editorial Portrait Card */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          
          {/* Top: Editorial Card with Portrait & Role */}
          <div
            ref={photoCardRef}
            className="p-5 sm:p-6 rounded-2xl bg-[#111111]/90 border border-[#2A2418] backdrop-blur-md flex items-center gap-5 shadow-2xl relative overflow-hidden group"
          >
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-[#2A2418] group-hover:border-[#E8C77A] transition-colors duration-500 shrink-0 relative">
              <img
                src={profileImg}
                alt="Logith T — AI & ML Developer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="text-left flex flex-col justify-center">
              <div className="text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase">
                PORTFOLIO // 2026
              </div>
              <div className="text-lg sm:text-xl font-serif font-bold text-[#F5F2EA] mt-1">
                Logith T
              </div>
              <p className="text-xs text-[#A6A6A6] mt-1 font-light leading-relaxed">
                Specializing in Applied Machine Learning, IoT Sensing, and Modern Web Systems.
              </p>
              <div className="flex items-center gap-2 mt-2.5 text-[10px] font-mono text-[#E8C77A]">
                <Sparkles className="w-3 h-3" />
                <span>OPEN FOR COLLABORATION</span>
              </div>
            </div>
          </div>

          {/* Bottom: Interactive Node Dynamics Canvas */}
          <div
            ref={canvasContainerRef}
            className="h-[220px] sm:h-[260px] w-full relative rounded-2xl border border-[#2A2418] bg-[#111111]/60 overflow-hidden"
          >
            <GraphGlowWrapper className="h-full">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              <div className="absolute top-4 left-4 font-mono text-[9px] text-[#A6A6A6]/60 tracking-wider uppercase select-none">
                NEURAL_TOPOLOGY // SIMULATION
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#E8C77A]/80 tracking-wider uppercase select-none">
                ACTIVE_NODES // RESPONSIVE
              </div>
            </GraphGlowWrapper>
          </div>

        </div>

      </div>

      {/* Smooth Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="pt-8 flex items-center justify-between text-[#A6A6A6]/70 text-[10px] font-mono tracking-widest uppercase border-t border-[#2A2418]/60 mt-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-8 rounded-full border border-[#2A2418] flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#E8C77A] animate-bounce" />
          </div>
          <span>Scroll to explore process & work</span>
        </div>
        <div className="hidden sm:block">
          DESIGNED FOR CURIOUS MINDS // 2026
        </div>
      </div>
    </section>
  );
}

