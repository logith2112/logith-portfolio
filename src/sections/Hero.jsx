import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Title fade and reveal using GSAP stagger
    const elements = titleRef.current.children;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.4 }
    );

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
          // Slightly more subtle particle opacity
          ctx.fillStyle = "rgba(181, 255, 26, 0.32)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.lineWidth = 0.4;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.1;
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 pt-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left: Editorial Info */}
        <div ref={titleRef} className="lg:col-span-7 flex flex-col gap-6 text-left">

          {/* Status chip */}
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
              AI / ML Engineering Student
            </span>
          </div>

          {/* Name + portrait row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white">
              LOGITH
            </h1>
            {/* Portrait — editorial, clean, lime glow on hover */}
            <div className="w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden border border-white/10 shadow-2xl relative shrink-0 portrait-glow">
              <img
                src={profileImg}
                alt="Logith T — AI/ML Engineering Student"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                loading="eager"
              />
              {/* Subtle dark base overlay — keeps photo from competing with heading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/50 via-transparent to-transparent pointer-events-none" />
              {/* Lime tint: invisible by default, accent only */}
              <div className="absolute inset-0 bg-cyber-lime/0 hover:bg-cyber-lime/5 transition-colors duration-500 pointer-events-none mix-blend-color" />
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-light text-slate-200 tracking-tight leading-relaxed max-w-2xl">
            Building intelligent systems for real-world impact.
          </h2>

          {/* Body */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            AI/ML and full-stack engineering student building practical systems across IoT, machine learning, NLP, and responsive web platforms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#projects"
              className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-semibold text-black bg-cyber-lime hover:bg-cyber-lime/88 px-6 py-3.5 rounded-sm transition-all duration-300 uppercase magnetic-btn"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-semibold text-slate-300 border border-white/10 hover:border-cyber-lime/40 hover:text-cyber-lime px-6 py-3.5 rounded-sm transition-all duration-[350ms] uppercase magnetic-btn"
            >
              Connect
            </a>
          </div>

          {/* Location telemetry */}
          <div className="flex items-center gap-10 mt-10 border-t border-white/[0.05] pt-6 max-w-sm">
            <div>
              <div className="text-[9px] text-slate-600 tracking-widest uppercase mb-1">Location</div>
              <div className="text-xs text-slate-300 font-medium tracking-wide font-display">Tamil Nadu, India</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-600 tracking-widest uppercase mb-1">Coordinates</div>
              <div className="text-xs text-slate-300 font-medium tracking-wide font-display">11.0168° N, 77.9332° E</div>
            </div>
          </div>

        </div>

        {/* Right: Particle Canvas */}
        <div className="lg:col-span-5 h-[300px] lg:h-[500px] w-full relative rounded-xl border border-white/[0.04] bg-[#0e0f12]/30 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#3a3f4a] tracking-wider uppercase select-none">
            MESH_NETWORK // AGENT_MODEL: VER_1.1
          </div>
          {/* Corner decorations */}
          <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#3a3f4a] tracking-wider uppercase select-none">
            NODE_DYNAMICS // LIVE
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 sm:left-12 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center animate-float-slow">
          <ArrowDown className="w-4 h-4 text-cyber-lime" />
        </div>
        <span className="text-[9px] tracking-[0.22em] font-display text-slate-600 uppercase">
          Scroll to story
        </span>
      </div>
    </section>
  );
}
