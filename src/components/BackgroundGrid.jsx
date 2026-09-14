import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BackgroundGrid() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const orbs = containerRef.current?.querySelectorAll(".glow-orb");
    
    // Slow, drifting animation for ambient orbs
    orbs?.forEach((orb, i) => {
      if (window.innerWidth < 768 && i >= 2) return;

      gsap.to(orb, {
        x: () => (Math.random() - 0.5) * (window.innerWidth < 768 ? 100 : 300),
        y: () => (Math.random() - 0.5) * (window.innerWidth < 768 ? 100 : 300),
        duration: 15 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // 16. Optional Background Particles — subtle luxury gold dust
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const count = window.innerWidth < 768 ? 8 : 20;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.05),
        radius: Math.random() * 0.8 + 0.6,
        alpha: Math.random() * 0.08 + 0.06,
      });
    }

    const drawParticles = () => {
      if (document.visibilityState === "hidden") {
        animId = requestAnimationFrame(drawParticles);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(229, 199, 107, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(drawParticles);
    };

    animId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", resizeCanvas);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Editorial grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.04] border-b border-[#2A2418]" />

      {/* Subtle luxury gold dust particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Luxury champagne gold & bronze ambient mists */}
      <div
        className={`glow-orb bg-[#C9A227]/[0.035] top-[-200px] left-[-200px] will-change-transform ${
          isMobile ? "w-[300px] h-[300px] blur-[90px]" : "w-[600px] h-[600px] blur-[140px]"
        }`}
      />
      <div
        className={`glow-orb bg-[#2A2418]/[0.15] bottom-[-100px] right-[-100px] will-change-transform ${
          isMobile ? "w-[300px] h-[300px] blur-[90px]" : "w-[600px] h-[600px] blur-[140px]"
        }`}
      />
      
      {/* Hide third orb completely on mobile */}
      {!isMobile && (
        <div
          className="glow-orb w-[400px] h-[400px] bg-[#E5C76B]/[0.02] top-[40%] left-[60%] will-change-transform blur-[140px]"
        />
      )}
    </div>
  );
}
