import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    // 1. Title fade and reveal using GSAP mask/stagger effects
    const elements = titleRef.current.children;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.18, ease: "power3.out", delay: 0.4 }
    );

    // 2. Animated Particle Mesh Visual with Optimization
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Limit to 30 FPS

    let width = 300;
    let height = 500;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 45;
    const connectDistance = isMobile ? 80 : 110;

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
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
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

        // Draw particle nodes
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.fillStyle = "rgba(181, 255, 26, 0.45)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connection lines
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.15;
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
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
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
        
        {/* Left Editorial Info */}
        <div ref={titleRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse"></span>
            <span className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
              AI / ML ENGINEERING STUDENT
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white">
              LOGITH
            </h1>
            <div className="w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden border border-white/10 shadow-2xl relative shrink-0 group">
              <img
                src={profileImg}
                alt="Logith T"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-cyber-lime/10 mix-blend-color opacity-25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/40 to-transparent pointer-events-none" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-light text-slate-300 tracking-tight leading-relaxed max-w-2xl">
            BUILDING INTELLIGENT SYSTEMS FOR REAL-WORLD IMPACT.
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            AI/ML and full-stack engineering student building practical systems across IoT, machine learning, NLP, and responsive web platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="#projects"
              className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-semibold text-black bg-cyber-lime hover:bg-cyber-lime/90 px-6 py-3.5 rounded-sm transition-all duration-300 uppercase magnetic-btn"
            >
              EXPLORE WORK
            </a>
            <a
              href="#contact"
              className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-semibold text-white border border-white/10 hover:border-cyber-lime hover:text-cyber-lime px-6 py-3.5 rounded-sm transition-all duration-300 uppercase magnetic-btn"
            >
              CONNECT
            </a>
          </div>

          {/* Location & telemetry indicator */}
          <div className="flex items-center gap-8 mt-12 border-t border-white/[0.04] pt-6 max-w-md">
            <div>
              <div className="text-[9px] text-[#6b7280] tracking-widest uppercase">LOCATION</div>
              <div className="text-xs text-white font-medium tracking-wide font-display mt-0.5">
                TAMIL NADU, INDIA
              </div>
            </div>
            <div>
              <div className="text-[9px] text-[#6b7280] tracking-widest uppercase">COORDINATES</div>
              <div className="text-xs text-white font-medium tracking-wide font-display mt-0.5">
                11.0168° N, 77.9332° E
              </div>
            </div>
          </div>

        </div>

        {/* Right Animated Visual Canvas */}
        <div className="lg:col-span-5 h-[300px] lg:h-[500px] w-full relative rounded-xl border border-white/[0.03] bg-[#111215]/20 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#525760] tracking-wider uppercase">
            MESH_NETWORK_NODE_DYNAMICS // AGENT_MODEL: VER_1.1
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-6 sm:left-12 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
          <ArrowDown className="w-4 h-4 text-cyber-lime" />
        </div>
        <span className="text-[9px] tracking-[0.2em] font-display text-slate-500 uppercase">
          SCROLL TO STORY
        </span>
      </div>
    </section>
  );
}
