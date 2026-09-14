import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import profileImg from "../assets/profile.jpg";
import SplitHeading from "../components/SplitHeading";

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Discrete element refs for staggered timing on initial page load
  const badgeRef = useRef(null);
  const nameRowRef = useRef(null);
  const photoRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const telemetryRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // 1. Initial page load staggered entrance animation
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [
      badgeRef.current,
      nameRowRef.current,
      photoRef.current,
      subtitleRef.current,
      descRef.current,
      buttonsRef.current,
      telemetryRef.current,
      canvasContainerRef.current,
      scrollIndicatorRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 });
    } else {
      const isMobile = window.innerWidth < 768;
      const yDist = isMobile ? 16 : 24;
      const xDist = isMobile ? -18 : -30;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Name & status badge: 0.0s
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.7 }, 0.0);
      }
      if (nameRowRef.current) {
        tl.fromTo(nameRowRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.8 }, 0.0);
      }
      if (photoRef.current) {
        tl.fromTo(photoRef.current, { opacity: 0, x: xDist }, { opacity: 1, x: 0, duration: 0.8 }, 0.08);
      }

      // Subtitle / role: 0.15s
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.75 }, 0.15);
      }

      // Description: 0.30s
      if (descRef.current) {
        tl.fromTo(descRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.75 }, 0.30);
      }

      // Buttons: 0.45s
      if (buttonsRef.current) {
        tl.fromTo(buttonsRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.75 }, 0.45);
      }

      // Location telemetry: 0.60s
      if (telemetryRef.current) {
        tl.fromTo(telemetryRef.current, { opacity: 0, y: yDist }, { opacity: 1, y: 0, duration: 0.7 }, 0.60);
      }

      // Particle Canvas container: smooth reveal at 0.25s
      if (canvasContainerRef.current) {
        tl.fromTo(
          canvasContainerRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.85 },
          0.25
        );
      }

      // Scroll indicator at 0.70s
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.70);
      }
    }

    // 2. Optimized Particle Mesh — 30 FPS, IntersectionObserver, capped DPR
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 30;

    let width = 300;
    let height = 500;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 40;
    const connectDistance = isMobile ? 80 : 105;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const rect = canvas.getBoundingClientRect();
        width = rect.width || canvas.parentElement.clientWidth || 300;
        height = rect.height || canvas.parentElement.clientHeight || 500;
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
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
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
          // Subtle champagne gold particles
          ctx.fillStyle = "rgba(229, 199, 107, 0.45)";
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
              const alpha = (1 - dist / connectDistance) * 0.16;
              ctx.strokeStyle = `rgba(201, 162, 39, ${alpha})`;
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

    // 3. Hero Parallax — subtle 5px-12px movement on non-critical decorative elements
    const handleHeroParallax = (e) => {
      if (prefersReducedMotion || window.innerWidth < 768 || !isVisible) return;
      const relX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const relY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      if (canvasContainerRef.current) {
        gsap.to(canvasContainerRef.current, {
          x: relX * 12,
          y: relY * 12,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          x: relX * 6,
          y: relY * 6,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleHeroLeave = () => {
      if (canvasContainerRef.current) {
        gsap.to(canvasContainerRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      }
      if (photoRef.current) {
        gsap.to(photoRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", handleHeroParallax, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleHeroLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleHeroParallax);
      document.documentElement.removeEventListener("mouseleave", handleHeroLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 pt-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left: Editorial Info */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">

          {/* Status chip */}
          <div ref={badgeRef} className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-sans text-[#E5C76B] uppercase font-semibold">
              AI / ML Engineering Student
            </span>
          </div>

          {/* Name + portrait row */}
          <div ref={nameRowRef} className="flex flex-col sm:flex-row sm:items-end gap-6 mt-2">
            <SplitHeading
              as="h1"
              text="LOGITH"
              className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[0.9] text-[#F5F1E8]"
            />
            {/* Portrait — editorial, clean, champagne gold glow on hover */}
            <div ref={photoRef} className="w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden border border-[#2A2418] shadow-2xl relative shrink-0 portrait-glow">
              <img
                src={profileImg}
                alt="Logith T — AI/ML Engineering Student"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                loading="eager"
              />
              {/* Subtle dark base overlay — keeps photo from competing with heading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />
              {/* Gold tint: subtle accent */}
              <div className="absolute inset-0 bg-[#C9A227]/0 hover:bg-[#C9A227]/5 transition-colors duration-500 pointer-events-none mix-blend-color" />
            </div>
          </div>

          {/* Tagline */}
          <h2 ref={subtitleRef} className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-[#F5F1E8] tracking-normal leading-relaxed max-w-2xl">
            Building intelligent systems for real-world impact.
          </h2>

          {/* Body */}
          <p ref={descRef} className="text-[#A8A29E] text-sm sm:text-base leading-relaxed max-w-xl font-light">
            AI/ML and full-stack engineering student building practical systems across IoT, machine learning, NLP, and responsive web platforms.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#projects"
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] font-semibold text-[#0A0A0A] bg-[#C9A227] hover:bg-[#E5C76B] px-6 py-3.5 rounded-sm transition-all duration-300 uppercase shadow-[0_4px_20px_rgba(201,162,39,0.2)] magnetic-btn"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="text-[10px] sm:text-xs font-sans tracking-[0.2em] font-semibold text-[#E5C76B] border border-[#2A2418] hover:border-[#C9A227] hover:bg-[#C9A227]/10 px-6 py-3.5 rounded-sm transition-all duration-[350ms] uppercase magnetic-btn"
            >
              Connect
            </a>
          </div>

          {/* Location telemetry */}
          <div ref={telemetryRef} className="flex items-center gap-10 mt-10 border-t border-[#2A2418] pt-6 max-w-sm">
            <div>
              <div className="text-[9px] text-[#A8A29E]/60 tracking-widest uppercase mb-1">Location</div>
              <div className="text-xs text-[#F5F1E8] font-medium tracking-wide font-sans">Tamil Nadu, India</div>
            </div>
            <div>
              <div className="text-[9px] text-[#A8A29E]/60 tracking-widest uppercase mb-1">Coordinates</div>
              <div className="text-xs text-[#F5F1E8] font-medium tracking-wide font-sans">11.0168° N, 77.9332° E</div>
            </div>
          </div>

        </div>

        {/* Right: Particle Canvas */}
        <div ref={canvasContainerRef} className="lg:col-span-5 h-[300px] lg:h-[500px] w-full relative rounded-xl border border-[#2A2418] bg-[#111111]/60 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#A8A29E]/50 tracking-wider uppercase select-none">
            MESH_NETWORK // AGENT_MODEL: VER_1.1
          </div>
          {/* Corner decorations */}
          <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#C9A227]/80 tracking-wider uppercase select-none">
            NODE_DYNAMICS // LIVE
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-6 sm:left-12 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#2A2418] flex items-center justify-center animate-float-slow">
          <ArrowDown className="w-4 h-4 text-[#C9A227]" />
        </div>
        <span className="text-[9px] tracking-[0.22em] font-sans text-[#A8A29E]/80 uppercase">
          Scroll to story
        </span>
      </div>
    </section>
  );
}
